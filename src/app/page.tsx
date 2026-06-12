import Hero from "@/components/Hero";
import { ArrowRight, Star, ShieldCheck, Zap, ShoppingCart } from "lucide-react";
import Link from "next/link";
import * as motion from "framer-motion/client";
import { prisma } from "@/lib/prisma";
import CMSImage from "@/components/CMSImage";

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

export const dynamic = "force-dynamic";

export default async function Home() {
  let cmsImages: any[] = [];
  let dbProducts: any[] = [];
  try {
    [cmsImages, dbProducts] = await Promise.all([
      prisma.websiteImage.findMany({
        where: { page: "home" },
      }),
      prisma.product.findMany({
        where: { active: true },
        take: 3,
        include: { category: true },
        orderBy: { createdAt: "desc" },
      }),
    ]);
  } catch (err) {
    console.error("Failed to fetch database items for Home page:", err);
  }

  const cmsImageMap = cmsImages.reduce((acc, img) => {
    acc[img.key] = img;
    return acc;
  }, {} as Record<string, typeof cmsImages[0]>);

  const productsToRender = dbProducts.length > 0
    ? dbProducts.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price.toFixed(2),
        category: p.category.name,
        image: p.images[0] || "",
      }))
    : featuredProducts;

  return (
    <div className="flex flex-col">

      <Hero />

      {/* Trust Badges */}
      <section className="py-12 md:py-16 lg:py-24 border-y border-black/[0.03] bg-background relative z-10">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 lg:gap-20">
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3 md:gap-6 group">
                <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-[20px] md:rounded-[28px] glass border-black/[0.05] flex items-center justify-center text-accent-rose group-hover:scale-110 group-hover:bg-accent-rose group-hover:text-white transition-all duration-700 shadow-sm">
                  <badge.icon className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h4 className="font-serif font-bold text-sm md:text-base text-foreground tracking-tight">{badge.label}</h4>
                  <p className="text-[9px] md:text-[10px] text-foreground/30 uppercase tracking-[0.2em] font-bold hidden sm:block">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="section-padding px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent-rose/5 rounded-full blur-[120px] -z-10" />
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10 mb-12 md:mb-16 lg:mb-24">
            <div className="max-w-2xl">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-xs font-bold uppercase tracking-[0.4em] text-accent-rose mb-4 md:mb-6 block"
              >
                Kollektion
              </motion.span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-serif font-bold text-foreground leading-[0.9] tracking-tighter">
                Kuratierte <br /> <span className="italic font-light text-foreground/60">Meisterstücke</span>
              </h2>
            </div>
            <Link href="/shop" className="group flex items-center gap-3 text-foreground/40 hover:text-foreground transition-all duration-500 pb-2 border-b-2 border-black/[0.05] hover:border-accent-rose font-bold text-base md:text-lg shrink-0">
              Kollektion entdecken <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {productsToRender.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group"
              >
                <Link href={`/shop/${product.id}`}>
                  <div className="aspect-[4/5] rounded-[32px] md:rounded-[48px] overflow-hidden glass-premium mb-6 md:mb-8 lg:mb-10 relative">
                    <div className="absolute inset-0 fabric-pattern opacity-0 group-hover:opacity-[0.06] transition-opacity duration-1000" />
                    <CMSImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                      label="Produktbild"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <div className="absolute top-6 right-6">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl glass-premium flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0 shadow-2xl">
                        <ShoppingCart className="w-5 h-5 md:w-7 md:h-7" />
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="flex justify-between items-start px-2">
                  <div className="space-y-1 md:space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-accent-rose font-bold block">
                      {product.category}
                    </span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-foreground group-hover:text-accent-rose transition-colors duration-500 tracking-tight">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-lg md:text-xl lg:text-2xl font-serif font-bold text-foreground/30 group-hover:text-foreground transition-colors duration-500 shrink-0 ml-2">
                    CHF {product.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Brand Story Section */}
      <section className="section-padding px-4 sm:px-6 bg-background relative overflow-hidden">
        <div className="absolute inset-0 fabric-pattern opacity-[0.03] pointer-events-none" />
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-20 xl:gap-32 items-center">
            <div className="lg:col-span-7 relative">
              <div className="aspect-[16/10] rounded-[40px] md:rounded-[64px] overflow-hidden glass-premium relative z-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
                <CMSImage
                  src={cmsImageMap["home_brand_story"]?.url}
                  alt={cmsImageMap["home_brand_story"]?.alt || "Artisan Craftsmanship"}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105"
                  label={cmsImageMap["home_brand_story"]?.label || "Philosophie Bild"}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-rose/10 via-transparent to-transparent pointer-events-none" />
              </div>

              <motion.div
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                className="absolute -right-4 md:-right-8 -bottom-10 md:-bottom-16 w-52 md:w-72 p-6 md:p-10 glass-premium rounded-[32px] md:rounded-[48px] z-20 hidden lg:block"
              >
                <div className="space-y-3">
                  <p className="text-4xl md:text-5xl font-serif font-bold text-accent-rose leading-none">10+</p>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/40 font-bold">Jahre gelebtes <br />Kunsthandwerk</p>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 space-y-8 md:space-y-10 lg:space-y-12">
              <div className="space-y-4 md:space-y-6">
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-xs font-bold uppercase tracking-[0.5em] text-accent-rose block"
                >
                  Philosophie
                </motion.span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-serif font-bold leading-[0.9] text-foreground tracking-tighter">
                  Jeder Stich <br /> hat eine <span className="italic font-light text-foreground/50">Seele</span>.
                </h2>
              </div>

              <p className="text-base md:text-lg lg:text-xl text-foreground/50 leading-relaxed font-light">
                In unserem Atelier in Zürich verbinden wir die Stille der Konzentration mit der Präzision der Handarbeit. Wir glauben nicht an Trends, sondern an bleibende Werte.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-4">
                {[
                  { label: "Materialien", val: "Pflanzlich gegerbt" },
                  { label: "Herstellung", val: "100% Manufaktur" },
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/30 font-bold">{stat.label}</p>
                    <p className="text-lg md:text-xl lg:text-2xl font-serif font-bold text-foreground tracking-tight">{stat.val}</p>
                    <div className="w-10 h-[3px] bg-accent-rose/20 rounded-full" />
                  </div>
                ))}
              </div>

              <div className="pt-4 md:pt-8">
                <Link href="/about" className="group relative inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 md:px-14 md:py-6 bg-foreground text-background font-bold rounded-2xl overflow-hidden transition-all duration-700 hover:scale-105 active:scale-95 shadow-2xl">
                  <div className="absolute inset-0 bg-accent-rose translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                  <span className="relative z-10 flex items-center gap-3 text-base md:text-lg">
                    Unsere Geschichte <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
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
