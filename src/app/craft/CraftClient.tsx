"use client";

import { motion } from "framer-motion";
import { ArrowRight, Scissors, Ruler, Sparkles } from "lucide-react";
import Link from "next/link";
import CMSImage from "@/components/CMSImage";

interface CraftClientProps {
  cmsImageMap: Record<string, { url: string; alt: string; label: string }>;
}

export default function CraftClient({ cmsImageMap }: CraftClientProps) {
  return (
    <div className="flex flex-col pt-24 md:pt-32">
      {/* Hero */}
      <section className="section-padding px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 fabric-pattern opacity-[0.03] pointer-events-none" />
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 lg:mb-24">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold uppercase tracking-[0.4em] text-accent-rose mb-4 md:mb-6 block"
            >
              Unsere Philosophie
            </motion.span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-foreground leading-[0.9] tracking-tighter mb-6 md:mb-10">
              Handwerk <br /> <span className="italic font-light text-foreground/40">erleben.</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-foreground/50 leading-relaxed font-light">
              In unserem Atelier in Zürich zelebrieren wir die Kunst des Langsam-Seins. Jedes Produkt ist ein Unikat, gefertigt mit Geduld und höchster Präzision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {[
              { icon: Scissors, title: "Präzision", desc: "Jeder Schnitt wird von Hand geführt, um die perfekte Form zu gewährleisten." },
              { icon: Ruler, title: "Massarbeit", desc: "Wir passen unsere Designs individuell an die Bedürfnisse unserer Kunden an." },
              { icon: Sparkles, title: "Veredelung", desc: "Nur die feinsten Materialien finden den Weg in unsere Werkstatt." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 sm:p-8 md:p-10 lg:p-12 glass-premium rounded-[32px] md:rounded-[48px] space-y-4 md:space-y-6 group hover:bg-accent-blue/10 transition-colors duration-500"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-foreground text-background flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                  <feature.icon className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{feature.title}</h3>
                <p className="text-sm md:text-base text-foreground/50 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Visual */}
      <section className="section-padding px-4 sm:px-6 bg-surface-light">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-square rounded-[40px] md:rounded-[64px] overflow-hidden glass-premium shadow-2xl">
                <CMSImage
                  src={cmsImageMap["craft_atelier"]?.url}
                  alt={cmsImageMap["craft_atelier"]?.alt || "Atelier"}
                  className="w-full h-full object-cover"
                  label={cmsImageMap["craft_atelier"]?.label || "Atelier Bild"}
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent-blue/30 rounded-full blur-[80px] -z-10 hidden md:block" />
            </div>
            <div className="space-y-6 md:space-y-8 lg:space-y-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-foreground tracking-tighter leading-none">
                Tradition <br /> trifft <span className="italic font-light text-foreground/40">Innovation.</span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-foreground/50 leading-relaxed font-light">
                Unsere Werkstatt ist ein Ort der Stille und der Konzentration. Hier verbinden wir altbewährte Techniken mit modernem Design, um Produkte zu schaffen, die Generationen überdauern.
              </p>
              <div className="pt-2">
                <Link href="/shop" className="group flex items-center gap-3 text-xl md:text-2xl font-serif font-bold text-foreground hover:text-accent-rose transition-colors">
                  Produkte ansehen <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
