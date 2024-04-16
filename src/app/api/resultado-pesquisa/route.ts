import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: Request) {
  const { password } = await req.json();
  try {
    if (password !== process.env.GET_SECRET) {
      return new Response("Sem autorização", { status: 401 });
    }

    const questionario = await db.questionario.findMany({
      select: {
        latitude: true,
        longitude: true,
        local: true,
        obra: true,
        opcao: true,
        titulo: true,
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
                obra: true,
                pergunta: true,
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
