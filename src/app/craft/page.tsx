"use client";

import { motion } from "framer-motion";
import { ArrowRight, Scissors, Ruler, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CraftPage() {
  return (
    <div className="flex flex-col pt-32">
      {/* Hero Section */}
      <section className="section-padding px-6 relative overflow-hidden">
        <div className="absolute inset-0 fabric-pattern opacity-[0.03] pointer-events-none" />
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-4xl mx-auto mb-24">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold uppercase tracking-[0.4em] text-accent-rose mb-6 block"
            >
              Unsere Philosophie
            </motion.span>
            <h1 className="text-7xl md:text-9xl font-serif font-bold text-foreground leading-[0.85] tracking-tighter mb-10">
              Handwerk <br /> <span className="italic font-light text-foreground/40">erleben.</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/50 leading-relaxed font-light">
              In unserem Atelier in Zürich zelebrieren wir die Kunst des Langsam-Seins. Jedes Produkt ist ein Unikat, gefertigt mit Geduld und höchster Präzision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
                className="p-12 glass-premium rounded-[48px] space-y-6 group hover:bg-accent-blue/10 transition-colors duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-foreground text-background flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-foreground">{feature.title}</h3>
                <p className="text-foreground/50 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Visual */}
      <section className="section-padding px-6 bg-surface-light">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-square rounded-[64px] overflow-hidden glass-premium shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1516575150278-7718028e1924?q=80&w=1200&auto=format&fit=crop"
                  alt="Atelier"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent-blue/30 rounded-full blur-[80px] -z-10" />
            </div>
            <div className="space-y-10">
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-foreground tracking-tighter leading-none">
                Tradition <br /> trifft <span className="italic font-light text-foreground/40">Innovation.</span>
              </h2>
              <p className="text-xl text-foreground/50 leading-relaxed font-light">
                Unsere Werkstatt ist ein Ort der Stille und der Konzentration. Hier verbinden wir altbewährte Techniken mit modernem Design, um Produkte zu schaffen, die Generationen überdauern.
              </p>
              <div className="pt-6">
                <Link href="/shop" className="group flex items-center gap-4 text-2xl font-serif font-bold text-foreground">
                  Produkte ansehen <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
