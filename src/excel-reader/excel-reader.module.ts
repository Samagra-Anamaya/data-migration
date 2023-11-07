import { Module } from '@nestjs/common';
import { ExcelReaderService } from './excel-reader.service';

@Module({
  exports: [ExcelReaderService],
  providers: [ExcelReaderService],
})
export class ExcelReaderModule {}
