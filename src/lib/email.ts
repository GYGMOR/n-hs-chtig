import nodemailer from "nodemailer";

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.office365.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false, // STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: process.env.NODE_ENV === "production" },
  });
}

function getFrom() {
  return `"Nähsüchtig" <${process.env.SMTP_USER ?? "noreply@naehsuechtig.ch"}>`;
}

export interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: Date;
}

export async function sendOrderConfirmation(order: OrderEmailData, pdfBuffer: Buffer) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP nicht konfiguriert – E-Mail wird nicht gesendet");
    return;
  }

  const transport = createTransport();

  const itemRows = order.items
    .map(
      (i) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #f0e8e0;">${i.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f0e8e0;text-align:center;">${i.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f0e8e0;text-align:right;">CHF ${(i.price * i.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bestellbestätigung</title>
</head>
<body style="margin:0;padding:0;background:#faf8f5;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#1a1a1a;padding:40px 48px;text-align:center;">
      <div style="width:56px;height:56px;background:#fff;border-radius:14px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
        <span style="font-size:28px;font-weight:900;color:#1a1a1a;line-height:1;">N</span>
      </div>
      <h1 style="color:#fff;margin:0;font-size:24px;font-weight:300;letter-spacing:2px;">NÄHSÜCHTIG</h1>
      <p style="color:#ffffff80;margin:8px 0 0;font-size:11px;letter-spacing:4px;text-transform:uppercase;">Artisan Atelier</p>
    </div>

    <!-- Body -->
    <div style="padding:48px;">
      <h2 style="margin:0 0 8px;font-size:28px;font-weight:700;color:#1a1a1a;">Vielen Dank für Ihre Bestellung!</h2>
      <p style="color:#666;margin:0 0 32px;font-size:16px;">Hallo ${order.customerName}, Ihre Bestellung ist eingegangen.</p>

      <!-- Order Info -->
      <div style="background:#faf8f5;border-radius:12px;padding:20px 24px;margin-bottom:32px;">
        <p style="margin:0;font-size:13px;color:#999;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Bestellnummer</p>
        <p style="margin:6px 0 0;font-size:16px;font-weight:700;color:#1a1a1a;font-family:monospace;">${order.orderId}</p>
      </div>

      <!-- Items Table -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <thead>
          <tr style="background:#faf8f5;">
            <th style="padding:10px 12px;text-align:left;font-size:11px;color:#999;letter-spacing:2px;text-transform:uppercase;">Produkt</th>
            <th style="padding:10px 12px;text-align:center;font-size:11px;color:#999;letter-spacing:2px;text-transform:uppercase;">Menge</th>
            <th style="padding:10px 12px;text-align:right;font-size:11px;color:#999;letter-spacing:2px;text-transform:uppercase;">Preis</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
        </tbody>
      </table>

      <!-- Totals -->
      <div style="border-top:2px solid #f0e8e0;padding-top:16px;margin-bottom:32px;">
        <div style="display:flex;justify-content:space-between;padding:6px 12px;font-size:14px;color:#666;">
          <span>Zwischensumme</span><span>CHF ${order.subtotal.toFixed(2)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:6px 12px;font-size:14px;color:#666;">
          <span>Versand</span><span>CHF ${order.shipping.toFixed(2)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:12px 12px 0;font-size:18px;font-weight:700;color:#1a1a1a;border-top:1px solid #f0e8e0;margin-top:8px;">
          <span>Gesamt</span><span>CHF ${order.total.toFixed(2)}</span>
        </div>
      </div>

      <!-- Shipping Address -->
      <div style="background:#faf8f5;border-radius:12px;padding:20px 24px;margin-bottom:40px;">
        <p style="margin:0 0 8px;font-size:11px;color:#999;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Lieferadresse</p>
        <p style="margin:0;color:#1a1a1a;line-height:1.7;">
          ${order.customerName}<br/>
          ${order.shippingAddress.address}<br/>
          ${order.shippingAddress.postalCode} ${order.shippingAddress.city}<br/>
          ${order.shippingAddress.country}
        </p>
      </div>

      <p style="color:#666;font-size:14px;line-height:1.7;">
        Im Anhang finden Sie Ihren Kaufbeleg als PDF. Bei Fragen erreichen Sie uns unter
        <a href="mailto:${process.env.SMTP_USER}" style="color:#c9696a;text-decoration:none;">${process.env.SMTP_USER}</a>.
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#faf8f5;padding:24px 48px;text-align:center;border-top:1px solid #f0e8e0;">
      <p style="margin:0;color:#999;font-size:12px;">© ${new Date().getFullYear()} Nähsüchtig · Kirchweg 2, 5614 Sarmenstorf</p>
    </div>
  </div>
</body>
</html>`;

  await transport.sendMail({
    from: getFrom(),
    to: order.customerEmail,
    subject: `Bestellbestätigung #${order.orderId.slice(0, 8).toUpperCase()} – Nähsüchtig`,
    html,
    attachments: [
      {
        filename: `Kaufbeleg-${order.orderId.slice(0, 8).toUpperCase()}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP nicht konfiguriert – Kontakt-E-Mail wird nicht gesendet");
    return;
  }

  const transport = createTransport();
  const contactTarget = process.env.CONTACT_EMAIL ?? process.env.SMTP_USER!;

  await transport.sendMail({
    from: getFrom(),
    to: contactTarget,
    replyTo: data.email,
    subject: `Neue Kontaktanfrage von ${data.name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#1a1a1a;">Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>E-Mail:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <hr style="border:none;border-top:1px solid #f0e8e0;margin:24px 0;"/>
        <p style="white-space:pre-wrap;">${data.message}</p>
      </div>
    `,
  });
}

export async function sendShippingNotification(order: {
  id: string;
  customerName: string;
  customerEmail: string;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;
  const transport = createTransport();
  await transport.sendMail({
    from: getFrom(),
    to: order.customerEmail,
    subject: `Deine Bestellung ist unterwegs! #${order.id.slice(0, 8).toUpperCase()}`,
    html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <div style="background:#1a1a1a;padding:32px 48px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:20px;font-weight:300;letter-spacing:2px;">NÄHSÜCHTIG</h1>
        </div>
        <div style="padding:48px;">
          <h2 style="margin:0 0 16px;font-size:28px;color:#1a1a1a;">Dein Paket ist unterwegs! 📦</h2>
          <p style="color:#666;font-size:16px;line-height:1.7;">Hallo ${order.customerName},<br/><br/>
            deine Bestellung <strong>#${order.id.slice(0, 8).toUpperCase()}</strong> wurde soeben verschickt.
            Du kannst in wenigen Werktagen mit deinem Paket rechnen.
          </p>
          <p style="color:#666;font-size:14px;margin-top:32px;">
            Bei Fragen erreichst du uns unter <a href="mailto:${process.env.SMTP_USER}" style="color:#c9696a;">${process.env.SMTP_USER}</a>.
          </p>
        </div>
        <div style="background:#faf8f5;padding:20px 48px;text-align:center;border-top:1px solid #f0e8e0;">
          <p style="margin:0;color:#999;font-size:12px;">© ${new Date().getFullYear()} Nähsüchtig · Kirchweg 2, 5614 Sarmenstorf</p>
        </div>
      </div>`,
  });
}

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;
  const transport = createTransport();
  await transport.sendMail({
    from: getFrom(),
    to: email,
    subject: "Passwort zurücksetzen – Nähsüchtig",
    html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <div style="background:#1a1a1a;padding:32px 48px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:20px;font-weight:300;letter-spacing:2px;">NÄHSÜCHTIG</h1>
        </div>
        <div style="padding:48px;">
          <h2 style="margin:0 0 16px;font-size:24px;color:#1a1a1a;">Passwort zurücksetzen</h2>
          <p style="color:#666;font-size:16px;line-height:1.7;">Klicke auf den Button, um ein neues Passwort zu setzen. Der Link ist 1 Stunde gültig.</p>
          <a href="${resetUrl}" style="display:inline-block;margin:24px 0;padding:16px 32px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:12px;font-weight:700;">Neues Passwort setzen</a>
          <p style="color:#999;font-size:12px;">Falls du diese Anfrage nicht gestellt hast, kannst du diese E-Mail ignorieren.</p>
        </div>
      </div>`,
  });
}

export async function sendNewsletterConfirmation(email: string) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP nicht konfiguriert");
    return;
  }

  const transport = createTransport();

  await transport.sendMail({
    from: getFrom(),
    to: email,
    subject: "Willkommen beim Nähsüchtig Newsletter",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:40px auto;background:#faf8f5;border-radius:16px;overflow:hidden;">
        <div style="background:#1a1a1a;padding:32px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:20px;font-weight:300;letter-spacing:2px;">NÄHSÜCHTIG</h1>
        </div>
        <div style="padding:40px;">
          <h2 style="color:#1a1a1a;">Danke für Ihre Anmeldung!</h2>
          <p style="color:#666;line-height:1.7;">
            Sie erhalten ab jetzt Einblicke in neue Kollektionen und den Entstehungsprozess unserer handgefertigten Unikate.
          </p>
        </div>
      </div>
    `,
  });
}
