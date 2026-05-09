import bcrypt from "bcryptjs";
import { signAdminToken } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const { password } = await req.json();

  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash || hash.includes("PLACEHOLDER")) {
    return Response.json(
      { error: "Admin-Passwort noch nicht konfiguriert. Führe npm run admin:hash aus." },
      { status: 500 }
    );
  }

  const valid = await bcrypt.compare(password, hash);
  if (!valid) {
    return Response.json({ error: "Falsches Passwort" }, { status: 401 });
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
