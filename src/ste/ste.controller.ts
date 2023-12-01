import {
  Body,
  Controller,
  Get,
  ParseArrayPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SteService } from './ste.service';
import { SchemeTransactionEvent } from './dto/scheme.transaction.dto';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from 'src/common/auth-guard';
import { Public } from 'src/common/public.decorator';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('ste')
export class SteController {
  constructor(private readonly steService: SteService) {}

  @Public()
  @Post('/authenticate')
  async authenticate(@Body() authDto: AuthDto) {
    return await this.steService.authenticate(
      authDto.username,
      authDto.password,
    );
  }

  @Post('/saveSchemeTransaction')
  async saveSchemeTransaction(
    @Body(new ParseArrayPipe({ items: SchemeTransactionEvent }))
    schemeTransactionDetail: SchemeTransactionEvent[],
    @Req() request: Request,
  ) {
    const userIdHeader = request.headers.userId;
    const userId: string = Array.isArray(userIdHeader)
      ? userIdHeader[0]
      : userIdHeader;
    return await this.steService.saveSchemeTransaction(
      schemeTransactionDetail,
      userId,
    );
  }

  @Get('/progress')
  async getProgress(@Req() request: Request) {
    const userIdHeader = request.headers.userId;
    const userId: string = Array.isArray(userIdHeader)
      ? userIdHeader[0]
      : userIdHeader;
    return await this.steService.getProgress(userId);
  }
}
