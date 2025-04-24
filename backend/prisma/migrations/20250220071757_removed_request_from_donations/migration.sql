/*
  Warnings:

  - You are about to drop the column `contact` on the `NGO` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_donationId_fkey";

-- AlterTable
ALTER TABLE "NGO" DROP COLUMN "contact";
