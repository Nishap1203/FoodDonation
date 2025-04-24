/*
  Warnings:

  - You are about to drop the column `foodName` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Donation` table. All the data in the column will be lost.
  - Added the required column `description` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiryDate` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodType` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "foodName",
DROP COLUMN "quantity",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "expiryDate" TEXT NOT NULL,
ADD COLUMN     "foodType" TEXT NOT NULL;
