-- AlterTable
ALTER TABLE `DebitPayment` ADD COLUMN `cashBalanceId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `DebitPayment` ADD CONSTRAINT `DebitPayment_cashBalanceId_fkey` FOREIGN KEY (`cashBalanceId`) REFERENCES `CashBalance`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
