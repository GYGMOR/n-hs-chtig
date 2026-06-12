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

export async function PUT(req: Request, ctx: RouteContext<"/api/admin/products/[id]">) {
  const denied = await auth();
  if (denied) return denied;

  const { id } = await ctx.params;
  const body = await req.json();
  const { name, slug, description, price, images, stock, categoryId, active, featured } = body;

  if (featured) {
    const otherFeaturedCount = await prisma.product.count({
      where: {
        featured: true,
        NOT: { id: Number(id) },
      },
    });
    if (otherFeaturedCount >= 3) {
      return Response.json({ error: "Maximal 3 Produkte auf der Startseite erlaubt." }, { status: 400 });
    }
  }

  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: { 
      name, 
      slug, 
      description, 
      price: Number(price), 
      images, 
      stock: Number(stock), 
      categoryId: Number(categoryId), 
      active: Boolean(active),
      featured: Boolean(featured)
    },
    include: { category: true },
  });
  return Response.json(product);
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/admin/products/[id]">) {
  const denied = await auth();
  if (denied) return denied;

  const { id } = await ctx.params;
  await prisma.product.delete({ where: { id: Number(id) } });
  return new Response(null, { status: 204 });
}
