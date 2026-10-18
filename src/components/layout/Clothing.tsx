"use client";

import { useState } from "react";
import Link from "next/link";
import { useCurrency } from "@/components/layout/CurrencyContext";

const products = [
  {
    name: "Navy polka dot dress",
    seller: "Trendshop",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b485694fb4e1-78372446.webp",
    price: 130,
    oldPrice: 150,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Black midi skirt with white flowers",
    seller: "Trendshop",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48029e507b3-80580535.webp",
    price: 48,
    oldPrice: 55,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Floral women sundress",
    seller: "Admin",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4782d17e5e8-92500257.webp",
    price: 80,
    oldPrice: 89,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Men outerwear navy color",
    seller: "Trendshop",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4745c78aa80-39123844.webp",
    price: 89,
    oldPrice: 99,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Women lace blouse with different colors",
    seller: "Admin",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b444ba2690c6-93793826.webp",
    price: 69,
    oldPrice: 79,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Women casual dress",
    seller: "Admin",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b43a9740e718-26703231.webp",
    price: 56,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Light blue women shirt",
    seller: "Trendshop",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b425f0d4fc67-53412693.webp",
    price: 49,
    oldPrice: 69,
    rating: 5,
    wishlist: 0,
  },
  {
    name: "Women red casual dress",
    seller: "Admin",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4243e488706-95544418.webp",
    price: 99,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Summer fashion top lace",
    seller: "Trendshop",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4201c061823-88575118.webp",
    price: 65,
    oldPrice: 79,
    rating: 5,
    wishlist: 1,
  },
  {
    name: "Elegant white lace fabric",
    seller: "Trendshop",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b35fa00c5bb8-59638334.webp",
    price: 59,
    oldPrice: 69,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Cobalt man t-shirt all colors",
    seller: "Admin",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b304f24b4223-50676672.webp",
    price: 0,
    rating: 0,
    wishlist: 1,
    quote: true,
  },
];

export default function Clothing() {
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

  // Urutan produk berubah satu per satu dan berputar kembali ke awal.
  const visibleProducts = Array.from({ length: 6 }, (_, index) => {
    return products[(currentIndex + index) % products.length];
  });

  return (
    <section className="bg-white px-5 pb-12 pt-10 sm:px-6">
      {/* Judul dan View All */}
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#252525]">
          Clothing
        </h2>

        <Link
          href="/products"
          className="text-base text-[#252525] transition hover:text-[#00a99d]"
        >
          View All →
        </Link>
      </div>

      {/* Area slider */}
      <div className="relative">
        {/* Panah kiri */}
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

        {/* Panah kanan */}
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
              className="group relative min-w-0 overflow-hidden rounded-md border border-gray-200 bg-white transition hover:shadow-md"
            >
              <Link href="/products" className="block">
                {/* Gambar produk */}
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>

              {/* Tombol aksi saat hover */}
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
                    width="22"
                    height="22"
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
                <div className="mt-3 flex items-center justify-between gap-1">
                  <div className="whitespace-nowrap text-base tracking-[-2px]">
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <span
                        key={starIndex}
                        className={
                          starIndex < product.rating
                            ? "text-amber-400"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <span className="text-sm text-gray-400">
                    ♡ {product.wishlist}
                  </span>
                </div>

                {/* Harga */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {product.quote ? (
                    <span className="font-bold text-[#252525]">
                      Request a Quote
                    </span>
                  ) : (
                    <>
                      <span
                        className={`font-bold ${
                          product.oldPrice
                            ? "text-[#35a853]"
                            : "text-[#252525]"
                        }`}
                      >
                        {formatPrice(product.price)}
                      </span>

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