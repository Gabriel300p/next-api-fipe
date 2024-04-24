import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const requestData = await req.json();

    const questionario = await db.questionario.create({
      data: {
        latitude: requestData.latitude,
        longitude: requestData.longitude,
        local: requestData.local,
        obra: requestData.obra,
        opcao: requestData.opcao,
        titulo: requestData.titulo,
        profileId: requestData.profileId,
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
