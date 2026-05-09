import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function GET(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(`${appUrl}/admin/login?error=access_denied`);
  }

  const clientId = process.env.MICROSOFT_CLIENT_ID!;
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET!;
  const tenantId = process.env.MICROSOFT_TENANT_ID ?? "common";
  const redirectUri = `${appUrl}/api/admin/auth/callback`;

  // Exchange code for tokens
  const tokenRes = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    }
  );

  if (!tokenRes.ok) {
    return NextResponse.redirect(`${appUrl}/admin/login?error=token_failed`);
  }

  const tokens = await tokenRes.json();

  // Get user profile from Microsoft Graph
  const userRes = await fetch("https://graph.microsoft.com/v1.0/me", {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });

  if (!userRes.ok) {
    return NextResponse.redirect(`${appUrl}/admin/login?error=user_failed`);
  }

  const user = await userRes.json();
  const email: string = user.mail ?? user.userPrincipalName ?? "";

  // Restrict access to allowed emails
  const allowedEmails = (process.env.MICROSOFT_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (allowedEmails.length > 0 && !allowedEmails.includes(email.toLowerCase())) {
    return NextResponse.redirect(`${appUrl}/admin/login?error=not_allowed`);
  }

  // Create session JWT (expires in 8h for security)
  const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!);
  const token = await new SignJWT({ role: "admin", email, name: user.displayName })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .sign(secret);

  const response = NextResponse.redirect(`${appUrl}/admin`);

  // Session cookie — no maxAge/expires means browser deletes it on close
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return response;
}
