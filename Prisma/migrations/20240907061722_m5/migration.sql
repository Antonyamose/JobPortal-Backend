/*
  Warnings:

  - Changed the type of `user_id` on the `Token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Token" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Joblist" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "skills" TEXT[],
    "url" TEXT NOT NULL,

    CONSTRAINT "Joblist_pkey" PRIMARY KEY ("id")
);
