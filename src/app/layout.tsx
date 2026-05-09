import type { Metadata } from "next";
import { Inter, Outfit, Fraunces } from "next/font/google";
import "./globals.css";
import ShopShell from "@/components/ShopShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  axes: ["SOFT", "WONK"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nähsüchtig | Artisan Atelier Zürich",
  description: "Handgefertigte Unikate, die Tradition und zeitlose Eleganz vereinen. Entdecken Sie unser Handwerk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${outfit.variable} ${fraunces.variable} h-full antialiased selection:bg-accent-rose/10`}
    >
      <body className="min-h-full bg-background font-sans text-foreground overflow-x-hidden">
        <ShopShell>{children}</ShopShell>
      </body>
    </html>
  );
}
