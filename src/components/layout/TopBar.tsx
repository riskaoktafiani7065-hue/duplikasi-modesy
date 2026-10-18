"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";
import ReactCountryFlag from "react-country-flag"; // <-- Import library bendera
import AuthButtons from "./AuthButtons";
import LocationModal from "./LocationModal";
import { countryLabel } from "@/lib/countries";
import {
  useModesySettings,
  type CurrencyCode,
  type LanguageCode,
} from "@/lib/modesy-settings";

type MenuName = "currency" | "language";

const utilityLinks = [
  { label: "Contact", href: "/contact" },
];

const currencyOptions: { label: string; value: CurrencyCode }[] = [
  { label: "USD ($)", value: "USD" },
  { label: "EUR (€)", value: "EUR" },
  { label: "BRL (R$)", value: "BRL" },
  { label: "GBP (£)", value: "GBP" },
  { label: "IDR (Rp)", value: "IDR" },
  { label: "INR (₹)", value: "INR" },
  { label: "NGN (₦)", value: "NGN" },
  { label: "RUB (₽)", value: "RUB" },
  { label: "TRY (₺)", value: "TRY" },
];

// Ubah flag menjadi kode negara (US, SA)
const languageOptions: {
  label: string;
  name: string;
  countryCode: string;
  value: LanguageCode;
}[] = [
  { label: "English", name: "English", countryCode: "US", value: "en" },
  { label: "Arabic", name: "Arabic", countryCode: "SA", value: "ar" },
];

export default function TopBar() {
  const [locationOpen, setLocationOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null);

  const {
    location,
    currency,
    language,
    setLocation,
    setCurrency,
    setLanguage,
    t,
  } = useModesySettings();

  function chooseCurrency(value: CurrencyCode) {
    setCurrency(value);
    setOpenMenu(null);
  }

  function chooseLanguage(value: LanguageCode) {
    setLanguage(value);
    setOpenMenu(null);
  }

  const currentCurrency =
    currencyOptions.find((item) => item.value === currency)?.label ??
    "USD ($)";

  const currentLanguage =
    languageOptions.find((item) => item.value === language) ??
    languageOptions[0];

  return (
    <>
      <div className="relative z-50 border-b border-gray-200 bg-white text-[13px] text-[#666]">
        <div className="mx-auto flex min-h-11 max-w-[1320px] flex-wrap items-center justify-between gap-x-5 gap-y-2 px-5 py-2">
          <nav
            aria-label={t("Utility navigation")}
            className="flex items-center gap-5"
          >
            {utilityLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors duration-200 hover:text-[#00a99d]"
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {/* Lokasi */}
            <button
              type="button"
              onClick={() => {
                setOpenMenu(null);
                setLocationOpen(true);
              }}
              className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-[#00a99d]"
            >
              <MapPin size={15} strokeWidth={1.7} />
              <span>{location ? countryLabel(location, language) : t("Location")}</span>
            </button>

            {/* Pilihan mata uang */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={openMenu === "currency"}
                aria-haspopup="menu"
                onClick={() =>
                  setOpenMenu((current) =>
                    current === "currency" ? null : "currency",
                  )
                }
                className="inline-flex items-center gap-1.5 whitespace-nowrap transition-colors duration-200 hover:text-[#00a99d]"
              >
                <span>{currentCurrency}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    openMenu === "currency" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openMenu === "currency" && (
                <div
                  role="menu"
                  className="absolute end-0 top-full z-[100] mt-3 max-h-[330px] min-w-44 overflow-y-auto rounded border border-gray-100 bg-white py-1 shadow-xl"
                >
                  {currencyOptions.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      role="menuitem"
                      onClick={() => chooseCurrency(item.value)}
                      className={`block w-full px-4 py-2.5 text-start transition-colors hover:bg-gray-50 hover:text-[#00a99d] ${
                        currency === item.value
                          ? "bg-[#f0fbf9] text-[#009e92]"
                          : ""
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pilihan bahasa */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={openMenu === "language"}
                aria-haspopup="menu"
                onClick={() =>
                  setOpenMenu((current) =>
                    current === "language" ? null : "language",
                  )
                }
                className="inline-flex items-center gap-2 whitespace-nowrap transition-colors duration-200 hover:text-[#00a99d]"
              >
                {/* Tampilan bahasa aktif di tombol utama */}
                <ReactCountryFlag 
                  countryCode={currentLanguage.countryCode} 
                  svg 
                  style={{ width: '1.2em', height: '1.2em' }} 
                />
                <span>{currentLanguage.label}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    openMenu === "language" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openMenu === "language" && (
                <div
                  role="menu"
                  className="absolute end-0 top-full z-[100] mt-3 min-w-40 overflow-hidden rounded border border-gray-100 bg-white py-1 shadow-xl"
                >
                  {languageOptions.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      role="menuitem"
                      onClick={() => chooseLanguage(item.value)}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-start transition-colors hover:bg-gray-50 hover:text-[#00a99d] ${
                        language === item.value
                          ? "bg-[#f0fbf9] text-[#009e92]"
                          : ""
                      }`}
                    >
                      {/* Gambar Bendera di Dropdown */}
                      <ReactCountryFlag 
                        countryCode={item.countryCode} 
                        svg 
                        style={{ width: '1.2em', height: '1.2em' }} 
                      />
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tombol autentikasi */}
            <div className="flex items-center">
              <AuthButtons />
            </div>
          </div>
        </div>
      </div>

      {/* Modal lokasi */}
      <LocationModal
        isOpen={locationOpen}
        onClose={() => setLocationOpen(false)}
        selectedCountry={location}
        onSelect={(country) => setLocation(country)}
      />
    </>
  );
}