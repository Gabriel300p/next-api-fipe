/*
  Warnings:

  - You are about to drop the column `userId` on the `Questionario` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Questionario" DROP CONSTRAINT "Questionario_userId_fkey";

-- AlterTable
ALTER TABLE "Questionario" DROP COLUMN "userId";
