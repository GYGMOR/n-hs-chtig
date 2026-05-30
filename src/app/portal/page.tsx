import { requireCustomer } from "@/lib/customer-auth";
import { prisma } from "@/lib/prisma";
import PortalClient from "./PortalClient";

export const dynamic = "force-dynamic";

export default async function PortalPage() {
  const customer = await requireCustomer();

  const orders = await prisma.order.findMany({
    where: { customerEmail: customer.email },
    include: { items: { include: { product: { select: { name: true, images: true } } } } },
    orderBy: { createdAt: "desc" },
  });

  return <PortalClient customer={customer} orders={orders} />;
}
