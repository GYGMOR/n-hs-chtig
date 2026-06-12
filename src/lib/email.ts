import nodemailer from "nodemailer";

function createTransport() {
  const port = Number(process.env.SMTP_PORT ?? 587);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.office365.com",
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: process.env.NODE_ENV === "production" },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
}

function getSenderEmail() {
  const fromEmail = process.env.SMTP_FROM ?? process.env.CONTACT_EMAIL ?? "jlonkadubach@xn--made-by-nhschtig-3nb84b.ch";
  return fromEmail === "resend" ? "jlonkadubach@xn--made-by-nhschtig-3nb84b.ch" : fromEmail;
}

function getFrom() {
  return `"Nähsüchtig" <${getSenderEmail()}>`;
}

interface EmailOptions {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  attachments?: {
    filename: string;
    content: Buffer;
    contentType?: string;
  }[];
}

async function sendEmail(options: EmailOptions) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP nicht konfiguriert – E-Mail wird nicht gesendet");
    return;
  }

  const isResend = process.env.SMTP_HOST === "smtp.resend.com" || process.env.SMTP_USER === "resend";

  if (isResend) {
    try {
      const apiKey = process.env.SMTP_PASS;
      
      const payload: any = {
        from: options.from,
        to: [options.to],
        subject: options.subject,
        html: options.html,
      };

      if (options.replyTo) {
        payload.reply_to = options.replyTo;
      }

      if (options.attachments && options.attachments.length > 0) {
        payload.attachments = options.attachments.map(att => ({
          filename: att.filename,
          content: att.content.toString("base64"),
        }));
      }

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Resend HTTP API returned status ${res.status}`);
      }

      const resData = await res.json();
      console.log("E-Mail erfolgreich über Resend HTTP API gesendet:", resData.id);
      return;
    } catch (err) {
      console.error("Fehler beim Senden über Resend HTTP API, versuche SMTP Fallback...", err);
    }
  }

  // Fallback to standard Nodemailer SMTP
  const transport = createTransport();
  await transport.sendMail({
    from: options.from,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
    attachments: options.attachments?.map(att => ({
      filename: att.filename,
      content: att.content,
      contentType: att.contentType,
    })),
  });
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
    <div style="background:#1a1a1a;padding:40px 48px;text-align:center;">
      <div style="width:56px;height:56px;background:#fff;border-radius:14px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
        <span style="font-size:28px;font-weight:900;color:#1a1a1a;line-height:1;">N</span>
      </div>
      <h1 style="color:#fff;margin:0;font-size:24px;font-weight:300;letter-spacing:2px;">NÄHSÜCHTIG</h1>
      <p style="color:#ffffff80;margin:8px 0 0;font-size:11px;letter-spacing:4px;text-transform:uppercase;">Artisan Atelier</p>
    </div>
    <div style="padding:48px;">
      <h2 style="margin:0 0 8px;font-size:28px;font-weight:700;color:#1a1a1a;">Vielen Dank für Ihre Bestellung!</h2>
      <p style="color:#666;margin:0 0 32px;font-size:16px;">Hallo ${order.customerName}, Ihre Bestellung ist eingegangen.</p>
      <div style="background:#faf8f5;border-radius:12px;padding:20px 24px;margin-bottom:32px;">
        <p style="margin:0;font-size:13px;color:#999;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Bestellnummer</p>
        <p style="margin:6px 0 0;font-size:16px;font-weight:700;color:#1a1a1a;font-family:monospace;">${order.orderId}</p>
      </div>
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
        <a href="mailto:${getSenderEmail()}" style="color:#c9696a;text-decoration:none;">${getSenderEmail()}</a>.
      </p>
    </div>
    <div style="background:#faf8f5;padding:24px 48px;text-align:center;border-top:1px solid #f0e8e0;">
      <p style="margin:0;color:#999;font-size:12px;">© ${new Date().getFullYear()} Nähsüchtig · Kirchweg 2, 5614 Sarmenstorf</p>
    </div>
  </div>
</body>
</html>`;

  await sendEmail({
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
  const contactTarget = process.env.CONTACT_EMAIL ?? process.env.SMTP_USER!;

  await sendEmail({
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
  await sendEmail({
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
            Bei Fragen erreichst du uns unter <a href="mailto:${getSenderEmail()}" style="color:#c9696a;">${getSenderEmail()}</a>.
          </p>
        </div>
        <div style="background:#faf8f5;padding:20px 48px;text-align:center;border-top:1px solid #f0e8e0;">
          <p style="margin:0;color:#999;font-size:12px;">© ${new Date().getFullYear()} Nähsüchtig · Kirchweg 2, 5614 Sarmenstorf</p>
        </div>
      </div>`,
  });
}

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  await sendEmail({
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
  await sendEmail({
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
