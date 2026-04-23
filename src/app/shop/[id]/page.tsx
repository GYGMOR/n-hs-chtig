"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Share2, ArrowLeft, Star, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const products = [
  { id: "1", name: "Artisan Leder-Shopper", price: 249, category: "Taschen", image: "https://images.unsplash.com/photo-1544816153-0973059430c5?q=80&w=800&auto=format&fit=crop", description: "Dieser erstklassige Leder-Shopper wird mit traditionellen pflanzlichen Gerbmethoden handgefertigt. Jedes Stück weist ein einzigartiges Narbenbild auf, das im Laufe der Zeit wunderschön altert. Geräumig genug für all deine Essentials und für ein ganzes Leben gebaut.", details: ["100% echtes italienisches Leder", "Handgenähte Nähte", "Innentasche zur Organisation", "Verstärkte Griffe"] },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Find product or use mock
  const product = products.find(p => p.id === id) || products[0];

  const images = [product.image, "https://images.unsplash.com/photo-1590674116497-336718509b91?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1452830978618-d6feae7d0ffa?q=80&w=800&auto=format&fit=crop"];

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <Link href="/shop" className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Zurück zum Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-[32px] overflow-hidden glass border-black/[0.03]"
            >
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-700"
              />
            </motion.div>
            <div className="grid grid-cols-3 gap-6">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-2xl overflow-hidden glass border-black/[0.03] transition-all duration-300 ${selectedImage === i ? "border-accent-rose ring-2 ring-accent-rose/10" : "opacity-50 hover:opacity-100"}`}
                >
                  <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-rose mb-4 block">{product.category}</span>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-foreground">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-accent-rose">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-foreground/30 text-sm">(24 Kundenbewertungen)</span>
              </div>
              <p className="text-3xl font-display font-bold text-foreground">CHF {product.price}.00</p>
            </div>

            <p className="text-foreground/60 leading-relaxed mb-12 text-lg">
              {product.description}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="flex-1 h-16 bg-foreground text-background font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-accent-rose hover:text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 group">
                <ShoppingCart className="w-5 h-5 group-hover:rotate-12 transition-transform" /> In den Warenkorb
              </button>
              <button className="w-16 h-16 glass border-black/[0.05] rounded-2xl flex items-center justify-center text-foreground/50 hover:text-red-500 hover:border-red-500/50 transition-all duration-300">
                <Heart className="w-6 h-6" />
              </button>
              <button className="w-16 h-16 glass border-black/[0.05] rounded-2xl flex items-center justify-center text-foreground/50 hover:text-accent-rose hover:border-accent-rose/50 transition-all duration-300">
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-black/[0.03] pt-12">
              {[
                { icon: ShieldCheck, title: "Lebenslange Garantie", desc: "Wir stehen zu unserer Handwerkskunst." },
                { icon: Truck, title: "Weltweiter Versand", desc: "Sicher verpackt für eine sichere Reise." },
              ].map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl glass border-black/[0.03] flex items-center justify-center text-accent-rose shrink-0">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 text-foreground">{f.title}</h4>
                    <p className="text-xs text-foreground/30">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Story Section */}
            <div className="mt-16 pt-16 border-t border-black/[0.03]">
              <h3 className="text-2xl font-display font-bold mb-8 italic text-foreground/80">"Jedes Objekt erzählt eine Geschichte..."</h3>
              <ul className="space-y-4">
                {product.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-4 text-foreground/70">
                    <div className="w-2 h-2 rounded-full bg-accent-rose" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

