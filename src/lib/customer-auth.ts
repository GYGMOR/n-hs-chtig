import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SECRET = new TextEncoder().encode(process.env.CUSTOMER_JWT_SECRET ?? "customer-fallback-secret-change-me");

export interface CustomerPayload {
  id: number;
  email: string;
  name: string;
}

export async function signCustomerToken(payload: CustomerPayload): Promise<string> {
  return new SignJWT({ ...payload, role: "customer" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(SECRET);
}

export async function verifyCustomerToken(token: string): Promise<CustomerPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return { id: payload.id as number, email: payload.email as string, name: payload.name as string };
  } catch {
    return null;
  }
}

export async function getCustomer(): Promise<CustomerPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("customer_token")?.value;
  if (!token) return null;
  return verifyCustomerToken(token);
}

export async function requireCustomer(): Promise<CustomerPayload> {
  const customer = await getCustomer();
  if (!customer) redirect("/login");
  return customer;
}
