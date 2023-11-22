import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SchemeTransactionDto } from './dto/scheme.transaction.dto';

@Injectable()
export class SteService {
  constructor(private readonly prismaService: PrismaService) {}

  async saveSchemeTransaction(schemetransactions: SchemeTransactionDto[]) {
    await this.prismaService.saveSchemeTransaction(schemetransactions);
    return 'Record Saved';
  }
}
