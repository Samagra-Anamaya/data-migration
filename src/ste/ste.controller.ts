import { Body, Controller, Post } from '@nestjs/common';
import { SteService } from './ste.service';
import { SchemeTransactionDto } from './dto/scheme.transaction.dto';

@Controller('ste')
export class SteController {
  constructor(private readonly steService: SteService) {}

  @Post('/saveSchemeTransaction')
  saveSchemeTransaction(
    @Body() schemeTransactionDetail: SchemeTransactionDto[],
  ) {
    console.log(schemeTransactionDetail);
    return this.steService.saveSchemeTransaction(schemeTransactionDetail);
  }
}
