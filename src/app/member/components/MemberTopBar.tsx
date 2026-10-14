
"use client";

import { useState } from "react";
import Link from "next/link";

const accountItems = [
  { label: "Profile", href: "/member/profile", icon: "user-round" },
  { label: "Wallet", href: "/member/wallet", icon: "wallet" },
  { label: "Orders", href: "/member/orders", icon: "shopping-basket" },
  { label: "My Coupons", href: "/member/coupons", icon: "tag" },
  { label: "Messages", href: "/member/messages", icon: "messages-square" },
  {
    label: "Profile Settings",
    href: "/member/settings",
    icon: "settings",
  },
];

const iconPaths: Record<string, React.ReactNode> = {
  "user-round": (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="5" width="18" height="15" rx="2" />
      <path d="M3 9h18" />
      <path d="M16 14h.01" />
    </>
  ),
  "shopping-basket": (
    <>
      <path d="m3 10 2 11h14l2-11H3Z" />
      <path d="m8 10 4-7 4 7M9 14v3m6-3v3" />
    </>
  ),
  tag: (
    <>
      <path d="M20.6 13.4 13 21l-10-10V3h8l9.6 9.6a.6.6 0 0 1 0 .8Z" />
      <circle cx="7.5" cy="7.5" r="1" />
    </>
  ),
  "messages-square": (
    <>
      <path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 21l2-5.5A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M8 10h8M8 14h5" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-2 .9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-2-.9l-1.7.7-1.4-2.4 1.4-1.1a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 2-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 2 .9l1.7-.7 1.4 2.4-1.4 1.1a8 8 0 0 1 0 2Z" />
    </>
  ),
  "log-out": (
    <>
      <path d="M10 17l5-5-5-5M15 12H3" />
      <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
    </>
  ),
};

function AccountIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6 shrink-0"
    >
      {iconPaths[name]}
    </svg>
  );
}

export default function MemberTopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto flex min-h-14 max-w-330 items-center justify-between gap-4 px-6 text-sm text-[#666666]">
        <Link
          href="/#contact"
          className="hidden transition-colors hover:text-[#00a99d] sm:block"
        >
          Contact
        </Link>

        <div className="ml-auto flex items-center gap-3 sm:gap-6">
          <button
            type="button"
            className="hidden items-center gap-2 transition-colors hover:text-[#00a99d] sm:flex"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M12 2a7 7 0 0 0-7 7c0 5.1 7 13 7 13s7-7.9 7-13a7 7 0 0 0-7-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            Location
          </button>

          <button
            type="button"
            className="hidden items-center gap-1 transition-colors hover:text-[#00a99d] sm:flex"
          >
            USD ($)
            <span>⌄</span>
          </button>

          <button
            type="button"
            className="hidden items-center gap-1 transition-colors hover:text-[#00a99d] sm:flex"
          >
            <span className="text-lg">🇺🇸</span>
            English
            <span>⌄</span>
          </button>

          <div className="relative">
            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-haspopup="menu"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="flex items-center gap-2 py-2 text-base transition-colors hover:text-[#00a99d]"
            >
              <img
                src="https://i.pravatar.cc/80?img=12"
                alt="Foto profil pengguna"
                className="h-9 w-9 rounded-full border border-gray-200 object-cover"
              />
              <span className="max-w-28 truncate">Peter Jone</span>
              <span className="text-xs">⌄</span>
            </button>

            {isMenuOpen && (
              <>
                <button
                  type="button"
                  aria-label="Tutup menu profil"
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setIsMenuOpen(false)}
                />

                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-md border border-gray-200 bg-white py-1 shadow-lg"
                >
                  {accountItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      role="menuitem"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-4 px-6 py-3 text-base text-[#555555] transition-colors hover:bg-gray-50 hover:text-[#00a99d]"
                    >
                      <AccountIcon name={item.icon} />
                      <span>{item.label}</span>
                    </Link>
                  ))}

                  <div className="my-1 border-t border-gray-200" />

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsMenuOpen(false);
                      alert("Fitur Logout akan disambungkan ke autentikasi.");
                    }}
                    className="flex w-full items-center gap-4 px-6 py-3 text-base text-[#666666] transition-colors hover:bg-gray-50 hover:text-[#00a99d]"
                  >
                    <AccountIcon name="log-out" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
