-- CreateTable
CREATE TABLE "BeneficiaryDetails" (
    "id" SERIAL NOT NULL,
    "aadhaarVaultReference" TEXT NOT NULL,
    "beneficiaryName" TEXT NOT NULL,
    "beneficiaryFatherName" TEXT NOT NULL,
    "beneficiaryMotherName" TEXT NOT NULL,
    "beneficiarySpouceName" TEXT NOT NULL,
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
    "educationQualification" TEXT NOT NULL,
    "spdpMemberId" TEXT NOT NULL,
    "numberOfMemberInFamily" TEXT NOT NULL,

    CONSTRAINT "BeneficiaryDetails_pkey" PRIMARY KEY ("id")
);
