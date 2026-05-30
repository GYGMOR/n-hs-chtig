import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
  Font,
} from "@react-pdf/renderer";
import React from "react";
import type { OrderEmailData } from "./email";

Font.register({
  family: "Helvetica",
  fonts: [],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 48,
    backgroundColor: "#ffffff",
    color: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 40,
    paddingBottom: 24,
    borderBottom: "2px solid #f0e8e0",
  },
  logo: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 3,
  },
  logoSub: {
    fontSize: 8,
    letterSpacing: 4,
    color: "#c9696a",
    marginTop: 4,
    textTransform: "uppercase",
  },
  headerRight: {
    textAlign: "right",
  },
  label: {
    fontSize: 8,
    letterSpacing: 2,
    color: "#999",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  value: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 8,
    letterSpacing: 2,
    color: "#999",
    textTransform: "uppercase",
    marginBottom: 10,
    fontFamily: "Helvetica-Bold",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#faf8f5",
    padding: "8px 10px",
    marginBottom: 2,
  },
  tableHeaderText: {
    fontSize: 8,
    letterSpacing: 2,
    color: "#999",
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: "8px 10px",
    borderBottom: "1px solid #f0e8e0",
  },
  colProduct: { flex: 3 },
  colQty: { flex: 1, textAlign: "center" },
  colPrice: { flex: 1.5, textAlign: "right" },
  totalsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTop: "2px solid #f0e8e0",
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 240,
    paddingVertical: 4,
  },
  totalLabel: { color: "#666", fontSize: 10 },
  totalValue: { fontSize: 10, textAlign: "right" },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 240,
    paddingTop: 10,
    marginTop: 6,
    borderTop: "1px solid #f0e8e0",
  },
  grandTotalLabel: { fontFamily: "Helvetica-Bold", fontSize: 13 },
  grandTotalValue: { fontFamily: "Helvetica-Bold", fontSize: 13, textAlign: "right" },
  addressBox: {
    backgroundColor: "#faf8f5",
    padding: "14px 16px",
    borderRadius: 8,
  },
  addressText: {
    lineHeight: 1.6,
    color: "#1a1a1a",
    fontSize: 10,
  },
  footer: {
    position: "absolute",
    bottom: 32,
    left: 48,
    right: 48,
    textAlign: "center",
    fontSize: 8,
    color: "#999",
    letterSpacing: 1,
    borderTop: "1px solid #f0e8e0",
    paddingTop: 12,
  },
});

function OrderDocument({ order }: { order: OrderEmailData }) {
  const dateStr = new Date(order.createdAt).toLocaleDateString("de-CH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>NÄHSÜCHTIG</Text>
            <Text style={styles.logoSub}>Artisan Atelier</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.label}>Kaufbeleg</Text>
            <Text style={styles.value}>{order.orderId.slice(0, 8).toUpperCase()}</Text>
            <Text style={[styles.label, { marginTop: 8 }]}>Datum</Text>
            <Text style={{ fontSize: 10 }}>{dateStr}</Text>
          </View>
        </View>

        {/* Customer + Address */}
        <View style={{ flexDirection: "row", gap: 24, marginBottom: 32 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Rechnung an</Text>
            <View style={styles.addressBox}>
              <Text style={styles.addressText}>{order.customerName}</Text>
              <Text style={styles.addressText}>{order.customerEmail}</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Lieferadresse</Text>
            <View style={styles.addressBox}>
              <Text style={styles.addressText}>{order.shippingAddress.address}</Text>
              <Text style={styles.addressText}>
                {order.shippingAddress.postalCode} {order.shippingAddress.city}
              </Text>
              <Text style={styles.addressText}>{order.shippingAddress.country}</Text>
            </View>
          </View>
        </View>

        {/* Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bestellte Artikel</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colProduct]}>Produkt</Text>
            <Text style={[styles.tableHeaderText, styles.colQty]}>Menge</Text>
            <Text style={[styles.tableHeaderText, styles.colPrice]}>Preis</Text>
          </View>
          {order.items.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={[styles.colProduct, { fontSize: 10 }]}>{item.name}</Text>
              <Text style={[styles.colQty, { fontSize: 10, textAlign: "center" }]}>{item.quantity}</Text>
              <Text style={[styles.colPrice, { fontSize: 10, textAlign: "right" }]}>
                CHF {(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Zwischensumme</Text>
            <Text style={styles.totalValue}>CHF {order.subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Versand</Text>
            <Text style={styles.totalValue}>CHF {order.shipping.toFixed(2)}</Text>
          </View>
          <View style={styles.grandTotal}>
            <Text style={styles.grandTotalLabel}>Gesamt</Text>
            <Text style={styles.grandTotalValue}>CHF {order.total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Nähsüchtig · Kirchweg 2, 5614 Sarmenstorf · Aargau, Schweiz
        </Text>
      </Page>
    </Document>
  );
}

export async function generateOrderPdf(order: OrderEmailData): Promise<Buffer> {
  const buffer = await renderToBuffer(<OrderDocument order={order} />);
  return Buffer.from(buffer);
}
