"use client";

import { useState, useEffect } from "react"; // Tambahan useEffect
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useModesySettings } from "@/lib/modesy-settings";

const slides = [
  {
    title: "Buy Nice and Unique Clothes",
    description:
      "Discover quality premium basics and trendy essentials at surprisingly affordable prices",
    image:
      "https://modesy.codingest.net/uploads/slider/202608/slider_2560x800_6a94336760c054-95358530.webp",
  },
  {
    title: "Discover Your Style",
    description:
      "Explore unique fashion and find products that match your style",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=2000&q=85",
  },
  {
    title: "Find Something Special",
    description:
      "Browse exciting finds and discover your next favorite item",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85",
  },
];

export default function HeroBanner() {
  const { t } = useModesySettings();
  const [active, setActive] = useState(0);
  const slide = slides[active];

  // --- FITUR AUTOPLAY DIMULAI DI SINI ---
  useEffect(() => {
    // Menggeser slide setiap 5000ms (5 detik)
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5000);

    // Membersihkan timer saat komponen tidak digunakan (mencegah memory leak)
    return () => clearInterval(timer);
  }, []);
  // --- FITUR AUTOPLAY SELESAI ---

  function changeSlide(direction: number) {
    setActive(
      (current) =>
        (current + direction + slides.length) % slides.length,
    );
  }

  return (
    <section
      aria-label={t("Featured promotions")}
      className="group relative h-[415px] overflow-hidden bg-gray-200 sm:h-[460px] lg:h-[415px]"
    >
      {slides.map((item, index) => (
        <div
          key={item.title}
          aria-hidden={index !== active}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
            index === active ? "z-0 opacity-100" : "z-0 opacity-0"
          }`}
          style={{ backgroundImage: `url("${item.image}")` }}
        />
      ))}

      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/15" />

      <div className="relative z-10 flex h-full items-center px-6 sm:px-10 lg:px-[4.1%]">
        <div
          key={slide.title}
          className="max-w-[650px] animate-in fade-in slide-in-from-left-4 duration-500"
        >
          <h1 className="text-4xl font-semibold leading-tight text-white drop-shadow-md sm:text-5xl lg:text-[48px]">
            {t(slide.title)}
          </h1>

          <p className="mt-4 max-w-[600px] text-base leading-relaxed text-white drop-shadow sm:text-lg">
            {t(slide.description)}
          </p>

          <a
            href="/products"
            className="mt-8 inline-flex items-center justify-center rounded-sm bg-[#171717] px-6 py-3 text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00a99d] hover:shadow-lg"
          >
            {t("Explore Now")}
          </a>
        </div>
      </div>

      <button
        type="button"
        aria-label={t("Previous banner")}
        onClick={() => changeSlide(-1)}
        className="absolute left-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/60 text-gray-700 opacity-100 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md sm:opacity-70 sm:group-hover:opacity-100"
      >
        <ChevronLeft size={25} strokeWidth={1.7} />
      </button>

      <button
        type="button"
        aria-label={t("Next banner")}
        onClick={() => changeSlide(1)}
        className="absolute right-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/60 text-gray-700 opacity-100 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md sm:opacity-70 sm:group-hover:opacity-100"
      >
        <ChevronRight size={25} strokeWidth={1.7} />
      </button>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {slides.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-label={t("Go to banner {n}", { n: index + 1 })}
            aria-current={index === active ? "true" : undefined}
            onClick={() => setActive(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === active
                ? "w-7 bg-white"
                : "w-2 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}