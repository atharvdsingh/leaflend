-- CreateTable
CREATE TABLE "Booksgiven" (
    "id" SERIAL NOT NULL,
    "booksName" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "givenDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "givenTo" INTEGER NOT NULL,

    CONSTRAINT "Booksgiven_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowsBooks" (
    "id" SERIAL NOT NULL,
    "booksName" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "borrowDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "borrowFrom" INTEGER NOT NULL,

    CONSTRAINT "BorrowsBooks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booksgiven" ADD CONSTRAINT "Booksgiven_givenTo_fkey" FOREIGN KEY ("givenTo") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowsBooks" ADD CONSTRAINT "BorrowsBooks_borrowFrom_fkey" FOREIGN KEY ("borrowFrom") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
