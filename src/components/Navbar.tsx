"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCartStore();
  const itemCount = totalItems();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Über Uns", href: "/about" },
    { name: "Handwerk", href: "/craft" },
    { name: "Kontakt", href: "/contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className={`relative flex items-center justify-between rounded-[32px] transition-all duration-700 px-10 ${
          isScrolled ? "glass-premium py-4" : "py-4"
        }`}>
          {/* Stitch Border on Scroll */}
          {isScrolled && (
            <div className="absolute bottom-0 left-10 right-10 h-[2px] stitch-border opacity-20" />
          )}

          {/* Left: Logo & Brand */}
          <Link href="/" className="flex items-center gap-5 group">
            <div className="w-12 h-12 rounded-2xl bg-foreground flex items-center justify-center text-background font-bold text-2xl shadow-xl group-hover:rotate-6 transition-transform duration-500">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-2xl tracking-tight text-foreground leading-none">
                Nähsüchtig
              </span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-accent-rose font-bold mt-1">Artisan Atelier</span>
            </div>
          </Link>

          {/* Center: Navigation Links */}
          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[11px] font-bold uppercase tracking-[0.4em] text-foreground/40 hover:text-accent-rose transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-accent-rose transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-6">
            <button className="hidden md:flex p-2 text-foreground/30 hover:text-accent-rose transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <div className="w-[1px] h-4 bg-black/[0.05] hidden md:block" />
            <Link href="/cart" className="relative group">
              <div className="w-12 h-12 rounded-2xl glass border-black/[0.08] flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-700 shadow-sm">
                <ShoppingCart className="w-5 h-5" />
              </div>
              {mounted && itemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  key={itemCount}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-accent-rose text-[11px] font-bold text-white flex items-center justify-center rounded-full border-2 border-background shadow-lg shadow-accent-rose/20 z-10"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>
            <button 
              className="lg:hidden p-3 text-foreground/60 hover:text-foreground transition-all"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[60] bg-background p-10 flex flex-col"
          >
            <div className="flex justify-between items-center mb-20">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center text-background font-bold text-xl">N</div>
                <span className="font-serif font-bold text-2xl text-foreground">Nähsüchtig</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-black/[0.03] rounded-full text-foreground/60 hover:text-foreground"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-6xl font-serif font-bold text-foreground hover:text-accent-rose transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
