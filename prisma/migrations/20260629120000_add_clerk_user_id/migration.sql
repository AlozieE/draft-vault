-- AlterTable
ALTER TABLE "User" ADD COLUMN "clerkUserId" TEXT;

-- Existing rows cannot be mapped to Clerk users; clear ownership for a clean auth cutover.
UPDATE "Document" SET "ownerId" = NULL;
DELETE FROM "User";

ALTER TABLE "User" ALTER COLUMN "clerkUserId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");
