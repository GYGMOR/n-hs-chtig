import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const [categories, featuredCount] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.count({ where: { featured: true } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Neues Produkt</h1>
      <ProductForm categories={categories} featuredCount={featuredCount} />
    </div>
  );
}
