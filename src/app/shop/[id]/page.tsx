import { prisma } from "@/lib/prisma";
import ProductDetailView from "@/components/ProductDetailView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: { category: true },
  });
  if (!product) return { title: "Produkt nicht gefunden" };

  const description = product.description.replace(/<[^>]*>/g, "").slice(0, 160);

  return {
    title: `${product.name} – Nähsüchtig`,
    description: description || `${product.name} von Nähsüchtig – handgefertigtes Unikat aus dem Artisan Atelier.`,
    openGraph: {
      title: product.name,
      description,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const productId = parseInt(id);
  if (isNaN(productId)) notFound();

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { category: true },
  });
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { active: true, categoryId: product.categoryId, id: { not: productId } },
    include: { category: true },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return <ProductDetailView product={product} related={related} />;
}
