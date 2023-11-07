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
    let nextLine = this.excelReaderService.readNextLine();
    while (nextLine !== null) {
      nextLine = this.excelReaderService.readNextLine();
      let response;
      try {
        response = await axios.post(this.baseUrl, {
          data: nextLine,
        });
      } catch (error) {
        throw error;
      }
      console.log(response.data);
      for (const benefitiary of response.data.beneficiaryDetails) {
        console.log(benefitiary);
      }
    }
  }
}
