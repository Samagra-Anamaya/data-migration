import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import axios from 'axios';
import { ExcelReaderService } from 'src/excel-reader/excel-reader.service';
import { LoggerService } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DataScraperService implements OnApplicationBootstrap {
  constructor(
    private readonly excelReaderService: ExcelReaderService,
    private readonly prismaService: PrismaService,
    private readonly loggerService: LoggerService,
  ) {}

  private spdpBaseUrl = process.env.SPDP_URL;

  async onApplicationBootstrap() {
    await this.scrapeSPDPData();
  }

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
    }
    console.log(authResponse);
    if (!authResponse || authResponse.status !== 'Success') {
      this.loggerService.error('Wrong auth credentials');
      return '';
    }
    return authResponse.securityKey;
  }

  async scrapeSPDPData() {
    console.log('Authenticating user');
    let securityKey;
    while (securityKey === undefined) {
      securityKey = await this.authenticateUser();
    }
    this.loggerService.success(`Authenticated and received securityKey`);
    let districtLGDCode = this.excelReaderService.readNextLine();
    while (districtLGDCode !== null) {
      console.log(`Fetching details for distLGDCode ${districtLGDCode}`);
      this.fetchDataFromDistrictLGDCode(districtLGDCode, securityKey);
      districtLGDCode = this.excelReaderService.readNextLine();
    }
  }

  async fetchDataFromDistrictLGDCode(
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
        `Success fetching data for batch ${currentBatch} and distLDGCode ${districtLGDCode}`,
      );
      console.log(
        `Success fetching data for batch ${currentBatch} and distLDGCode ${districtLGDCode}`,
      );
      await this.prismaService.saveBeneficiaryDetails(
        response.data.beneficiaryDetails,
      );
    }
  }
}
