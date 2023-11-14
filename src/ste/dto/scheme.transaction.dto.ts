import { JsonArray } from '@prisma/client/runtime/library';

export class SchemeTransactionDto {
  schemeCode: string;
  uniqueBeneficiaryId: string;
  finalcialYear: string;
  aadhaarNumber: string;
  transactionAmount: number;
  inKindBenefitDetail: string;
  transactionData: string;
  remarks: string;
  familyIdFound: number;
  familyIdNotFound: number;
  deptartmentSpecificData: JsonArray;
}
