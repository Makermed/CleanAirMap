/*
  Warnings:

  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey";
ALTER TABLE "Location" RENAME COLUMN "id" to "locationId";
ALTER TABLE "Location" ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("locationId");
