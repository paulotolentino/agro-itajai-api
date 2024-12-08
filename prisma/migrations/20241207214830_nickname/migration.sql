/*
  Warnings:

  - You are about to drop the column `apelido` on the `Customer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Brand` DROP FOREIGN KEY `Brand_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `CashBalance` DROP FOREIGN KEY `CashBalance_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `CashIn` DROP FOREIGN KEY `CashIn_cashBalanceId_fkey`;

-- DropForeignKey
ALTER TABLE `CashIn` DROP FOREIGN KEY `CashIn_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `CashOut` DROP FOREIGN KEY `CashOut_cashBalanceId_fkey`;

-- DropForeignKey
ALTER TABLE `CashOut` DROP FOREIGN KEY `CashOut_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `Customer` DROP FOREIGN KEY `Customer_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `DebitPayment` DROP FOREIGN KEY `DebitPayment_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `DebitPayment` DROP FOREIGN KEY `DebitPayment_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_paymentTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_statusId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `ProductPriceHistory` DROP FOREIGN KEY `ProductPriceHistory_productId_fkey`;

-- DropForeignKey
ALTER TABLE `StockEntry` DROP FOREIGN KEY `StockEntry_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `StockEntry` DROP FOREIGN KEY `StockEntry_productId_fkey`;

-- AlterTable
ALTER TABLE `Brand` MODIFY `createdById` INTEGER NULL;

-- AlterTable
ALTER TABLE `CashBalance` MODIFY `createdById` INTEGER NULL;

-- AlterTable
ALTER TABLE `CashIn` MODIFY `createdById` INTEGER NULL;

-- AlterTable
ALTER TABLE `CashOut` MODIFY `createdById` INTEGER NULL;

-- AlterTable
ALTER TABLE `Category` MODIFY `createdById` INTEGER NULL;

-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `apelido`,
    ADD COLUMN `nickname` VARCHAR(191) NULL,
    MODIFY `createdById` INTEGER NULL;

-- AlterTable
ALTER TABLE `DebitPayment` MODIFY `createdById` INTEGER NULL;

-- AlterTable
ALTER TABLE `Order` MODIFY `paymentTypeId` INTEGER NULL,
    MODIFY `statusId` INTEGER NULL,
    MODIFY `createdById` INTEGER NULL;

-- AlterTable
ALTER TABLE `OrderItem` MODIFY `productId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `createdById` INTEGER NULL,
    MODIFY `categoryId` INTEGER NULL;

-- AlterTable
ALTER TABLE `StockEntry` MODIFY `createdById` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Brand` ADD CONSTRAINT `Brand_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `OrderStatus`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_paymentTypeId_fkey` FOREIGN KEY (`paymentTypeId`) REFERENCES `PaymentType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DebitPayment` ADD CONSTRAINT `DebitPayment_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DebitPayment` ADD CONSTRAINT `DebitPayment_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CashOut` ADD CONSTRAINT `CashOut_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CashOut` ADD CONSTRAINT `CashOut_cashBalanceId_fkey` FOREIGN KEY (`cashBalanceId`) REFERENCES `CashBalance`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CashIn` ADD CONSTRAINT `CashIn_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CashIn` ADD CONSTRAINT `CashIn_cashBalanceId_fkey` FOREIGN KEY (`cashBalanceId`) REFERENCES `CashBalance`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockEntry` ADD CONSTRAINT `StockEntry_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockEntry` ADD CONSTRAINT `StockEntry_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductPriceHistory` ADD CONSTRAINT `ProductPriceHistory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CashBalance` ADD CONSTRAINT `CashBalance_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
