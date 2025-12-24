/*
  Warnings:

  - A unique constraint covering the columns `[bookId,requesterId]` on the table `RentalRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "borrows" ALTER COLUMN "dueDate" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RentalRequest_bookId_requesterId_key" ON "RentalRequest"("bookId", "requesterId");
