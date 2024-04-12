/*
  Warnings:

  - You are about to drop the column `concessionaria` on the `Pergunta` table. All the data in the column will be lost.
  - You are about to drop the column `elementoFisico` on the `Pergunta` table. All the data in the column will be lost.
  - You are about to drop the column `local` on the `Pergunta` table. All the data in the column will be lost.
  - You are about to drop the column `tipodeObra` on the `Pergunta` table. All the data in the column will be lost.
  - You are about to drop the column `unidadeMedida` on the `Pergunta` table. All the data in the column will be lost.
  - Added the required column `obra` to the `Pergunta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `local` to the `Questionario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `obra` to the `Questionario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opcao` to the `Questionario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Questionario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemQuestionario" ALTER COLUMN "resposta" DROP NOT NULL,
ALTER COLUMN "imagem" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Pergunta" DROP COLUMN "concessionaria",
DROP COLUMN "elementoFisico",
DROP COLUMN "local",
DROP COLUMN "tipodeObra",
DROP COLUMN "unidadeMedida",
ADD COLUMN     "obra" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Questionario" ADD COLUMN     "local" TEXT NOT NULL,
ADD COLUMN     "obra" TEXT NOT NULL,
ADD COLUMN     "opcao" TEXT NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL;
