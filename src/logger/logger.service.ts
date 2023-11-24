import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class LoggerService {
  private successLogDir: string;
  private errorLogDir: string;

  constructor() {
    this.successLogDir = path.join(__dirname, 'success');
    this.errorLogDir = path.join(__dirname, 'error');
    if (!fs.existsSync(this.successLogDir)) {
      fs.mkdirSync(this.successLogDir);
    }
    if (!fs.existsSync(this.errorLogDir)) {
      fs.mkdirSync(this.errorLogDir);
    }
  }

  writeToFile(message: string, filePath) {
    const writeStream = fs.createWriteStream(filePath);
    writeStream.write(`${message}\n`);
    writeStream.close();
  }

  success(message: string, distLGDCode: string) {
    console.log(message);
    // const filePath = `${this.successLogDir}/${distLGDCode}.log`;
    // this.writeToFile(message, filePath);
  }

  error(message: string, distLGDCode: string) {
    console.error(message);
    // const filePath = `${this.errorLogDir}/${distLGDCode}.log`;
    // this.writeToFile(message, filePath);
  }
}
