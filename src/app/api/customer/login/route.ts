import { prisma } from "@/lib/prisma";
import { signCustomerToken } from "@/lib/customer-auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return Response.json({ error: "E-Mail und Passwort erforderlich" }, { status: 400 });
  }

  const customer = await prisma.customer.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (!customer) {
    return Response.json({ error: "Ungültige Anmeldedaten" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, customer.passwordHash);
  if (!valid) {
    return Response.json({ error: "Ungültige Anmeldedaten" }, { status: 401 });
  }

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
