
"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

const brands = [
  { name: "Nike", image: "https://modesy.codingest.net/uploads/blocks/202508/brand_w256_68b02d75760534-51758987.webp" },
  { name: "Puma", image: "https://modesy.codingest.net/uploads/blocks/202508/brand_w256_68b02d982b7a71-42564502.webp" },
  { name: "Tommy Hilfiger", image: "https://modesy.codingest.net/uploads/blocks/202508/brand_w256_68b02dbd734806-40400503.webp" },
  { name: "U.S. Polo Assn.", image: "https://modesy.codingest.net/uploads/blocks/202508/brand_w256_68b02dad845f94-79402000.webp" },
  { name: "Adidas", image: "https://modesy.codingest.net/uploads/blocks/202508/brand_w256_68b02b783a1005-37107282.webp" },
  { name: "Armani", image: "https://modesy.codingest.net/uploads/blocks/202508/brand_w256_68b02c7256e232-52626639.webp" },
  { name: "Burberry", image: "https://modesy.codingest.net/uploads/blocks/202508/brand_w256_68b02c7fd272f7-05184358.webp" },
  { name: "Diesel", image: "https://modesy.codingest.net/uploads/blocks/202508/brand_w256_68b02c9122b3b4-44110417.webp" },
  { name: "Dockers", image: "https://modesy.codingest.net/uploads/blocks/202508/brand_w256_68b02dcc82f1b6-22186777.webp" },
  { name: "Gucci", image: "https://modesy.codingest.net/uploads/blocks/202508/brand_w256_68b02cab7e8e04-81354861.webp" },
  { name: "H&M", image: "https://modesy.codingest.net/uploads/blocks/202508/brand_w256_68b02d0170ad30-36308329.webp" },
  { name: "Hugo Boss", image: "https://modesy.codingest.net/uploads/blocks/202508/brand_w256_68b02cdf803355-43358601.webp" },
  { name: "Lacoste", image: "https://modesy.codingest.net/uploads/blocks/202508/brand_w256_68b02d20e3d6a4-53145738.webp" },
  { name: "Lee Cooper", image: "https://modesy.codingest.net/uploads/blocks/202508/brand_w256_68b02d31e82156-68897319.webp" },
  { name: "Levi's", image: "https://modesy.codingest.net/uploads/blocks/202508/brand_w256_68b02d84424487-94629234.webp" },
  { name: "Mango", image: "https://modesy.codingest.net/uploads/blocks/202508/brand_w256_68b02d490e3fd8-81385120.webp" },
];

const arabicTranslations: Record<string, string> = {
  "Shop By Brand": "تسوق حسب العلامة التجارية",
  "Previous brands": "العلامات التجارية السابقة",
  "Next brands": "العلامات التجارية التالية",
};

export default function ShopByBrand() {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const t = (text: string) =>
    isArabic ? arabicTranslations[text] ?? text : text;

  const sliderRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const manualPauseRef = useRef(false);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let movementTimeout: ReturnType<typeof setTimeout> | undefined;
    let interval: ReturnType<typeof setInterval>;

    const itemWidth = () => {
      const item = slider.querySelector<HTMLElement>(
        "[data-brand-item]"
      );
      return item?.getBoundingClientRect().width ?? 200;
    };

    const moveNext = () => {
      if (
        pausedRef.current ||
        manualPauseRef.current
      ) {
        return;
      }

      const width = itemWidth();
      const originalWidth = width * brands.length;

      if (slider.scrollLeft >= originalWidth - 2) {
        slider.scrollLeft -= originalWidth;
      }

      slider.scrollTo({
        left: slider.scrollLeft + width,
        behavior: "smooth",
      });
    };

    interval = setInterval(moveNext, 3000);

    const handleScrollEnd = () => {
      const originalWidth = itemWidth() * brands.length;

      if (slider.scrollLeft >= originalWidth) {
        slider.scrollLeft -= originalWidth;
      }
    };

    slider.addEventListener("scrollend", handleScrollEnd);

    return () => {
      clearInterval(interval);

      if (movementTimeout !== undefined) {
        clearTimeout(movementTimeout);
      }

      slider.removeEventListener("scrollend", handleScrollEnd);
    };
  }, []);

  const moveManually = (direction: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const item = slider.querySelector<HTMLElement>(
      "[data-brand-item]"
    );
    const width = item?.getBoundingClientRect().width ?? 200;

    slider.scrollBy({
      left: direction * width,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white px-5 pb-10 pt-8 sm:px-6">
      <h2 className="mb-7 text-[27px] font-bold text-[#222]">
        {t("Shop By Brand")}
      </h2>

      <div
        className="group relative"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
      >
        <div
          ref={sliderRef}
          className="flex overflow-x-auto border-l border-t border-[#ededed] scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              data-brand-item
              className="flex h-33 min-w-0 flex-[0_0_50%] items-center justify-center border-b border-r border-[#ededed] px-5 sm:flex-[0_0_25%] lg:flex-[0_0_12.5%]"
            >
              <img
                src={brand.image}
                alt={brand.name}
                title={brand.name}
                loading="lazy"
                className="max-h-18 max-w-full object-contain"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => moveManually(-1)}
          aria-label={t("Previous brands")}
          className="absolute left-3 top-1/2 flex h-13 w-13 -translate-y-1/2 items-center justify-center rounded-full bg-white text-3xl text-[#333] shadow-md hover:bg-gray-50"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={() => moveManually(1)}
          aria-label={t("Next brands")}
          className="absolute right-3 top-1/2 flex h-13 w-13 -translate-y-1/2 items-center justify-center rounded-full bg-white text-3xl text-[#333] shadow-md hover:bg-gray-50"
        >
          ›
        </button>
      </div>
    </section>
  );
}
