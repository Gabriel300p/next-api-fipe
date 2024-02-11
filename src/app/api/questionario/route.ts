import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const requestData = await req.json();

    const questionario = await db.questionario.create({
      data: {
        latitude: requestData.latitude,
        longitude: requestData.longitude,
        userId: requestData.userId,
        ItemQuestionario: {
          createMany: {
            data: requestData.ItemQuestionario.map((item: any) => ({
              perguntaId: item.perguntaId,
              imagem: item.imagem,
              resposta: item.resposta,
              observacao: item.observacao,
            })),
          },
        },
      },
    });

    console.log(questionario);
    return new Response("Questionário criado", { status: 200 });
  } catch (error) {
    return new Response(
      `Não foi possível criar o questionário ${
        error instanceof z.ZodError ? error.issues : error
      }`,
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const questionario = await db.questionario.findMany({
      select: {
        latitude: true,
        longitude: true,
        dataHora: true,
        user: {
          select: {
            name: true,
          },
        },
        ItemQuestionario: {
          select: {
            resposta: true,
            observacao: true,
            imagem: true,
            Pergunta: {
              select: {
                concessionaria: true,
                tipodeObra: true,
                local: true,
                elementoFisico: true,
                pergunta: true,
                unidadeMedida: true,
              },
            },
          },
        },
      },
    });
    return new Response(JSON.stringify(questionario), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
  }
}
