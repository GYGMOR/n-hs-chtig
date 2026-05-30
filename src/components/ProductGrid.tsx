"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  images: string[];
  stock: number;
  category: Category;
}

interface Props {
  products: Product[];
  categories: Category[];
}

export default function ProductGrid({ products, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useCartStore();

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "Alle" || p.category.name === selectedCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
          <button
            onClick={() => setSelectedCategory("Alle")}
            className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              selectedCategory === "Alle"
                ? "bg-foreground text-background border-foreground"
                : "bg-surface-light text-foreground/50 border-black/[0.05] hover:border-black/20 hover:text-foreground"
            }`}
          >
            Alle
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                selectedCategory === cat.name
                  ? "bg-foreground text-background border-foreground"
                  : "bg-surface-light text-foreground/50 border-black/[0.05] hover:border-black/20 hover:text-foreground"
              }`}
            >
              {cat.name}
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
              <Link href={`/shop/${product.id}`}>
                <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-surface-light border border-black/[0.03] relative cursor-pointer">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                  {product.stock > 0 && product.stock <= 5 && (
                    <div className="absolute top-4 right-4 translate-y-0 md:translate-y-4 opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
                      <div className="px-3 py-1 bg-amber-500 text-white rounded-lg text-[10px] uppercase tracking-widest font-bold">
                        Nur noch {product.stock}
                      </div>
                    </div>
                  )}
                  {product.stock <= 0 && (
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 bg-red-500 text-white rounded-lg text-[10px] uppercase tracking-widest font-bold">
                        Ausverkauft
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-6 left-6 right-6 translate-y-0 md:translate-y-4 opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.images[0],
                          quantity: 1,
                        });
                      }}
                      className="w-full py-3 bg-foreground text-background font-bold rounded-xl hover:bg-accent-rose hover:text-white transition-colors"
                    >
                      In den Warenkorb
                    </button>
                  </div>
                </div>
              </Link>
              <div className="mt-6 flex justify-between items-start">
                <div>
                  <span className="text-xs font-medium uppercase tracking-widest text-foreground/30">
                    {product.category.name}
                  </span>
                  <h3 className="text-xl font-bold mt-1 group-hover:text-accent-rose transition-colors text-foreground">
                    {product.name}
                  </h3>
                </div>
                <p className="text-xl font-display font-bold text-foreground/90">
                  CHF {product.price.toFixed(2)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-foreground/30 text-xl italic">
            Keine Produkte gefunden.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("Alle");
              setSearchQuery("");
            }}
            className="mt-6 text-accent-rose font-bold hover:underline"
          >
            Alle Filter zurücksetzen
          </button>
        </div>
      )}
    </>
  );
}
