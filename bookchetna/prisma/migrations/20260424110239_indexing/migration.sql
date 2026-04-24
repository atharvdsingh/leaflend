-- CreateIndex
CREATE INDEX "RentalRequest_ownerId_idx" ON "RentalRequest"("ownerId");

-- CreateIndex
CREATE INDEX "RentalRequest_requesterId_idx" ON "RentalRequest"("requesterId");

-- CreateIndex
CREATE INDEX "RoomMembership_roomId_idx" ON "RoomMembership"("roomId");

-- CreateIndex
CREATE INDEX "booksHave_ownerId_idx" ON "booksHave"("ownerId");

-- CreateIndex
CREATE INDEX "borrows_ownerId_idx" ON "borrows"("ownerId");

-- CreateIndex
CREATE INDEX "borrows_borrowerId_idx" ON "borrows"("borrowerId");

-- CreateIndex
CREATE INDEX "room_visibility_idx" ON "room"("visibility");

-- CreateIndex
CREATE INDEX "roomAndBook_roomId_idx" ON "roomAndBook"("roomId");
