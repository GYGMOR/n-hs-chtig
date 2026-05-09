"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    access_denied: "Zugriff verweigert.",
    token_failed: "Authentifizierung fehlgeschlagen.",
    user_failed: "Benutzerdaten konnten nicht geladen werden.",
    not_allowed: "Dieses Konto hat keinen Zugriff.",
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center space-y-6">
        <div className="space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-2xl font-serif">N</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-sm text-gray-400">Made by Nähsüchtig</p>
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl">
            {errorMessages[error] ?? "Ein Fehler ist aufgetreten."}
          </p>
        )}

        <a
          href="/api/admin/auth/microsoft"
          className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors text-sm"
        >
          <MicrosoftIcon />
          Mit Microsoft anmelden
        </a>
      </div>
    </div>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
