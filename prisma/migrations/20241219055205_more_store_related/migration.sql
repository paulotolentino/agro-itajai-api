/*
  Warnings:

  - Added the required column `storeId` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `DebitPayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Brand` ADD COLUMN `storeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `storeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `storeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `DebitPayment` ADD COLUMN `storeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Brand` ADD CONSTRAINT `Brand_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DebitPayment` ADD CONSTRAINT `DebitPayment_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
