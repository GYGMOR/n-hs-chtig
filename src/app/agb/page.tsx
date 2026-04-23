export default function AGBPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 text-foreground">Allgemeine Geschäftsbedingungen</h1>
        
        <div className="glass border-black/[0.05] p-8 md:p-12 rounded-[32px] space-y-12">
          <section>
            <h2 className="text-xl font-bold mb-4 text-foreground">1. Geltungsbereich</h2>
            <p className="text-foreground/60 leading-relaxed">
              Für alle Bestellungen über unsere Website gelten die nachfolgenden AGB. Unser Angebot richtet sich an Kunden mit Wohnsitz in der Schweiz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-foreground">2. Vertragspartner</h2>
            <p className="text-foreground/60 leading-relaxed">
              Der Kaufvertrag kommt zustande mit Made by Nähsüchtig.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-foreground">3. Vertragsabschluss</h2>
            <p className="text-foreground/60 leading-relaxed">
              Durch Anklicken des Bestellbuttons geben Sie ein verbindliches Angebot ab. Die Bestätigung des Eingangs Ihrer Bestellung erfolgt zusammen mit der Annahme der Bestellung unmittelbar nach dem Absenden durch eine automatisierte E-Mail.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-foreground">4. Preise und Versandkosten</h2>
            <p className="text-foreground/60 leading-relaxed">
              Die auf den Produktseiten genannten Preise enthalten die gesetzliche Mehrwertsteuer und sonstige Preisbestandteile. Zusätzlich zu den angegebenen Preisen berechnen wir für die Lieferung innerhalb der Schweiz Versandkosten.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-foreground">5. Lieferung</h2>
            <p className="text-foreground/60 leading-relaxed">
              Die Lieferung erfolgt nur innerhalb der Schweiz. Die Lieferzeit beträgt, sofern nicht anders angegeben, 2 bis 4 Werktage.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
