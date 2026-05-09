"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";

interface Category { id: number; name: string; slug: string }
interface Product {
  id: number; name: string; price: number; images: string[];
  stock: number; active: boolean; category: Category;
}

export default function ProductsTable({
  products: initial,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [products, setProducts] = useState(initial);
  const router = useRouter();

  async function toggleActive(product: Product) {
    await fetch(`/api/admin/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...product, categoryId: product.category.id, active: !product.active }),
    });
    setProducts((p) => p.map((x) => x.id === product.id ? { ...x, active: !x.active } : x));
  }

  async function deleteProduct(id: number) {
    if (!confirm("Produkt wirklich löschen?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    setProducts((p) => p.filter((x) => x.id !== id));
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left px-6 py-3 text-gray-400 font-medium">Produkt</th>
            <th className="text-left px-6 py-3 text-gray-400 font-medium">Kategorie</th>
            <th className="text-left px-6 py-3 text-gray-400 font-medium">Preis</th>
            <th className="text-left px-6 py-3 text-gray-400 font-medium">Lager</th>
            <th className="text-left px-6 py-3 text-gray-400 font-medium">Status</th>
            <th className="text-right px-6 py-3 text-gray-400 font-medium">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-gray-50 last:border-0">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-10 h-10 rounded-xl object-cover bg-gray-100"
                  />
                  <span className="font-medium text-gray-900">{product.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-500">{product.category.name}</td>
              <td className="px-6 py-4 font-medium">CHF {product.price}</td>
              <td className="px-6 py-4 text-gray-500">{product.stock}</td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${product.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"}`}>
                  {product.active ? "Aktiv" : "Inaktiv"}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => toggleActive(product)}
                    title={product.active ? "Deaktivieren" : "Aktivieren"}
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {product.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                Noch keine Produkte
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
