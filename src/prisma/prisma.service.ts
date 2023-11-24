import { Injectable } from '@nestjs/common';
import { PrismaClient, Status } from '@prisma/client';
import { SchemeTransactionDto } from 'src/ste/dto/scheme.transaction.dto';

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
        beneficiarySpouseName: beneficiary.beneficiarySpouseName
          ? beneficiary.beneficiarySpouseName
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
        educationalQualification: beneficiary.educationalQualification
          ? beneficiary.educationalQualification
          : '',
        spdpMemberId: beneficiary.spdpMemberId ? beneficiary.spdpMemberId : '',
        numberOfMemberInFamily: beneficiary.numberOfMemberInFamily
          ? beneficiary.numberOfMemberInFamily
          : '',
        rationCardNumber: beneficiary.rationCardNumber
          ? beneficiary.rationCardNumber
          : '',
        primarySourceOfLivelihood: beneficiary.primarySourceOfLivelihood
          ? beneficiary.primarySourceOfLivelihood
          : '',
        spdpFamilyId: beneficiary.spdpFamilyId ? beneficiary.spdpFamilyId : '',
      };
    });
    return record;
  }

  async saveBeneficiaryDetails(beneficiaryDetails: any[]) {
    const record = await this.createRecord(beneficiaryDetails);
    return await this.beneficiary_detail.createMany({
      data: record,
    });
  }

  async saveSchemeTransaction(schemeTransactions: SchemeTransactionDto[]) {
    await this.scheme_transaction.createMany({
      data: schemeTransactions,
    });
  }

  async getLatestBatch(distLGDCode: string) {
    return await this.data_migration_status.findMany({
      where: {
        district_code: distLGDCode,
      },
      orderBy: {
        batch_no: 'desc',
      },
      take: 1,
    });
  }

  async dataFetchStarted(
    districtLGDCode: string,
    batch_no: string,
    total_batch: string,
  ) {
    await this.data_migration_status.upsert({
      where: {
        district_code_batch_no: {
          district_code: districtLGDCode,
          batch_no: batch_no,
        },
      },
      update: {
        total_batch: total_batch,
        status: Status.STARTED,
      },
      create: {
        district_code: districtLGDCode,
        batch_no: batch_no,
        total_batch: total_batch,
        status: Status.STARTED,
      },
    });
  }

  async dataPulled(
    districtLGDCode: string,
    batch_no: string,
    total_batch: string,
  ) {
    await this.data_migration_status.upsert({
      where: {
        district_code_batch_no: {
          district_code: districtLGDCode,
          batch_no: batch_no,
        },
      },
      update: {
        total_batch: total_batch,
        status: Status.PULLED,
      },
      create: {
        district_code: districtLGDCode,
        batch_no: batch_no,
        total_batch: total_batch,
        status: Status.PULLED,
      },
    });
  }

  async dataSavedInDatabase(
    districtLGDCode: string,
    batch_no: string,
    total_batch: string,
  ) {
    await this.data_migration_status.update({
      where: {
        district_code_batch_no: {
          district_code: districtLGDCode,
          batch_no: batch_no,
        },
      },
      data: {
        total_batch: total_batch,
        status: Status.SAVED_IN_DATABASE,
      },
    });
  }

  async dataSavedInFile(
    districtLGDCode: string,
    batch_no: string,
    total_batch: string,
  ) {
    await this.data_migration_status.update({
      where: {
        district_code_batch_no: {
          district_code: districtLGDCode,
          batch_no: batch_no,
        },
      },
      data: {
        total_batch: total_batch,
        status: Status.SAVED_IN_FILE,
      },
    });
  }

  async dataPullFailed(
    districtLGDCode: string,
    batch_no: string,
    total_batch: string,
  ) {
    await this.data_migration_status.update({
      where: {
        district_code_batch_no: {
          district_code: districtLGDCode,
          batch_no: batch_no,
        },
      },
      data: {
        total_batch: total_batch,
        status: Status.FAILED_DURING_PULL,
      },
    });
  }

  async dataSaveFailed(
    districtLGDCode: string,
    batch_no: string,
    total_batch: string,
  ) {
    await this.data_migration_status.update({
      where: {
        district_code_batch_no: {
          district_code: districtLGDCode,
          batch_no: batch_no,
        },
      },
      data: {
        total_batch: total_batch,
        status: Status.FAILED_DURING_SAVE,
      },
    });
  }
}
