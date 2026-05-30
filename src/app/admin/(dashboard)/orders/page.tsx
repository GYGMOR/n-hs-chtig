import { prisma } from "@/lib/prisma";
import OrdersTable from "@/components/admin/OrdersTable";
import { Download } from "lucide-react";

export const dynamic = "force-dynamic";

async function getOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: { include: { product: { select: { name: true } } } },
    },
  });
}

export default async function AdminOrdersPage() {
  let orders: Awaited<ReturnType<typeof getOrders>> = [];
  let fetchError = "";

  try {
    orders = await getOrders();
  } catch (err) {
    console.error("Bestellungen laden fehlgeschlagen:", err);
    fetchError = err instanceof Error ? err.message : "Unbekannter Fehler";
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bestellungen
          <span className="ml-3 text-sm font-normal text-gray-400">({orders.length})</span>
        </h1>
        <a
          href="/api/admin/orders/export"
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          <Download className="w-4 h-4" /> CSV Export
        </a>
      </div>

      {fetchError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-mono">
          Fehler beim Laden: {fetchError}
        </div>
      )}

      <OrdersTable orders={orders} />
    </div>
  );
}
