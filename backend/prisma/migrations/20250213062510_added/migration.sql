-- CreateTable
CREATE TABLE "PendingUsers" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PendingUsers_email_key" ON "PendingUsers"("email");
