/*
  Warnings:

  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Room` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reading" DROP CONSTRAINT "Reading_roomId_fkey";

-- AlterTable
ALTER TABLE "Room" DROP CONSTRAINT "Room_pkey";
ALTER TABLE "Room" RENAME COLUMN "id" to "roomId";
ALTER TABLE "Room" ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("roomId");

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE SET NULL ON UPDATE CASCADE;
