import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async createRecord(beneficiaryDetails: any[]) {
    const record = beneficiaryDetails.map((beneficiary) => {
      return {
        aadhaarVaultReference: beneficiary.aadhaarVaultReference
          ? beneficiary.aadhaarVaultReference
          : '',
        beneficiaryName: beneficiary.beneficiaryName
          ? beneficiary.beneficiaryName
          : '',
        beneficiaryFatherName: beneficiary.beneficiaryFatherName
          ? beneficiary.beneficiaryFatherName
          : '',
        beneficiaryMotherName: beneficiary.beneficiaryMotherName
          ? beneficiary.beneficiaryMotherName
          : '',
        beneficiarySpouceName: beneficiary.beneficiarySpouceName
          ? beneficiary.beneficiarySpouceName
          : '',
        gender: beneficiary.gender ? beneficiary.gender : '',
        dateOfBirth: beneficiary.dateOfBirth ? beneficiary.dateOfBirth : '',
        socialCategory: beneficiary.socialCategory
          ? beneficiary.socialCategory
          : '',
        address: beneficiary.address ? beneficiary.address : '',
        districtName: beneficiary.districtName ? beneficiary.districtName : '',
        districtLGDCode: beneficiary.districtLGDCode
          ? beneficiary.districtLGDCode
          : '',
        blockName: beneficiary.blockName ? beneficiary.blockName : '',
        blockLGDCode: beneficiary.blockLGDCode ? beneficiary.blockLGDCode : '',
        gpName: beneficiary.gpName ? beneficiary.gpName : '',
        gpLGDCode: beneficiary.gpLGDCode ? beneficiary.gpLGDCode : '',
        villageName: beneficiary.villageName ? beneficiary.villageName : '',
        villageLGDCode: beneficiary.villageLGDCode
          ? beneficiary.villageLGDCode
          : '',
        isDisable: beneficiary.isDisable ? beneficiary.isDisable : '',
        maritalStatus: beneficiary.maritalStatus
          ? beneficiary.maritalStatus
          : '',
        educationQualification: beneficiary.educationQualification
          ? beneficiary.educationQualification
          : '',
        spdpMemberId: beneficiary.spdpMemberId ? beneficiary.spdpMemberId : '',
        numberOfMemberInFamily: beneficiary.numberOfMemberInFamily
          ? beneficiary.numberOfMemberInFamily
          : '',
      };
    });
    return record;
  }

  async saveBeneficiaryDetails(beneficiaryDetails: any[]) {
    const record = await this.createRecord(beneficiaryDetails);
    await this.beneficiaryDetails.createMany({
      data: record,
    });
  }
}
