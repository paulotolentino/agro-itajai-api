/*
  Warnings:

  - You are about to drop the column `email` on the `Store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Store` DROP COLUMN `email`,
    MODIFY `address` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL;
