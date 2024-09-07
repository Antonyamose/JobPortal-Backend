-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Job_user_id_key" ON "Job"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Job_email_key" ON "Job"("email");
