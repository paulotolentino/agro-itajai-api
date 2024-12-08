/*
  Warnings:

  - You are about to alter the column `amount` on the `CashBalance` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `amount` on the `CashIn` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `amount` on the `CashOut` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `amount` on the `DebitPayment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `total` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `discount` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `unitPrice` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `averageCost` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `averagePrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `cost` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `oldPrice` on the `ProductPriceHistory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `newPrice` on the `ProductPriceHistory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `newCost` on the `ProductPriceHistory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `oldCost` on the `ProductPriceHistory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `unitCost` on the `StockEntry` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `totalCost` on the `StockEntry` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `unitPrice` on the `StockEntry` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.

*/
-- AlterTable
ALTER TABLE `CashBalance` MODIFY `amount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `CashIn` MODIFY `amount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `CashOut` MODIFY `amount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `DebitPayment` MODIFY `amount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Order` MODIFY `total` DOUBLE NOT NULL,
    MODIFY `discount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `OrderItem` MODIFY `unitPrice` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `price` DOUBLE NOT NULL,
    MODIFY `averageCost` DOUBLE NOT NULL,
    MODIFY `averagePrice` DOUBLE NOT NULL,
    MODIFY `cost` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `ProductPriceHistory` MODIFY `oldPrice` DOUBLE NOT NULL,
    MODIFY `newPrice` DOUBLE NOT NULL,
    MODIFY `newCost` DOUBLE NOT NULL,
    MODIFY `oldCost` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `StockEntry` MODIFY `unitCost` DOUBLE NOT NULL,
    MODIFY `totalCost` DOUBLE NOT NULL,
    MODIFY `unitPrice` DOUBLE NOT NULL;
