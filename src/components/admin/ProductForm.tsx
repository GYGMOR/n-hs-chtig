"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, X, Upload, Image as ImageIcon } from "lucide-react";
import RichTextEditor from "./RichTextEditor";

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
  return str
    .toLowerCase()
    .replace(/[äöü]/g, (c) => ({ ä: "ae", ö: "oe", ü: "ue" }[c] ?? c))
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProductForm({ categories, productId, initial }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

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

  async function handleFileUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setError("");

    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (res.ok) {
        const { url } = await res.json();
        setForm((prev) => ({ ...prev, images: [...prev.images, url] }));
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Upload fehlgeschlagen");
      }
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
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

        {/* Rich Text Description */}
        <div className="col-span-2">
          <label className={labelClass}>Beschreibung</label>
          <RichTextEditor
            value={form.description}
            onChange={(html) => setForm((p) => ({ ...p, description: html }))}
          />
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className={labelClass}>Bilder</label>

        {/* Upload Drop Zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFileUpload(e.dataTransfer.files);
          }}
          className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-sm">Wird hochgeladen …</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <Upload className="w-8 h-8" />
              <p className="text-sm font-medium text-gray-600">Klicken oder Dateien hierher ziehen</p>
              <p className="text-xs text-gray-400">JPG, PNG, WEBP · max. 10 MB</p>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files)}
        />

        {/* Preview Grid */}
        {form.images.length > 0 && (
          <div className="mt-4 grid grid-cols-4 gap-3">
            {form.images.map((url, i) => (
              <div key={i} className="relative group">
                <img
                  src={url}
                  alt=""
                  className="w-full aspect-square rounded-xl object-cover bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-white rounded px-1.5 py-0.5 font-bold">
                    Haupt
                  </span>
                )}
              </div>
            ))}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
            >
              <ImageIcon className="w-6 h-6 text-gray-300" />
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading || uploading}
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
