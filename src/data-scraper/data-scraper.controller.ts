import { Body, Controller, Post } from '@nestjs/common';
import { DataScraperService } from './data-scraper.service';
import { DistrictDto } from './dto/district.dto';

@Controller('data-scraper')
export class DataScraperController {
  constructor(private readonly dataScraperService: DataScraperService) {}

  @Post('scrapeDataForDistrict')
  async scrapeDataForDistrict(@Body() districtDto: DistrictDto) {
    this.dataScraperService.scrapeDataForDistrict(districtDto.districtLGDCode);
  }

  @Post('scrapeData')
  async scrapeData() {
    await this.dataScraperService.scrapeSPDPData();
  }
}
