import { prisma } from "@/lib/prisma";
import ProductDetailView from "@/components/ProductDetailView";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = parseInt(id);

  if (isNaN(productId)) notFound();

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { category: true },
  });

  if (!product) notFound();

  return <ProductDetailView product={product} />;
}
