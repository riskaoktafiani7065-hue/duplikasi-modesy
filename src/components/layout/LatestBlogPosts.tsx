"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";

const posts = [
  {
    title: "Essential travel packing tips for fashion lovers",
    category: "Life Style",
    description:
      "Stay stylish and organized on your trips with these smart packing hacks",
    image:
      "https://modesy.codingest.net/uploads/blog/202508/img_500x332_68b29ecad6b445-93304999.webp",
  },
  {
    title: "The psychology of colors in fashion",
    category: "Fashion",
    description:
      "Learn how the colors you wear influence mood, confidence, and perception",
    image:
      "https://modesy.codingest.net/uploads/blog/202508/img_500x332_68b29ec9dcf1a6-67153304.webp",
  },
  {
    title: "Gift ideas for every budget from affordable to luxury",
    category: "Life Style",
    description:
      "Find the perfect gift without breaking the bank our ideas suit every budget",
    image:
      "https://modesy.codingest.net/uploads/blog/202508/img_500x332_68b29ed37ba7c7-55574166.webp",
  },
  {
    title: "A beginner's guide to home fragrances",
    category: "Business",
    description:
      "Learn how scents can transform your atmosphere and boost your mood.",
    image:
      "https://modesy.codingest.net/uploads/blog/202508/img_500x332_68b29ecd8df318-54994453.webp",
  },
  {
    title: "Must-have accessories to elevate your everyday look",
    category: "Business",
    description:
      "Small details make a big difference discover the top accessories you need right now.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85",
  },
  {
    title: "Why sustainable fashion matters more than ever",
    category: "Fashion",
    description:
      "Understand the importance of eco-friendly choices in fashion and how you can make a difference.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",
  },
  {
    title: "How to pick the right shoes for comfort and style",
    category: "Fashion",
    description:
      "Find out how to balance fashion and comfort when choosing your footwear.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85",
  },
  {
    title: "How to choose the perfect outfit for every occasion",
    category: "Life Style",
    description:
      "Learn how to style yourself with the right outfit for casual, formal, and special events.",
    image:
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=85",
  },
];

export default function LatestBlogPosts() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canGoLeft, setCanGoLeft] = useState(false);
  const [canGoRight, setCanGoRight] = useState(false);

  const updateButtons = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;

    setCanGoLeft(slider.scrollLeft > 2);
    setCanGoRight(slider.scrollLeft < maxScroll - 2);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    updateButtons();

    slider.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);

    return () => {
      slider.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [updateButtons]);

  const move = (direction: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const card = slider.querySelector<HTMLElement>("[data-blog-card]");
    if (!card) return;

    const distance = card.getBoundingClientRect().width + 24;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (direction < 0 && slider.scrollLeft <= 2) return;
    if (direction > 0 && slider.scrollLeft >= maxScroll - 2) return;

    const target = Math.max(
      0,
      Math.min(slider.scrollLeft + direction * distance, maxScroll)
    );

    slider.scrollTo({
      left: target,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white px-5 pb-14 pt-8 sm:px-6">
      <h2 className="mb-7 text-[27px] font-bold text-[#222]">
        Latest Blog Posts
      </h2>

      <div className="relative isolate">
        <div
          ref={sliderRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((post) => (
            <article
              key={post.title}
              data-blog-card
              className="w-[calc((100%-72px)/4)] min-w-70 shrink-0 snap-start"
            >
              <Link href="/blog" className="block overflow-hidden">
                <div className="aspect-1.5/1 overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
              </Link>

              <Link
                href="/blog"
                className="mt-5 block text-[22px] font-medium leading-normal text-[#252525] hover:text-[#00a99d]"
              >
                {post.title}
              </Link>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-[#777]">
                <span className="flex items-center gap-2">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    aria-hidden="true"
                  >
                    <path d="M3 5h7l2 3h9v11H3z" />
                  </svg>
                  {post.category}
                </span>

                <span className="flex items-center gap-2">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  3 months ago
                </span>
              </div>

              <p className="mt-5 text-[17px] leading-[1.8] text-[#777]">
                {post.description}
              </p>
            </article>
          ))}
        </div>

        <button
          type="button"
          aria-label="Artikel sebelumnya"
          onClick={() => move(-1)}
          disabled={!canGoLeft}
          className="absolute left-4 top-[35%] z-50 flex h-15 w-15 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-3xl text-[#333] shadow-md pointer-events-auto hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <button
          type="button"
          aria-label="Artikel berikutnya"
          onClick={() => move(1)}
          disabled={!canGoRight}
          className="absolute right-4 top-[35%] z-50 flex h-15 w-15 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-3xl text-[#333] shadow-md pointer-events-auto hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </section>
  );
}