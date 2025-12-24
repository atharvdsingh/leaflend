/*
  Warnings:

  - The values [EXPIRE] on the enum `rentalRequestEnum` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `RequestMessage` on the `RentalRequest` table. All the data in the column will be lost.
  - You are about to drop the column `bookOwnerId` on the `RentalRequest` table. All the data in the column will be lost.
  - You are about to drop the column `rentalId` on the `RentalRequest` table. All the data in the column will be lost.
  - The `status` column on the `booksHave` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Booksgiven` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BorrowsBooks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookId` to the `RentalRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `RentalRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesterId` to the `RentalRequest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'BORROWED');

-- CreateEnum
CREATE TYPE "BorrowStatus" AS ENUM ('ACTIVE', 'RETURNED', 'OVERDUE');

-- AlterEnum
BEGIN;
CREATE TYPE "rentalRequestEnum_new" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED');
ALTER TABLE "public"."RentalRequest" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "RentalRequest" ALTER COLUMN "status" TYPE "rentalRequestEnum_new" USING ("status"::text::"rentalRequestEnum_new");
ALTER TYPE "rentalRequestEnum" RENAME TO "rentalRequestEnum_old";
ALTER TYPE "rentalRequestEnum_new" RENAME TO "rentalRequestEnum";
DROP TYPE "public"."rentalRequestEnum_old";
ALTER TABLE "RentalRequest" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Booksgiven" DROP CONSTRAINT "Booksgiven_givenTo_fkey";

-- DropForeignKey
ALTER TABLE "public"."BorrowsBooks" DROP CONSTRAINT "BorrowsBooks_borrowFrom_fkey";

-- DropForeignKey
ALTER TABLE "public"."RentalRequest" DROP CONSTRAINT "RentalRequest_bookOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RentalRequest" DROP CONSTRAINT "RentalRequest_rentalId_fkey";

-- AlterTable
ALTER TABLE "RentalRequest" DROP COLUMN "RequestMessage",
DROP COLUMN "bookOwnerId",
DROP COLUMN "rentalId",
ADD COLUMN     "bookId" INTEGER NOT NULL,
ADD COLUMN     "ownerId" INTEGER NOT NULL,
ADD COLUMN     "requestMessage" TEXT,
ADD COLUMN     "requesterId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "booksHave" DROP COLUMN "status",
ADD COLUMN     "status" "BookStatus" NOT NULL DEFAULT 'AVAILABLE';

-- DropTable
DROP TABLE "public"."Booksgiven";

-- DropTable
DROP TABLE "public"."BorrowsBooks";

-- DropEnum
DROP TYPE "public"."statusType";

-- CreateTable
CREATE TABLE "borrows" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "borrowerId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3),
    "status" "BorrowStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "borrows_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RentalRequest" ADD CONSTRAINT "RentalRequest_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "booksHave"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalRequest" ADD CONSTRAINT "RentalRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalRequest" ADD CONSTRAINT "RentalRequest_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrows" ADD CONSTRAINT "borrows_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "booksHave"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrows" ADD CONSTRAINT "borrows_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrows" ADD CONSTRAINT "borrows_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
