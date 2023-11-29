import { JsonArray } from '@prisma/client/runtime/library';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class SchemeTransaction {
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

  @IsString()
  remarks: string;

  @IsNotEmpty()
  departmentData: JsonArray = [];
}

export class SchemeTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  batch_number: number;

  @IsNotEmpty()
  @IsNumber()
  batch_size: number;

  @IsNotEmpty()
  @IsNumber()
  total_records: number;

  @IsNotEmpty()
  transactions: SchemeTransaction[];
}
