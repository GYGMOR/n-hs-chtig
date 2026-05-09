"use client";

import { motion } from "framer-motion";
import { XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-8">
          <XCircle className="w-12 h-12 text-red-400" />
        </div>

        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-foreground">
          Zahlung abgebrochen
        </h1>
        <p className="text-foreground/50 text-lg mb-12">
          Kein Problem — dein Warenkorb ist noch gespeichert. Du kannst jederzeit zurückkehren.
        </p>

        <Link
          href="/cart"
          className="px-8 py-4 bg-foreground text-background font-bold rounded-2xl hover:bg-accent-rose hover:text-white transition-all duration-300 inline-flex items-center gap-2 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Zurück zum Warenkorb
        </Link>
      </motion.div>
    </div>
  );
}
