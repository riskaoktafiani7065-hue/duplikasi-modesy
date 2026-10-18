"use client";

import { useState } from "react";
import { useCurrency } from "@/components/layout/CurrencyContext";
import Link from "next/link";

const products = [
  {
    name: "Colorful women scarves",
    seller: "Trendshop",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48824422f87-70195961.webp",
    price: 659322,
    oldPrice: 741737.25,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Black fashion women backpack",
    seller: "Trendshop",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4841c7942d4-77775842.webp",
    quote: true,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Women kipling bailey saddle handbag",
    seller: "Admin",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b47ead253a50-47019432.webp",
    price: 972499.95,
    oldPrice: 1137330.45,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Modern blue handbag",
    seller: "Trendshop",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b44b6b76e197-04055027.webp",
    price: 741737.25,
    oldPrice: 988983,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Sun hat for women protection cap",
    seller: "Trendshop",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b42b1dbd5113-51388874.webp",
    price: 29,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Handmade cute handbag",
    seller: "Admin",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b41f0210c3e2-91723360.webp",
    price: 494491.5,
    oldPrice: 741737.25,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Women black leather handbag",
    seller: "Admin",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b41d399b3227-56366628.webp",
    price: 642838.95,
    oldPrice: 807669.45,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Black gold fashion backpack",
    seller: "Trendshop",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4131a32fa22-32963773.webp",
    quote: true,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Black bag over the shoulder",
    seller: "Admin",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b41291dbf3a6-02229026.webp",
    price: 807669.45,
    oldPrice: 972499.95,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Gucci nylon fabric smart backpack",
    seller: "Admin",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b411ed6f0554-72302953.webp",
    price: 906567.75,
    oldPrice: 1137330.45,
    rating: 0,
    wishlist: 0,
  },
];

export default function JewelryAccessories() {
  const { formatPrice } = useCurrency();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((current) => (current + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (current) => (current - 1 + products.length) % products.length
    );
  };

  // Geser satu produk setiap tombol panah diklik.
  const visibleProducts = Array.from({ length: 6 }, (_, index) => {
    return products[(currentIndex + index) % products.length];
  });

  return (
    <section className="bg-white px-5 pb-12 pt-5 sm:px-6">
      {/* Judul dan View All */}
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#252525]">
          Jewelry &amp; Accessories
        </h2>

        <Link
          href="/products"
          className="flex items-center gap-2 text-sm text-gray-600 transition hover:text-[#00a99d]"
        >
          View All <span className="text-xl">→</span>
        </Link>
      </div>

      {/* Slider produk */}
      <div className="relative">
        {/* Tombol panah kiri */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Produk sebelumnya"
          className="absolute left-4 top-35 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md transition hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Tombol panah kanan */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Produk berikutnya"
          className="absolute right-4 top-35 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md transition hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        {/* Enam kartu produk */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {visibleProducts.map((product, index) => (
            <article
              key={`${product.name}-${currentIndex}-${index}`}
              className="group min-w-0 overflow-hidden rounded-md border border-[#e8e8ed] bg-white transition hover:shadow-md"
            >
              {/* Gambar produk */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Link href="/products" className="block h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </Link>

                {/* Tombol keranjang dan wishlist */}
                <div className="pointer-events-none invisible absolute right-3 top-3 z-10 flex flex-col gap-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <button
                    type="button"
                    aria-label={`Tambah ${product.name} ke keranjang`}
                    className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-[#00a99d] hover:text-white"
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
                    aria-label={`Tambah ${product.name} ke wishlist`}
                    className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-[#00a99d] hover:text-white"
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

              {/* Informasi produk */}
              <div className="p-3">
                <Link
                  href="/products"
                  className="line-clamp-2 min-h-12 text-sm font-medium leading-5 text-[#252525] hover:text-[#00a99d]"
                >
                  {product.name}
                </Link>

                <p className="mt-1 text-sm text-gray-500">
                  {product.seller}
                </p>

                {/* Rating dan wishlist */}
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

                {/* Harga produk */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {product.quote ? (
                    <span className="text-sm font-medium text-[#252525]">
                      Request a Quote
                    </span>
                  ) : (
                    <>
                      {product.price !== undefined && (
                        <span
                          className={`font-bold ${
                            product.oldPrice !== undefined
                              ? "text-[#35a853]"
                              : "text-[#252525]"
                          }`}
                        >
                          {formatPrice(product.price)}
                        </span>
                      )}

                      {product.oldPrice !== undefined && (
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
      </div>
    </section>
  );
}