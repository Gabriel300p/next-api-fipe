import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const { obra } = await req.json();

  console.log(obra, "Obra");

  if (!obra) {
    return new Response("O nome da obra não foi encontrado.", { status: 400 });
  }
  try {
    const pergunta = await db.pergunta.findMany({
      where: {
        obra: obra,
      },
      select: {
        id: true,
        pergunta: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    return new Response(JSON.stringify(pergunta), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
  }
}
