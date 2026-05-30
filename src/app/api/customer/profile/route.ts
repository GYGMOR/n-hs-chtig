import { prisma } from "@/lib/prisma";
import { getCustomer, signCustomerToken } from "@/lib/customer-auth";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  const customer = await getCustomer();
  if (!customer) return Response.json({ error: "Nicht angemeldet" }, { status: 401 });

  const { name, currentPassword, newPassword } = await req.json();

  const dbCustomer = await prisma.customer.findUnique({ where: { id: customer.id } });
  if (!dbCustomer) return Response.json({ error: "Konto nicht gefunden" }, { status: 404 });

  const updateData: { name?: string; passwordHash?: string } = {};

  if (name?.trim()) updateData.name = name.trim();

  if (newPassword) {
    if (!currentPassword) return Response.json({ error: "Aktuelles Passwort erforderlich" }, { status: 400 });
    if (newPassword.length < 8) return Response.json({ error: "Neues Passwort muss mindestens 8 Zeichen haben" }, { status: 400 });
    const valid = await bcrypt.compare(currentPassword, dbCustomer.passwordHash);
    if (!valid) return Response.json({ error: "Aktuelles Passwort falsch" }, { status: 400 });
    updateData.passwordHash = await bcrypt.hash(newPassword, 12);
  }

  const updated = await prisma.customer.update({ where: { id: customer.id }, data: updateData });

  // Refresh token with new name
  const token = await signCustomerToken({ id: updated.id, email: updated.email, name: updated.name });
  const cookieStore = await cookies();
  cookieStore.set("customer_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });

  return Response.json({ ok: true, name: updated.name });
}
