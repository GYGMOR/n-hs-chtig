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

export async function PATCH(req: Request, ctx: RouteContext<"/api/admin/orders/[id]">) {
  const denied = await auth();
  if (denied) return denied;

  const { id } = await ctx.params;
  const { status } = await req.json();

  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });
  return Response.json(order);
}
