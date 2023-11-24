-- CreateEnum
CREATE TYPE "Status" AS ENUM ('STARTED', 'PULLED', 'SAVED_IN_DATABASE', 'SAVED_IN_FILE', 'FAILED_DURING_PULL', 'FAILED_DURING_SAVE');

-- CreateTable
CREATE TABLE "beneficiary_detail" (
    "aadhaarVaultReference" TEXT NOT NULL,
    "beneficiaryName" TEXT NOT NULL,
    "beneficiaryFatherName" TEXT NOT NULL,
    "beneficiaryMotherName" TEXT NOT NULL,
    "beneficiarySpouseName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "socialCategory" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "districtName" TEXT NOT NULL,
    "districtLGDCode" TEXT NOT NULL,
    "blockName" TEXT NOT NULL,
    "blockLGDCode" TEXT NOT NULL,
    "gpName" TEXT NOT NULL,
    "gpLGDCode" TEXT NOT NULL,
    "villageName" TEXT NOT NULL,
    "villageLGDCode" TEXT NOT NULL,
    "isDisable" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "educationalQualification" TEXT NOT NULL,
    "spdpMemberId" TEXT NOT NULL,
    "numberOfMemberInFamily" TEXT NOT NULL,
    "rationCardNumber" TEXT NOT NULL,
    "primarySourceOfLivelihood" TEXT NOT NULL,
    "spdpFamilyId" TEXT NOT NULL,

    CONSTRAINT "beneficiary_detail_pkey" PRIMARY KEY ("aadhaarVaultReference")
);

-- CreateTable
CREATE TABLE "scheme_transaction" (
    "id" SERIAL NOT NULL,
    "schemeCode" TEXT NOT NULL,
    "aadhaarNumber" TEXT NOT NULL,
    "aadhaarReferenceNumber" TEXT NOT NULL,
    "uniqueBeneficiaryId" TEXT NOT NULL,
    "financialYear" TEXT NOT NULL,
    "transactionType" TEXT NOT NULL,
    "transactionAmount" INTEGER NOT NULL,
    "inKindBenefitDetail" TEXT NOT NULL,
    "transactionDate" TEXT NOT NULL,
    "remarks" TEXT,
    "departmentData" JSONB,

    CONSTRAINT "scheme_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_migration_status" (
    "id" SERIAL NOT NULL,
    "district_code" TEXT NOT NULL,
    "batch_no" TEXT NOT NULL,
    "total_batch" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "data_migration_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "data_migration_status_district_code_batch_no_key" ON "data_migration_status"("district_code", "batch_no");
