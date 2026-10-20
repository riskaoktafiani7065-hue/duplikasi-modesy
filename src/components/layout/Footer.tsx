
"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
  FaDiscord,
  FaTelegramPlane,
  FaPinterestP,
  FaLinkedinIn,
  FaTwitch,
  FaVk,
  FaRss,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const categories = [
  ["Clothing", "ملابس"],
  ["Shoes", "أحذية"],
  ["Home & Living", "المنزل والمعيشة"],
  ["Jewelry & Accessories", "المجوهرات والإكسسوارات"],
  ["Toys & Entertainment", "ألعاب وترفيه"],
  ["Graphics & Photos", "رسومات وصور"],
  ["Video & Audio", "فيديو وصوت"],
  ["Web Templates & Code", "قوالب ويب وأكواد"],
];

const socialLinks = [
  { name: "Facebook", icon: FaFacebookF, url: "https://www.facebook.com/" },
  { name: "X", icon: FaXTwitter, url: "https://x.com/" },
  { name: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/" },
  { name: "TikTok", icon: FaTiktok, url: "https://www.tiktok.com/" },
  { name: "WhatsApp", icon: FaWhatsapp, url: "https://www.whatsapp.com/" },
  { name: "YouTube", icon: FaYoutube, url: "https://www.youtube.com/" },
  { name: "Discord", icon: FaDiscord, url: "https://discord.com/" },
  { name: "Telegram", icon: FaTelegramPlane, url: "https://telegram.org/" },
  { name: "Pinterest", icon: FaPinterestP, url: "https://www.pinterest.com/" },
  { name: "LinkedIn", icon: FaLinkedinIn, url: "https://www.linkedin.com/" },
  { name: "Twitch", icon: FaTwitch, url: "https://www.twitch.tv/" },
  { name: "VK", icon: FaVk, url: "https://vk.com/" },
  { name: "RSS", icon: FaRss, url: "/feed" },
];

const quickLinks = [
  ["Home", "الرئيسية", "/"],
  ["Blog", "مدونة", "/blog"],
  ["Shops", "محلات", "/shops"],
  ["Help Center", "مركز المساعدة", "/help"],
];

const informationLinks = [
  ["Terms & Conditions", "البنود والشروط", "/terms"],
  ["About Us", "من نحن", "/about"],
];

export default function Footer() {
  const locale = useLocale();
  const ar = locale === "ar";

  return (
    <footer className="mt-12 bg-[#fafafd] text-[#222222]">
      {/* Empat kolom: urutannya selalu sama seperti referensi */}
      <div className="grid grid-cols-1 gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.45fr_0.8fr_0.8fr_1.25fr] lg:gap-12 lg:px-5 lg:py-20">

        {/* Kolom 1: Logo, deskripsi, media sosial */}
        <div className="min-w-0">
          <Link
            href={ar ? "/ar" : "/en"}
            className="inline-block"
            aria-label="Modesy Home"
          >
            <span className="text-[44px] font-bold tracking-tight text-[#484848]">
              M<span className="text-[#00a99d]">o</span>desy
            </span>
          </Link>

          <p
            dir={ar ? "rtl" : "ltr"}
            className={`mt-5 text-base leading-8 text-[#666666] ${
              ar ? "text-right" : "text-left"
            }`}
          >
            {ar
              ? "موديزي هو سوق تجارة إلكترونية حديث يربط بين المشترين والبائعين بسهولة. سواء كنت تبحث عن منتجات فريدة للتسوق أو ترغب في تنمية عملك من خلال البيع عبر الإنترنت، فإن موديزي هنا لمساعدتك في كل خطوة."
              : "Modesy is a modern e-commerce marketplace where buyers and sellers connect with ease. Whether you are looking to shop for unique items or grow your business by selling online, Modesy is here to help you every step of the way."}
          </p>

          <nav
            aria-label="Social media"
            className="mt-6 grid w-fit grid-cols-7 gap-x-3 gap-y-3"
          >
            {socialLinks.map(({ name, icon: Icon, url }) => (
              <a
                key={name}
                href={url}
                aria-label={name}
                title={name}
                target={url.startsWith("http") ? "_blank" : undefined}
                rel={
                  url.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c8c8c8] bg-transparent text-[#82796f] transition-colors duration-200 hover:border-[#00a99d] hover:text-[#00a99d]"
              >
                <Icon size={21} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>

        {/* Kolom 2: Categories */}
        <div className="min-w-0">
          <h3
            dir={ar ? "rtl" : "ltr"}
            className={`mb-6 text-xl font-medium ${
              ar ? "text-right" : "text-left"
            }`}
          >
            {ar ? "الفئات" : "CATEGORIES"}
          </h3>

          <ul className="space-y-4">
            {categories.map(([en, arabic]) => (
              <li key={en}>
                <Link
                  href={ar ? "/ar/products" : "/en/products"}
                  dir={ar ? "rtl" : "ltr"}
                  className={`block text-base text-[#333333] transition hover:text-[#00a99d] ${
                    ar ? "text-right" : "text-left"
                  }`}
                >
                  {ar ? arabic : en}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3: Quick links dan Information */}
        <div className="min-w-0">
          <h3
            dir={ar ? "rtl" : "ltr"}
            className={`mb-6 text-xl font-medium ${
              ar ? "text-right" : "text-left"
            }`}
          >
            {ar ? "روابط سريعة" : "QUICK LINKS"}
          </h3>

          <ul className="space-y-4">
            {quickLinks.map(([en, arabic, href]) => (
              <li key={en}>
                <Link
                  href={ar ? `/ar${href === "/" ? "" : href}` : `/en${href === "/" ? "" : href}`}
                  dir={ar ? "rtl" : "ltr"}
                  className={`block text-base text-[#333333] transition hover:text-[#00a99d] ${
                    ar ? "text-right" : "text-left"
                  }`}
                >
                  {ar ? arabic : en}
                </Link>
              </li>
            ))}
          </ul>

          <h3
            dir={ar ? "rtl" : "ltr"}
            className={`mb-6 mt-10 text-xl font-medium ${
              ar ? "text-right" : "text-left"
            }`}
          >
            {ar ? "معلومات" : "INFORMATION"}
          </h3>

          <ul className="space-y-4">
            {informationLinks.map(([en, arabic, href]) => (
              <li key={en}>
                <Link
                  href={ar ? `/ar${href}` : `/en${href}`}
                  dir={ar ? "rtl" : "ltr"}
                  className={`block text-base text-[#333333] transition hover:text-[#00a99d] ${
                    ar ? "text-right" : "text-left"
                  }`}
                >
                  {ar ? arabic : en}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 4: Newsletter dan pembayaran */}
        <div className="min-w-0">
          <h3
            dir={ar ? "rtl" : "ltr"}
            className={`mb-6 text-xl font-medium ${
              ar ? "text-right" : "text-left"
            }`}
          >
            {ar ? "النشرة الإخبارية" : "NEWSLETTER"}
          </h3>

          <p
            dir={ar ? "rtl" : "ltr"}
            className={`text-base leading-8 text-[#666666] ${
              ar ? "text-right" : "text-left"
            }`}
          >
            {ar
              ? "انضم إلى قائمة المشتركين لدينا للحصول على أحدث الأخبار والتحديثات والعروض الخاصة مباشرة في صندوق الوارد الخاص بك."
              : "Join our subscriber list to receive the latest news, updates and special offers directly in your inbox."}
          </p>

          <form
            className="mt-5 space-y-3"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
              name="email"
              placeholder={ar ? "أدخل بريدك الإلكتروني" : "Enter your email"}
              aria-label={ar ? "بريدك الإلكتروني" : "Your email address"}
              dir={ar ? "rtl" : "ltr"}
              className="h-16 w-full rounded border border-gray-200 bg-white px-6 text-base outline-none transition focus:border-[#00a99d]"
            />

            <button
              type="submit"
              className="h-16 w-full rounded bg-[#00a99d] text-lg text-white transition hover:bg-[#008f85]"
            >
              {ar ? "الاشتراك" : "Subscribe"}
            </button>
          </form>

          {/* Metode pembayaran */}
          <div
            className="mt-8 flex flex-nowrap items-center justify-between gap-2 overflow-hidden"
            aria-label="Payment methods"
          >
            {/* VISA */}
            <span className="shrink-0 text-[34px] font-black italic leading-none tracking-tight text-[#1434CB]">
              VISA
            </span>

            {/* Mastercard */}
            <span
              className="relative flex h-9 w-12 shrink-0 items-center justify-center"
              aria-label="Mastercard"
              title="Mastercard"
            >
              <span className="absolute left-0 h-8 w-8 rounded-full bg-[#EB001B]" />
              <span className="absolute right-0 h-8 w-8 rounded-full bg-[#F79E1B] opacity-95" />
              <span className="absolute bottom-0.5 text-[7px] font-semibold text-black">
                mastercard
              </span>
            </span>

            {/* Maestro */}
            <span
              className="relative flex h-9 w-12 shrink-0 items-center justify-center"
              aria-label="Maestro"
              title="Maestro"
            >
              <span className="absolute left-0 h-8 w-8 rounded-full bg-[#0066B3]" />
              <span className="absolute right-0 h-8 w-8 rounded-full bg-[#EB001B] opacity-95" />
              <span className="relative z-10 rounded bg-[#0066B3] px-0.5 text-[10px] font-bold italic text-white">
                Maestro
              </span>
            </span>

            {/* American Express */}
            <span className="flex h-9 w-14.25 shrink-0 flex-col items-center justify-center rounded-sm bg-[#2671C8] text-center text-[9px] font-black leading-2.5 text-white">
              <span>AMERICAN</span>
              <span>EXPRESS</span>
            </span>

            {/* Discover */}
            <span className="relative flex h-9 w-14.25 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm bg-[#f4f4f4] text-center text-[9px] font-black leading-2.5 text-black">
              <span>DISCOVER</span>
              <span className="text-[5px] font-normal">NETWORK</span>
              <span className="absolute -bottom-3 -right-2 h-7 w-10 rotate-[-25deg] bg-[#F58220]" />
            </span>
          </div>
        </div>  
      </div>

      {/* Copyright */}
      <div className="mx-5 flex flex-col gap-4 border-t border-gray-200 py-6 text-sm text-[#666666] sm:mx-8 sm:flex-row sm:items-center sm:justify-between lg:mx-5">
        <p dir={ar ? "rtl" : "ltr"}>
          {ar
            ? "حقوق النشر 2025 موديزي - جميع الحقوق محفوظة."
            : "Copyright 2025 Modesy - All Rights Reserved."}
        </p>

        <div
          className={`flex flex-wrap gap-5 ${
            ar ? "flex-row-reverse" : ""
          }`}
        >
          <Link
            href={ar ? "/ar/privacy" : "/en/privacy"}
            className="transition hover:text-[#00a99d]"
          >
            {ar ? "سياسة الخصوصية" : "Privacy Policy"}
          </Link>

          <Link
            href={ar ? "/ar/cookies" : "/en/cookies"}
            className="transition hover:text-[#00a99d]"
          >
            {ar ? "سياسة ملفات تعريف الارتباط" : "Cookie Policy"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
