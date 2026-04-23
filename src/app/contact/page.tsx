"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col pt-32">
      <section className="section-padding px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Left: Contact Info */}
            <div className="space-y-16">
              <div>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-bold uppercase tracking-[0.4em] text-accent-rose mb-6 block"
                >
                  Kontakt
                </motion.span>
                <h1 className="text-7xl md:text-9xl font-serif font-bold text-foreground leading-[0.85] tracking-tighter mb-10">
                  Lass uns <br /> <span className="italic font-light text-foreground/40">reden.</span>
                </h1>
                <p className="text-xl text-foreground/50 leading-relaxed font-light max-w-md">
                  Haben Sie Fragen zu unseren Produkten oder wünschen Sie eine individuelle Beratung? Wir sind für Sie da.
                </p>
              </div>

              <div className="space-y-10">
                {[
                  { icon: Mail, label: "E-Mail", val: "hello@naehsuechtig.ch" },
                  { icon: Phone, label: "Telefon", val: "+41 44 123 45 67" },
                  { icon: MapPin, label: "Atelier", val: "Kirchweg 2, 5614 Sarmenstorf" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-8 group">
                    <div className="w-16 h-16 rounded-2xl bg-surface-light text-accent-rose flex items-center justify-center group-hover:bg-accent-rose group-hover:text-white transition-all duration-500 shadow-sm">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-bold mb-1">{item.label}</p>
                      <p className="text-xl font-serif font-bold text-foreground">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-accent-blue/10 rounded-[64px] blur-[100px] -z-10" />
              <div className="glass-premium p-12 md:p-16 rounded-[64px] shadow-2xl relative">
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold px-2">Name</label>
                      <input type="text" className="w-full bg-black/[0.03] border-none rounded-2xl py-5 px-8 text-foreground placeholder:text-foreground/20 focus:ring-2 focus:ring-accent-rose/20 transition-all outline-none" placeholder="Ihr Name" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold px-2">E-Mail</label>
                      <input type="email" className="w-full bg-black/[0.03] border-none rounded-2xl py-5 px-8 text-foreground placeholder:text-foreground/20 focus:ring-2 focus:ring-accent-rose/20 transition-all outline-none" placeholder="hallo@beispiel.ch" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold px-2">Nachricht</label>
                    <textarea rows={5} className="w-full bg-black/[0.03] border-none rounded-3xl py-6 px-8 text-foreground placeholder:text-foreground/20 focus:ring-2 focus:ring-accent-rose/20 transition-all outline-none resize-none" placeholder="Wie können wir Ihnen helfen?" />
                  </div>
                  <button className="w-full group relative py-6 bg-foreground text-background font-bold rounded-2xl overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-95 shadow-2xl flex items-center justify-center gap-4">
                    <div className="absolute inset-0 bg-accent-rose translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                    <span className="relative z-10 flex items-center gap-3 text-lg">
                      Nachricht senden <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-500" />
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
