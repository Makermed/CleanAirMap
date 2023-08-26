-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("locationId") ON DELETE RESTRICT ON UPDATE CASCADE;
