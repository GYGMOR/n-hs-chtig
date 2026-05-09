import Stripe from "stripe";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
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

  await prisma.order.create({
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
}
