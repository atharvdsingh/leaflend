-- CreateEnum
CREATE TYPE "statusType" AS ENUM ('AVAILABLE', 'GIVEN');

-- AlterTable
ALTER TABLE "booksHave" ADD COLUMN     "status" "statusType" NOT NULL DEFAULT 'AVAILABLE';
