/*
  Warnings:

  - Added the required column `contact` to the `NGO` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NGO" ADD COLUMN     "contact" TEXT NOT NULL;
