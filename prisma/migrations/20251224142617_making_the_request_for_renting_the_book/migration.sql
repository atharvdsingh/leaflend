-- CreateEnum
CREATE TYPE "rentalRequestEnum" AS ENUM ('ACCEPTED', 'REJECTED', 'PENDING', 'EXPIRE');

-- CreateTable
CREATE TABLE "RentalRequest" (
    "id" SERIAL NOT NULL,
    "status" "rentalRequestEnum" NOT NULL DEFAULT 'PENDING',
    "bookOwnerId" INTEGER NOT NULL,
    "RequestMessage" TEXT,
    "rentalId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RentalRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RentalRequest" ADD CONSTRAINT "RentalRequest_bookOwnerId_fkey" FOREIGN KEY ("bookOwnerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalRequest" ADD CONSTRAINT "RentalRequest_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
