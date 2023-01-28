-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'BRL', 'EUR');

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'USD';
