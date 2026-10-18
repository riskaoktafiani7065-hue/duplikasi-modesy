
"use client";

import Link from "next/link";
import { useModesySettings } from "@/lib/modesy-settings";

export default function MainHeader() {
  const { t } = useModesySettings();

  return (
    <header className="relative z-40 border-b border-gray-100 bg-white">
      <div className="mx-auto flex min-h-[100px] max-w-[1320px] items-center gap-8 px-5 py-4">
        <Link
          href="/"
          className="shrink-0 text-[36px] font-bold tracking-[-2px] text-[#222] transition-transform duration-300 hover:scale-[1.03]"
          aria-label={t("Modesy Home")}
        >
          Modesy
        </Link>

        <form
          action="/products"
          method="GET"
          className="group flex h-[50px] min-w-0 flex-1 items-center overflow-hidden rounded-md border border-[#e2e8f0] bg-white transition-all duration-300 focus-within:border-[#00a99d] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(37,99,255,0.08)]"
        >
          <input
            type="search"
            name="search"
            placeholder={t("Search products...")}
            aria-label={t("Search products")}
            className="h-full min-w-0 flex-1 bg-transparent px-5 text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />

          <button
            type="submit"
            aria-label={t("Search")}
            className="flex h-full w-[54px] shrink-0 items-center justify-center text-gray-500 transition-colors duration-200 hover:text-[#00a99d]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5 transition-transform duration-300 group-focus-within:scale-110"
              aria-hidden="true"
            >
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.5 4.5" />
            </svg>
          </button>
        </form>

        <div className="flex shrink-0 items-center gap-6">
          <Link
            href="/cart"
            className="group flex items-center gap-2 text-sm text-[#444] transition-colors duration-200 hover:text-[#00a99d]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-[23px] w-[23px] transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              <path d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 7H6" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            <span>{t("Cart")}</span>
          </Link>

          <Link
            href="/wishlist"
            className="group flex items-center gap-2 text-sm text-[#444] transition-colors duration-200 hover:text-[#00a99d]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-[23px] w-[23px] transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            >
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
            </svg>
            <span>{t("Wishlist")}</span>
          </Link>

          <Link
            href="/sell"
            className="flex h-11 shrink-0 items-center justify-center rounded-md bg-[#00a99d] px-5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#008f85] hover:shadow-lg active:translate-y-0"
          >
            {t("Sell Now")}
          </Link>
        </div>
      </div>
    </header>
  );
}
