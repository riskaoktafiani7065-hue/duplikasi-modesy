
"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export const currencies = [
  { code: "USD", label: "USD ($)", locale: "en-US" },
  { code: "EUR", label: "EUR (€)", locale: "de-DE" },
  { code: "BRL", label: "BRL (R$)", locale: "pt-BR" },
  { code: "GBP", label: "GBP (£)", locale: "en-GB" },
  { code: "IDR", label: "IDR (Rp)", locale: "id-ID" },
  { code: "INR", label: "INR (₹)", locale: "en-IN" },
  { code: "NGN", label: "NGN (₦)", locale: "en-NG" },
  { code: "RUB", label: "RUB (₽)", locale: "ru-RU" },
  { code: "TRY", label: "TRY (₺)", locale: "tr-TR" },
] as const;

export type CurrencyCode = (typeof currencies)[number]["code"];

type CurrencyContextType = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (usdPrice: number) => string;
};

const rates: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  BRL: 5.7,
  GBP: 0.79,
  IDR: 16000,
  INR: 84,
  NGN: 1600,
  RUB: 90,
  TRY: 34,
};

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  function formatPrice(usdPrice: number) {
    const selected = currencies.find((item) => item.code === currency)!;
    const convertedPrice = usdPrice * rates[currency];

    return new Intl.NumberFormat(selected.locale, {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "IDR" ? 0 : 2,
    }).format(convertedPrice);
  }

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, formatPrice }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error(
      "useCurrency harus digunakan di dalam CurrencyProvider"
    );
  }

  return context;
}
