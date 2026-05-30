import { prisma } from "@/lib/prisma";
import { getCustomer } from "@/lib/customer-auth";

export async function GET() {
  const customer = await getCustomer();
  if (!customer) {
    return Response.json({ error: "Nicht angemeldet" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: { customerEmail: customer.email },
    include: { items: { include: { product: { select: { name: true, images: true } } } } },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(orders);
}
