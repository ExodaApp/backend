/*
  Warnings:

  - You are about to drop the `Exchange` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exchange" DROP CONSTRAINT "Exchange_userAddress_fkey";

-- DropTable
DROP TABLE "Exchange";

-- CreateTable
CREATE TABLE "ExchangeWallet" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userAddress" TEXT NOT NULL,

    CONSTRAINT "ExchangeWallet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExchangeWallet" ADD CONSTRAINT "ExchangeWallet_userAddress_fkey" FOREIGN KEY ("userAddress") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
