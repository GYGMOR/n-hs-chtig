"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>

        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-foreground">
          Vielen Dank!
        </h1>
        <p className="text-foreground/50 text-lg mb-4">
          Deine Bestellung wurde erfolgreich aufgegeben.
        </p>
        <p className="text-foreground/40 text-sm mb-12">
          Du erhältst in Kürze eine Bestätigungs-E-Mail mit allen Details zu deiner Bestellung.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="px-8 py-4 bg-foreground text-background font-bold rounded-2xl hover:bg-accent-rose hover:text-white transition-all duration-300 inline-flex items-center gap-2 group"
          >
            Weiter einkaufen
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/"
            className="px-8 py-4 glass border-black/[0.05] text-foreground font-bold rounded-2xl hover:border-accent-rose transition-all duration-300"
          >
            Zur Startseite
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
