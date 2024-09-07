-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "refreshtoken" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);
