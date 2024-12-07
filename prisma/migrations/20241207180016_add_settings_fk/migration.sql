/*
  Warnings:

  - A unique constraint covering the columns `[updatedById]` on the table `Settings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Settings` ADD COLUMN `updatedById` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Settings_updatedById_key` ON `Settings`(`updatedById`);

-- AddForeignKey
ALTER TABLE `Settings` ADD CONSTRAINT `Settings_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
