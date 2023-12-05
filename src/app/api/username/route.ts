import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: Request) {
  const bodySchema = z.object({
    email: z.string(),
  });

  const { email } = bodySchema.parse(req.json);

  try {
    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
  }
}
