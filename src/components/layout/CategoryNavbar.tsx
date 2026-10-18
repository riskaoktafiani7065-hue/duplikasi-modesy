
"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useModesySettings } from "@/lib/modesy-settings";

const categories = [
  {
    name: "Clothing",
    columns: [
      {
        title: "Men",
        items: ["T-Shirts", "Shirts", "Jeans", "Jackets", "Pants"],
      },
      {
        title: "Women",
        items: ["Dresses", "Tops", "Jeans", "Skirts", "Jackets"],
      },
      {
        title: "Popular",
        items: ["Casual Wear", "Formal Wear", "Sportswear", "Accessories"],
      },
    ],
  },
  {
    name: "Shoes",
    columns: [
      {
        title: "Men's Shoes",
        items: ["Sneakers", "Formal Shoes", "Sandals", "Boots"],
      },
      {
        title: "Women's Shoes",
        items: ["Heels", "Flats", "Sneakers", "Sandals"],
      },
      {
        title: "Collections",
        items: ["Casual Shoes", "Sports Shoes", "New Arrivals"],
      },
    ],
  },
  {
    name: "Home & Living",
    columns: [
      {
        title: "Furniture",
        items: ["Sofas", "Tables", "Chairs", "Beds"],
      },
      {
        title: "Home Decor",
        items: ["Lighting", "Wall Decor", "Rugs", "Curtains"],
      },
      {
        title: "Kitchen",
        items: ["Cookware", "Kitchen Tools", "Storage"],
      },
    ],
  },
  {
    name: "Jewelry & Accessories",
    columns: [
      {
        title: "Jewelry",
        items: ["Necklaces", "Rings", "Bracelets", "Earrings"],
      },
      {
        title: "Accessories",
        items: ["Watches", "Bags", "Wallets", "Sunglasses"],
      },
      {
        title: "Collections",
        items: ["Men's Accessories", "Women's Accessories", "New Arrivals"],
      },
    ],
  },
  {
    name: "Toys & Entertainment",
    columns: [
      {
        title: "Toys",
        items: ["Action Figures", "Dolls", "Building Toys", "Board Games"],
      },
      {
        title: "Entertainment",
        items: ["Books", "Music", "Movies", "Collectibles"],
      },
      {
        title: "Hobbies",
        items: ["Outdoor Toys", "Crafts", "Puzzles"],
      },
    ],
  },
  {
    name: "Graphics & Photos",
    columns: [
      {
        title: "Graphics",
        items: ["Illustrations", "Icons", "Vectors", "Textures"],
      },
      {
        title: "Photos",
        items: ["Nature", "Business", "People", "Technology"],
      },
      {
        title: "Resources",
        items: ["Mockups", "Backgrounds", "Templates"],
      },
    ],
  },
  {
    name: "Video & Audio",
    columns: [
      {
        title: "Video",
        items: ["Stock Video", "Intros", "Transitions", "Motion Graphics"],
      },
      {
        title: "Audio",
        items: ["Music", "Sound Effects", "Loops", "Voice Over"],
      },
      {
        title: "Resources",
        items: ["Audio Bundles", "Video Templates", "New Arrivals"],
      },
    ],
  },
  {
    name: "Web Templates & Code",
    columns: [
      {
        title: "Templates",
        items: ["HTML Templates", "WordPress Themes", "UI Kits"],
      },
      {
        title: "Code",
        items: ["JavaScript", "React", "Next.js", "PHP Scripts"],
      },
      {
        title: "Resources",
        items: ["Plugins", "Components", "Website Themes"],
      },
    ],
  },
];

export default function CategoryNavbar() {
  const { t } = useModesySettings();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <nav
      className="relative z-40 border-b border-gray-200 bg-white"
      onMouseLeave={() => setActiveCategory(null)}
    >
      <div className="mx-auto flex max-w-[1320px] items-center gap-7 overflow-x-auto px-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex h-14 shrink-0 items-center"
            onMouseEnter={() => setActiveCategory(category.name)}
          >
            <button
              type="button"
              aria-expanded={activeCategory === category.name}
              onClick={() =>
                setActiveCategory((current) =>
                  current === category.name ? null : category.name,
                )
              }
              className={`flex h-full items-center gap-1 whitespace-nowrap border-b-2 text-[14px] transition-colors duration-200 ${
                activeCategory === category.name
                  ? "border-[#00a99d] text-[#00a99d]"
                  : "border-transparent text-[#222] hover:border-[#00a99d] hover:text-[#00a99d]"
              }`}
            >
              {t(category.name)}
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${
                  activeCategory === category.name ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {categories.map((category) => (
        <div
          key={category.name}
          className={`absolute left-0 top-full w-full border-t border-gray-100 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.10)] transition-all duration-200 ${
            activeCategory === category.name
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
        >
          <div className="mx-auto grid max-w-[1320px] grid-cols-3 gap-10 px-8 py-8">
            {category.columns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 border-b border-gray-100 pb-3 text-sm font-semibold text-[#222]">
                  {t(column.title)}
                </h3>

                <ul className="space-y-3">
                  {column.items.map((item) => (
                    <li key={item}>
                      <Link
                        href={`/products?search=${encodeURIComponent(item)}`}
                        onClick={() => setActiveCategory(null)}
                        className="block text-[13px] text-gray-500 transition-colors duration-150 hover:translate-x-1 hover:text-[#00a99d]"
                      >
                        {t(item)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 bg-gray-50/70">
            <div className="mx-auto flex max-w-[1320px] items-center justify-between px-8 py-4">
              <span className="text-xs text-gray-500">
                {t("Explore {name}", { name: t(category.name) })}
              </span>
              <Link
                href="/products"
                onClick={() => setActiveCategory(null)}
                className="text-xs font-semibold text-[#00a99d] transition hover:text-[#008f85]"
              >
                {t("View all products →")}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </nav>
  );
}
