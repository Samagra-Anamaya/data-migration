import {
  HttpException,
  HttpStatus,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import axios from 'axios';
import { ExcelReaderService } from 'src/excel-reader/excel-reader.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DataScraperService implements OnApplicationBootstrap {
  constructor(
    private readonly excelReaderService: ExcelReaderService,
    private readonly prismaService: PrismaService,
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
      throw new HttpException('Cannot authenticate user', HttpStatus.FORBIDDEN);
    }
    if (authResponse.status !== 'Success') {
      throw new HttpException('Wrong auth credentials', HttpStatus.FORBIDDEN);
    }
    return authResponse.securityKey;
  }

  async scrapeSPDPData() {
    const securityKey = await this.authenticateUser();
    let districtLGDCode = this.excelReaderService.readNextLine();
    while (districtLGDCode !== null) {
      await this.fetchDataFromDistrictLGDCode(districtLGDCode, securityKey);
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
        throw new HttpException(
          `Can't fetch SPTP data for distLGDCode ${districtLGDCode}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      currentBatch = response.data.currentBatch;
      await this.prismaService.saveBeneficiaryDetails(
        response.data.beneficiaryDetails,
      );
    }
  }
}
