-- CreateEnum
CREATE TYPE "BookType" AS ENUM ('AllGenres', 'Fiction', 'Classic', 'Contemporary', 'Mystery', 'Sci_Fi', 'Fantasy', 'Non_Fiction');

-- AlterTable
ALTER TABLE "booksHave" ADD COLUMN     "bookType" "BookType" NOT NULL DEFAULT 'AllGenres';
