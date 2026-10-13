
import Link from "next/link";

const products = [
  {
    name: "Animal colorful digital prints",
    seller: "Trendshop",
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80",
    discount: "-25%",
    price: 29,
    oldPrice: 39,
    rating: 5,
  },
  {
    name: "Summer fashion top lace",
    seller: "Trendshop",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80",
    discount: "-17%",
    price: 65,
    oldPrice: 79,
    rating: 5,
  },
  {
    name: "Women lace blouse with different colors",
    seller: "Trendshop",
    image:
      "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=600&q=80",
    discount: "-12%",
    price: 69,
    oldPrice: 79,
    rating: 0,
  },
  {
    name: "Floral women sundress",
    seller: "Admin",
    image:
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=600&q=80",
    discount: "-10%",
    price: 80,
    oldPrice: 89,
    rating: 4,
  },
  {
    name: "Gucci nylon fabric smart backpack",
    seller: "Admin",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    discount: "-20%",
    price: 55,
    oldPrice: 69,
    rating: 0,
  },
  {
    name: "Black sneakers with white sole",
    seller: "Admin",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    discount: "-22%",
    price: 69,
    oldPrice: 89,
    rating: 0,
  },
];

const banners = [
  {
    title: "Summer",
    subtitle: "Choose your style, make your summer.",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85",
    label: "DISCOUNT",
    discount: "25%",
    date: "ON JUNE 29",
  },
  {
    title: "Autumn",
    subtitle: "Sale",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
    label: "50%",
    discount: "OFF",
    date: "Limited Time",
  },
];

export default function SpecialOffers() {
  return (
    <section className="bg-white px-5 py-8 sm:px-6">
      <h2 className="mb-7 text-2xl font-bold text-[#252525]">
        Special Offers
      </h2>

      {/* Daftar produk */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {products.map((product) => (
          <article
            key={product.name}
            className="group relative min-w-0 overflow-hidden rounded-md border border-gray-200 bg-white transition hover:shadow-md"
          >
            {/* Area gambar */}
            <Link href="/products" className="block">
              <div className="relative aspect-[4/4.1] overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                {/* Label diskon */}
                <span className="absolute left-0 top-0 rounded-br-xl bg-[#ff3548] px-3 py-2 text-sm font-semibold text-white">
                  {product.discount}
                </span>
              </div>
            </Link>

            {/* Tombol muncul saat hover pada gambar */}
            <div className="pointer-events-none absolute right-3 top-3 z-10 flex invisible flex-col gap-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <button
                type="button"
                aria-label={`Add ${product.name} to cart`}
                className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-md transition hover:bg-[#00a99d] hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
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
                aria-label={`Add ${product.name} to wishlist`}
                className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-md transition hover:bg-[#00a99d] hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
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
            <div className="flex min-h-50 flex-col p-3">
              <Link
                href="/products"
                className="line-clamp-2 min-h-12 text-base font-medium leading-6 text-[#222] hover:text-[#00a99d]"
              >
                {product.name}
              </Link>

              <p className="mt-1 text-sm text-gray-500">
                {product.seller}
              </p>

              {/* Rating dan jumlah wishlist */}
              <div className="mt-2 flex items-center justify-between gap-1">
                <div
                  className="whitespace-nowrap text-lg tracking-[-2px]"
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

                <span className="shrink-0 text-sm text-gray-400">
                  ♡ 0
                </span>
              </div>

              {/* Harga */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="font-bold text-[#35a853]">
                  ${product.price}
                </span>

                <span className="text-sm font-medium text-gray-400 line-through">
                  ${product.oldPrice}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Banner promosi */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Link
          href="/products"
          className="block overflow-hidden"
          aria-label="Summer Collection"
        >
          <img
            src="https://modesy.codingest.net/uploads/blocks/202508/block_68b02a364b90c6-71529931.webp"
            alt="Summer Collection"
            className="h-auto w-full object-cover"
          />
        </Link>

        <Link
          href="/products"
          className="block overflow-hidden"
          aria-label="Autumn Sale"
        >
          <img
            src="https://modesy.codingest.net/uploads/blocks/202508/block_68b02a59a1d144-08234125.webp"
            alt="Autumn Sale"
            className="h-auto w-full object-cover"
          />
        </Link>
      </div>
    </section>
  );
}
