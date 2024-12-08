/*
  Warnings:

  - You are about to drop the `Refund` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Refund` DROP FOREIGN KEY `Refund_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `Refund` DROP FOREIGN KEY `Refund_orderId_fkey`;

-- DropTable
DROP TABLE `Refund`;
