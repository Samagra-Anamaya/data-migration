/*
  Warnings:

  - The primary key for the `beneficiary_detail` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "beneficiary_detail" DROP CONSTRAINT "beneficiary_detail_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "beneficiary_detail_pkey" PRIMARY KEY ("id");
