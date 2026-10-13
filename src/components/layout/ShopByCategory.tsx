
import Link from "next/link";

const categories = [
  {
    name: "Clothing",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=500&q=80",
    href: "/products",
  },
  {
    name: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=500&q=80",
    href: "/products",
  },
  {
    name: "Toys & Entertainment",
    image:
      "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=500&q=80",
    href: "/products",
  },
  {
    name: "Women's Clothing",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80",
    href: "/products",
  },
  {
    name: "Men's Clothing",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=500&q=80",
    href: "/products",
  },
  {
    name: "Furniture",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80",
    href: "/products",
  },
  {
    name: "Necklaces & Accessories",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=500&q=80",
    href: "/products",
  },
  {
    name: "Graphics",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=500&q=80",
    href: "/products",
  },
  {
    name: "Painting",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=500&q=80",
    href: "/products",
  },
  {
    name: "Boots",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
    href: "/products",
  },
  {
    name: "Decorative Pillows",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=500&q=80",
    href: "/products",
  },
  {
    name: "Handbags",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80",
    href: "/products",
  },
];

export default function ShopByCategory() {
  return (
    <section className="bg-white px-5 py-10 sm:px-8 lg:px-5 lg:py-12">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#252525] sm:text-3xl">
          Shop By Category
        </h2>

        <Link
          href="/products"
          className="flex items-center gap-2 text-base text-[#222] transition hover:text-[#66ccf5] sm:text-lg"
        >
          View All <span aria-hidden="true">⟶</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-6 lg:gap-x-8 lg:gap-y-10">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="group flex min-w-0 flex-col items-center text-center"
          >
            <div className="aspect-square w-full max-w-61.25 overflow-hidden rounded-full bg-gray-100">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <h3 className="mt-4 text-sm font-medium text-[#222] transition group-hover:text-[#6ce2f9] sm:text-base lg:text-lg">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
