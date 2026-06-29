-- AlterTable
ALTER TABLE "WritingEvent" ADD COLUMN     "deletedText" TEXT,
ADD COLUMN     "fullTextSnapshot" TEXT,
ADD COLUMN     "insertedText" TEXT,
ADD COLUMN     "position" INTEGER;
