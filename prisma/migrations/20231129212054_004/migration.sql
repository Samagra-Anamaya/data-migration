/*
  Warnings:

  - You are about to drop the column `departmentUsername` on the `scheme_transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "scheme_transaction" DROP COLUMN "departmentUsername",
ADD COLUMN     "userId" TEXT NOT NULL DEFAULT '';
