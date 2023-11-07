import { Module } from '@nestjs/common';
import { ExcelReaderModule } from 'src/excel-reader/excel-reader.module';

@Module({
  imports: [ExcelReaderModule],
})
export class DataScraperModule {}
