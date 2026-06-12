import { verifyAdminToken } from "@/lib/admin-auth";
import { cookies } from "next/headers";
import { readdir, stat } from "fs/promises";
import path from "path";

async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) return new Response("Unauthorized", { status: 401 });
  return null;
}

export async function GET() {
  const denied = await auth();
  if (denied) return denied;

  const results: any = {
    cwd: process.cwd(),
    sharpAvailable: false,
    sharpError: null,
    uploadsFiles: [],
  };

  try {
    const sharp = (await import("sharp")).default;
    results.sharpAvailable = typeof sharp === "function";
  } catch (err: any) {
    results.sharpError = err.message || err.toString();
  }

  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const files = await readdir(uploadDir);
    for (const file of files) {
      const info = await stat(path.join(uploadDir, file));
      results.uploadsFiles.push({
        name: file,
        size: info.size,
        mode: info.mode,
        mtime: info.mtime,
      });
    }
  } catch (err: any) {
    results.uploadsError = err.message || err.toString();
  }

  return Response.json(results);
}
