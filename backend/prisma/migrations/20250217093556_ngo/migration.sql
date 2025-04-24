/*
  Warnings:

  - Added the required column `foodRequired` to the `NGO` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NGO" ADD COLUMN     "foodRequired" TEXT NOT NULL;
