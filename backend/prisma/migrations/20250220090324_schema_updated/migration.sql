/*
  Warnings:

  - You are about to drop the column `donationId` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Request` table. All the data in the column will be lost.
  - Added the required column `foodName` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ngoId` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_userId_fkey";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "donationId",
DROP COLUMN "userId",
ADD COLUMN     "foodName" TEXT NOT NULL,
ADD COLUMN     "ngoId" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_ngoId_fkey" FOREIGN KEY ("ngoId") REFERENCES "NGO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
