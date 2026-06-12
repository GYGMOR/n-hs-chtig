"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, Upload, Trash2, Save, Image as ImageIcon, CheckCircle, AlertCircle } from "lucide-react";

interface WebsiteImage {
  id: number;
  key: string;
  url: string;
  alt: string;
  page: string;
  label: string;
}

export default function AdminImagesPage() {
  const [images, setImages] = useState<WebsiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const res = await fetch("/api/admin/images");
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      } else {
        showMsg("error", "Fehler beim Laden der CMS-Bilder");
      }
    } catch {
      showMsg("error", "Netzwerkfehler");
    } finally {
      setLoading(false);
    }
  }

  function showMsg(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  }

  async function handleSave(img: WebsiteImage) {
    setSavingId(img.id);
    try {
      const res = await fetch(`/api/admin/images/${img.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: img.url, alt: img.alt }),
      });
      if (res.ok) {
        showMsg("success", `"${img.label}" erfolgreich gespeichert!`);
      } else {
        showMsg("error", "Fehler beim Speichern");
      }
    } catch {
      showMsg("error", "Netzwerkfehler");
    } finally {
      setSavingId(null);
    }
  }

  async function handleDelete(img: WebsiteImage) {
    if (!confirm(`Möchtest du das Bild für "${img.label}" wirklich entfernen?`)) return;
    setSavingId(img.id);
    try {
      const res = await fetch(`/api/admin/images/${img.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setImages((prev) =>
          prev.map((i) => (i.id === img.id ? { ...i, url: "" } : i))
        );
        showMsg("success", `Bild gelöscht. Auf der Seite wird nun ein Platzhalter angezeigt.`);
      } else {
        showMsg("error", "Fehler beim Löschen");
      }
    } catch {
      showMsg("error", "Netzwerkfehler");
    } finally {
      setSavingId(null);
    }
  }

  async function handleUpload(imgId: number, files: FileList | null) {
    if (!files?.length) return;
    setUploadingId(imgId);

    const file = files[0];
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });

      if (res.ok) {
        const { url } = await res.json();
        setImages((prev) =>
          prev.map((i) => (i.id === imgId ? { ...i, url } : i))
        );
        showMsg("success", "Bild erfolgreich hochgeladen! Drücke Speichern, um die Änderung zu sichern.");
      } else {
        const data = await res.json().catch(() => ({}));
        showMsg("error", data.error ?? "Upload fehlgeschlagen");
      }
    } catch {
      showMsg("error", "Upload fehlgeschlagen");
    } finally {
      setUploadingId(null);
    }
  }

  function handleInputChange(id: number, field: "url" | "alt", value: string) {
    setImages((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-accent-rose" />
      </div>
    );
  }

  const pages: Record<string, string> = {
    home: "Startseite",
    about: "Über uns",
    craft: "Handwerk",
  };

  const grouped = images.reduce((acc, img) => {
    if (!acc[img.page]) acc[img.page] = [];
    acc[img.page].push(img);
    return acc;
  }, {} as Record<string, WebsiteImage[]>);

  return (
    <div className="max-w-6xl mx-auto pb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bilder verwalten (CMS)</h1>
          <p className="text-sm text-gray-500 mt-1">Hier kannst du alle statischen Hintergrund- und Inhaltsbilder der Webseite verwalten.</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 border shadow-sm transition-all duration-300 ${
          message.type === "success" 
            ? "bg-green-50 border-green-200 text-green-800" 
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      {Object.entries(pages).map(([pageKey, pageLabel]) => {
        const pageImages = grouped[pageKey] || [];
        if (pageImages.length === 0) return null;

        return (
          <div key={pageKey} className="mb-12">
            <h2 className="text-lg font-bold text-gray-800 mb-6 pb-2 border-b border-gray-150 uppercase tracking-wider">{pageLabel}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pageImages.map((img) => (
                <div key={img.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
                  <div className="p-6 space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 leading-tight">{img.label}</h3>
                        <code className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded mt-1 inline-block">{img.key}</code>
                      </div>
                    </div>

                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center group">
                      {img.url ? (
                        <>
                          <img
                            src={img.url}
                            alt={img.alt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                            <button
                              onClick={() => {
                                const input = document.getElementById(`upload-${img.id}`);
                                input?.click();
                              }}
                              className="p-2.5 bg-white text-gray-800 rounded-xl hover:bg-gray-100 transition-colors shadow"
                              title="Neues Bild hochladen"
                            >
                              <Upload className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(img)}
                              className="p-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow"
                              title="Bild löschen"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-4">
                          <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                          <p className="text-xs font-semibold text-gray-500">Kein Bild festgelegt</p>
                          <p className="text-[10px] text-gray-400 mt-1">Hier wird auf der Webseite ein Platzhalter angezeigt.</p>
                          <button
                            onClick={() => {
                              const input = document.getElementById(`upload-${img.id}`);
                              input?.click();
                            }}
                            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-rose-600 transition-colors"
                          >
                            <Upload className="w-3.5 h-3.5" /> Bild hochladen
                          </button>
                        </div>
                      )}

                      {uploadingId === img.id && (
                        <div className="absolute inset-0 bg-white/85 flex flex-col items-center justify-center gap-2">
                          <Loader2 className="w-6 h-6 animate-spin text-accent-rose" />
                          <span className="text-xs text-gray-500 font-medium">Upload läuft…</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Bild-URL (oder Datei hochladen)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={img.url}
                            onChange={(e) => handleInputChange(img.id, "url", e.target.value)}
                            placeholder="E.g., /uploads/image.jpg oder https://..."
                            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors text-sm text-gray-800"
                          />
                          <input
                            type="file"
                            id={`upload-${img.id}`}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUpload(img.id, e.target.files)}
                          />
                          <button
                            onClick={() => {
                              const input = document.getElementById(`upload-${img.id}`);
                              input?.click();
                            }}
                            className="px-3.5 py-2 border border-gray-200 hover:border-gray-900 rounded-xl text-gray-600 hover:text-gray-950 transition-colors"
                            title="Datei hochladen"
                          >
                            <Upload className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Alternativtext (SEO)</label>
                        <input
                          type="text"
                          value={img.alt}
                          onChange={(e) => handleInputChange(img.id, "alt", e.target.value)}
                          placeholder="Beschreibung für Screenreader und Suchmaschinen"
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors text-sm text-gray-800"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between gap-3">
                    {img.url ? (
                      <button
                        onClick={() => handleDelete(img)}
                        disabled={savingId === img.id}
                        className="px-4 py-2 text-xs font-semibold text-red-650 hover:bg-red-50 rounded-xl transition-all flex items-center gap-1.5 border border-transparent"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Bild entfernen
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      onClick={() => handleSave(img)}
                      disabled={savingId !== null || uploadingId !== null}
                      className="px-5 py-2 bg-gray-900 text-white hover:bg-rose-600 disabled:bg-gray-400 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow"
                    >
                      {savingId === img.id ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Speichern...
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5" />
                          Änderungen speichern
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
