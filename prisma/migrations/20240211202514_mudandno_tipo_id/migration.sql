/*
  Warnings:

  - The primary key for the `ItemQuestionario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Questionario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ItemQuestionario" DROP CONSTRAINT "ItemQuestionario_questionarioId_fkey";

-- AlterTable
ALTER TABLE "ItemQuestionario" DROP CONSTRAINT "ItemQuestionario_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "questionarioId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ItemQuestionario_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ItemQuestionario_id_seq";

-- AlterTable
ALTER TABLE "Questionario" DROP CONSTRAINT "Questionario_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Questionario_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Questionario_id_seq";

-- AddForeignKey
ALTER TABLE "ItemQuestionario" ADD CONSTRAINT "ItemQuestionario_questionarioId_fkey" FOREIGN KEY ("questionarioId") REFERENCES "Questionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
