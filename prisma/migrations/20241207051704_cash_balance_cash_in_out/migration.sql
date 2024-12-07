/*
  Warnings:

  - You are about to drop the column `date` on the `CashOut` table. All the data in the column will be lost.
  - Added the required column `cashBalanceId` to the `CashIn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cashBalanceId` to the `CashOut` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CashIn` ADD COLUMN `cashBalanceId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `CashOut` DROP COLUMN `date`,
    ADD COLUMN `cashBalanceId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `CashOut` ADD CONSTRAINT `CashOut_cashBalanceId_fkey` FOREIGN KEY (`cashBalanceId`) REFERENCES `CashBalance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CashIn` ADD CONSTRAINT `CashIn_cashBalanceId_fkey` FOREIGN KEY (`cashBalanceId`) REFERENCES `CashBalance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
