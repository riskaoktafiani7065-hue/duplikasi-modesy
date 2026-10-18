import Link from "next/link";
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
  "Clothing",
  "Shoes",
  "Home & Living",
  "Jewelry & Accessories",
  "Toys & Entertainment",
  "Graphics & Photos",
  "Video & Audio",
  "Web Templates & Code",
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
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Shops", href: "/shops" },
  { name: "Help Center", href: "/help" },
];

const informationLinks = [
  { name: "Terms & Conditions", href: "/terms" },
  { name: "About Us", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="mt-12 bg-[#fafafd] text-[#222222]">
      {/* Bagian utama footer */}
      <div className="grid grid-cols-1 gap-10 px-5 py-12 sm:px-8 lg:grid-cols-4 lg:gap-12 lg:px-5 lg:py-20">
        {/* Logo dan deskripsi */}
        <div>
          <Link href="/" className="inline-block" aria-label="Modesy Home">
            <span className="text-[44px] font-bold tracking-tight text-[#484848]">
              M<span className="text-[#00a99d]">o</span>desy
            </span>
          </Link>

          <p className="mt-5 text-base leading-8 text-[#666666]">
            Modesy is a modern e-commerce marketplace where buyers and
            sellers connect with ease. Whether you are looking to shop
            for unique items or grow your business by selling online,
            Modesy is here to help you every step of the way.
          </p>

          
          {/* Social media */}
          <nav
            aria-label="Social media"
            className="mt-6 grid w-fit grid-cols-4 gap-x-3.5 gap-y-3.5 sm:grid-cols-5 lg:grid-cols-4"
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
                className="box-border flex h-14.25 w-14.25 shrink-0 items-center justify-center rounded-full border border-[#c8c8c8] bg-transparent text-[#82796f] transition-colors duration-200 hover:border-[#00a99d] hover:text-[#00a99d]"
              >
                <Icon size={21} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>

        {/* Categories */}
        <div>
          <h3 className="mb-6 text-xl font-medium">CATEGORIES</h3>

          <ul className="space-y-4">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href="/products"
                  className="text-base text-[#333333] transition hover:text-[#00a99d]"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links dan information */}
        <div>
          <h3 className="mb-6 text-xl font-medium">QUICK LINKS</h3>

          <ul className="space-y-4">
            {quickLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-base text-[#333333] transition hover:text-[#00a99d]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="mb-6 mt-10 text-xl font-medium">INFORMATION</h3>

          <ul className="space-y-4">
            {informationLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-base text-[#333333] transition hover:text-[#00a99d]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <div className="mt-5 space-y-3">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              aria-label="Your email address"
              className="h-15.5 w-full rounded border border-gray-200 bg-white px-6 text-base outline-none transition focus:border-[#00a99d]"
            />

            <button
              type="button"
              className="h-15.5 w-full rounded bg-[#00a99d] text-lg text-white transition hover:bg-[#008f85]"
            >
              Subscribe
            </button>
          </div>

          {/* Metode pembayaran */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-black italic text-blue-700">
              VISA
            </span>

            <span
              className="flex items-center"
              aria-label="Mastercard"
              title="Mastercard"
            >
              <span className="h-7 w-7 rounded-full bg-red-600" />
              <span className="-ml-3 h-7 w-7 rounded-full bg-amber-500/90" />
            </span>

            <span className="rounded bg-blue-700 px-2 py-1 text-xs font-bold text-white">
              Maestro
            </span>

            <span className="rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white">
              AMEX
            </span>

            <span className="rounded bg-orange-500 px-2 py-1 text-xs font-bold text-white">
              DISCOVER
            </span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-5 flex flex-col gap-4 border-t border-gray-200 py-6 text-sm text-[#666666] sm:mx-8 sm:flex-row sm:items-center sm:justify-between lg:mx-5">
        <p>Copyright 2025 Modesy - All Rights Reserved.</p>

        <div className="flex flex-wrap gap-5">
          <Link href="/privacy" className="transition hover:text-[#00a99d]">
            Privacy Policy
          </Link>

          <Link href="/cookies" className="transition hover:text-[#00a99d]">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
