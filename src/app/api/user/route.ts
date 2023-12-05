import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string(),
  });

  const { name, email } = bodySchema.parse(req.body);

  try {
    const user = await db.user.create({
      data: {
        name,
        email,
      },
    });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
  }
}
