/*
  Warnings:

  - The primary key for the `Reading` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Reading" DROP CONSTRAINT "Reading_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Reading_pkey" PRIMARY KEY ("id");

ALTER SEQUENCE "Room_id_seq" AS BIGINT;
