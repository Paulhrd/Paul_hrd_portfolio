"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

export function LanguageToggle({ currentLocale }: { currentLocale: "en" | "fr" }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = currentLocale === "en" ? "fr" : "en";
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
    router.refresh();
  };

  if (!mounted) return <div className="theme-toggle-placeholder" />;

  return (
    <button
      onClick={toggleLanguage}
      className="theme-toggle"
      aria-label="Toggle language"
      title={`Switch to ${currentLocale === "en" ? "French" : "English"}`}
    >
      <Globe size={18} style={{ marginRight: 4 }} />
      <span style={{ fontSize: "12px", fontWeight: "bold" }}>{currentLocale.toUpperCase()}</span>
    </button>
  );
}
