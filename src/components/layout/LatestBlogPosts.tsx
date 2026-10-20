
"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

const posts = [
  {
    title: "Essential travel packing tips for fashion lovers",
    category: "Life Style",
    description:
      "Stay stylish and organized on your trips with these smart packing hacks.",
    image:
      "https://modesy.codingest.net/uploads/blog/202508/img_500x332_68b29ecad6b445-93304999.webp",
  },
  {
    title: "The psychology of colors in fashion",
    category: "Fashion",
    description:
      "Learn how the colors you wear influence mood, confidence, and perception.",
    image:
      "https://modesy.codingest.net/uploads/blog/202508/img_500x332_68b29ec9dcf1a6-67153304.webp",
  },
  {
    title: "Gift ideas for every budget from affordable to luxury",
    category: "Life Style",
    description:
      "Find the perfect gift without breaking the bank. Our ideas suit every budget.",
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
      "Small details make a big difference. Discover the top accessories you need right now.",
    image:
      "https://modesy.codingest.net/uploads/blog/202508/img_500x332_68b29edb0bfdb8-81153388.webp",
  },
  {
    title: "Why sustainable fashion matters more than ever",
    category: "Fashion",
    description:
      "Understand the importance of eco-friendly choices in fashion and how you can make a difference.",
    image:
      "https://modesy.codingest.net/uploads/blog/202508/img_500x332_68b29ed9e21835-20418856.webp",
  },
  {
    title: "How to pick the right shoes for comfort and style",
    category: "Fashion",
    description:
      "Find out how to balance fashion and comfort when choosing your footwear.",
    image:
      "https://modesy.codingest.net/uploads/blog/202508/img_500x332_68b29ed0677706-05161292.webp",
  },
  {
    title: "How to choose the perfect outfit for every occasion",
    category: "Life Style",
    description:
      "Learn how to style yourself with the right outfit for casual, formal, and special events.",
    image:
      "https://modesy.codingest.net/uploads/blog/202508/img_500x332_68b29ed66156a6-74562554.webp",
  },
];

const arabicTranslations: Record<string, string> = {
  "Latest Blog Posts": "أحدث مقالات المدونة",
  "Life Style": "نمط الحياة",
  Fashion: "الأزياء",
  Business: "الأعمال",

  "Essential travel packing tips for fashion lovers":
    "نصائح أساسية لتوضيب الأمتعة لعشاق الموضة",
  "Stay stylish and organized on your trips with these smart packing hacks.":
    "حافظ على أناقتك وتنظيم أمتعتك أثناء السفر باستخدام هذه النصائح الذكية.",

  "The psychology of colors in fashion":
    "سيكولوجية الألوان في عالم الموضة",
  "Learn how the colors you wear influence mood, confidence, and perception.":
    "اكتشف كيف تؤثر الألوان التي ترتديها في مزاجك وثقتك بنفسك وانطباع الآخرين عنك.",

  "Gift ideas for every budget from affordable to luxury":
    "أفكار هدايا تناسب جميع الميزانيات من الاقتصادية إلى الفاخرة",
  "Find the perfect gift without breaking the bank. Our ideas suit every budget.":
    "اعثر على الهدية المثالية دون إنفاق الكثير من المال. لدينا أفكار تناسب جميع الميزانيات.",

  "A beginner's guide to home fragrances":
    "دليل المبتدئين لعطور المنزل",
  "Learn how scents can transform your atmosphere and boost your mood.":
    "تعرّف على كيفية تغيير الروائح لأجواء منزلك وتحسين مزاجك.",

  "Must-have accessories to elevate your everyday look":
    "إكسسوارات أساسية لإضفاء الأناقة على إطلالتك اليومية",
  "Small details make a big difference. Discover the top accessories you need right now.":
    "التفاصيل الصغيرة تصنع فرقًا كبيرًا. اكتشف أهم الإكسسوارات التي تحتاج إليها.",

  "Why sustainable fashion matters more than ever":
    "لماذا أصبحت الموضة المستدامة أكثر أهمية من أي وقت مضى",
  "Understand the importance of eco-friendly choices in fashion and how you can make a difference.":
    "تعرّف على أهمية الخيارات الصديقة للبيئة في عالم الموضة وكيف يمكنك المساهمة في التغيير.",

  "How to pick the right shoes for comfort and style":
    "كيفية اختيار الأحذية المناسبة للراحة والأناقة",
  "Find out how to balance fashion and comfort when choosing your footwear.":
    "اكتشف كيفية الجمع بين الأناقة والراحة عند اختيار أحذيتك.",

  "How to choose the perfect outfit for every occasion":
    "كيفية اختيار الإطلالة المثالية لكل مناسبة",
  "Learn how to style yourself with the right outfit for casual, formal, and special events.":
    "تعلّم كيفية اختيار الإطلالة المناسبة للمناسبات اليومية والرسمية والخاصة.",

  "3 months ago": "منذ 3 أشهر",
  "Read article": "اقرأ المقال",
  "Previous article": "المقال السابق",
  "Next article": "المقال التالي",
};

function translateText(text: string, locale: string) {
  if (locale !== "ar") return text;
  return arabicTranslations[text] ?? text;
}

function CategoryIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M3 5h7l2 3h9v11H3z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export default function LatestBlogPosts() {
  const locale = useLocale();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canGoLeft, setCanGoLeft] = useState(false);
  const [canGoRight, setCanGoRight] = useState(true);

  const t = (text: string) => translateText(text, locale);

  const updateButtons = useCallback(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;

    setCanGoLeft(slider.scrollLeft > 2);
    setCanGoRight(maxScroll > 2 && slider.scrollLeft < maxScroll - 2);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    updateButtons();

    const observer = new ResizeObserver(updateButtons);
    observer.observe(slider);

    slider.addEventListener("scroll", updateButtons, { passive: true });

    return () => {
      observer.disconnect();
      slider.removeEventListener("scroll", updateButtons);
    };
  }, [updateButtons]);

  const move = (direction: -1 | 1) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const card = slider.querySelector<HTMLElement>("[data-blog-card]");

    if (!card) return;

    const gap =
      Number.parseFloat(window.getComputedStyle(slider).columnGap) || 24;

    const distance = card.getBoundingClientRect().width + gap;

    slider.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white px-5 pb-16 pt-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-330">
        <h2 className="mb-7 text-[25px] font-semibold leading-tight text-[#222222] sm:text-[27px]">
          {t("Latest Blog Posts")}
        </h2>

        <div className="relative">
          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
          >
            {posts.map((post, index) => (
              <article
                key={post.title}
                data-blog-card
                className="w-full min-w-0 shrink-0 snap-start sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)]"
              >
                <Link
                  href="/blog"
                  aria-label={`${t("Read article")}: ${t(post.title)}`}
                  className="group block overflow-hidden bg-[#f7f7f7]"
                >
                  <div className="aspect-500/332 overflow-hidden">
                    <img
                      src={post.image}
                      alt={t(post.title)}
                      loading={index < 4 ? "eager" : "lazy"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <Link
                  href="/blog"
                  className="mt-4 block text-[19px] font-medium leading-[1.4] text-[#262626] transition-colors hover:text-[#00a99d] sm:text-[20px]"
                >
                  {t(post.title)}
                </Link>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#777777]">
                  <span className="inline-flex items-center gap-2">
                    <CategoryIcon />
                    {t(post.category)}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <ClockIcon />
                    {t("3 months ago")}
                  </span>
                </div>

                <p className="mt-3 text-[15px] leading-[1.75] text-[#777777]">
                  {t(post.description)}
                </p>
              </article>
            ))}
          </div>

          <button
            type="button"
            aria-label={t("Previous article")}
            onClick={() => move(-1)}
            disabled={!canGoLeft}
            className="absolute left-3 top-25 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[30px] leading-none text-[#333333] shadow-md transition hover:bg-[#f5f5f5] disabled:pointer-events-none disabled:opacity-0 sm:left-4 sm:h-12 sm:w-12"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <button
            type="button"
            aria-label={t("Next article")}
            onClick={() => move(1)}
            disabled={!canGoRight}
            className="absolute right-3 top-25 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[30px] leading-none text-[#333333] shadow-md transition hover:bg-[#f5f5f5] disabled:pointer-events-none disabled:opacity-0 sm:right-4 sm:h-12 sm:w-12"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </section>
  );
}
