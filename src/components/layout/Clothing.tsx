"use client";

import Link from "next/link";
import { useModesySettings } from "@/lib/modesy-settings";

const products = [
  {
    name: "Navy polka dot dress",
    seller: "Trendshop",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48564a31327-49271135.webp",
    price: 130,
    oldPrice: 150,
  },
  {
    name: "Black midi skirt with white flowers",
    seller: "Trendshop",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48029e507b3-80580535.webp",
    price: 48,
    oldPrice: 55,
  },
  {
    name: "Floral women sundress",
    seller: "Admin",
    image:
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=500&q=80",
    price: 80,
    oldPrice: 89,
  },
  {
    name: "Men outerwear navy color",
    seller: "Trendshop",
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=500&q=80",
    price: 89,
    oldPrice: 99,
  },
  {
    name: "Women lace blouse with different colors",
    seller: "Trendshop",
    image:
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=500&q=80",
    price: 69,
    oldPrice: 79,
  },
  {
    name: "Women casual dress",
    seller: "Admin",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=500&q=80",
    price: 56,
    quote: true,
  },
];

export default function Clothing() {
  // TAMBAHKAN formatPrice DI SINI
  const { t, formatPrice } = useModesySettings();

  return (
    <section className="bg-white px-5 py-12 sm:px-6">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#252525]">
          {t("Clothing")}
        </h2>

        <Link
          href="/products"
          className="text-sm text-gray-600 transition hover:text-[#00a99d]"
        >
          {t("View All →")}
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {products.map((product) => (
          <article
            key={product.name}
            className="group min-w-0 bg-white"
          >
            <div className="relative aspect-square overflow-hidden rounded-md bg-gray-100">
              <Link href="/products" className="block h-full">
                <img
                  src={product.image}
                  alt={t(product.name)}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </Link>

              {/* Tombol muncul ketika produk diarahkan */}
              {/* PERBAIKAN: right-3 diubah menjadi end-3 agar support RTL (Arab) */}
              <div className="pointer-events-none invisible absolute end-3 top-3 z-10 flex flex-col gap-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <button
                  type="button"
                  aria-label={t("Add to cart")}
                  className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md hover:bg-[#00a99d] hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label={t("Add to wishlist")}
                  className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md hover:bg-[#00a99d] hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

            </div>

            <div className="p-3">
              <Link
                href="/products"
                className="line-clamp-2 min-h-12 text-sm font-medium leading-5 text-[#252525] hover:text-[#00a99d]"
              >
                {t(product.name)}
              </Link>

              <p className="mt-1 text-sm text-gray-500">
                {t(product.seller)}
              </p>

              <div className="mt-2 flex items-center justify-between gap-1">
                <div className="whitespace-nowrap text-base tracking-[-2px] text-gray-300">
                  ★★★★★
                </div>
                <span className="text-sm text-gray-400">♡ 0</span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {product.quote ? (
                  <span className="text-sm font-medium text-[#35a853]">
                    {t("Request a Quote")}
                  </span>
                ) : (
                  <>
                    {/* PERBAIKAN: Gunakan formatPrice() bukan hardcode $ */}
                    <span className="font-bold text-[#35a853]">
                      {formatPrice(product.price || 0)}
                    </span>

                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}