"use client";

import { useModesySettings } from "@/lib/modesy-settings";

const clothingGroups = [
  {
    title: "Women's Clothing",
    items: [
      "Dresses",
      "Skirts",
      "Jackets & Coats",
      "Sweaters",
      "Jeans",
      "T-Shirts",
    ],
  },
  {
    title: "Men's Clothing",
    items: [
      "Shirts",
      "T-Shirts",
      "Jeans",
      "Jackets & Coats",
      "Sweaters",
      "Pants",
    ],
  },
  {
    title: "Kid's Clothing",
    items: [
      "Dresses",
      "T-Shirts",
      "Pants",
      "Jackets",
      "Shoes",
      "Accessories",
    ],
  },
];

const featuredCategories = [
  {
    title: "Women's Clothing",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Men's Clothing",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Fashion Accessories",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80",
  },
];

export default function MegaMenu() {
  const { t } = useModesySettings();

  return (
    <div className="absolute left-0 top-full z-50 hidden w-full border border-gray-100 bg-white shadow-lg group-hover:block group-focus-within:block">
      <div className="mx-auto grid max-w-330 grid-cols-12 gap-8 px-8 py-8">
        <div className="col-span-7 grid grid-cols-3 gap-8">
          {clothingGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                {t(group.title)}
              </h3>

              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item}>
                    <a
                      href="/products"
                      className="text-sm text-gray-500 transition hover:text-[#00a99d]"
                    >
                      {t(item)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="col-span-5 grid grid-cols-3 gap-4">
          {featuredCategories.map((category) => (
            <a
              key={category.title}
              href="/products"
              className="group/card block"
            >
              <div className="aspect-3/4 overflow-hidden bg-gray-100">
                <img
                  src={category.image}
                  alt={t(category.title)}
                  className="h-full w-full object-cover transition duration-300 group-hover/card:scale-105"
                />
              </div>

              <p className="mt-3 text-center text-xs font-medium text-gray-700">
                {t(category.title)}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
