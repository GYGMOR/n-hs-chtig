"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Eye, EyeOff, CheckCircle } from "lucide-react";

function ResetForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Passwörter stimmen nicht überein"); return; }
    setStatus("loading"); setError("");
    const res = await fetch("/api/customer/reset-password", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password: form.password }),
    });
    if (res.ok) { setStatus("success"); }
    else { const d = await res.json(); setError(d.error ?? "Fehler"); setStatus("error"); }
  }

  const fieldClass = "w-full bg-black/[0.03] border-none rounded-2xl py-5 px-8 text-foreground placeholder:text-foreground/20 focus:ring-2 focus:ring-accent-rose/20 outline-none";

  return (
    <div className="glass-premium p-10 md:p-12 rounded-[48px] shadow-2xl">
      {status === "success" ? (
        <div className="text-center py-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Passwort gesetzt!</h2>
          <p className="text-foreground/40 text-sm mb-8">Du kannst dich jetzt mit deinem neuen Passwort anmelden.</p>
          <button onClick={() => router.push("/login")} className="px-8 py-4 bg-foreground text-background font-bold rounded-2xl hover:bg-accent-rose transition-colors">
            Zum Login
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Neues Passwort</h1>
          <p className="text-foreground/40 text-sm mb-8">Wähle ein sicheres Passwort mit mindestens 8 Zeichen.</p>
          {!token && <p className="text-red-500 text-sm mb-4">Ungültiger Reset-Link.</p>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold px-2">Neues Passwort</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} required minLength={8} value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} placeholder="Mindestens 8 Zeichen" className={fieldClass + " pr-14"} />
                <button type="button" onClick={() => setShowPw((p) => !p)} className="absolute right-5 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60">
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold px-2">Passwort bestätigen</label>
              <input type={showPw ? "text" : "password"} required value={form.confirm} onChange={(e) => setForm((p) => ({ ...p, confirm: e.target.value }))} placeholder="••••••••" className={fieldClass} />
            </div>
            {error && <p className="text-red-500 text-sm px-2">{error}</p>}
            <button type="submit" disabled={status === "loading" || !token}
              className="w-full group relative py-5 bg-foreground text-background font-bold rounded-2xl overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-95 shadow-2xl flex items-center justify-center gap-3 disabled:opacity-60">
              <div className="absolute inset-0 bg-accent-rose translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-3">
                {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                Passwort speichern
              </span>
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-32 pb-16 bg-background">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center text-background font-bold text-3xl shadow-2xl">N</div>
            <span className="font-serif font-bold text-2xl text-foreground">Nähsüchtig</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-accent-rose font-bold">Neues Passwort</span>
          </Link>
        </div>
        <Suspense fallback={<div className="glass-premium p-12 rounded-[48px] text-center text-foreground/40">Wird geladen…</div>}>
          <ResetForm />
        </Suspense>
      </motion.div>
    </div>
  );
}
