"use client";

import Link from "next/link";
import { useModesySettings } from "@/lib/modesy-settings";

const products = [
  {
    name: "Colorful women scarves",
    seller: "Trendshop",
    image: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48824422f87-70195961.webp",
    price: 40,
    oldPrice: 45,
    rating: 0,
  },
  {
    name: "Women's ankle boot with different colors",
    seller: "Admin",
    image: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48729787ae5-77108034.webp",
    price: 59,
    oldPrice: 69,
    rating: 0,
  },
  {
    name: "Navy polka dot dress",
    seller: "Trendshop",
    image: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48564a31327-49271135.webp",
    price: 130,
    oldPrice: 150,
    rating: 0,
  },
  {
    name: "Modern grey couch and pillows",
    seller: "Admin",
    image: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b484e37e8a50-42247775.webp",
    price: 299,
    rating: 0,
  },
  {
    name: "Black fashion women backpack",
    seller: "Trendshop",
    image: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4841c7942d4-77775842.webp",
    quote: true,
    rating: 0,
  },
  {
    name: "Handcrafted decorative pillow for a luxurious touch",
    seller: "Admin",
    image: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4833ada8cd5-61059376.webp",
    price: 59,
    oldPrice: 69,
    rating: 0,
  },
  {
    name: "Black midi skirt with white flowers",
    seller: "Trendshop",
    image: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48029e507b3-80580535.webp",
    price: 48,
    oldPrice: 55,
    rating: 0,
  },
  {
    name: "Women kipling bailey saddle handbag",
    seller: "Admin",
    image: "https://modesy.codingest.net/uploads/images/202508/img_w1600_68b47ead5ff5d2-92270398.webp",
    price: 59,
    oldPrice: 69,
    rating: 0,
  },
  {
    name: "Animal colorful digital prints",
    seller: "Admin",
    image: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b47e4d8478d6-88291147.webp",
    price: 29,
    oldPrice: 39,
    rating: 0,
  },
  {
    name: "Floral women sundress",
    seller: "Admin",
    image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=500&q=80",
    price: 80,
    oldPrice: 89,
    rating: 0,
  },
  {
    name: "Seychelles women's brown ankle bootie",
    seller: "Trendshop",
    image: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4773855d892-33492018.webp",
    price: 79,
    rating: 0,
  },
  {
    name: "Ship illustration royalty free image",
    seller: "Admin",
    image: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b476dea0d5d2-94701714.webp",
    price: 15,
    oldPrice: 20,
    rating: 0,
  },
];

export default function NewArrivals() {
  // TAMBAHKAN formatPrice DI SINI
  const { t, formatPrice } = useModesySettings();

  return (
    <section className="bg-white px-5 py-12 sm:px-6">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#252525]">
          {t("New Arrivals")}
        </h2>
        <Link
          href="/products"
          className="text-sm text-gray-600 hover:text-[#00a99d]"
        >
          {t("View All →")}
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {products.map((product) => (
          <article key={product.name} className="group min-w-0 bg-white">
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
                <div className="whitespace-nowrap tracking-[-2px]">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={
                        i < product.rating
                          ? "text-amber-400"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
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

      {/* Tiga banner di bawah New Arrivals */}
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Link href="/products" className="block overflow-hidden">
          <img
            src="https://modesy.codingest.net/uploads/blocks/202508/block_68b02a748392d5-47296084.webp"
            alt={t("New Summer Collection")}
            className="h-auto w-full object-cover transition duration-300 hover:opacity-90"
          />
        </Link>

        <Link href="/products" className="block overflow-hidden">
          <img
            src="https://modesy.codingest.net/uploads/blocks/202508/block_68b02b0fa06e09-81527750.webp"
            alt={t("Limited Time Sale")}
            className="h-auto w-full object-cover transition duration-300 hover:opacity-90"
          />
        </Link>

        <Link href="/products" className="block overflow-hidden">
          <img
            src="https://modesy.codingest.net/uploads/blocks/202508/block_68b02a91357c27-13557247.webp"
            alt={t("Summer Collection Sale")}
            className="h-auto w-full object-cover transition duration-300 hover:opacity-90"
          />
        </Link>
      </div>
    </section>
  );
}