"use client";

import { motion } from "framer-motion";
import { Heart, Star, Quote, Scissors, Ruler, PenTool } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-background">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 fabric-pattern opacity-[0.04] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[1200px] md:h-[1200px] bg-accent-rose/[0.02] rounded-full blur-[140px]" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center space-y-6 md:space-y-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-5 sm:px-8 py-2.5 rounded-full glass border-black/[0.05] shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-accent-rose animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/40">Gelebtes Kunsthandwerk</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-foreground leading-[0.9] tracking-tighter"
            >
              Hingabe in <br /> jedem <span className="italic font-light text-foreground/40">Stich.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/40 leading-relaxed font-light max-w-2xl mx-auto"
            >
              Wir glauben nicht an schnelllebige Trends. Wir glauben an die Seele der Dinge, die von Hand erschaffen wurden.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-padding px-4 sm:px-6 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-20 items-center">
            <div className="lg:col-span-6 relative flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="relative"
              >
                <div className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] rounded-full overflow-hidden border-[8px] md:border-[16px] border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] relative z-10 group">
                  <img
                    src="/images/inhaberin.jpg"
                    alt="Jlonka Dubach"
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                  />
                </div>

                <div className="absolute -inset-6 border border-black/[0.03] rounded-full animate-spin-slow pointer-events-none hidden md:block" />
                <div className="absolute -inset-12 border border-black/[0.01] rounded-full animate-spin-slow-reverse pointer-events-none hidden md:block" />

                <div className="absolute -bottom-4 -right-2 sm:-right-6 md:-right-10 z-20">
                  <div className="glass-premium p-4 sm:p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-2xl border-white/60">
                    <p className="font-serif font-bold text-lg sm:text-2xl md:text-3xl text-foreground mb-0.5">Jlonka Dubach</p>
                    <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-accent-rose font-bold">Gründerin & Seele des Ateliers</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-6 space-y-8 md:space-y-10 lg:space-y-12">
              <div className="space-y-4">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.5em] text-accent-rose">Meine Geschichte</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-foreground leading-tight tracking-tighter">
                  Wo alles <br /> <span className="italic font-light text-foreground/40">begann.</span>
                </h2>
              </div>

              <div className="space-y-6 text-base md:text-lg lg:text-xl text-foreground/50 leading-relaxed font-light">
                <p>
                  Es fing an mit einer alten Nähmaschine und der Faszination für das Geräusch, wenn eine Nadel durch festen Stoff gleitet. Für mich war das Handwerk nie nur Arbeit – es war Therapie, Meditation und Ausdruck zugleich.
                </p>
                <p>
                  Nähsüchtig wurde 2026 in einem kleinen Atelier in Sarmenstorf gegründet. Ohne Businessplan, aber mit der unerschütterlichen Überzeugung, dass Menschen sich nach Objekten sehnen, die eine Geschichte erzählen.
                </p>
              </div>

              <div className="pt-6 grid grid-cols-2 gap-8 border-t border-black/[0.05]">
                <div>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-2">2026</p>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-bold">Gründungsjahr</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-2">Aargau</p>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-bold">Ursprung</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding px-4 sm:px-6 bg-surface-light relative overflow-hidden">
        <div className="absolute inset-0 fabric-pattern opacity-[0.05] pointer-events-none" />
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-serif font-bold text-foreground leading-none tracking-tighter">
                  Unsere <br /> <span className="italic font-light text-foreground/40">Werte.</span>
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-foreground/40 leading-relaxed font-light max-w-md">
                  Qualität ist kein Zufall. Es ist das Ergebnis von bewussten Entscheidungen, die wir jeden Tag aufs Neue treffen.
                </p>
                <div className="w-16 h-[3px] bg-accent-rose/20 rounded-full" />
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
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
                  className="p-6 sm:p-8 md:p-10 glass-premium rounded-[32px] md:rounded-[48px] space-y-4 md:space-y-6 hover:bg-white transition-all duration-700 shadow-sm"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-foreground text-background flex items-center justify-center shadow-lg">
                    <value.icon className="w-5 h-5 md:w-7 md:h-7" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{value.title}</h3>
                  <p className="text-sm md:text-base text-foreground/50 leading-relaxed font-light">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                <div className="aspect-[3/4] rounded-[32px] md:rounded-[48px] overflow-hidden glass-premium translate-y-6 md:translate-y-12">
                  <img src="https://images.unsplash.com/photo-1516575150278-7718028e1924?q=80&w=800&auto=format&fit=crop" alt="Workshop 1" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[3/4] rounded-[32px] md:rounded-[48px] overflow-hidden glass-premium">
                  <img src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=800&auto=format&fit=crop" alt="Workshop 2" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-8 md:space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-foreground leading-tight tracking-tighter">
                  Der Ort der <br /> <span className="italic font-light text-foreground/40">Stille.</span>
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-foreground/50 leading-relaxed font-light">
                  Unser Atelier in Sarmenstorf ist mehr als nur eine Werkstatt. Es ist ein Rückzugsort, an dem wir uns die Zeit nehmen, die Dinge richtig zu machen.
                </p>
              </div>
              <Link href="/contact" className="group relative inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-5 bg-foreground text-background font-bold rounded-2xl overflow-hidden transition-all duration-700 hover:scale-105 active:scale-95 shadow-2xl">
                <div className="absolute inset-0 bg-accent-rose translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-3 text-base md:text-lg">
                  Besuchen Sie uns <PenTool className="w-5 h-5 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Section */}
      <section className="section-padding px-4 sm:px-6 bg-footer-bg relative overflow-hidden">
        <div className="absolute inset-0 fabric-pattern opacity-[0.06] pointer-events-none" />
        <div className="container mx-auto max-w-3xl text-center">
          <Quote className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-accent-rose/20 mx-auto mb-8 md:mb-12" />
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-foreground leading-tight tracking-tighter mb-10 md:mb-16 italic font-light">
            "Wir erschaffen nicht einfach Produkte. Wir erschaffen Begleiter für ein ganzes Leben."
          </h3>
          <div className="inline-flex flex-col items-center gap-2">
            <div className="w-16 h-[2px] bg-accent-rose/30 mb-3" />
            <p className="text-xl md:text-2xl font-serif font-bold text-foreground">Ihre Jlonka Dubach</p>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-foreground/40 font-bold">Inhaberin Nähsüchtig</p>
          </div>
        </div>
      </section>
    </div>
  );
}
