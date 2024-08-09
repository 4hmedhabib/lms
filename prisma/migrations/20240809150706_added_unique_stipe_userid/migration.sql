/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `StripeCustomer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StripeCustomer_userId_key" ON "StripeCustomer"("userId");
