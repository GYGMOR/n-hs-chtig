import { prisma } from "@/lib/prisma";
import OrdersTable from "@/components/admin/OrdersTable";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: { product: { select: { name: true } } },
      },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Bestellungen</h1>
      <OrdersTable orders={orders} />
    </div>
  );
}
