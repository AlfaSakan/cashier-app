/*
  Warnings:

  - You are about to drop the `transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_productId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_userId_fkey";

-- DropTable
DROP TABLE "transactions";

-- CreateTable
CREATE TABLE "transaction_products" (
    "id" TEXT NOT NULL,
    "productSold" INTEGER NOT NULL,
    "transactionHistoryId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "transaction_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_histories" (
    "id" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "transaction_histories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transaction_products" ADD CONSTRAINT "transaction_products_transactionHistoryId_fkey" FOREIGN KEY ("transactionHistoryId") REFERENCES "transaction_histories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_products" ADD CONSTRAINT "transaction_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_histories" ADD CONSTRAINT "transaction_histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
