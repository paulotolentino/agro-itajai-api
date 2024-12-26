/*
  Warnings:

  - Made the column `unitCost` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `OrderItem` MODIFY `unitCost` DOUBLE NOT NULL;
