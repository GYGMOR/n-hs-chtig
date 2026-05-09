import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";
import { Plus } from "lucide-react";
import ProductsTable from "@/components/admin/ProductsTable";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Produkte</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-rose-600 transition-colors"
        >
          <Plus className="w-4 h-4" /> Neues Produkt
        </Link>
      </div>
      <ProductsTable products={products} categories={categories} />
    </div>
  );
}
