import { JsonArray } from '@prisma/client/runtime/library';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class SchemeTransactionEvent {
  @IsNotEmpty()
  @IsString()
  schemeCode: string;

  @IsNotEmpty()
  @IsNumberString()
  aadhaarNumber: string;

  @IsNotEmpty()
  @IsNumberString()
  aadhaarReferenceNumber: string;

  @IsNotEmpty()
  @IsString()
  uniqueBeneficiaryId: string;

  @IsNotEmpty()
  @IsString()
  financialYear: string;

  @IsNotEmpty()
  @IsString()
  transactionType: string;

  @IsNotEmpty()
  @IsNumber()
  transactionAmount: number;

  @IsNotEmpty()
  @IsString()
  inKindBenefitDetail: string;

  @IsNotEmpty()
  @IsString()
  transactionDate: string;

  @IsOptional()
  @IsString()
  remarks: string;

  @IsNotEmpty()
  departmentData: JsonArray = [];
}
