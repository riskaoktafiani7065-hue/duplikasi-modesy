
"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function MainHeader() {
  const t = useTranslations("Header");

  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex min-h-27.5 max-w-330 items-center gap-8 px-6">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-[58px] font-semibold leading-none tracking-[-2px] text-[#484848]"
          aria-label="Modesy Home"
        >
          M<span className="text-[#00a99d]">o</span>desy
        </Link>

        {/* Search */}
        <form
          action="/products"
          method="GET"
          className="flex h-13 min-w-0 flex-1 items-center overflow-hidden rounded-md bg-[#f5f7ff]"
        >
          <input
            type="search"
            name="search"
            placeholder={t("search")}
            aria-label={t("search")}
            className="h-full min-w-0 flex-1 bg-transparent px-5 text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />

          <button
            type="submit"
            aria-label={t("search")}
            className="flex h-full w-14.5 shrink-0 items-center justify-center text-gray-600 transition hover:text-[#2563ff]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.5 4.5" />
            </svg>
          </button>
        </form>

        {/* Wishlist */}
        <Link
          href="/wishlist"
          className="flex shrink-0 items-center gap-2 text-sm text-[#444444] transition hover:text-[#2563ff]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
          </svg>
          <span>{t("wishlist")}</span>
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className="flex shrink-0 items-center gap-2 text-sm text-[#444444] transition hover:text-[#2563ff]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 7H6" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
          <span>{t("cart")}</span>
        </Link>

        {/* Sell Now */}
        <Link
          href="/sell"
          className="flex h-12 shrink-0 items-center justify-center rounded-md bg-[#00a99d] px-6 text-sm font-semibold text-white transition hover:bg-[#008f85]"
        >
          + {t("sellNow")}
        </Link>
      </div>
    </header>
  );
}
