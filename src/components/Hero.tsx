"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, Scissors } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 fabric-pattern opacity-[0.04]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent-rose/[0.03] rounded-full blur-[140px] animate-pulse-slow" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass border-black/[0.05] mb-12 shadow-sm"
          >
            <Scissors className="w-4 h-4 text-accent-rose rotate-90" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/50">Atelier Zürich • Handgefertigt</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-7xl md:text-9xl font-serif font-bold mb-10 leading-[0.85] tracking-tighter text-foreground"
          >
            Echte <span className="text-accent-rose relative inline-block">
              Werte
            </span> <br /> 
            <span className="italic font-light text-foreground/40">neu erschaffen.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-3xl text-foreground/40 mb-16 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Wir erschaffen zeitlose Unikate mit Seele. Jedes Stück erzählt eine Geschichte von Leidenschaft, Tradition und Schweizer Präzision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <Link
              href="/shop"
              className="group relative px-14 py-6 bg-foreground text-background font-bold rounded-2xl overflow-hidden transition-all duration-700 hover:scale-105 active:scale-95 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.2)]"
            >
              <div className="absolute inset-0 bg-accent-rose translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-3 text-lg">
                Kollektion entdecken <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
              </span>
            </Link>
            <Link
              href="/about"
              className="px-14 py-6 glass border-black/[0.08] text-foreground font-bold rounded-2xl hover:bg-black/5 transition-all duration-500 flex items-center gap-4 group text-lg"
            >
              Unsere Geschichte <div className="w-2.5 h-2.5 rounded-full bg-accent-rose group-hover:scale-150 transition-all duration-500 shadow-[0_0_15px_rgba(225,29,72,0.5)]" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Floating Artisan Accents */}
      <div className="absolute bottom-20 left-[10%] w-40 h-40 glass border-black/[0.04] rounded-[50px] rotate-12 blur-[2px] opacity-20 animate-float" />
      <div className="absolute top-40 right-[15%] w-32 h-32 glass border-black/[0.04] rounded-[40px] -rotate-12 blur-[1px] opacity-10 animate-float" style={{ animationDelay: "-2s" }} />
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] text-foreground/20 font-bold">Scrollen</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-foreground/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}

