-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "personsServed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "wastedPersons" INTEGER NOT NULL DEFAULT 0;
