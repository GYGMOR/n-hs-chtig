"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/customer/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/portal");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Anmeldung fehlgeschlagen");
    }
    setLoading(false);
  }

  const fieldClass = "w-full bg-black/[0.03] border-none rounded-2xl py-5 px-8 text-foreground placeholder:text-foreground/20 focus:ring-2 focus:ring-accent-rose/20 transition-all outline-none";

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-32 pb-16 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center text-background font-bold text-3xl shadow-2xl">
              N
            </div>
            <span className="font-serif font-bold text-2xl tracking-tight text-foreground">Nähsüchtig</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-accent-rose font-bold">Kunden-Login</span>
          </Link>
        </div>

        <div className="glass-premium p-10 md:p-12 rounded-[48px] shadow-2xl">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Willkommen zurück</h1>
          <p className="text-foreground/40 text-sm mb-8">Melden Sie sich an, um Ihre Bestellungen einzusehen.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold px-2">E-Mail</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="hallo@beispiel.ch"
                className={fieldClass}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold">Passwort</label>
                <Link href="/forgot-password" className="text-[10px] text-accent-rose font-semibold hover:underline uppercase tracking-widest">Vergessen?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  className={fieldClass + " pr-14"}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60 transition-colors"
                >
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm px-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative py-5 bg-foreground text-background font-bold rounded-2xl overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-95 shadow-2xl flex items-center justify-center gap-3 disabled:opacity-60 mt-2"
            >
              <div className="absolute inset-0 bg-accent-rose translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-3">
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                Anmelden
              </span>
            </button>
          </form>

          <p className="text-center text-sm text-foreground/40 mt-8">
            Noch kein Konto?{" "}
            <Link href="/register" className="text-accent-rose font-semibold hover:underline">
              Jetzt registrieren
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
