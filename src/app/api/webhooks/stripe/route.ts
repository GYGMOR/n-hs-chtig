import Stripe from "stripe";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmation } from "@/lib/email";
import { generateOrderPdf } from "@/lib/order-pdf";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature error:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await fulfillOrder(session);
  }

  return new Response("OK", { status: 200 });
}

async function fulfillOrder(session: Stripe.Checkout.Session) {
  const meta = session.metadata ?? {};
  const cartItems: { id: number; name: string; price: number; quantity: number }[] =
    JSON.parse(meta.cartItems ?? "[]");

  if (!cartItems.length) return;

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const order = await prisma.order.create({
    data: {
      stripeSessionId: session.id,
      status: "PAID",
      customerName: meta.customerName,
      customerEmail: meta.customerEmail,
      shippingAddress: {
        address: meta.address,
        city: meta.city,
        postalCode: meta.postalCode,
        country: meta.country,
        phone: meta.phone,
      },
      subtotal,
      shipping: 15,
      total: subtotal + 15,
      items: {
        create: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  // Lagerbestand reduzieren
  for (const item of cartItems) {
    await prisma.product.update({
      where: { id: item.id },
      data: { stock: { decrement: item.quantity } },
    });
  }

  try {
    const addr = order.shippingAddress as {
      address: string; city: string; postalCode: string; country: string;
    };

    const emailData = {
      orderId: order.id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      items: cartItems.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
      subtotal: order.subtotal,
      shipping: order.shipping,
      total: order.total,
      shippingAddress: {
        address: addr.address ?? "",
        city: addr.city ?? "",
        postalCode: addr.postalCode ?? "",
        country: addr.country ?? "",
      },
      createdAt: order.createdAt,
    };

    const pdfBuffer = await generateOrderPdf(emailData);
    await sendOrderConfirmation(emailData, pdfBuffer);
  } catch (err) {
    console.error("E-Mail/PDF Fehler:", err);
  }
}
