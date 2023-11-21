import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class LoggerService {
  private successLogger: winston.Logger;
  private errorLogger: winston.Logger;

  constructor() {
    const logDirectory = path.join(__dirname, 'logs');
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    this.successLogger = winston.createLogger({
      level: 'info',
      format: winston.format.simple(),
      transports: [
        new winston.transports.File({
          filename: path.join(logDirectory, 'success.log'),
        }),
      ],
    });
    this.errorLogger = winston.createLogger({
      level: 'error',
      format: winston.format.simple(),
      transports: [
        new winston.transports.File({
          filename: path.join(logDirectory, 'error.log'),
        }),
      ],
    });
  }

  success(message: string) {
    this.successLogger.info(message);
  }

  error(message: string) {
    this.errorLogger.error(message);
  }
}
