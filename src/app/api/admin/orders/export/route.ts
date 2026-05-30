import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/admin-auth";
import { cookies } from "next/headers";

async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) return new Response("Unauthorized", { status: 401 });
  return null;
}

function csvEscape(val: unknown): string {
  const str = String(val ?? "").replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET() {
  const denied = await auth();
  if (denied) return denied;

  const orders = await prisma.order.findMany({
    include: { items: { include: { product: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
  });

  const addr = (o: typeof orders[0]) => {
    const a = o.shippingAddress as { address?: string; city?: string; postalCode?: string; country?: string } | null;
    if (!a) return "";
    return `${a.address ?? ""}, ${a.postalCode ?? ""} ${a.city ?? ""}, ${a.country ?? ""}`;
  };

  const header = ["Bestellnummer", "Datum", "Kunde", "E-Mail", "Artikel", "Zwischensumme", "Versand", "Total", "Status", "Lieferadresse"];
  const rows = orders.map((o) => [
    o.id,
    new Date(o.createdAt).toLocaleDateString("de-CH"),
    o.customerName,
    o.customerEmail,
    o.items.map((i) => `${i.product.name} ×${i.quantity}`).join(" | "),
    o.subtotal.toFixed(2),
    o.shipping.toFixed(2),
    o.total.toFixed(2),
    o.status,
    addr(o),
  ]);

  const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\r\n");

  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="bestellungen-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
