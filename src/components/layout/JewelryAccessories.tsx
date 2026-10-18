"use client";

import Link from "next/link";
import { useModesySettings } from "@/lib/modesy-settings";

const products = [
  {
    name: "Colorful women scarves",
    seller: "Trendshop",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48824422f87-70195961.webp",
    price: 40,
    oldPrice: 45,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Black fashion women backpack",
    seller: "Trendshop",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
    quote: true,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Women kipling bailey saddle handbag",
    seller: "Admin",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80",
    price: 59,
    oldPrice: 69,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Modern blue handbag",
    seller: "Trendshop",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=80",
    price: 45,
    oldPrice: 60,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Sun hat for women protection cap",
    seller: "Trendshop",
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=500&q=80",
    price: 29,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Handmade cute handbag",
    seller: "Admin",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80",
    price: 30,
    oldPrice: 45,
    rating: 0,
    wishlist: 0,
  },
];

export default function JewelryAccessories() {
  // TAMBAHKAN formatPrice DI SINI
  const { t, formatPrice } = useModesySettings();

  return (
    <section className="bg-white px-5 pb-12 pt-5 sm:px-6">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#252525]">
          {t("Jewelry & Accessories")}
        </h2>

        <Link
          href="/products"
          className="flex items-center gap-2 text-sm text-gray-600 transition hover:text-[#00a99d]"
        >
          {t("View All")} <span className="text-xl">{t("→")}</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {products.map((product) => (
          <article
            key={product.name}
            className="group min-w-0 overflow-hidden rounded-md border border-[#e8e8ed] bg-white"
          >
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <Link href="/products" className="block h-full">
                <img
                  src={product.image}
                  alt={t(product.name)}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </Link>

              {/* PERBAIKAN: right-3 diganti menjadi end-3 */}
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
                <div className="whitespace-nowrap text-base tracking-[-2px]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= product.rating
                          ? "text-[#ffb900]"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                <span className="text-sm text-gray-400">
                  <span className="text-lg">♡</span>{" "}
                  {product.wishlist}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {product.quote ? (
                  <span className="text-sm font-medium text-[#35a853]">
                    {t("Request a Quote")}
                  </span>
                ) : (
                  <>
                    {/* PERBAIKAN: Gunakan formatPrice() bukan hardcode $ */}
                    <span
                      className={`font-bold ${
                        product.oldPrice
                          ? "text-[#35a853]"
                          : "text-[#252525]"
                      }`}
                    >
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