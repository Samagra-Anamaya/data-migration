import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class ExcelReaderService {
  private workbook: XLSX.WorkBook;
  private worksheet: XLSX.WorkSheet;
  private currentRow = 3;

  constructor() {
    const workbook = XLSX.readFile('VillageDetails.xlsx');
    const sheetName = workbook.SheetNames[0];

    this.workbook = workbook;
    this.worksheet = workbook.Sheets[sheetName];
  }

  readNextLine() {
    if (this.currentRow > XLSX.utils.decode_range(this.worksheet['!ref']).e.r) {
      return null; // End of file
    }

    const cellValue =
      this.worksheet[XLSX.utils.encode_cell({ r: this.currentRow, c: 31 })];
    this.currentRow++;

    return cellValue ? cellValue.v : null;
  }
}
