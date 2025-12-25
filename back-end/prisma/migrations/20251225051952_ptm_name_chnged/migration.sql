/*
  Warnings:

  - You are about to drop the `PTM` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PTM" DROP CONSTRAINT "PTM_studentId_fkey";

-- DropForeignKey
ALTER TABLE "PTM" DROP CONSTRAINT "PTM_teacherId_fkey";

-- DropTable
DROP TABLE "PTM";

-- CreateTable
CREATE TABLE "Ptm" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Ptm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ptm" ADD CONSTRAINT "Ptm_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ptm" ADD CONSTRAINT "Ptm_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
