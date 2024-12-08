/*
  Warnings:

  - Added the required column `unitPrice` to the `StockEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `StockEntry` ADD COLUMN `unitPrice` DOUBLE NOT NULL;
