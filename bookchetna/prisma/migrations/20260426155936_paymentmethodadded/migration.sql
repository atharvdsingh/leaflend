/*
  Warnings:

  - A unique constraint covering the columns `[razorpayOrderId]` on the table `RentalRequest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[razorpayPaymentId]` on the table `RentalRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "rentalRequestEnum" ADD VALUE 'PAID';

-- AlterTable
ALTER TABLE "RentalRequest" ADD COLUMN     "razorpayOrderId" TEXT,
ADD COLUMN     "razorpayPaymentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "RentalRequest_razorpayOrderId_key" ON "RentalRequest"("razorpayOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "RentalRequest_razorpayPaymentId_key" ON "RentalRequest"("razorpayPaymentId");
