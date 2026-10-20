"use client";

import { useState } from "react";
import {
  currencies,
  useCurrency,
} from "@/components/layout/CurrencyContext";

export default function CurrencyDropdown() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);

  const currentCurrency =
    currencies.find((item) => item.code === currency) ?? currencies[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-600 transition hover:text-gray-900"
      >
        {currentCurrency.label}

        <svg
          className={`h-4 w-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m5 7.5 5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Pilih mata uang"
          className="absolute right-0 top-full z-100 mt-3 w-40 overflow-hidden rounded-sm border border-gray-200 bg-white py-1 shadow-md"
        >
          {currencies.map((item) => (
            <button
              key={item.code}
              type="button"
              role="option"
              aria-selected={currency === item.code}
              onClick={() => {
                setCurrency(item.code);
                setOpen(false);
              }}
              className={`block w-full px-4 py-3 text-left text-sm transition hover:bg-gray-50 hover:text-[#00a99d] ${
                currency === item.code
                  ? "font-medium text-gray-900"
                  : "text-gray-500"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
