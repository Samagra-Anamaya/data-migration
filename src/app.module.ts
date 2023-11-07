import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExcelReaderService } from './excel-reader/excel-reader.service';
import { ExcelReaderModule } from './excel-reader/excel-reader.module';
import { DataScraperService } from './data-scraper/data-scraper.service';
import { DataScraperModule } from './data-scraper/data-scraper.module';

@Module({
  imports: [ExcelReaderModule, DataScraperModule],
  controllers: [AppController],
  providers: [AppService, ExcelReaderService, DataScraperService],
})
export class AppModule {}
