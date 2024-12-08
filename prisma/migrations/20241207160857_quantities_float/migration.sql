/*
  Warnings:

  - You are about to alter the column `quantity` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `stock` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `quantity` on the `StockEntry` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `unitPrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrderItem` ADD COLUMN `unitPrice` DOUBLE NOT NULL,
    MODIFY `quantity` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `stock` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `StockEntry` MODIFY `quantity` DOUBLE NOT NULL;
