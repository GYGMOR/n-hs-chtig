import { prisma } from "@/lib/prisma";
import { Package, ShoppingBag, TrendingUp, Clock } from "lucide-react";

export default async function AdminDashboard() {
  const [productCount, orderCount, orders] = await Promise.all([
    prisma.product.count({ where: { active: true } }),
    prisma.order.count(),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { items: true },
    }),
  ]);

  const revenue = await prisma.order.aggregate({
    where: { status: "PAID" },
    _sum: { total: true },
  });

  const stats = [
    { label: "Aktive Produkte", value: productCount, icon: Package, color: "bg-blue-50 text-blue-600" },
    { label: "Bestellungen", value: orderCount, icon: ShoppingBag, color: "bg-green-50 text-green-600" },
    {
      label: "Umsatz (CHF)",
      value: (revenue._sum.total ?? 0).toFixed(2),
      icon: TrendingUp,
      color: "bg-rose-50 text-rose-600",
    },
  ];

  const statusLabels: Record<string, string> = {
    PENDING: "Ausstehend",
    PAID: "Bezahlt",
    SHIPPED: "Versendet",
    DELIVERED: "Geliefert",
    CANCELLED: "Storniert",
  };

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PAID: "bg-green-100 text-green-800",
    SHIPPED: "bg-blue-100 text-blue-800",
    DELIVERED: "bg-gray-100 text-gray-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <h2 className="font-semibold text-gray-900">Letzte Bestellungen</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="text-left px-6 py-3 text-gray-400 font-medium">Kunde</th>
              <th className="text-left px-6 py-3 text-gray-400 font-medium">Datum</th>
              <th className="text-left px-6 py-3 text-gray-400 font-medium">Total</th>
              <th className="text-left px-6 py-3 text-gray-400 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                  Noch keine Bestellungen
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.customerName}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("de-CH")}
                  </td>
                  <td className="px-6 py-4 font-medium">CHF {order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
