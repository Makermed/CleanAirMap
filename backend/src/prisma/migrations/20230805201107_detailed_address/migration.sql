/*
  Warnings:

  - Added the required column `country` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "locality" TEXT,
ADD COLUMN     "place" TEXT NOT NULL,
ADD COLUMN     "postcode" TEXT,
ADD COLUMN     "region" TEXT NOT NULL;
