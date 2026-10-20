
"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useCurrency } from "@/components/layout/CurrencyContext";

const products = [
  {
    name: "Black midi skirt with white flowers",
    seller: "Trendshop",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48029e507b3-80580535.webp",
    price: 48,
    oldPrice: 55,
    rating: 4,
    wishlist: 0,
  },
  {
    name: "Handcrafted decorative pillow for a luxurious touch",
    seller: "Admin",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4833ada8cd5-61059376.webp",
    price: 59,
    oldPrice: 69,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Floral women sundress",
    seller: "Admin",
    image:
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=500&q=80",
    price: 80,
    oldPrice: 89,
    rating: 4,
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
    name: "Sneaker shoes men",
    seller: "Trendshop",
    image:
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=500&q=80",
    price: 89,
    oldPrice: 100,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Women kipling bailey saddle handbag",
    seller: "Admin",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
    price: 59,
    oldPrice: 69,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Cobalt man t-shirt all colors",
    seller: "Admin",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80",
    price: 0,
    rating: 0,
    wishlist: 1,
    quote: true,
  },
  {
    name: "Adorable animals photo pack",
    seller: "Admin",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80",
    price: 0,
    rating: 0,
    wishlist: 1,
    free: true,
  },
  {
    name: "Moment of inspiration piano music",
    seller: "Admin",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=500&q=80",
    price: 15,
    oldPrice: 34,
    rating: 0,
    wishlist: 1,
  },
  {
    name: "Animation of popular vacation spots",
    seller: "Trendshop",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=500&q=80",
    price: 10,
    oldPrice: 15,
    rating: 5,
    wishlist: 1,
  },
  {
    name: "Light blue women shirt",
    seller: "Trendshop",
    image:
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=500&q=80",
    price: 49,
    oldPrice: 69,
    rating: 5,
    wishlist: 0,
  },
  {
    name: "Summer fashion top lace",
    seller: "Trendshop",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=500&q=80",
    price: 65,
    oldPrice: 79,
    rating: 5,
    wishlist: 1,
  },
  {
    name: "Handmade cute handbag",
    seller: "Admin",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80",
    price: 31,
    oldPrice: 46.5,
    rating: 0,
    wishlist: 0,
  },
  {
    name: "Blanket comfort couch pillow",
    seller: "Trendshop",
    image:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b41df6a5b290-34492240.webp",
    price: 39,
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
];

const arabicNames: Record<string, string> = {
  "Black midi skirt with white flowers":
    "تنورة سوداء مزينة بأزهار بيضاء",
  "Handcrafted decorative pillow for a luxurious touch":
    "وسادة زخرفية مصنوعة يدويًا",
  "Floral women sundress": "فستان نسائي صيفي مزهر",
  "Sun hat for women protection cap": "قبعة شمسية نسائية",
  "Sneaker shoes men": "حذاء رياضي رجالي",
  "Women kipling bailey saddle handbag": "حقيبة يد نسائية",
  "Cobalt man t-shirt all colors":
    "قميص رجالي باللون الأزرق الكوبالت",
  "Adorable animals photo pack": "مجموعة صور حيوانات لطيفة",
  "Moment of inspiration piano music": "موسيقى بيانو ملهمة",
  "Animation of popular vacation spots":
    "رسوم متحركة لوجهات سياحية شهيرة",
  "Light blue women shirt": "قميص نسائي أزرق فاتح",
  "Summer fashion top lace": "بلوزة صيفية مزينة بالدانتيل",
  "Handmade cute handbag": "حقيبة يد لطيفة مصنوعة يدويًا",
  "Blanket comfort couch pillow": "وسادة مريحة للأريكة",
  "Women casual dress": "فستان نسائي كاجوال",
};

export default function FeaturedProducts() {
  const { formatPrice } = useCurrency();
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [visibleCount, setVisibleCount] = useState(12);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  const text = {
    title: isArabic ? "منتجات مميزة" : "Featured Products",
    viewAll: isArabic ? "عرض الكل" : "View All",
    addToCart: isArabic ? "أضف إلى سلة التسوق" : "Add to cart",
    addToWishlist: isArabic ? "أضف إلى المفضلة" : "Add to wishlist",
    contactPrice: isArabic ? "اتصل لمعرفة السعر" : "Contact for price",
    free: isArabic ? "مجاني" : "Free",
    loadMore: isArabic ? "عرض المزيد" : "Load More",
  };

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="bg-white px-5 pb-10 pt-16 sm:px-6"
    >
      <div className="mb-7 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-[#252525]">
          {text.title}
        </h2>

        <Link
          href="/products"
          className="text-sm text-gray-600 transition hover:text-[#00a99d]"
        >
          {text.viewAll} →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {visibleProducts.map((product) => {
          const displayName = isArabic
            ? arabicNames[product.name] ?? product.name
            : product.name;

          return (
            <article
              key={product.name}
              className="group relative min-w-0 overflow-hidden rounded-md border border-gray-200 bg-white transition hover:shadow-md"
            >
              <Link href="/products" className="block">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={displayName}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>

              {/* Tombol keranjang dan wishlist */}
              <div className="pointer-events-none invisible absolute right-3 top-3 z-10 flex flex-col gap-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <button
                  type="button"
                  aria-label={`${text.addToCart}: ${displayName}`}
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
                  aria-label={`${text.addToWishlist}: ${displayName}`}
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

              <div className="p-3">
                <Link
                  href="/products"
                  className="line-clamp-2 min-h-12 text-sm font-medium leading-5 text-[#252525] hover:text-[#00a99d]"
                >
                  {displayName}
                </Link>

                <p className="mt-1 text-sm text-gray-500">
                  {product.seller}
                </p>

                <div className="mt-2 flex items-center justify-between gap-1">
                  <div
                    className="whitespace-nowrap text-base tracking-[-2px]"
                    aria-label={`${product.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <span
                        key={index}
                        className={
                          index < product.rating
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

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {product.quote ? (
                    <span className="font-bold text-[#35a853]">
                      {text.contactPrice}
                    </span>
                  ) : product.free ? (
                    <span className="font-bold text-[#35a853]">
                      {text.free}
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
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((current) =>
                Math.min(current + 3, products.length)
              )
            }
            className="inline-flex items-center gap-2 text-base font-normal text-[#252525] transition hover:text-[#00a99d]"
          >
            {text.loadMore}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
