import { verifyAdminToken } from "@/lib/admin-auth";
import { cookies } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) return new Response("Unauthorized", { status: 401 });
  return null;
}

async function compressImage(buffer: Buffer, mimeType: string): Promise<{ data: Buffer; ext: string }> {
  try {
    const sharp = (await import("sharp")).default;
    const compressed = await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
    return { data: compressed, ext: "webp" };
  } catch {
    // sharp nicht verfügbar → Original speichern
    const extMap: Record<string, string> = {
      "image/jpeg": "jpg", "image/png": "png",
      "image/webp": "webp", "image/gif": "gif",
    };
    return { data: buffer, ext: extMap[mimeType] ?? "jpg" };
  }
}

export async function POST(req: Request) {
  const denied = await auth();
  if (denied) return denied;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) return Response.json({ error: "Keine Datei" }, { status: 400 });

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return Response.json({ error: "Nur JPG, PNG, WEBP oder GIF erlaubt" }, { status: 400 });
    }
    if (file.size > 10 * 1024 * 1024) {
      return Response.json({ error: "Datei darf maximal 10 MB gross sein" }, { status: 400 });
    }

    const inputBuffer = Buffer.from(await file.arrayBuffer());
    const { data: outputBuffer, ext } = await compressImage(inputBuffer, file.type);

    const filename = `${crypto.randomUUID()}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), outputBuffer);

    return Response.json({ url: `/uploads/${filename}` });
  } catch (err) {
    console.error("Upload Fehler:", err);
    return Response.json({ error: "Upload fehlgeschlagen" }, { status: 500 });
  }
}
