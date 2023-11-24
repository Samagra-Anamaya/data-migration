import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ExcelReaderService } from 'src/excel-reader/excel-reader.service';
import { LoggerService } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';

@Injectable()
export class DataScraperService {
  constructor(
    private readonly excelReaderService: ExcelReaderService,
    private readonly prismaService: PrismaService,
    private readonly loggerService: LoggerService,
  ) {}

  private spdpBaseUrl = process.env.SPDP_URL;

  async authenticateUser() {
    const payload = {
      userName: process.env.SPDP_USERNAME,
      password: process.env.SPDP_PASSWORD,
    };
    let authResponse;
    try {
      const response = await axios.post(
        `${this.spdpBaseUrl}/dataShareSPDP/spdpAPIDataShareAuthentication`,
        payload,
      );
      authResponse = response.data;
    } catch (error) {
      this.loggerService.error(`Failed to call Auth API ${error}`, '000');
      return undefined;
    }
    if (!authResponse || authResponse.status !== 'Success') {
      this.loggerService.error('Wrong auth credentials', '000');
      return undefined;
    }
    if (!authResponse.status && authResponse.status === 'Failure') {
      this.loggerService.error(
        `Error while authenticating: ${authResponse.message}`,
        '000',
      );
      return undefined;
    }
    return authResponse.securityKey;
  }

  // Scrape data for a single district
  async scrapeDataForDistrict(districtLGDCode: string) {
    console.log('Authenticating user');
    const securityKey = await this.authenticateUser();
    if (!securityKey) {
      return { message: 'auth failed' };
    }
    this.loggerService.success(`Authenticated and received securityKey`, '000');

    this.fetchDataForDistrictLGDCode(districtLGDCode, securityKey);
    return { message: 'success' };
  }

  // Scrape data for all districts
  async scrapeSPDPData() {
    console.log('Authenticating user');
    const securityKey = await this.authenticateUser();
    if (!securityKey) {
      return { message: 'auth failed' };
    }
    this.loggerService.success(`Authenticated and received securityKey`, '000');

    let districtLGDCode = this.excelReaderService.readNextLine();
    while (districtLGDCode !== null) {
      console.log(`Fetching details for distLGDCode ${districtLGDCode}`);
      this.fetchDataForDistrictLGDCode(districtLGDCode, securityKey);
      districtLGDCode = this.excelReaderService.readNextLine();
    }

    // Resets excel reader
    this.excelReaderService.resetReader();
    return { message: 'success' };
  }

  async fetchDataForDistrictLGDCode(
    districtLGDCode: string,
    securityKey: string,
  ) {
    const headers = {
      securityKey: securityKey,
    };
    let batch_no = 0;
    let total_batch = 'n';

    // 1/n as we don't know number of batches per district until we fetch atleast one
    // currentBatch updated on each successful data pull
    let currentBatch = '1/n';

    const latestBatch = await this.prismaService.getLatestBatch(
      districtLGDCode,
    );
    if (latestBatch.length > 0) {
      batch_no = Number(latestBatch[0].batch_no) - 1;
      total_batch = latestBatch[0].total_batch;
      currentBatch = `${batch_no}/${total_batch}`;
    }

    // loop breaks when currentBatch = 'n/n' that is the last batch
    while (currentBatch.split('/')[0] !== currentBatch.split('/')[1]) {
      let response;
      const payload = {
        distLGDCode: districtLGDCode,
      };
      try {
        await this.prismaService.dataFetchStarted(
          districtLGDCode,
          String(batch_no + 1),
          total_batch,
        );
        this.loggerService.success(
          `Batch ${batch_no + 1}/${total_batch} Pull Started`,
          districtLGDCode,
        );
        response = await axios.post(
          `${this.spdpBaseUrl}/dataShareSPDP/getSPDPSTData`,
          payload,
          { headers: headers },
        );
      } catch (error) {
        await this.prismaService.dataPullFailed(
          districtLGDCode,
          String(batch_no + 1),
          total_batch,
        );
        this.loggerService.error(
          `Batch ${batch_no + 1}/${total_batch} Pull Failed`,
          districtLGDCode,
        );
        break;
      }
      currentBatch = response.data.currentBatch;
      batch_no = Number(currentBatch.split('/')[0]);
      total_batch = currentBatch.split('/')[1];
      await this.prismaService.dataPulled(
        districtLGDCode,
        String(batch_no),
        total_batch,
      );
      this.loggerService.success(
        `Batch ${batch_no}/${total_batch} Pull Success`,
        districtLGDCode,
      );
      try {
        await this.prismaService.saveBeneficiaryDetails(
          response.data.beneficiaryDetails,
        );
        await this.prismaService.dataSavedInDatabase(
          districtLGDCode,
          String(batch_no),
          total_batch,
        );
        this.loggerService.success(
          `Batch ${batch_no}/${total_batch} Database Save Success`,
          districtLGDCode,
        );
      } catch (_error) {
        // save response data to file
        const filePath = `${__dirname}/${districtLGDCode}_${batch_no}`;
        try {
          fs.writeFileSync(filePath, JSON.stringify(response.data), 'utf-8');
          await this.prismaService.dataSavedInFile(
            districtLGDCode,
            String(batch_no),
            total_batch,
          );
          this.loggerService.success(
            `Batch ${batch_no}/${total_batch} File Save Success`,
            districtLGDCode,
          );
        } catch (error) {
          await this.prismaService.dataSaveFailed(
            districtLGDCode,
            String(batch_no),
            total_batch,
          );
          this.loggerService.error(
            `Batch ${batch_no}/${total_batch} File Save Failure`,
            districtLGDCode,
          );
        }
      }
    }
  }
}
