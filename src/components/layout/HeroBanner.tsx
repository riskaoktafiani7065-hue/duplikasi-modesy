
"use client";

import { useState } from "react";

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
  const [active, setActive] = useState(0);
  const slide = slides[active];

  function changeSlide(direction: number) {
    setActive(
      (current) =>
        (current + direction + slides.length) % slides.length
    );
  }

  return (
    <section className="relative h-95 overflow-hidden bg-gray-200 sm:h-110 lg:h-130">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url("${slide.image}")` }}
      />

      <div className="absolute inset-0 bg-black/15" />

      <div className="relative z-10 flex h-full items-center px-5 sm:px-10 lg:px-6">
        <div className="max-w-197.5 text-white">
          <h1 className="text-4xl font-semibold leading-tight drop-shadow-md sm:text-5xl lg:text-6xl">
            {slide.title}
          </h1>

          <p className="mt-5 max-w-195 text-lg leading-relaxed drop-shadow sm:text-xl">
            {slide.description}
          </p>

          <a
            href="/products"
            className="mt-10 inline-flex rounded-sm bg-[#171717] px-8 py-4 text-base text-white transition hover:bg-[#00a99d]"
          >
            Explore Now
          </a>
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous banner"
        onClick={() => changeSlide(-1)}
        className="absolute left-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/65 text-3xl text-gray-700 transition hover:bg-white"
      >
        ‹
      </button>

      <button
        type="button"
        aria-label="Next banner"
        onClick={() => changeSlide(1)}
        className="absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/65 text-3xl text-gray-700 transition hover:bg-white"
      >
        ›
      </button>
    </section>
  );
}
