import { JsonArray } from '@prisma/client/runtime/library';

export class SchemeTransactionDto {
  schemeCode: string;
  aadhaarNumber: string;
  aadhaarReferenceNumber: string;
  uniqueBeneficiaryId: string;
  financialYear: string;
  transactionType: string;
  transactionAmount: number;
  inKindBenefitDetail: string;
  transactionDate: string;
  remarks: string;
  departmentData: JsonArray;
}
