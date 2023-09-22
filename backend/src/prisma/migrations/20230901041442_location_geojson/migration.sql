/*
  Warnings:

  - You are about to drop the column `avgCo2` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `locality` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `place` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `postcode` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Location` table. All the data in the column will be lost.
  - Added the required column `full_address` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `geometry` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "avgCo2",
DROP COLUMN "country",
DROP COLUMN "description",
DROP COLUMN "district",
DROP COLUMN "latitude",
DROP COLUMN "locality",
DROP COLUMN "longitude",
DROP COLUMN "place",
DROP COLUMN "postcode",
DROP COLUMN "region",
DROP COLUMN "street",
DROP COLUMN "type",
ADD COLUMN     "feature_type" TEXT,
ADD COLUMN     "full_address" TEXT NOT NULL,
ADD COLUMN     "geometry" JSONB NOT NULL;
