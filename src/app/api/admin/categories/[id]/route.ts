import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/admin-auth";
import { cookies } from "next/headers";

async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) return new Response("Unauthorized", { status: 401 });
  return null;
}

function toSlug(str: string) {
  return str.toLowerCase()
    .replace(/[äöü]/g, (c) => ({ ä: "ae", ö: "oe", ü: "ue" }[c] ?? c))
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function PUT(req: Request, ctx: RouteContext<"/api/admin/categories/[id]">) {
  const denied = await auth();
  if (denied) return denied;
  const { id } = await ctx.params;
  const { name } = await req.json();
  if (!name?.trim()) return Response.json({ error: "Name erforderlich" }, { status: 400 });
  const slug = toSlug(name);
  const category = await prisma.category.update({ where: { id: Number(id) }, data: { name: name.trim(), slug } });
  return Response.json(category);
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/admin/categories/[id]">) {
  const denied = await auth();
  if (denied) return denied;
  const { id } = await ctx.params;
  const count = await prisma.product.count({ where: { categoryId: Number(id) } });
  if (count > 0) return Response.json({ error: `Diese Kategorie hat noch ${count} Produkte. Zuerst Produkte verschieben oder löschen.` }, { status: 409 });
  await prisma.category.delete({ where: { id: Number(id) } });
  return new Response(null, { status: 204 });
}
