import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SteService } from './ste.service';
import { SchemeTransactionDto } from './dto/scheme.transaction.dto';
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
    @Body() schemeTransactionDetail: SchemeTransactionDto,
    @Req() request: Request,
  ) {
    const usernameHeader = request.headers.username;
    const username: string = Array.isArray(usernameHeader)
      ? usernameHeader[0]
      : usernameHeader;
    return await this.steService.saveSchemeTransaction(
      schemeTransactionDetail,
      username,
    );
  }

  @Get('/progress')
  async getProgress(@Req() request: Request) {
    const usernameHeader = request.headers.username;
    const username: string = Array.isArray(usernameHeader)
      ? usernameHeader[0]
      : usernameHeader;
    return await this.steService.getProgress(username);
  }
}
