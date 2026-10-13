
import Link from "next/link";
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
];

export default function CategoryNavbar() {
  return (
    <nav className="relative z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-330 items-center gap-7 overflow-visible px-6">
        {categories.map((category, index) => (
          <div
            key={category}
            className="group static flex h-14.5 shrink-0 items-center"
          >
            <Link
              href="/products"
              className="flex h-full items-center gap-1 whitespace-nowrap border-b-2 border-transparent text-[15px] text-[#222] transition hover:border-[#00a99d] hover:text-[#00a99d]"
            >
              {category}
            </Link>

            {index === 0 && <MegaMenu />}
          </div>
        ))}
      </div>
    </nav>
  );
}
