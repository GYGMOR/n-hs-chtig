import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { token, password } = await req.json();
  if (!token || !password) return Response.json({ error: "Ungültige Anfrage" }, { status: 400 });
  if (password.length < 8) return Response.json({ error: "Passwort muss mindestens 8 Zeichen haben" }, { status: 400 });

  const customer = await prisma.customer.findUnique({ where: { passwordResetToken: token } });

  if (!customer || !customer.passwordResetExpiry || customer.passwordResetExpiry < new Date()) {
    return Response.json({ error: "Link ungültig oder abgelaufen" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.customer.update({
    where: { id: customer.id },
    data: { passwordHash, passwordResetToken: null, passwordResetExpiry: null },
  });

  return Response.json({ ok: true });
}
