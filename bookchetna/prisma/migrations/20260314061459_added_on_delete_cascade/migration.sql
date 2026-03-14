-- DropForeignKey
ALTER TABLE "public"."RoomMembership" DROP CONSTRAINT "RoomMembership_roomId_fkey";

-- DropForeignKey
ALTER TABLE "public"."roomAndBook" DROP CONSTRAINT "roomAndBook_roomId_fkey";

-- AddForeignKey
ALTER TABLE "RoomMembership" ADD CONSTRAINT "RoomMembership_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roomAndBook" ADD CONSTRAINT "roomAndBook_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
