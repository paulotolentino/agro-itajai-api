/*
  Warnings:

  - Added the required column `averagePrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newCost` to the `ProductPriceHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldCost` to the `ProductPriceHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `averagePrice` DOUBLE NOT NULL,
    ADD COLUMN `cost` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `ProductPriceHistory` ADD COLUMN `newCost` DOUBLE NOT NULL,
    ADD COLUMN `oldCost` DOUBLE NOT NULL;
