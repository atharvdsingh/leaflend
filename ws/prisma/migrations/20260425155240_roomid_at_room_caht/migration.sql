/*
  Warnings:

  - Added the required column `roomId` to the `groupChat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "groupChat" ADD COLUMN     "roomId" TEXT NOT NULL;
