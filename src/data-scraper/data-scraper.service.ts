import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import axios from 'axios';
import { ExcelReaderService } from 'src/excel-reader/excel-reader.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DataScraperService implements OnApplicationBootstrap {
  private baseUrl = `http://localhost:8080/dataShareSPDP/getSPDPSTData`;

  constructor(
    private readonly excelReaderService: ExcelReaderService,
    private readonly prismaService: PrismaService,
  ) {}

  async onApplicationBootstrap() {
    await this.scrapeSPDPData();
  }

  async scrapeSPDPData() {
    let districtLGDCode = this.excelReaderService.readNextLine();
    while (districtLGDCode !== null) {
      console.log(`Fetching data for districtLGDCode ${districtLGDCode}`);
      await this.fetchDataFromDistrictLGDCode(districtLGDCode);
      districtLGDCode = this.excelReaderService.readNextLine();
    }
  }

  async fetchDataFromDistrictLGDCode(districtLGDCode: string) {
    let currentBatch = '0/n';
    while (currentBatch.split('/')[0] !== currentBatch.split('/')[1]) {
      let response;
      try {
        response = await axios.post(this.baseUrl, {
          distLGDCode: districtLGDCode,
        });
      } catch (error) {
        throw error;
      }
      currentBatch = response.data.currentBatch;
      console.log(response.data.beneficiaryDetails);
      await this.prismaService.saveBeneficiaryDetails(
        response.data.beneficiaryDetails,
      );
    }
  }
}
