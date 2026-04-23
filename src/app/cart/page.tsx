"use client";

import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const shipping = 15.00;
  const total = subtotal() + shipping;

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 text-foreground">Dein Warenkorb</h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass border-black/[0.03] p-6 rounded-3xl flex flex-col sm:flex-row gap-6 items-center shadow-sm"
                >
                  <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold mb-1 text-foreground">{item.name}</h3>
                    <p className="text-foreground/40 text-sm mb-4">Handgefertigtes Unikat</p>
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                      <div className="flex items-center gap-3 bg-surface-light rounded-xl border border-black/[0.05] px-3 py-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-foreground/50 hover:text-accent-rose transition-colors"><Minus className="w-4 h-4" /></button>
                        <span className="font-bold min-w-[20px] text-center text-foreground">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-foreground/50 hover:text-accent-rose transition-colors"><Plus className="w-4 h-4" /></button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500/50 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-display font-bold text-foreground">CHF {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </motion.div>
              ))}
              
              <Link href="/shop" className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors font-medium">
                <ArrowRight className="w-4 h-4 rotate-180" /> Weiter einkaufen
              </Link>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="glass border-black/[0.05] p-8 rounded-[32px] sticky top-32 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-3xl">
                <h2 className="text-2xl font-display font-bold mb-8 text-foreground">Zusammenfassung</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-foreground/60">
                    <span>Zwischensumme</span>
                    <span>CHF {subtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/60">
                    <span>Versand</span>
                    <span>CHF {shipping.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-black/[0.05] my-4" />
                  <div className="flex justify-between text-2xl font-display font-bold text-foreground">
                    <span>Gesamt</span>
                    <span>CHF {total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full h-16 bg-foreground text-background font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-accent-rose hover:text-white transition-all duration-300 mb-6 group">
                  Bestellung abschließen <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-foreground/40 text-xs">
                    <ShieldCheck className="w-4 h-4 text-accent-rose" />
                    <span>Sicherer Checkout & verschlüsselte Zahlung</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/40 text-xs">
                    <ShoppingBag className="w-4 h-4 text-accent-rose" />
                    <span>Voraussichtliche Lieferung: 2-4 Werktage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="w-24 h-24 bg-surface-light rounded-full flex items-center justify-center mx-auto mb-8 border border-black/[0.05]">
              <ShoppingBag className="w-10 h-10 text-foreground/20" />
            </div>
            <h2 className="text-3xl font-display font-bold mb-4 text-foreground">Dein Warenkorb ist leer</h2>
            <p className="text-foreground/40 mb-12 max-w-sm mx-auto">Es scheint, als hättest du noch keine handgefertigten Schätze ausgewählt.</p>
            <Link href="/shop" className="px-12 py-4 bg-foreground text-background font-bold rounded-2xl hover:bg-accent-rose hover:text-white transition-all duration-300 inline-block">
              Shop erkunden
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
