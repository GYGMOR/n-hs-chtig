"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Star, Quote, Scissors, Ruler, PenTool } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-background">
      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 fabric-pattern opacity-[0.04] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-accent-rose/[0.02] rounded-full blur-[140px]" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center space-y-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-4 px-8 py-3 rounded-full glass border-black/[0.05] shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-accent-rose animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/40">Gelebtes Kunsthandwerk</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-7xl md:text-9xl font-serif font-bold text-foreground leading-[0.85] tracking-tighter"
            >
              Hingabe in <br /> jedem <span className="italic font-light text-foreground/40">Stich.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-3xl text-foreground/40 leading-relaxed font-light max-w-3xl mx-auto"
            >
              Wir glauben nicht an schnelllebige Trends. Wir glauben an die Seele der Dinge, die von Hand erschaffen wurden.
            </motion.p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <div className="w-[1px] h-12 bg-gradient-to-b from-foreground to-transparent" />
        </div>
      </section>

      {/* 2. The Visionary Section (Jlonka) */}
      <section className="section-padding px-6 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 items-center">
            {/* Portrait Column */}
            <div className="lg:col-span-6 relative flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="relative"
              >
                <div className="w-[350px] h-[350px] md:w-[550px] md:h-[550px] rounded-full overflow-hidden border-[16px] border-white shadow-[0_64px_128px_-32px_rgba(0,0,0,0.2)] relative z-10 group">
                  <img
                    src="/images/inhaberin.jpg"
                    alt="Jlonka Dubach"
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-accent-rose/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>
                
                {/* Decorative Artisan Rings */}
                <div className="absolute -inset-8 border border-black/[0.03] rounded-full animate-spin-slow pointer-events-none" />
                <div className="absolute -inset-16 border border-black/[0.01] rounded-full animate-spin-slow-reverse pointer-events-none" />
                
                {/* Signature Tag */}
                <div className="absolute -bottom-6 -right-4 md:-right-10 z-20">
                  <div className="glass-premium p-8 rounded-[32px] shadow-2xl border-white/60">
                    <p className="font-serif font-bold text-3xl text-foreground mb-1">Jlonka Dubach</p>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-accent-rose font-bold">Gründerin & Seele des Ateliers</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Story Column */}
            <div className="lg:col-span-6 space-y-12">
              <div className="space-y-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-accent-rose">Meine Geschichte</span>
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight tracking-tighter">
                  Wo alles <br /> <span className="italic font-light text-foreground/40">begann.</span>
                </h2>
              </div>
              
              <div className="space-y-8 text-xl text-foreground/50 leading-relaxed font-light">
                <p>
                  Es fing an mit einer alten Nähmaschine und der Faszination für das Geräusch, wenn eine Nadel durch festen Stoff gleitet. Für mich war das Handwerk nie nur Arbeit – es war Therapie, Meditation und Ausdruck zugleich.
                </p>
                <p>
                  Nähsüchtig wurde 2026 in einem kleinen Atelier in Sarmenstorf gegründet. Ohne Businessplan, aber mit der unerschütterlichen Überzeugung, dass Menschen sich nach Objekten sehnen, die eine Geschichte erzählen.
                </p>
              </div>

              <div className="pt-8 grid grid-cols-2 gap-12 border-t border-black/[0.05]">
                <div>
                  <p className="text-5xl font-serif font-bold text-foreground mb-2">2026</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-bold">Gründungsjahr</p>
                </div>
                <div>
                  <p className="text-5xl font-serif font-bold text-foreground mb-2">Aargau</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-bold">Ursprung</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Philosophy Section - Asymmetric Grid */}
      <section className="section-padding px-6 bg-surface-light relative overflow-hidden">
        <div className="absolute inset-0 fabric-pattern opacity-[0.05] pointer-events-none" />
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 sticky top-32">
              <div className="space-y-8">
                <h2 className="text-6xl md:text-8xl font-serif font-bold text-foreground leading-none tracking-tighter">
                  Unsere <br /> <span className="italic font-light text-foreground/40">Werte.</span>
                </h2>
                <p className="text-xl text-foreground/40 leading-relaxed font-light max-w-md">
                  Qualität ist kein Zufall. Es ist das Ergebnis von bewussten Entscheidungen, die wir jeden Tag aufs Neue treffen.
                </p>
                <div className="w-24 h-[4px] bg-accent-rose/20 rounded-full" />
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                { icon: Scissors, title: "Material", desc: "Wir nutzen ausschließlich pflanzlich gegerbtes Leder und Naturfasern von höchster Güte." },
                { icon: Ruler, title: "Präzision", desc: "Jeder Millimeter wird geprüft. Perfektion ist unser Standard, nicht unser Ziel." },
                { icon: Star, title: "Unikate", desc: "Kein Stück gleicht dem anderen. Jedes Produkt hat seinen eigenen Charakter." },
                { icon: Heart, title: "Ethik", desc: "Faire Löhne und lokales Handwerk sind das Fundament unseres Ateliers." },
              ].map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-12 glass-premium rounded-[48px] space-y-6 hover:bg-white transition-all duration-700 shadow-sm"
                >
                  <div className="w-16 h-16 rounded-2xl bg-foreground text-background flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-foreground">{value.title}</h3>
                  <p className="text-foreground/50 leading-relaxed font-light">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Workshop Visual Section */}
      <section className="py-40 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-8">
                <div className="aspect-[3/4] rounded-[48px] overflow-hidden glass-premium translate-y-12">
                  <img src="https://images.unsplash.com/photo-1516575150278-7718028e1924?q=80&w=800&auto=format&fit=crop" alt="Workshop 1" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[3/4] rounded-[48px] overflow-hidden glass-premium">
                  <img src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=800&auto=format&fit=crop" alt="Workshop 2" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight tracking-tighter">
                  Der Ort der <br /> <span className="italic font-light text-foreground/40">Stille.</span>
                </h2>
                <p className="text-xl text-foreground/50 leading-relaxed font-light">
                  Unser Atelier in Sarmenstorf ist mehr als nur eine Werkstatt. Es ist ein Rückzugsort, an dem wir uns die Zeit nehmen, die Dinge richtig zu machen.
                </p>
              </div>
              <Link href="/contact" className="group relative inline-flex items-center gap-5 px-12 py-5 bg-foreground text-background font-bold rounded-2xl overflow-hidden transition-all duration-700 hover:scale-105 active:scale-95 shadow-2xl">
                <div className="absolute inset-0 bg-accent-rose translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-3 text-lg">
                  Besuchen Sie uns <PenTool className="w-5 h-5 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Final Signature Section */}
      <section className="section-padding px-6 bg-footer-bg relative overflow-hidden">
        <div className="absolute inset-0 fabric-pattern opacity-[0.06] pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center">
          <Quote className="w-20 h-20 text-accent-rose/20 mx-auto mb-12" />
          <h3 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight tracking-tighter mb-16 italic font-light">
            "Wir erschaffen nicht einfach Produkte. Wir erschaffen Begleiter für ein ganzes Leben."
          </h3>
          <div className="inline-flex flex-col items-center gap-2">
            <div className="w-20 h-[2px] bg-accent-rose/30 mb-4" />
            <p className="text-2xl font-serif font-bold text-foreground">Ihre Jlonka Dubach</p>
            <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/40 font-bold">Inhaberin Nähsüchtig</p>
          </div>
        </div>
      </section>
    </div>
  );
}
