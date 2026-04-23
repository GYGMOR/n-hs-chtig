import { Mail, Phone } from "lucide-react";

export default function ImpressumPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 text-foreground">Impressum</h1>
        
        <div className="glass border-black/[0.05] p-8 md:p-12 rounded-[32px] space-y-12">
          <section>
            <h2 className="text-xl font-bold mb-4 text-foreground">Betreiber der Website</h2>
            <p className="text-foreground/60 leading-relaxed">
              Made by Nähsüchtig<br />
              Elena Weber<br />
              Atelierstrasse 12<br />
              8004 Zürich<br />
              Schweiz
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-foreground">Kontakt</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-foreground/60">
                <Mail className="w-5 h-5 text-accent-rose" />
                <span>hello@naehsuechtig.ch</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/60">
                <Phone className="w-5 h-5 text-accent-rose" />
                <span>+41 44 123 45 67</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-foreground">Handelsregister</h2>
            <p className="text-foreground/60 leading-relaxed">
              Eingetragener Firmenname: Made by Nähsüchtig<br />
              Nummer: CHE-123.456.789<br />
              Handelsregisteramt: Zürich
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-foreground">Mehrwertsteuer</h2>
            <p className="text-foreground/60 leading-relaxed">
              MWST-Nummer: CHE-123.456.789 MWST
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-foreground">Haftungsausschluss</h2>
            <p className="text-foreground/60 leading-relaxed">
              Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
