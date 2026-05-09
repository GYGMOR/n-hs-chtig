"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, X } from "lucide-react";

interface Category { id: number; name: string }

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: string;
  categoryId: string;
  active: boolean;
  images: string[];
}

interface Props {
  categories: Category[];
  productId?: number;
  initial?: Partial<ProductFormData>;
}

function toSlug(str: string) {
  return str.toLowerCase().replace(/[äöü]/g, (c) => ({ ä: "ae", ö: "oe", ü: "ue" }[c] ?? c)).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function ProductForm({ categories, productId, initial }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  const [form, setForm] = useState<ProductFormData>({
    name: initial?.name ?? "",
    slug: initial?.slug ?? "",
    description: initial?.description ?? "",
    price: initial?.price ?? "",
    stock: initial?.stock ?? "99",
    categoryId: initial?.categoryId ?? String(categories[0]?.id ?? ""),
    active: initial?.active ?? true,
    images: initial?.images ?? [],
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      ...(name === "name" && !productId ? { slug: toSlug(value) } : {}),
    }));
  }

  function addImage() {
    if (!newImageUrl.trim()) return;
    setForm((prev) => ({ ...prev, images: [...prev.images, newImageUrl.trim()] }));
    setNewImageUrl("");
  }

  function removeImage(idx: number) {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = productId ? `/api/admin/products/${productId}` : "/api/admin/products";
    const method = productId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Fehler beim Speichern");
    }
    setLoading(false);
  }

  const fieldClass = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors text-gray-900 text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className={labelClass}>Name *</label>
          <input required name="name" value={form.name} onChange={handleChange} className={fieldClass} />
        </div>
        <div className="col-span-2">
          <label className={labelClass}>Slug *</label>
          <input required name="slug" value={form.slug} onChange={handleChange} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Preis (CHF) *</label>
          <input required type="number" min="0" step="0.01" name="price" value={form.price} onChange={handleChange} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Lagerbestand</label>
          <input required type="number" min="0" name="stock" value={form.stock} onChange={handleChange} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Kategorie *</label>
          <select required name="categoryId" value={form.categoryId} onChange={handleChange} className={fieldClass}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-sm font-medium text-gray-700">Im Shop sichtbar</span>
          </label>
        </div>
        <div className="col-span-2">
          <label className={labelClass}>Beschreibung</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className={fieldClass + " resize-none"}
          />
        </div>
      </div>

      {/* Images */}
      <div>
        <label className={labelClass}>Bilder (URLs)</label>
        <div className="space-y-2 mb-3">
          {form.images.map((url, i) => (
            <div key={i} className="flex items-center gap-2">
              <img src={url} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
              <span className="flex-1 text-xs text-gray-500 truncate">{url}</span>
              <button type="button" onClick={() => removeImage(i)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://..."
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addImage(); } }}
            className={fieldClass + " flex-1"}
          />
          <button type="button" onClick={addImage} className="px-3 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-rose-600 transition-colors disabled:opacity-60 flex items-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {productId ? "Speichern" : "Erstellen"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}
