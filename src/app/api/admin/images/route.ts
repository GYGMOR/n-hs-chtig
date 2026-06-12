import { verifyAdminToken } from "@/lib/admin-auth";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return new Response("Unauthorized", { status: 401 });
  }
  return null;
}

export async function GET(req: Request) {
  const denied = await auth();
  if (denied) return denied;

  try {
    const images = await prisma.websiteImage.findMany({
      orderBy: { key: "asc" }
    });
    return Response.json(images);
  } catch (err) {
    console.error("GET CMS images error:", err);
    return Response.json({ error: "Fehler beim Laden der CMS-Bilder" }, { status: 500 });
  }
}
