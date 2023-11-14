import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SteService } from './ste.service';

@Module({
  imports: [PrismaModule],
  exports: [SteService],
  providers: [SteService],
})
export class SteModule {}
