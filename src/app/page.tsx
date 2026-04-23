import Hero from "@/components/Hero";
import { ArrowRight, Star, ShieldCheck, Zap, ShoppingCart } from "lucide-react";
import Link from "next/link";
import * as motion from "framer-motion/client";

const featuredProducts = [
  {
    id: 1,
    name: "Artisan Leder-Shopper",
    price: "249.00",
    category: "Taschen",
    image: "https://images.unsplash.com/photo-1544816153-0973059430c5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Keramik-Vase 'Minimalist'",
    price: "89.00",
    category: "Wohnen",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Leinen-Kissenbezug",
    price: "65.00",
    category: "Textilien",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop",
  },
];

const trustBadges = [
  { icon: Star, label: "Erstklassige Qualität", sub: "Handverlesene Materialien" },
  { icon: ShieldCheck, label: "Schweizer Handarbeit", sub: "Lokale Kunstfertigkeit" },
  { icon: Zap, label: "Schnelle Lieferung", sub: "Sicher verpackt" },
  { icon: ShieldCheck, label: "Limitierte Auflagen", sub: "Einzigartige Kreationen" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      {/* Trust Badges */}
      <section className="py-24 border-y border-black/[0.03] bg-background relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20">
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-6 group">
                <div className="w-20 h-20 rounded-[28px] glass border-black/[0.05] flex items-center justify-center text-accent-rose group-hover:scale-110 group-hover:bg-accent-rose group-hover:text-white transition-all duration-700 shadow-sm">
                  <badge.icon className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-base text-foreground tracking-tight">{badge.label}</h4>
                  <p className="text-[10px] text-foreground/30 uppercase tracking-[0.2em] font-bold">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="section-padding px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-rose/5 rounded-full blur-[120px] -z-10" />
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-xs font-bold uppercase tracking-[0.4em] text-accent-rose mb-6 block"
              >
                Kollektion
              </motion.span>
              <h2 className="text-5xl md:text-8xl font-serif font-bold text-foreground leading-[0.9] tracking-tighter">
                Kuratierte <br /> <span className="italic font-light text-foreground/60">Meisterstücke</span>
              </h2>
            </div>
            <Link href="/shop" className="group flex items-center gap-4 text-foreground/40 hover:text-foreground transition-all duration-500 pb-3 border-b-2 border-black/[0.05] hover:border-accent-rose font-bold text-lg">
              Kollektion entdecken <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group"
              >
                <Link href={`/shop/${product.id}`}>
                  <div className="aspect-[4/5] rounded-[48px] overflow-hidden glass-premium mb-10 relative">
                    <div className="absolute inset-0 fabric-pattern opacity-0 group-hover:opacity-[0.06] transition-opacity duration-1000" />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute top-10 right-10">
                      <div className="w-16 h-16 rounded-2xl glass-premium flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0 shadow-2xl">
                        <ShoppingCart className="w-7 h-7" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[4px] stitch-border opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  </div>
                </Link>
                <div className="flex justify-between items-start px-4">
                  <div className="space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.3em] text-accent-rose font-bold block">
                      {product.category}
                    </span>
                    <h3 className="text-3xl font-serif font-bold text-foreground group-hover:text-accent-rose transition-colors duration-500 tracking-tight">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-2xl font-serif font-bold text-foreground/30 group-hover:text-foreground transition-colors duration-500">
                    CHF {product.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section - Redesigned Asymmetric */}
      <section className="section-padding px-6 bg-background relative overflow-hidden">
        <div className="absolute inset-0 fabric-pattern opacity-[0.03] pointer-events-none" />
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center">
            {/* Image Column - 7/12 */}
            <div className="lg:col-span-7 relative">
              <div className="aspect-[16/10] rounded-[64px] overflow-hidden glass-premium relative z-10 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.15)]">
                <img
                  src="https://images.unsplash.com/photo-1452830978618-d6feae7d0ffa?q=80&w=1200&auto=format&fit=crop"
                  alt="Artisan Craftsmanship"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-rose/10 via-transparent to-transparent" />
              </div>
              
              {/* Overlapping Floating Element */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                className="absolute -right-8 -bottom-16 w-80 p-12 glass-premium rounded-[48px] z-20 hidden lg:block"
              >
                <div className="space-y-4">
                  <p className="text-6xl font-serif font-bold text-accent-rose leading-none">10+</p>
                  <p className="text-xs uppercase tracking-[0.4em] text-foreground/40 font-bold">Jahre gelebtes <br />Kunsthandwerk</p>
                  <div className="pt-8">
                    <div className="w-16 h-[3px] stitch-border opacity-30" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content Column - 5/12 */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-xs font-bold uppercase tracking-[0.5em] text-accent-rose block"
                >
                  Philosophie
                </motion.span>
                <h2 className="text-6xl md:text-8xl font-serif font-bold mb-10 leading-[0.9] text-foreground tracking-tighter">
                  Jeder Stich <br /> hat eine <span className="italic font-light text-foreground/50">Seele</span>.
                </h2>
              </div>
              
              <p className="text-xl md:text-2xl text-foreground/50 leading-relaxed font-light">
                In unserem Atelier in Zürich verbinden wir die Stille der Konzentration mit der Präzision der Handarbeit. Wir glauben nicht an Trends, sondern an bleibende Werte.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-4">
                {[
                  { label: "Materialien", val: "Pflanzlich gegerbt" },
                  { label: "Herstellung", val: "100% Manufaktur" },
                ].map((stat, i) => (
                  <div key={i} className="space-y-3">
                    <p className="text-[11px] uppercase tracking-[0.4em] text-foreground/30 font-bold">{stat.label}</p>
                    <p className="text-2xl font-serif font-bold text-foreground tracking-tight">{stat.val}</p>
                    <div className="w-12 h-[4px] bg-accent-rose/20 rounded-full" />
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <Link href="/about" className="group relative inline-flex items-center gap-5 px-14 py-6 bg-foreground text-background font-bold rounded-2xl overflow-hidden transition-all duration-700 hover:scale-105 active:scale-95 shadow-2xl">
                  <div className="absolute inset-0 bg-accent-rose translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                  <span className="relative z-10 flex items-center gap-4 text-lg">
                    Unsere Geschichte <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

