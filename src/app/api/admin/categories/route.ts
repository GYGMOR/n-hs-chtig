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

export async function GET() {
  const denied = await auth();
  if (denied) return denied;
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" }, include: { _count: { select: { products: true } } } });
  return Response.json(categories);
}

export async function POST(req: Request) {
  const denied = await auth();
  if (denied) return denied;
  const { name } = await req.json();
  if (!name?.trim()) return Response.json({ error: "Name erforderlich" }, { status: 400 });
  const slug = toSlug(name);
  const category = await prisma.category.create({ data: { name: name.trim(), slug } });
  return Response.json(category, { status: 201 });
}
