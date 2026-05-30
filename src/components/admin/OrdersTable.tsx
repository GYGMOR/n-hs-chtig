"use client";

import { useState } from "react";

const STATUS_OPTIONS = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"] as const;
type OrderStatus = (typeof STATUS_OPTIONS)[number];

const statusLabels: Record<OrderStatus, string> = {
  PENDING:   "Ausstehend",
  PAID:      "Bezahlt",
  SHIPPED:   "Versendet",
  DELIVERED: "Geliefert",
  CANCELLED: "Storniert",
};

const statusColors: Record<OrderStatus, string> = {
  PENDING:   "bg-yellow-100 text-yellow-800",
  PAID:      "bg-green-100 text-green-800",
  SHIPPED:   "bg-blue-100 text-blue-800",
  DELIVERED: "bg-gray-100 text-gray-700",
  CANCELLED: "bg-red-100 text-red-800",
};

interface ShippingAddress {
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
}

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: { name: string };
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  shipping: number;
  shippingAddress: unknown;
  createdAt: Date;
  items: OrderItem[];
}

export default function OrdersTable({ orders: initial }: { orders: Order[] }) {
  const [orders, setOrders] = useState(initial);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function updateStatus(orderId: string, status: OrderStatus) {
    await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left px-6 py-3 text-gray-400 font-medium">Kunde</th>
            <th className="text-left px-6 py-3 text-gray-400 font-medium">Datum</th>
            <th className="text-left px-6 py-3 text-gray-400 font-medium">Total</th>
            <th className="text-left px-6 py-3 text-gray-400 font-medium">Status</th>
            <th className="text-left px-6 py-3 text-gray-400 font-medium">Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && (
            <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">Noch keine Bestellungen</td></tr>
          )}
          {orders.map((order) => (
            <>
              <tr key={order.id} className="border-b border-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{order.customerName}</p>
                  <p className="text-xs text-gray-400">{order.customerEmail}</p>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString("de-CH")}
                </td>
                <td className="px-6 py-4 font-medium">CHF {order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                    className={`text-xs font-medium px-2.5 py-1.5 rounded-xl border-0 cursor-pointer ${statusColors[order.status]}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{statusLabels[s]}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                    className="text-xs text-gray-400 hover:text-gray-700 underline"
                  >
                    {expanded === order.id ? "Einklappen" : `${order.items.length} Artikel`}
                  </button>
                </td>
              </tr>

              {expanded === order.id && (
                <tr key={`${order.id}-details`} className="bg-gray-50">
                  <td colSpan={5} className="px-6 py-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Items */}
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Artikel</p>
                        <ul className="space-y-1.5">
                          {order.items.map((item) => (
                            <li key={item.id} className="flex justify-between text-xs text-gray-600">
                              <span>{item.product.name} × {item.quantity}</span>
                              <span className="font-medium">CHF {(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                          ))}
                          <li className="flex justify-between text-xs text-gray-400 pt-1 border-t border-gray-200 mt-2">
                            <span>Versand</span><span>CHF {order.shipping.toFixed(2)}</span>
                          </li>
                          <li className="flex justify-between text-xs font-bold text-gray-700 pt-1">
                            <span>Total</span><span>CHF {order.total.toFixed(2)}</span>
                          </li>
                        </ul>
                      </div>

                      {/* Shipping address */}
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Lieferadresse</p>
                        {order.shippingAddress ? (
                          <address className="not-italic text-xs text-gray-600 leading-relaxed">
                            {(() => {
                              const a = order.shippingAddress as ShippingAddress;
                              return (<>
                                <strong className="text-gray-800">{order.customerName}</strong><br />
                                {a.address}<br />
                                {a.postalCode} {a.city}<br />
                                {a.country}
                                {a.phone && <><br />{a.phone}</>}
                              </>);
                            })()}
                          </address>
                        ) : (
                          <p className="text-xs text-gray-400">Keine Adresse</p>
                        )}
                        <p className="text-xs text-gray-500 mt-3">
                          <a href={`mailto:${order.customerEmail}`} className="underline hover:text-gray-700">{order.customerEmail}</a>
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
