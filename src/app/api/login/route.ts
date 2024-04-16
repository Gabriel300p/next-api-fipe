import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { z } from "zod";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const user = await db.profile.findFirst({
      where: {
        email: email,
      },
    });

    const username = user?.name;

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    if (password !== user.password) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
      });
    }

    const token = await bcrypt.hash(email, 10);

    return new Response(JSON.stringify({ token, username }), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
  }
}
