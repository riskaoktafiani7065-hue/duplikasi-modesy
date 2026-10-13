
import Link from "next/link";

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
  { name: "Facebook", icon: "f" },
  { name: "X", icon: "𝕏" },
  { name: "Instagram", icon: "◎" },
  { name: "TikTok", icon: "♪" },
  { name: "WhatsApp", icon: "◉" },
  { name: "YouTube", icon: "▶" },
  { name: "Discord", icon: "◈" },
  { name: "Telegram", icon: "➤" },
  { name: "Pinterest", icon: "℘" },
  { name: "LinkedIn", icon: "in" },
  { name: "Twitch", icon: "▣" },
  { name: "VK", icon: "ᴠκ" },
  { name: "RSS", icon: "◔" },
];

export default function Footer() {
  return (
    <footer className="mt-12 bg-[#fafafd] text-[#222]">
      {/* Bagian utama footer */}
      <div className="grid grid-cols-1 gap-10 px-5 py-12 sm:px-8 lg:grid-cols-4 lg:gap-12 lg:px-5 lg:py-20">
        {/* Logo dan deskripsi */}
        <div>
          <Link href="/" className="inline-block">
            <span className="text-[44px] font-bold tracking-tight text-[#484848]">
              M<span className="text-[#00a99d]">o</span>desy
            </span>
          </Link>

          <p className="mt-5 text-base leading-8 text-[#666]">
            Modesy is a modern e-commerce marketplace where buyers and
            sellers connect with ease. Whether you are looking to shop
            for unique items or grow your business by selling online,
            Modesy is here to help you every step of the way.
          </p>

          {/* Social media */}
          <div className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href="#"
                aria-label={social.name}
                className="flex h-12.75 w-12.75 items-center justify-center rounded-full border border-gray-300 text-lg font-semibold text-[#777] transition hover:border-[#00a99d] hover:bg-[#00a99d] hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Kategori */}
        <div>
          <h3 className="mb-6 text-xl font-medium">CATEGORIES</h3>

          <ul className="space-y-4">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href="/products"
                  className="text-base text-[#333] transition hover:text-[#00a99d]"
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
            {[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: "Shops", href: "/shops" },
              { name: "Help Center", href: "/help" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-base text-[#333] transition hover:text-[#00a99d]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="mb-6 mt-10 text-xl font-medium">INFORMATION</h3>

          <ul className="space-y-4">
            <li>
              <Link
                href="/terms"
                className="text-base text-[#333] transition hover:text-[#00a99d]"
              >
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-base text-[#333] transition hover:text-[#00a99d]"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-6 text-xl font-medium">NEWSLETTER</h3>

          <p className="text-base leading-8 text-[#666]">
            Join our subscribers list to get the latest news, updates
            and special offers directly in your inbox
          </p>

          <form className="mt-5 space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Your email address"
              required
              className="h-15.5 w-full rounded border border-gray-200 bg-white px-6 text-base outline-none transition focus:border-[#00a99d]"
            />

            <button
              type="submit"
              className="h-15.5 w-full rounded bg-[#00a99d] text-lg text-white transition hover:bg-[#008f85]"
            >
              Subscribe
            </button>
          </form>

          {/* Metode pembayaran */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-black italic text-blue-700">
              VISA
            </span>

            <span className="flex items-center">
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
      <div className="mx-5 flex flex-col gap-4 border-t border-gray-200 py-6 text-sm text-[#666] sm:mx-8 sm:flex-row sm:items-center sm:justify-between lg:mx-5">
        <p>Copyright 2025 Modesy - All Rights Reserved.</p>

        <div className="flex flex-wrap gap-5">
          <Link href="/privacy" className="hover:text-[#00a99d]">
            Privacy Policy
          </Link>

          <Link href="/cookies" className="hover:text-[#00a99d]">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
