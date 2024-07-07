/*
  Warnings:

  - You are about to drop the column `employerId` on the `job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "job" DROP CONSTRAINT "job_employerId_fkey";

-- AlterTable
ALTER TABLE "job" DROP COLUMN "employerId";
