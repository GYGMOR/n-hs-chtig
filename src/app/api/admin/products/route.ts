import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/admin-auth";
import { cookies } from "next/headers";

async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return new Response("Unauthorized", { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await auth();
  if (denied) return denied;

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return Response.json(products);
}

export async function POST(req: Request) {
  const denied = await auth();
  if (denied) return denied;

  const body = await req.json();
  const { name, slug, description, price, images, stock, categoryId, active } = body;

  const product = await prisma.product.create({
    data: { name, slug, description, price: Number(price), images, stock: Number(stock), categoryId: Number(categoryId), active: Boolean(active) },
    include: { category: true },
  });
  return Response.json(product, { status: 201 });
}
