"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.error ?? "Fehler");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-surface-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-8">
          <Lock className="w-7 h-7 text-background" />
        </div>
        <h1 className="text-3xl font-display font-bold text-center mb-2 text-foreground">
          Admin Portal
        </h1>
        <p className="text-foreground/40 text-center mb-8 text-sm">
          Made by Nähsüchtig
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white border border-black/[0.08] rounded-xl focus:outline-none focus:border-accent-rose transition-colors text-foreground"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-foreground text-background font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-accent-rose hover:text-white transition-all duration-300 disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Anmelden"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
