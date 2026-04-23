"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundSystem() {
  const [particles, setParticles] = useState<{ top: string; left: string; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate particles only on the client to avoid hydration mismatch
    const newParticles = [...Array(6)].map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 10 + i * 2,
      delay: i * 1.5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-background">
      {/* Global Texture Layers */}
      <div className="absolute inset-0 noise opacity-[0.03]" />
      <div className="absolute inset-0 fabric-pattern opacity-[0.02]" />

      {/* Ambient Glows - Refined & Premium */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent-rose/[0.03] rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-indigo/[0.03] rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "-2s" }} />
      
      {/* Subtle Geometric Soul */}
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] border border-black/[0.02] rounded-full" />
      <div className="absolute top-[15%] right-[15%] w-[400px] h-[400px] border border-black/[0.01] rounded-full rotate-45" />
      
      {/* Floating Artisan Particles */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.05, 0.1, 0.05],
              y: [0, -40, 0],
              x: [0, 20, 0]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay
            }}
            className="absolute w-1 h-1 bg-accent-rose/20 rounded-full"
            style={{
              top: p.top,
              left: p.left,
            }}
          />
        ))}
      </div>

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </div>
  );
}
