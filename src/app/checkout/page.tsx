"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck, Truck, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const SHIPPING = 15;

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "CH",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    router.replace("/cart");
    return null;
  }

  const total = subtotal() + SHIPPING;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, form }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Fehler beim Checkout");

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      setLoading(false);
    }
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Zurück zum Warenkorb
        </Link>

        <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 text-foreground">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass border-black/[0.05] p-8 rounded-3xl"
              >
                <h2 className="text-xl font-bold mb-6 text-foreground">
                  Kontaktdaten
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-2">
                      Vorname *
                    </label>
                    <input
                      required
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface-light border border-black/[0.05] rounded-xl focus:outline-none focus:border-accent-rose transition-colors text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-2">
                      Nachname *
                    </label>
                    <input
                      required
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface-light border border-black/[0.05] rounded-xl focus:outline-none focus:border-accent-rose transition-colors text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-2">
                      E-Mail *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface-light border border-black/[0.05] rounded-xl focus:outline-none focus:border-accent-rose transition-colors text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-2">
                      Telefon
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface-light border border-black/[0.05] rounded-xl focus:outline-none focus:border-accent-rose transition-colors text-foreground"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass border-black/[0.05] p-8 rounded-3xl"
              >
                <h2 className="text-xl font-bold mb-6 text-foreground">
                  Lieferadresse
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-2">
                      Strasse & Hausnummer *
                    </label>
                    <input
                      required
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface-light border border-black/[0.05] rounded-xl focus:outline-none focus:border-accent-rose transition-colors text-foreground"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground/60 mb-2">
                        PLZ *
                      </label>
                      <input
                        required
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface-light border border-black/[0.05] rounded-xl focus:outline-none focus:border-accent-rose transition-colors text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/60 mb-2">
                        Ort *
                      </label>
                      <input
                        required
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface-light border border-black/[0.05] rounded-xl focus:outline-none focus:border-accent-rose transition-colors text-foreground"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-2">
                      Land *
                    </label>
                    <select
                      required
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface-light border border-black/[0.05] rounded-xl focus:outline-none focus:border-accent-rose transition-colors text-foreground"
                    >
                      <option value="CH">Schweiz</option>
                      <option value="DE">Deutschland</option>
                      <option value="AT">Österreich</option>
                      <option value="LI">Liechtenstein</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {error && (
                <p className="text-red-500 text-sm font-medium px-2">{error}</p>
              )}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="glass border-black/[0.05] p-8 rounded-[32px] sticky top-32 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-3xl">
                <h2 className="text-xl font-display font-bold mb-6 text-foreground">
                  Bestellübersicht
                </h2>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-foreground/70">
                        {item.name}
                        <span className="text-foreground/40 ml-1">×{item.quantity}</span>
                      </span>
                      <span className="font-medium text-foreground">
                        CHF {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-black/[0.05] pt-4 mb-6">
                  <div className="flex justify-between text-foreground/60 text-sm">
                    <span>Zwischensumme</span>
                    <span>CHF {subtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/60 text-sm">
                    <span>Versand</span>
                    <span>CHF {SHIPPING.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-black/[0.05]" />
                  <div className="flex justify-between text-xl font-display font-bold text-foreground">
                    <span>Gesamt</span>
                    <span>CHF {total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-foreground text-background font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-accent-rose hover:text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Weiter zu Stripe
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-foreground/40 text-xs">
                    <ShieldCheck className="w-4 h-4 text-accent-rose shrink-0" />
                    <span>Sichere Zahlung über Stripe verschlüsselt</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/40 text-xs">
                    <Truck className="w-4 h-4 text-accent-rose shrink-0" />
                    <span>Lieferung in 2–4 Werktagen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
