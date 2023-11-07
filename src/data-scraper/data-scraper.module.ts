import { Module } from '@nestjs/common';
import { ExcelReaderModule } from 'src/excel-reader/excel-reader.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ExcelReaderModule, PrismaModule],
})
export class DataScraperModule {}
