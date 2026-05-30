import { prisma } from "@/lib/prisma";
import OrdersTable from "@/components/admin/OrdersTable";
import { Download } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: { include: { product: { select: { name: true } } } },
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bestellungen</h1>
        <a
          href="/api/admin/orders/export"
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          <Download className="w-4 h-4" /> CSV Export
        </a>
      </div>
      <OrdersTable orders={orders} />
    </div>
  );
}
