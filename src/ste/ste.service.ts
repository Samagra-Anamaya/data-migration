import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SchemeTransactionEvent } from './dto/scheme.transaction.dto';
import axios from 'axios';

@Injectable()
export class SteService {
  constructor(private readonly prismaService: PrismaService) {}

  private userServiceBaseUrl = process.env.USER_SERVICE;
  private steApplicationId = process.env.APPLICATION_ID;

  async authenticate(username: string, password: string) {
    let response;
    try {
      response = await axios.post(`${this.userServiceBaseUrl}/api/login`, {
        password: password,
        loginId: username,
        applicationId: this.steApplicationId,
      });
      if (response.data.responseCode === 'FAILURE') {
        return {
          status: 'failure',
          message: response.data.params.err,
        };
      }
      const token = response.data.result.data.user.token;
      return {
        status: 'success',
        message: 'Authenticated',
        token: token,
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async saveSchemeTransaction(
    schemetransactions: SchemeTransactionEvent[],
    userId: string,
  ) {
    let transactionHistoryId;
    let recordsSaved;
    let errors;
    const transactionStartTime = new Date();
    try {
      await this.prismaService.saveSchemeTransaction(
        schemetransactions,
        userId,
      );
      const transactionHistory =
        await this.prismaService.transaction_history_table.create({
          data: {
            requestBody: JSON.parse(JSON.stringify(schemetransactions)),
            errors: [],
            userId,
            transactionStartTime: transactionStartTime,
            transactionEndTime: new Date(),
          },
        });
      transactionHistoryId = transactionHistory.id;
      recordsSaved = schemetransactions.length;
      errors = 0;
    } catch (err) {
      const transactionHistory =
        await this.prismaService.transaction_history_table.create({
          data: {
            requestBody: JSON.parse(JSON.stringify(schemetransactions)),
            containErrors: true,
            errors: [],
            userId,
            transactionStartTime,
            transactionEndTime: new Date(),
          },
        });
      transactionHistoryId = transactionHistory.id;
      recordsSaved = 0;
      errors = schemetransactions.length;
    }
    return {
      transactionId: transactionHistoryId,
      recordsSaved: recordsSaved,
      errors: errors,
    };
  }

  async getProgress(userId: string) {
    const recordCount = await this.prismaService.getRecordCountByDeptUsername(
      userId,
    );
    return { records_saved: recordCount };
  }
}
