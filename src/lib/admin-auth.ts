import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET ?? "fallback-secret");

export async function signAdminToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .sign(SECRET);
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function requireAdmin(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    redirect("/admin/login");
  }
}
