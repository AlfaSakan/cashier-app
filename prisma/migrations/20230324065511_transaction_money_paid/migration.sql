/*
  Warnings:

  - Added the required column `moneyPaid` to the `transaction_histories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction_histories" ADD COLUMN     "moneyPaid" INTEGER NOT NULL;
