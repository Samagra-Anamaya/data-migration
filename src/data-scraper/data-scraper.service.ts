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
      this.loggerService.error('Failed to call Auth API');
      return undefined;
    }
    console.log(authResponse);
    if (!authResponse || authResponse.status !== 'Success') {
      this.loggerService.error('Wrong auth credentials');
      return '';
    }
    return authResponse.securityKey;
  }

  async scrapeDataForDistrict(districtLGDCode: string) {
    console.log('Authenticating user');
    const securityKey = await this.authenticateUser();
    if (!securityKey) return { message: 'auth failed' };
    this.loggerService.success(`Authenticated and received securityKey`);
    this.fetchDataForDistrictLGDCode(districtLGDCode, securityKey);
    return { message: 'success' };
  }

  async scrapeSPDPData() {
    console.log('Authenticating user');
    const securityKey = await this.authenticateUser();
    if (!securityKey) return { message: 'auth failed' };
    this.loggerService.success(`Authenticated and received securityKey`);
    let districtLGDCode = this.excelReaderService.readNextLine();
    while (districtLGDCode !== null) {
      console.log(`Fetching details for distLGDCode ${districtLGDCode}`);
      this.fetchDataForDistrictLGDCode(districtLGDCode, securityKey);
      districtLGDCode = this.excelReaderService.readNextLine();
    }
    return { message: 'success' };
  }

  async fetchDataForDistrictLGDCode(
    districtLGDCode: string,
    securityKey: string,
  ) {
    const headers = {
      securityKey: securityKey,
    };
    let currentBatch = '0/n';
    while (currentBatch.split('/')[0] !== currentBatch.split('/')[1]) {
      let response;
      const payload = {
        distLGDCode: districtLGDCode,
      };
      try {
        response = await axios.post(
          `${this.spdpBaseUrl}/dataShareSPDP/getSPDPSTData`,
          payload,
          { headers: headers },
        );
      } catch (error) {
        this.loggerService.error(
          `Error fetching data for batch ${
            Number(currentBatch.split('/')[0]) + 1
          }/${currentBatch.split('/')[1]} and distLGDCode ${districtLGDCode}`,
        );
        continue;
      }
      currentBatch = response.data.currentBatch;
      this.loggerService.success(
        `Success fetching data for batch ${currentBatch} and distLGDCode ${districtLGDCode}`,
      );
      console.log(
        `Success fetching data for batch ${currentBatch} and distLGDCode ${districtLGDCode}`,
      );
      try {
        await this.prismaService.saveBeneficiaryDetails(
          response.data.beneficiaryDetails,
        );
      } catch (_error) {
        // save response data to file
        const filePath = `${__dirname}/${districtLGDCode}_${
          currentBatch.split('/')[0]
        }`;
        fs.writeFileSync(filePath, JSON.stringify(response.data), 'utf-8');
        this.loggerService.success(
          `Flushed response data to file: ${filePath}`,
        );
      }
    }
  }
}
