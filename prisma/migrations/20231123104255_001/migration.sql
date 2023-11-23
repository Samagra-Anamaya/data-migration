-- CreateTable
CREATE TABLE "BeneficiaryDetails" (
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

    CONSTRAINT "BeneficiaryDetails_pkey" PRIMARY KEY ("aadhaarVaultReference")
);

-- CreateTable
CREATE TABLE "SchemeTransaction" (
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

    CONSTRAINT "SchemeTransaction_pkey" PRIMARY KEY ("id")
);
