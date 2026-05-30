import { sendContactEmail } from "@/lib/email";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json({ error: "Alle Felder sind erforderlich" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
  }

  try {
    await sendContactEmail({ name, email, message });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Kontaktformular Fehler:", err);
    return Response.json({ error: "Fehler beim Senden – bitte versuchen Sie es erneut" }, { status: 500 });
  }
}
