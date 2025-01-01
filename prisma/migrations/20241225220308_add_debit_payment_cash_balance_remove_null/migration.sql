/*
  Warnings:

  - Made the column `cashBalanceId` on table `DebitPayment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `DebitPayment` DROP FOREIGN KEY `DebitPayment_cashBalanceId_fkey`;

-- DropIndex
DROP INDEX `DebitPayment_cashBalanceId_fkey` ON `DebitPayment`;

-- AlterTable
ALTER TABLE `DebitPayment` MODIFY `cashBalanceId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `DebitPayment` ADD CONSTRAINT `DebitPayment_cashBalanceId_fkey` FOREIGN KEY (`cashBalanceId`) REFERENCES `CashBalance`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
