import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SteService {
  constructor(private readonly prismaService: PrismaService) {}

  async saveSchemeTransaction() {
    return 'hehe';
  }
}
