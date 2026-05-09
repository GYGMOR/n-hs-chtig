import { prisma } from "@/lib/prisma";
import ProductGrid from "@/components/ProductGrid";

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: { active: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-foreground">
            Die Kollektion
          </h1>
          <p className="text-foreground/50 max-w-2xl mx-auto text-lg">
            Entdecke unsere sorgfältig kuratierte Auswahl an handgefertigten Kunsthandwerkswaren. Jedes Stück ist ein Unikat und mit Leidenschaft gefertigt.
          </p>
        </div>
        <ProductGrid products={products} categories={categories} />
      </div>
    </div>
  );
}
