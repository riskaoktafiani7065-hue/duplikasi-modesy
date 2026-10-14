
import Link from "next/link";

export default function MemberMainHeader() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex min-h-27.5 max-w-330 items-center gap-4 px-4 sm:gap-8 sm:px-6">
        <Link
          href="/member"
          className="shrink-0 text-3xl font-bold tracking-tight text-[#222222] sm:text-[38px]"
          aria-label="Modesy Member Home"
        >
          modesy<span className="text-[#2563ff]">.</span>
        </Link>

        <form
          action="/products"
          method="GET"
          className="flex h-12 min-w-0 flex-1 items-center overflow-hidden rounded-md bg-[#f5f7ff] sm:h-13"
        >
          <input
            type="search"
            name="search"
            placeholder="Search products..."
            aria-label="Search products"
            className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 sm:px-5"
          />

          <button
            type="submit"
            aria-label="Search"
            className="flex h-full w-11 shrink-0 items-center justify-center text-gray-600 transition hover:text-[#2563ff] sm:w-14"
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

        <Link
          href="/wishlist"
          className="hidden shrink-0 items-center gap-2 text-sm text-[#444444] transition hover:text-[#2563ff] md:flex"
        >
          <span className="text-2xl" aria-hidden="true">♡</span>
          Wishlist
        </Link>

        <Link
          href="/cart"
          className="flex shrink-0 items-center gap-1 text-sm text-[#444444] transition hover:text-[#2563ff] sm:gap-2"
        >
          <span className="text-2xl" aria-hidden="true">🛒</span>
          <span className="hidden sm:inline">Cart</span>
        </Link>

        <Link
          href="/sell"
          className="hidden h-12 shrink-0 items-center justify-center rounded-md bg-[#00a99d] px-4 text-sm font-semibold text-white transition hover:bg-[#008f85] sm:flex sm:px-6"
        >
          + Sell Now
        </Link>
      </div>
    </header>
  );
}
