import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.MICROSOFT_CLIENT_ID!;
  const tenantId = process.env.MICROSOFT_TENANT_ID ?? "common";
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/auth/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: "openid profile email User.Read",
    response_mode: "query",
    prompt: "select_account",
  });

  return NextResponse.redirect(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?${params}`
  );
}
