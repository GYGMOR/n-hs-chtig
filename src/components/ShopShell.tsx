"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundSystem from "@/components/BackgroundSystem";

export default function ShopShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <BackgroundSystem />
      <Navbar />
      <main className="relative z-10 flex min-h-screen flex-col">
        <div className="flex-grow">{children}</div>
        <Footer />
      </main>
    </>
  );
}
