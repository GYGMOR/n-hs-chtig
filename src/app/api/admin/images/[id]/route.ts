import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/admin-auth";
import { cookies } from "next/headers";

async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) return new Response("Unauthorized", { status: 401 });
  return null;
}

export async function PUT(req: Request, ctx: RouteContext<"/api/admin/images/[id]">) {
  const denied = await auth();
  if (denied) return denied;

  try {
    const { id } = await ctx.params;
    const body = await req.json();
    const { url, alt } = body;

    const image = await prisma.websiteImage.update({
      where: { id: Number(id) },
      data: {
        url: url !== undefined ? url : undefined,
        alt: alt !== undefined ? alt : undefined,
      },
    });

    return Response.json(image);
  } catch (err) {
    console.error("PUT CMS image error:", err);
    return Response.json({ error: "Fehler beim Aktualisieren des CMS-Bildes" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/admin/images/[id]">) {
  const denied = await auth();
  if (denied) return denied;

  try {
    const { id } = await ctx.params;

    // Resetting the image payload (clearing url) so the placeholder state triggers
    const image = await prisma.websiteImage.update({
      where: { id: Number(id) },
      data: { url: "" },
    });

    return Response.json(image);
  } catch (err) {
    console.error("DELETE CMS image error:", err);
    return Response.json({ error: "Fehler beim Löschen des CMS-Bildes" }, { status: 500 });
  }
}
