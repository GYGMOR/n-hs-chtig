"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, LogOut, ShoppingBag, ChevronRight, Settings, Eye, EyeOff, Loader2, Check } from "lucide-react";
import type { CustomerPayload } from "@/lib/customer-auth";

const statusLabels: Record<string, { label: string; color: string }> = {
  PENDING:   { label: "Ausstehend",   color: "bg-yellow-100 text-yellow-800" },
  PAID:      { label: "Bezahlt",      color: "bg-blue-100 text-blue-800" },
  SHIPPED:   { label: "Versendet",    color: "bg-purple-100 text-purple-800" },
  DELIVERED: { label: "Geliefert",    color: "bg-green-100 text-green-800" },
  CANCELLED: { label: "Storniert",    color: "bg-red-100 text-red-800" },
};

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: Date;
  items: { id: number; quantity: number; product: { name: string; images: string[] } }[];
}

interface Props {
  customer: CustomerPayload;
  orders: Order[];
}

export default function PortalClient({ customer, orders }: Props) {
  const [tab, setTab] = useState<"orders" | "profile">("orders");
  const [name, setName] = useState(customer.name);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [saveError, setSaveError] = useState("");

  async function handleLogout() {
    await fetch("/api/customer/logout", { method: "POST" });
    window.location.href = "/login";
  }

  async function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setSaveMsg(""); setSaveError("");
    const res = await fetch("/api/customer/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, currentPassword: currentPw || undefined, newPassword: newPw || undefined }),
    });
    if (res.ok) {
      setSaveMsg("Gespeichert!"); setCurrentPw(""); setNewPw("");
      setTimeout(() => setSaveMsg(""), 3000);
    } else {
      const d = await res.json();
      setSaveError(d.error ?? "Fehler");
    }
    setSaving(false);
  }

  const fieldClass = "w-full bg-black/[0.03] border-none rounded-2xl py-4 px-6 text-foreground placeholder:text-foreground/20 focus:ring-2 focus:ring-accent-rose/20 outline-none text-sm";

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-3xl">

        {/* Header */}
        <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-accent-rose block mb-3">Mein Konto</span>
            <h1 className="text-5xl font-serif font-bold text-foreground">Hallo, {name.split(" ")[0]}</h1>
            <p className="text-foreground/40 mt-2">{customer.email}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-black/[0.04] text-foreground/50 hover:text-foreground hover:bg-black/[0.08] transition-all text-sm font-medium">
            <LogOut className="w-4 h-4" /> Abmelden
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1.5 bg-black/[0.03] rounded-2xl w-fit">
          {[{ key: "orders", label: "Bestellungen", icon: Package }, { key: "profile", label: "Profil", icon: Settings }].map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key as "orders" | "profile")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === key ? "bg-white shadow text-foreground" : "text-foreground/40 hover:text-foreground"}`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {tab === "orders" && (
          <div>
            {orders.length === 0 ? (
              <div className="glass-premium rounded-[32px] p-16 text-center">
                <ShoppingBag className="w-12 h-12 text-foreground/20 mx-auto mb-6" />
                <p className="text-foreground/40 text-lg font-light">Noch keine Bestellungen vorhanden.</p>
                <Link href="/shop" className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-foreground text-background rounded-2xl font-semibold text-sm hover:bg-accent-rose transition-colors">
                  Zum Shop <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const status = statusLabels[order.status] ?? { label: order.status, color: "bg-gray-100 text-gray-700" };
                  return (
                    <div key={order.id} className="glass-premium rounded-[28px] p-6 md:p-8">
                      <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-bold mb-1">Bestellung</p>
                          <p className="font-mono font-bold text-foreground">#{order.id.slice(0, 8).toUpperCase()}</p>
                          <p className="text-sm text-foreground/40 mt-1">
                            {new Date(order.createdAt).toLocaleDateString("de-CH", { year: "numeric", month: "long", day: "numeric" })}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${status.color}`}>{status.label}</span>
                          <span className="text-lg font-serif font-bold text-foreground">CHF {order.total.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 pt-4 border-t border-black/[0.05]">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-2">
                            {item.product.images[0] && (
                              <img src={item.product.images[0]} alt={item.product.name} className="w-10 h-10 rounded-xl object-cover bg-gray-100" />
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
        )}

        {/* Profile Tab */}
        {tab === "profile" && (
          <div className="glass-premium rounded-[32px] p-8 md:p-10">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Profil bearbeiten</h2>
            <form onSubmit={handleProfileSave} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold px-2">Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={fieldClass} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold px-2">E-Mail</label>
                <input type="email" disabled value={customer.email} className={fieldClass + " opacity-50 cursor-not-allowed"} />
              </div>

              <div className="border-t border-black/[0.05] pt-6">
                <p className="text-sm font-semibold text-foreground mb-4">Passwort ändern <span className="text-foreground/30 font-normal">(optional)</span></p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold px-2">Aktuelles Passwort</label>
                    <div className="relative">
                      <input type={showPw ? "text" : "password"} value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} placeholder="••••••••" className={fieldClass + " pr-12"} />
                      <button type="button" onClick={() => setShowPw((p) => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30">
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold px-2">Neues Passwort</label>
                    <input type={showPw ? "text" : "password"} value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="Mindestens 8 Zeichen" className={fieldClass} />
                  </div>
                </div>
              </div>

              {saveError && <p className="text-red-500 text-sm px-2">{saveError}</p>}

              <button type="submit" disabled={saving}
                className="flex items-center gap-2 px-8 py-4 bg-foreground text-background font-bold rounded-2xl hover:bg-accent-rose transition-colors disabled:opacity-60 text-sm">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saveMsg ? <Check className="w-4 h-4" /> : null}
                {saveMsg || "Änderungen speichern"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
