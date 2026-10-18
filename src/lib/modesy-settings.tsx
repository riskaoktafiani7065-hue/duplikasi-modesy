"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  LANGUAGE_COOKIE,
  normalizeLanguage,
  translate,
  type LanguageCode,
} from "@/lib/i18n";

export type { LanguageCode } from "@/lib/i18n";

export type CurrencyCode =
  | "USD"
  | "EUR"
  | "BRL"
  | "GBP"
  | "IDR"
  | "INR"
  | "NGN"
  | "RUB"
  | "TRY";

type ModesySettings = {
  location: string;
  currency: CurrencyCode;
  language: LanguageCode;
  setLocation: (value: string) => void;
  setCurrency: (value: CurrencyCode) => void;
  setLanguage: (value: LanguageCode) => void;
  formatPrice: (amount: number) => string;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const currencyOptions: Record<CurrencyCode, string> = {
  USD: "USD",
  EUR: "EUR",
  BRL: "BRL",
  GBP: "GBP",
  IDR: "IDR",
  INR: "INR",
  NGN: "NGN",
  RUB: "RUB",
  TRY: "TRY",
};

const LOCATION_KEY = "modesy-location";
const CURRENCY_KEY = "modesy-currency";
const LANGUAGE_KEY = "modesy-language";

function isCurrencyCode(value: string): value is CurrencyCode {
  return Object.prototype.hasOwnProperty.call(currencyOptions, value);
}

function readSavedCurrency(value: string | null): CurrencyCode | null {
  if (!value) return null;

  const code = value.trim().split(/\s+/)[0].toUpperCase();

  return isCurrencyCode(code) ? code : null;
}

// Menyimpan bahasa di cookie dan localStorage
function persistLanguage(value: LanguageCode) {
  document.documentElement.lang = value;
  
  // Mengatur arah teks secara dinamis (RTL untuk Arab, LTR untuk English)
  document.documentElement.dir = value === "ar" ? "rtl" : "ltr";

  try {
    document.cookie = `${LANGUAGE_COOKIE}=${value}; path=/; max-age=31536000; SameSite=Lax`;
    localStorage.setItem(LANGUAGE_KEY, value);
  } catch {
    // Pilihan tetap berlaku selama halaman terbuka.
  }
}

const SettingsContext = createContext<ModesySettings | null>(null);

export function ModesySettingsProvider({
  children,
  initialLanguage = "en",
}: {
  children: ReactNode;
  initialLanguage?: LanguageCode;
}) {
  const router = useRouter();
  const [location, setLocationState] = useState("");
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [language, setLanguageState] = useState<LanguageCode>(initialLanguage);

  useEffect(() => {
    try {
      const savedLocation = localStorage.getItem(LOCATION_KEY);
      const savedCurrency = readSavedCurrency(
        localStorage.getItem(CURRENCY_KEY),
      );
      const savedLanguage = localStorage.getItem(LANGUAGE_KEY);

      if (savedLocation) setLocationState(savedLocation);
      if (savedCurrency) setCurrencyState(savedCurrency);

      if (savedLanguage) {
        const lang = normalizeLanguage(savedLanguage);

        if (lang !== initialLanguage) {
          setLanguageState(lang);
          persistLanguage(lang);
          router.refresh();
        } else {
          // Pastikan arah dokumen benar saat halaman pertama kali dimuat
          document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        }
      } else {
        // Set arah default sesuai initialLanguage
        document.documentElement.dir = initialLanguage === "ar" ? "rtl" : "ltr";
      }
    } catch {
      // Gunakan pengaturan default jika localStorage tidak tersedia.
    }
  }, [initialLanguage, router]);

  const setLocation = useCallback((value: string) => {
    setLocationState(value);

    try {
      localStorage.setItem(LOCATION_KEY, value);
    } catch {
      // Pilihan tetap berlaku selama halaman terbuka.
    }
  }, []);

  const setCurrency = useCallback((value: CurrencyCode) => {
    if (!isCurrencyCode(value)) return;

    setCurrencyState(value);

    try {
      localStorage.setItem(CURRENCY_KEY, value);
    } catch {
      // Pilihan tetap berlaku selama halaman terbuka.
    }
  }, []);

  const setLanguage = useCallback(
    (value: LanguageCode) => {
      if (value !== "en" && value !== "ar") return;

      setLanguageState(value);
      persistLanguage(value);

      // Muat ulang komponen server (halaman admin & member) dalam bahasa baru.
      router.refresh();
    },
    [router],
  );

  // Fungsi Format Harga dengan Konversi Kurs IDR
  const formatPrice = useCallback(
    (amount: number) => {
      if (!Number.isFinite(amount)) return "";

      // Tentukan Kurs (Exchange Rate) khusus untuk IDR
      // 1 USD = Rp 16.483
      const EXCHANGE_RATE = 16483; 

      let finalAmount = amount;

      if (currency === "IDR") {
        // 1. Kalikan harga asli dengan Kurs
        finalAmount = amount * EXCHANGE_RATE;
        
        // 2. Format ke Rupiah
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 2, // Izinkan 2 angka di belakang koma
        })
          .format(finalAmount)
          .replace(/\s/g, ""); // Menghapus spasi menjadi Rp1.318.644
      }

      // 3. Format Mata Uang Lainnya (USD, EUR, dll)
      return new Intl.NumberFormat(
        language === "ar" ? "ar-SA" : "en-US",
        {
          style: "currency",
          currency: currency,
          maximumFractionDigits: 2,
        },
      ).format(finalAmount);
    },
    [currency, language],
  );

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) =>
      translate(language, key, vars),
    [language],
  );

  const value = useMemo<ModesySettings>(
    () => ({
      location,
      currency,
      language,
      setLocation,
      setCurrency,
      setLanguage,
      formatPrice,
      t,
    }),
    [
      location,
      currency,
      language,
      setLocation,
      setCurrency,
      setLanguage,
      formatPrice,
      t,
    ],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useModesySettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useModesySettings harus digunakan di dalam ModesySettingsProvider.",
    );
  }

  return context;
}