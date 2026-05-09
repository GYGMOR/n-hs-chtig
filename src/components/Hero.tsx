"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Scissors } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 fabric-pattern opacity-[0.04]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] bg-accent-rose/[0.03] rounded-full blur-[140px] animate-pulse-slow" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 rounded-full glass border-black/[0.05] mb-8 md:mb-12 shadow-sm"
          >
            <Scissors className="w-3 h-3 sm:w-4 sm:h-4 text-accent-rose rotate-90" />
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-foreground/50">Atelier Zürich • Handgefertigt</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-serif font-bold mb-6 md:mb-10 leading-[0.9] tracking-tighter text-foreground"
          >
            Echte <span className="text-accent-rose relative inline-block">Werte</span> <br />
            <span className="italic font-light text-foreground/40">neu erschaffen.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/40 mb-10 md:mb-16 max-w-2xl mx-auto leading-relaxed font-light px-2"
          >
            Wir erschaffen zeitlose Unikate mit Seele. Jedes Stück erzählt eine Geschichte von Leidenschaft, Tradition und Schweizer Präzision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8"
          >
            <Link
              href="/shop"
              className="group relative px-8 py-4 sm:px-10 sm:py-5 md:px-14 md:py-6 bg-foreground text-background font-bold rounded-2xl overflow-hidden transition-all duration-700 hover:scale-105 active:scale-95 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.2)] w-full sm:w-auto text-center"
            >
              <div className="absolute inset-0 bg-accent-rose translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg">
                Kollektion entdecken <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
              </span>
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 sm:px-10 sm:py-5 md:px-14 md:py-6 glass border-black/[0.08] text-foreground font-bold rounded-2xl hover:bg-black/5 transition-all duration-500 flex items-center justify-center gap-3 group text-base sm:text-lg w-full sm:w-auto"
            >
              Unsere Geschichte <div className="w-2 h-2 rounded-full bg-accent-rose group-hover:scale-150 transition-all duration-500 shadow-[0_0_15px_rgba(225,29,72,0.5)]" />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-16 left-[10%] w-24 h-24 md:w-40 md:h-40 glass border-black/[0.04] rounded-[50px] rotate-12 blur-[2px] opacity-20 animate-float hidden sm:block" />
      <div className="absolute top-40 right-[15%] w-20 h-20 md:w-32 md:h-32 glass border-black/[0.04] rounded-[40px] -rotate-12 blur-[1px] opacity-10 animate-float hidden sm:block" style={{ animationDelay: "-2s" }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] text-foreground/20 font-bold">Scrollen</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-foreground/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
