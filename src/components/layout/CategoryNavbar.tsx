
import Link from "next/link";
import { useTranslations } from "next-intl";
import MegaMenu from "./MegaMenu";

const categories = [
  "Clothing",
  "Shoes",
  "Home & Living",
  "Jewelry & Accessories",
  "Toys & Entertainment",
  "Graphics & Photos",
  "Video & Audio",
  "Web Templates & Code",
] as const;

const categoriesWithMenu = [
  "Clothing",
  "Shoes",
  "Home & Living",
  "Jewelry & Accessories",
  "Toys & Entertainment",
  "Graphics & Photos",
  "Video & Audio",
  "Web Templates & Code",
] as const;

type MenuCategory = (typeof categoriesWithMenu)[number];

const translationKeys = {
  Clothing: "clothing",
  Shoes: "shoes",
  "Home & Living": "homeLiving",
  "Jewelry & Accessories": "jewelryAccessories",
  "Toys & Entertainment": "toysEntertainment",
  "Graphics & Photos": "graphicsPhotos",
  "Video & Audio": "videoAudio",
  "Web Templates & Code": "webTemplatesCode",
} as const;

export default function CategoryNavbar() {
  const t = useTranslations("Navigation");

  return (
    <nav className="relative z-40 border-b border-gray-200 bg-white">
      <div className="relative mx-auto flex max-w-330 items-center gap-7 overflow-visible px-6">
        {categories.map((category) => {
          const hasMenu = categoriesWithMenu.includes(
            category as MenuCategory,
          );

          return (
            <div
              key={category}
              className="group flex h-14 shrink-0 items-center"
            >
              <Link
                href={`/products?category=${encodeURIComponent(category)}`}
                className="flex h-full items-center gap-1 whitespace-nowrap border-b-2 border-transparent text-[15px] text-[#222] transition hover:border-[#00a99d] hover:text-[#00a99d] focus-visible:border-[#00a99d] focus-visible:text-[#00a99d]"
              >
                {t(translationKeys[category as keyof typeof translationKeys])}
              </Link>

              {hasMenu && (
                <MegaMenu category={category as MenuCategory} />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
