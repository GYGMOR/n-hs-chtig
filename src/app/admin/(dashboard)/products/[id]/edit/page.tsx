import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories, featuredCount] = await Promise.all([
    prisma.product.findUnique({ where: { id: Number(id) } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.count({ where: { featured: true } }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Produkt bearbeiten</h1>
      <ProductForm
        categories={categories}
        productId={product.id}
        featuredCount={featuredCount}
        initial={{
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: String(product.price),
          stock: String(product.stock),
          categoryId: String(product.categoryId),
          active: product.active,
          featured: product.featured,
          images: product.images,
        }}
      />
    </div>
  );
}
