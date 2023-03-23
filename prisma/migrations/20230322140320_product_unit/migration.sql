/*
  Warnings:

  - Added the required column `unit` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "unit" VARCHAR(20) NOT NULL;
