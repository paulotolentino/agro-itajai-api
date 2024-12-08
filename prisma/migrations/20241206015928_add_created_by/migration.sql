/*
  Warnings:

  - You are about to drop the column `userId` on the `CashIn` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `CashOut` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `DebitPayment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `changedAt` on the `ProductPriceHistory` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `StockEntry` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `CashIn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `CashOut` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `DebitPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `DebitPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ProductPriceHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Refund` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `StockEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StockEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CashIn` DROP FOREIGN KEY `CashIn_userId_fkey`;

-- DropForeignKey
ALTER TABLE `CashOut` DROP FOREIGN KEY `CashOut_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `StockEntry` DROP FOREIGN KEY `StockEntry_userId_fkey`;

-- AlterTable
ALTER TABLE `Brand` ADD COLUMN `createdById` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `CashIn` DROP COLUMN `userId`,
    ADD COLUMN `createdById` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `CashOut` DROP COLUMN `userId`,
    ADD COLUMN `createdById` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `DebitPayment` DROP COLUMN `userId`,
    ADD COLUMN `createdById` INTEGER NOT NULL,
    ADD COLUMN `customerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `userId`,
    ADD COLUMN `createdById` INTEGER NOT NULL,
    ADD COLUMN `customerId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `createdById` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ProductPriceHistory` DROP COLUMN `changedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `createdById` INTEGER NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Refund` ADD COLUMN `createdById` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `StockEntry` DROP COLUMN `userId`,
    ADD COLUMN `createdById` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `observation` VARCHAR(191) NULL,
    `createdById` INTEGER NOT NULL,
    `statusId` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `CustomerStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Brand` ADD CONSTRAINT `Brand_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DebitPayment` ADD CONSTRAINT `DebitPayment_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DebitPayment` ADD CONSTRAINT `DebitPayment_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Refund` ADD CONSTRAINT `Refund_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CashOut` ADD CONSTRAINT `CashOut_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CashIn` ADD CONSTRAINT `CashIn_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockEntry` ADD CONSTRAINT `StockEntry_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductPriceHistory` ADD CONSTRAINT `ProductPriceHistory_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
