import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const user = await db.user.findFirst({
    where: {
      email: body.email,
    },
  });
  return new Response(JSON.stringify(user), { status: 200 });
}
