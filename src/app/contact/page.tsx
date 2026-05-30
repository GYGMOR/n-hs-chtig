"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("success");
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.error ?? "Fehler beim Senden");
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col pt-32">
      <section className="section-padding px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Left: Contact Info */}
            <div className="space-y-16">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-bold uppercase tracking-[0.4em] text-accent-rose mb-6 block"
                >
                  Kontakt
                </motion.span>
                <h1 className="text-7xl md:text-9xl font-serif font-bold text-foreground leading-[0.85] tracking-tighter mb-10">
                  Lass uns <br /> <span className="italic font-light text-foreground/40">reden.</span>
                </h1>
                <p className="text-xl text-foreground/50 leading-relaxed font-light max-w-md">
                  Haben Sie Fragen zu unseren Produkten oder wünschen Sie eine individuelle Beratung? Wir sind für Sie da.
                </p>
              </div>

              <div className="space-y-10">
                {[
                  { icon: Mail, label: "E-Mail", val: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@naehsuechtig.ch" },
                  { icon: Phone, label: "Telefon", val: "+41 44 123 45 67" },
                  { icon: MapPin, label: "Atelier", val: "Kirchweg 2, 5614 Sarmenstorf" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-8 group">
                    <div className="w-16 h-16 rounded-2xl bg-surface-light text-accent-rose flex items-center justify-center group-hover:bg-accent-rose group-hover:text-white transition-all duration-500 shadow-sm">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-bold mb-1">{item.label}</p>
                      <p className="text-xl font-serif font-bold text-foreground">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-accent-blue/10 rounded-[64px] blur-[100px] -z-10" />
              <div className="glass-premium p-12 md:p-16 rounded-[64px] shadow-2xl relative">

                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center gap-6"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500" />
                    <h2 className="text-3xl font-serif font-bold text-foreground">Nachricht gesendet!</h2>
                    <p className="text-foreground/50 text-lg font-light max-w-sm">
                      Vielen Dank für Ihre Anfrage. Wir melden uns so schnell wie möglich bei Ihnen.
                    </p>
                    <button
                      onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}
                      className="mt-4 px-8 py-4 bg-foreground text-background rounded-2xl font-semibold text-sm hover:bg-accent-rose transition-colors"
                    >
                      Neue Nachricht
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold px-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          className="w-full bg-black/[0.03] border-none rounded-2xl py-5 px-8 text-foreground placeholder:text-foreground/20 focus:ring-2 focus:ring-accent-rose/20 transition-all outline-none"
                          placeholder="Ihr Name"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold px-2">E-Mail</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          className="w-full bg-black/[0.03] border-none rounded-2xl py-5 px-8 text-foreground placeholder:text-foreground/20 focus:ring-2 focus:ring-accent-rose/20 transition-all outline-none"
                          placeholder="hallo@beispiel.ch"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold px-2">Nachricht</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        className="w-full bg-black/[0.03] border-none rounded-3xl py-6 px-8 text-foreground placeholder:text-foreground/20 focus:ring-2 focus:ring-accent-rose/20 transition-all outline-none resize-none"
                        placeholder="Wie können wir Ihnen helfen?"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-red-500 text-sm px-2">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full group relative py-6 bg-foreground text-background font-bold rounded-2xl overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-95 shadow-2xl flex items-center justify-center gap-4 disabled:opacity-60"
                    >
                      <div className="absolute inset-0 bg-accent-rose translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                      <span className="relative z-10 flex items-center gap-3 text-lg">
                        Nachricht senden <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-500" />
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
