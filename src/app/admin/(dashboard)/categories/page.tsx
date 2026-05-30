"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Check, X, Tag, Loader2 } from "lucide-react";

interface Category { id: number; name: string; slug: string; _count: { products: number } }

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/admin/categories");
    if (res.ok) setCategories(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setLoading(true); setError("");
    const res = await fetch("/api/admin/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newName }) });
    if (res.ok) { setNewName(""); await load(); }
    else { const d = await res.json(); setError(d.error ?? "Fehler"); }
    setLoading(false);
  }

  async function handleEdit(id: number) {
    if (!editName.trim()) return;
    setLoading(true); setError("");
    const res = await fetch(`/api/admin/categories/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: editName }) });
    if (res.ok) { setEditId(null); await load(); }
    else { const d = await res.json(); setError(d.error ?? "Fehler"); }
    setLoading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Kategorie wirklich löschen?")) return;
    setError("");
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (res.ok) { await load(); }
    else { const d = await res.json(); setError(d.error ?? "Fehler beim Löschen"); }
  }

  const fieldClass = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors text-gray-900 text-sm";

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Kategorien</h1>

      {/* New category */}
      <form onSubmit={handleCreate} className="flex gap-3 mb-8">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Neue Kategorie"
          className={fieldClass + " flex-1"}
        />
        <button
          type="submit"
          disabled={loading || !newName.trim()}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-rose-600 transition-colors disabled:opacity-60"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Hinzufügen
        </button>
      </form>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* List */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {categories.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            <Tag className="w-8 h-8 mx-auto mb-3 opacity-40" />
            <p>Noch keine Kategorien</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {categories.map((cat) => (
              <li key={cat.id} className="flex items-center gap-4 px-5 py-4">
                {editId === cat.id ? (
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") handleEdit(cat.id); if (e.key === "Escape") setEditId(null); }}
                      autoFocus
                      className={fieldClass + " flex-1"}
                    />
                    <button onClick={() => handleEdit(cat.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={() => setEditId(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{cat.name}</p>
                      <p className="text-xs text-gray-400">{cat._count.products} Produkte · /{cat.slug}</p>
                    </div>
                    <button
                      onClick={() => { setEditId(cat.id); setEditName(cat.name); }}
                      className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
