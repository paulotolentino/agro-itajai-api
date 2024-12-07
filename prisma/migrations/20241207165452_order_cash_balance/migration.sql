/*
  Warnings:

  - Added the required column `cashBalanceId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `cashBalanceId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_cashBalanceId_fkey` FOREIGN KEY (`cashBalanceId`) REFERENCES `CashBalance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
