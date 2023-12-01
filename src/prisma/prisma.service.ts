import { Injectable } from '@nestjs/common';
import { PrismaClient, Status, data_migration_status } from '@prisma/client';
import { SchemeTransactionEvent } from 'src/ste/dto/scheme.transaction.dto';
import { map } from 'lodash';

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

  async transformSchemeTransaction(
    schemeTransactions: SchemeTransactionEvent[],
    deptUsername: string,
  ): Promise<any[]> {
    return await Promise.all(
      map(schemeTransactions, async (transaction) => {
        return {
          userId: deptUsername,
          ...transaction,
        };
      }),
    );
  }

  async saveSchemeTransaction(
    schemeTransactions: SchemeTransactionEvent[],
    deptUsername: string,
  ) {
    const records = await this.transformSchemeTransaction(
      schemeTransactions,
      deptUsername,
    );
    await this.scheme_transaction.createMany({
      data: records,
    });
  }

  async getRecordCountByDeptUsername(deptUsername: string) {
    return await this.scheme_transaction.count({
      where: {
        userId: deptUsername,
      },
    });
  }

  async getLatestBatch(distLGDCode: string) {
    // return await this.data_migration_status.findMany({
    //   where: {
    //     district_code: distLGDCode,
    //   },
    //   orderBy: {
    //     batch_no: 'desc',
    //   },
    //   take: 1,
    // });
    return await this.$queryRaw<
      data_migration_status[]
    >`SELECT * FROM data_migration_status WHERE district_code=${distLGDCode} ORDER BY CAST(batch_no AS INT) DESC LIMIT 1`;
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
