
"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "../../i18n/navigation";
import AuthButtons from "./AuthButtons";
import CurrencyDropdown from "@/components/layout/CurrencyDropdown";
import LocationModal from "./LocationModal";
import LanguageDropdown from "./LanguageDropdown";

export default function TopBar() {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const locale = useLocale();
  const t = useTranslations("TopBar");
  const pathname = usePathname();
  const router = useRouter();

  const utilityLinks = [
    { key: "contact", label: t("contact") },
    { key: "sellOnModesy", label: t("sellOnModesy") },
  ];

  const changeLanguage = (nextLocale: "en" | "ar") => {
    setIsLanguageOpen(false);

    if (nextLocale !== locale) {
      router.replace(pathname, { locale: nextLocale });
    }
  };

  const handleReset = () => {
    setCurrentLocation("");
  };

  return (
    <>
      <div className="flex min-h-16 items-center justify-between border-b border-gray-200 bg-white px-5 text-base text-[#666666]">
        <div className="flex items-center gap-6">
          {utilityLinks.map((link) => (
            <a
              key={link.key}
              href="#"
              className="transition-colors hover:text-[#00a99d]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1 hover:text-[#00a99d]"
              onClick={() => setIsLocationOpen(true)}
            >
              📍 {currentLocation || t("location")}
            </button>

            {currentLocation !== "" && (
              <button
                type="button"
                onClick={handleReset}
                className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-600 transition-colors hover:bg-gray-300"
              >
                {t("reset")}
              </button>
            )}
          </div>

          <div className="hover:text-[#00a99d]">
            <CurrencyDropdown />
          </div>

          <LanguageDropdown />

          <AuthButtons />
        </div>
      </div>

      {isLocationOpen && (
        <LocationModal
          onClose={() => setIsLocationOpen(false)}
          onSelect={(loc) => {
            setCurrentLocation(loc);
            setIsLocationOpen(false);
          }}
        />
      )}
    </>
  );
}
