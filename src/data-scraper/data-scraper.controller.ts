import { Body, Controller, Post } from '@nestjs/common';
import { DataScraperService } from './data-scraper.service';
import { DistrictDto } from './dto/district.dto';

@Controller('data-scraper')
export class DataScraperController {
  constructor(private readonly dataScraperService: DataScraperService) {}

  @Post('scrapeDataForDistrict')
  async scrapeDataForDistrict(@Body() districtDto: DistrictDto) {
    return this.dataScraperService.scrapeDataForDistrict(
      districtDto.districtLGDCode,
    );
  }

  @Post('scrapeData')
  async scrapeData() {
    return this.dataScraperService.scrapeSPDPData();
  }

  @Post('saveDataForDistrict')
  async saveDataForDistrict(@Body() batchData: any) {
    return await this.dataScraperService.saveDataForDistrict(
      batchData.districtLGDCode,
      batchData.batchNo,
      batchData.data,
    );
  }
}
