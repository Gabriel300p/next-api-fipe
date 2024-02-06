-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pergunta" (
    "id" TEXT NOT NULL,
    "concessionaria" TEXT NOT NULL,
    "tipodeObra" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "elementoFisico" TEXT NOT NULL,
    "unidadeMedida" TEXT NOT NULL,
    "pergunta" TEXT NOT NULL,

    CONSTRAINT "Pergunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questionario" (
    "id" SERIAL NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Questionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemQuestionario" (
    "id" SERIAL NOT NULL,
    "resposta" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "observacao" TEXT,
    "questionarioId" INTEGER NOT NULL,
    "perguntaId" TEXT NOT NULL,

    CONSTRAINT "ItemQuestionario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Questionario" ADD CONSTRAINT "Questionario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemQuestionario" ADD CONSTRAINT "ItemQuestionario_questionarioId_fkey" FOREIGN KEY ("questionarioId") REFERENCES "Questionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemQuestionario" ADD CONSTRAINT "ItemQuestionario_perguntaId_fkey" FOREIGN KEY ("perguntaId") REFERENCES "Pergunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
