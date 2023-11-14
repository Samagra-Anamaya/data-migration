import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExcelReaderService } from './excel-reader/excel-reader.service';
import { ExcelReaderModule } from './excel-reader/excel-reader.module';
import { DataScraperService } from './data-scraper/data-scraper.service';
import { DataScraperModule } from './data-scraper/data-scraper.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { SteController } from './ste/ste.controller';
import { SteService } from './ste/ste.service';
import { SteModule } from './ste/ste.module';

@Module({
  imports: [ExcelReaderModule, DataScraperModule, PrismaModule, SteModule],
  controllers: [AppController, SteController],
  providers: [
    AppService,
    ExcelReaderService,
    DataScraperService,
    PrismaService,
    SteService,
  ],
})
export class AppModule {}
