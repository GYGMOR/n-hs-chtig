"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const products = [
  { id: 1, name: "Artisan Leder-Shopper", price: 249, category: "Taschen", image: "https://images.unsplash.com/photo-1544816153-0973059430c5?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Minimalistische Keramik-Vase", price: 89, category: "Wohnen", image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Handgewebter Seidenschal", price: 129, category: "Kleidung", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "Holz-Servierbrett", price: 75, category: "Küche", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop" },
  { id: 5, name: "Leinen-Kissenbezug", price: 45, category: "Wohnen", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop" },
  { id: 6, name: "Schreibtischlampe aus Messing", price: 185, category: "Beleuchtung", image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=800&auto=format&fit=crop" },
];

const categories = ["Alle", "Taschen", "Wohnen", "Kleidung", "Küche", "Beleuchtung"];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useCartStore();

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "Alle" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6 text-foreground"
          >
            Die Kollektion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-foreground/50 max-w-2xl mx-auto text-lg"
          >
            Entdecke unsere sorgfältig kuratierte Auswahl an handgefertigten Kunsthandwerkswaren. Jedes Stück ist ein Unikat und mit Leidenschaft gefertigt.
          </motion.p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-foreground text-background border-foreground"
                    : "bg-surface-light text-foreground/50 border-black/[0.05] hover:border-black/20 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
              <input
                type="text"
                placeholder="Produkte suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-surface-light border border-black/[0.05] rounded-xl focus:outline-none focus:border-accent-rose transition-colors text-foreground"
              />
            </div>
            <button className="p-2 glass border-black/[0.05] rounded-xl hover:border-accent-rose transition-colors">
              <SlidersHorizontal className="w-5 h-5 text-foreground/70" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-surface-light border border-black/[0.03] relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="px-3 py-1 glass rounded-lg text-[10px] uppercase tracking-widest font-bold text-foreground">
                      Limitierte Auflage
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button 
                      onClick={() => addItem({ ...product, quantity: 1 })}
                      className="w-full py-3 bg-foreground text-background font-bold rounded-xl hover:bg-accent-rose hover:text-white transition-colors"
                    >
                      In den Warenkorb
                    </button>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <span className="text-xs font-medium uppercase tracking-widest text-foreground/30">{product.category}</span>
                    <h3 className="text-xl font-bold mt-1 group-hover:text-accent-rose transition-colors text-foreground">{product.name}</h3>
                  </div>
                  <p className="text-xl font-display font-bold text-foreground/90">CHF {product.price}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-foreground/30 text-xl italic">Keine Produkte gefunden, die deinen Kriterien entsprechen.</p>
            <button
              onClick={() => { setSelectedCategory("Alle"); setSearchQuery(""); }}
              className="mt-6 text-accent-rose font-bold hover:underline"
            >
              Alle Filter zurücksetzen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

