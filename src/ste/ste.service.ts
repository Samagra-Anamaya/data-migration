import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SchemeTransactionDto } from './dto/scheme.transaction.dto';
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
    schemetransactions: SchemeTransactionDto,
    deptUsername: string,
  ) {
    try {
      await this.prismaService.saveSchemeTransaction(
        schemetransactions.transactions,
        deptUsername,
      );
    } catch (err) {
      console.error(
        `Error saving records for batch: ${schemetransactions.batch_number} of dept: ${deptUsername}`,
      );
      return {
        message: `Error saving records for batch: ${schemetransactions.batch_number}`,
      };
    }
    console.log(
      `Success saving records for batch: ${schemetransactions.batch_number} of dept: ${deptUsername}`,
    );
    return {
      message: `Success saving records for batch: ${schemetransactions.batch_number}`,
    };
  }

  async getProgress(deptUsername: string) {
    const recordCount = await this.prismaService.getRecordCountByDeptUsername(
      deptUsername,
    );
    return { records_saved: recordCount };
  }
}
