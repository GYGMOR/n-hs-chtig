import Stripe from "stripe";
import { NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { items, form } = await req.json();

    if (!items?.length) {
      return Response.json({ error: "Warenkorb ist leer" }, { status: 400 });
    }

    const lineItems = items.map((item: { name: string; price: number; quantity: number; image: string }) => ({
      price_data: {
        currency: "chf",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    lineItems.push({
      price_data: {
        currency: "chf",
        product_data: { name: "Versand", images: [] },
        unit_amount: 1500,
      },
      quantity: 1,
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      customer_email: form.email,
      shipping_address_collection: { allowed_countries: ["CH", "DE", "AT", "LI"] },
      metadata: {
        customerName: `${form.firstName} ${form.lastName}`,
        customerEmail: form.email,
        phone: form.phone ?? "",
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
        cartItems: JSON.stringify(
          items.map((i: { id: number; name: string; price: number; quantity: number }) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          }))
        ),
      },
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return Response.json({ error: "Checkout fehlgeschlagen" }, { status: 500 });
  }
}
