import { prisma } from "@/lib/prisma";
import { signCustomerToken } from "@/lib/customer-auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return Response.json({ error: "Alle Felder sind erforderlich" }, { status: 400 });
  }
  if (password.length < 8) {
    return Response.json({ error: "Passwort muss mindestens 8 Zeichen haben" }, { status: 400 });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existing = await prisma.customer.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    return Response.json({ error: "Diese E-Mail ist bereits registriert" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const customer = await prisma.customer.create({
    data: { name: name.trim(), email: normalizedEmail, passwordHash },
  });

  const token = await signCustomerToken({ id: customer.id, email: customer.email, name: customer.name });

  const cookieStore = await cookies();
  cookieStore.set("customer_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return Response.json({ ok: true });
}
