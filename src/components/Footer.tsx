import Link from "next/link";
import { Facebook, Instagram, X, Mail, MapPin, ArrowRight, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-footer-bg border-t border-accent-rose/10 pt-24 pb-16 px-6 relative overflow-hidden">
      {/* Artisan Background Texture */}
      <div className="absolute inset-0 fabric-pattern opacity-[0.06] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[2px] stitch-border opacity-10" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          {/* Brand & Soul */}
          <div className="lg:col-span-4 space-y-10">
            <Link href="/" className="inline-flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center text-background font-bold text-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500">
                N
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl tracking-tight text-foreground leading-none">
                  Nähsüchtig
                </span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-accent-rose font-bold mt-1">Artisan Atelier</span>
              </div>
            </Link>
            <p className="text-foreground/60 text-lg leading-relaxed font-light">
              Wir erschaffen handgefertigte Unikate, die Tradition und zeitlose Eleganz vereinen. Jedes Stück ist ein Bekenntnis zu Qualität und Beständigkeit.
            </p>
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent-rose font-bold">Atelier</p>
              <p className="text-sm text-foreground/50 font-light">
                Kirchweg 2 <br />
                5614 Sarmenstorf <br />
                Aargau, Schweiz
              </p>
            </div>
            <div className="flex items-center gap-5">
              {[{ Icon: Instagram, href: "#" }, { Icon: Facebook, href: "#" }, { Icon: X, href: "#" }].map((social, i) => (
                <Link key={i} href={social.href} className="w-12 h-12 rounded-full glass-premium flex items-center justify-center text-foreground/50 hover:text-accent-rose hover:scale-110 transition-all duration-500 shadow-sm">
                  <social.Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-12">
            <div className="space-y-8">
              <h4 className="font-serif font-bold text-lg text-foreground uppercase tracking-widest">Kollektion</h4>
              <ul className="space-y-5">
                {["Alle Produkte", "Neuheiten", "Bestseller", "Limitierte Editionen"].map((item) => (
                  <li key={item}>
                    <Link href="/shop" className="text-foreground/50 text-sm hover:text-accent-rose hover:translate-x-2 transition-all duration-300 inline-block font-medium">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="font-serif font-bold text-lg text-foreground uppercase tracking-widest">Atelier</h4>
              <ul className="space-y-5">
                {["Handwerk", "Der Prozess", "Nachhaltigkeit", "Kontakt"].map((item) => (
                  <li key={item}>
                    <Link href="/about" className="text-foreground/50 text-sm hover:text-accent-rose hover:translate-x-2 transition-all duration-300 inline-block font-medium">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter & Badge */}
          <div className="lg:col-span-3 space-y-12">
            <div className="space-y-6">
              <h4 className="font-serif font-bold text-lg text-foreground uppercase tracking-widest">Inspiration</h4>
              <p className="text-foreground/40 text-sm font-light">Erhalten Sie Einblicke in neue Kollektionen und den Entstehungsprozess.</p>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Ihre E-Mail" 
                  className="w-full bg-white border border-black/[0.05] rounded-2xl py-5 px-6 focus:outline-none focus:border-accent-rose transition-all duration-500 text-sm shadow-sm"
                />
                <button className="absolute right-3 top-3 bottom-3 w-12 bg-foreground text-background rounded-xl flex items-center justify-center hover:bg-accent-rose transition-all duration-500 shadow-lg group-hover:scale-105">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 rounded-[32px] glass-premium flex items-center gap-5 border-white/50">
              <div className="w-12 h-12 rounded-2xl bg-accent-rose/10 flex items-center justify-center text-accent-rose">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Crafted in</span>
                <span className="text-sm font-bold text-foreground">Switzerland</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-black/[0.05] flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-foreground/30 text-[11px] uppercase tracking-[0.3em] font-bold">
            © {new Date().getFullYear()} Nähsüchtig. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-12">
            {["Impressum", "AGB", "Datenschutz"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="text-foreground/30 text-[11px] uppercase tracking-[0.3em] font-bold hover:text-accent-rose transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Created by */}
        <div className="pt-10 flex flex-col items-center gap-4">
          <p className="text-foreground/20 text-[10px] uppercase tracking-[0.4em] font-bold">Created & developed by</p>
          <a
            href="https://hed-it.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-40 hover:opacity-100 transition-opacity duration-500"
          >
            <img
              src="/create/logo.png"
              alt="hed-it.ch"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
