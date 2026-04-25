/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_senderId_fkey";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "groupChat" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT[],
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "groupChat_pkey" PRIMARY KEY ("id")
);
