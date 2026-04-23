export default function DatenschutzPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 text-foreground">Datenschutzerklärung</h1>
        
        <div className="glass border-black/[0.05] p-8 md:p-12 rounded-[32px] space-y-12">
          <section>
            <h2 className="text-xl font-bold mb-4 text-foreground">1. Datenschutz auf einen Blick</h2>
            <p className="text-foreground/60 leading-relaxed">
              Verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist Made by Nähsüchtig. Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-foreground">2. Datenerfassung auf unserer Website</h2>
            <p className="text-foreground/60 leading-relaxed">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben oder bei einer Bestellung hinterlassen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-foreground">3. Analyse-Tools und Tools von Drittanbietern</h2>
            <p className="text-foreground/60 leading-relaxed">
              Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-foreground">4. Ihre Rechte</h2>
            <p className="text-foreground/60 leading-relaxed">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
