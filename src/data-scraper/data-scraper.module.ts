import { Module } from '@nestjs/common';
import { ExcelReaderModule } from 'src/excel-reader/excel-reader.module';
import { LoggerModule } from 'src/logger/logger.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DataScraperService } from './data-scraper.service';

@Module({
  imports: [ExcelReaderModule, PrismaModule, LoggerModule],
  providers: [DataScraperService],
})
export class DataScraperModule {}
