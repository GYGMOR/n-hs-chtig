import { requireCustomer } from "@/lib/customer-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Package, LogOut, ShoppingBag, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

const statusLabels: Record<string, { label: string; color: string }> = {
  PENDING:   { label: "Ausstehend",   color: "bg-yellow-100 text-yellow-800" },
  PAID:      { label: "Bezahlt",      color: "bg-blue-100 text-blue-800" },
  SHIPPED:   { label: "Versendet",    color: "bg-purple-100 text-purple-800" },
  DELIVERED: { label: "Geliefert",    color: "bg-green-100 text-green-800" },
  CANCELLED: { label: "Storniert",    color: "bg-red-100 text-red-800" },
};

export default async function PortalPage() {
  const customer = await requireCustomer();

  const orders = await prisma.order.findMany({
    where: { customerEmail: customer.email },
    include: { items: { include: { product: { select: { name: true, images: true } } } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-3xl">

        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-accent-rose block mb-3">Mein Konto</span>
            <h1 className="text-5xl font-serif font-bold text-foreground">
              Hallo, {customer.name.split(" ")[0]}
            </h1>
            <p className="text-foreground/40 mt-2">{customer.email}</p>
          </div>
          <form action="/api/customer/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-black/[0.04] text-foreground/50 hover:text-foreground hover:bg-black/[0.08] transition-all text-sm font-medium"
            >
              <LogOut className="w-4 h-4" /> Abmelden
            </button>
          </form>
        </div>

        {/* Orders */}
        <div>
          <h2 className="text-xl font-serif font-bold text-foreground mb-6 flex items-center gap-3">
            <Package className="w-5 h-5 text-accent-rose" /> Meine Bestellungen
          </h2>

          {orders.length === 0 ? (
            <div className="glass-premium rounded-[32px] p-16 text-center">
              <ShoppingBag className="w-12 h-12 text-foreground/20 mx-auto mb-6" />
              <p className="text-foreground/40 text-lg font-light">Noch keine Bestellungen vorhanden.</p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-foreground text-background rounded-2xl font-semibold text-sm hover:bg-accent-rose transition-colors"
              >
                Zum Shop <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const status = statusLabels[order.status] ?? { label: order.status, color: "bg-gray-100 text-gray-700" };
                const date = new Date(order.createdAt).toLocaleDateString("de-CH", {
                  year: "numeric", month: "long", day: "numeric",
                });

                return (
                  <div key={order.id} className="glass-premium rounded-[28px] p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-bold mb-1">Bestellung</p>
                        <p className="font-mono font-bold text-foreground">
                          #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-sm text-foreground/40 mt-1">{date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${status.color}`}>
                          {status.label}
                        </span>
                        <span className="text-lg font-serif font-bold text-foreground">
                          CHF {order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-black/[0.05]">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2">
                          {item.product.images[0] && (
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-10 h-10 rounded-xl object-cover bg-gray-100"
                            />
                          )}
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.product.name}</p>
                            <p className="text-xs text-foreground/40">×{item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
