import bcrypt from "bcryptjs";
import { signAdminToken } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return Response.json({ error: "E-Mail und Passwort erforderlich" }, { status: 400 });
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) {
    return Response.json({ error: "Ungültige Anmeldedaten" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return Response.json({ error: "Ungültige Anmeldedaten" }, { status: 401 });
  }

  const token = await signAdminToken();

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `admin_token=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=28800`,
    },
  });
}
