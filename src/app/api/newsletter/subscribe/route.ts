import { prisma } from "@/lib/prisma";
import { sendNewsletterConfirmation } from "@/lib/email";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
  }

  const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
  if (existing) {
    return Response.json({ ok: true, already: true });
  }

  await prisma.newsletterSubscriber.create({ data: { email } });

  try {
    await sendNewsletterConfirmation(email);
  } catch (err) {
    console.error("Newsletter E-Mail Fehler:", err);
  }

  return Response.json({ ok: true });
}
