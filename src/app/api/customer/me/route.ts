import { getCustomer } from "@/lib/customer-auth";

export async function GET() {
  const customer = await getCustomer();
  if (!customer) return Response.json(null);
  return Response.json({ id: customer.id, email: customer.email, name: customer.name });
}
