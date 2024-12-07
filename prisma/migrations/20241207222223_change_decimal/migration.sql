-- AlterTable
ALTER TABLE `CashBalance` MODIFY `amount` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `CashIn` MODIFY `amount` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `CashOut` MODIFY `amount` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `DebitPayment` MODIFY `amount` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `Order` MODIFY `total` DECIMAL(10, 2) NOT NULL,
    MODIFY `discount` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `OrderItem` MODIFY `unitPrice` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `price` DECIMAL(10, 2) NOT NULL,
    MODIFY `averageCost` DECIMAL(10, 2) NOT NULL,
    MODIFY `averagePrice` DECIMAL(10, 2) NOT NULL,
    MODIFY `cost` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `ProductPriceHistory` MODIFY `oldPrice` DECIMAL(10, 2) NOT NULL,
    MODIFY `newPrice` DECIMAL(10, 2) NOT NULL,
    MODIFY `newCost` DECIMAL(10, 2) NOT NULL,
    MODIFY `oldCost` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `StockEntry` MODIFY `unitCost` DECIMAL(10, 2) NOT NULL,
    MODIFY `totalCost` DECIMAL(10, 2) NOT NULL,
    MODIFY `unitPrice` DECIMAL(10, 2) NOT NULL;
