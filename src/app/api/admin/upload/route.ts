import { verifyAdminToken } from "@/lib/admin-auth";
import { cookies } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";

async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) return new Response("Unauthorized", { status: 401 });
  return null;
}

export async function POST(req: Request) {
  const denied = await auth();
  if (denied) return denied;

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) return Response.json({ error: "Keine Datei" }, { status: 400 });

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) return Response.json({ error: "Nur JPG, PNG, WEBP oder GIF erlaubt" }, { status: 400 });
  if (file.size > 10 * 1024 * 1024) return Response.json({ error: "Datei darf maximal 10 MB gross sein" }, { status: 400 });

  const filename = `${crypto.randomUUID()}.webp`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const inputBuffer = Buffer.from(await file.arrayBuffer());

  // Compress + convert to WebP, max 1200px wide
  const outputBuffer = await sharp(inputBuffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  await writeFile(path.join(uploadDir, filename), outputBuffer);

  return Response.json({ url: `/uploads/${filename}` });
}
