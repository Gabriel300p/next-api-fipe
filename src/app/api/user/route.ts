import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const user = await db.user.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
  }
}
