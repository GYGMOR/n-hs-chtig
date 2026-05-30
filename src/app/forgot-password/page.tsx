"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    await fetch("/api/customer/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStatus("sent");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-32 pb-16 bg-background">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center text-background font-bold text-3xl shadow-2xl">N</div>
            <span className="font-serif font-bold text-2xl text-foreground">Nähsüchtig</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-accent-rose font-bold">Passwort vergessen</span>
          </Link>
        </div>

        <div className="glass-premium p-10 md:p-12 rounded-[48px] shadow-2xl">
          {status === "sent" ? (
            <div className="text-center py-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">E-Mail gesendet</h2>
              <p className="text-foreground/40 text-sm mb-8">Falls ein Konto mit dieser Adresse existiert, wurde ein Reset-Link gesendet. Bitte prüfe dein Postfach.</p>
              <Link href="/login" className="text-accent-rose font-semibold hover:underline text-sm">Zurück zum Login</Link>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Passwort vergessen?</h1>
              <p className="text-foreground/40 text-sm mb-8">Gib deine E-Mail ein – wir schicken dir einen Reset-Link.</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold px-2">E-Mail</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hallo@beispiel.ch"
                    className="w-full bg-black/[0.03] border-none rounded-2xl py-5 px-8 text-foreground placeholder:text-foreground/20 focus:ring-2 focus:ring-accent-rose/20 outline-none" />
                </div>
                <button type="submit" disabled={status === "loading"}
                  className="w-full group relative py-5 bg-foreground text-background font-bold rounded-2xl overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-95 shadow-2xl flex items-center justify-center gap-3 disabled:opacity-60">
                  <div className="absolute inset-0 bg-accent-rose translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                  <span className="relative z-10 flex items-center gap-3">
                    {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                    Reset-Link senden
                  </span>
                </button>
              </form>
              <p className="text-center text-sm text-foreground/40 mt-8">
                <Link href="/login" className="text-accent-rose font-semibold hover:underline">Zurück zum Login</Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
