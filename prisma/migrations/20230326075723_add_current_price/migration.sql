/*
  Warnings:

  - Added the required column `currentPrice` to the `transaction_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction_products" ADD COLUMN     "currentPrice" INTEGER NOT NULL;
