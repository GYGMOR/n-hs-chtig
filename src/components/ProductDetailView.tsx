"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  active: boolean;
  category: { id: number; name: string };
}

export default function ProductDetailView({ product }: { product: Product }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  function handleAdd() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? "",
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors mb-12 font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Zurück zum Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-surface-light">
              {product.images[currentImage] && (
                <Image
                  src={product.images[currentImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImage((i) => (i - 1 + product.images.length) % product.images.length)
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-xl flex items-center justify-center shadow hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImage((i) => (i + 1) % product.images.length)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-xl flex items-center justify-center shadow hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${
                      i === currentImage ? "border-foreground" : "border-transparent"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <span className="text-sm text-accent-rose font-medium uppercase tracking-widest mb-4">
              {product.category.name}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-display font-bold text-foreground mb-8">
              CHF {product.price.toFixed(2)}
            </p>
            <p className="text-foreground/60 leading-relaxed mb-10 text-lg">
              {product.description}
            </p>

            <motion.button
              onClick={handleAdd}
              whileTap={{ scale: 0.97 }}
              className={`w-full h-16 font-bold rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 text-lg ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-foreground text-background hover:bg-accent-rose hover:text-white"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" /> Zum Warenkorb hinzugefügt
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" /> In den Warenkorb
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
