"use client";

import AuthButtons from "./AuthButtons";
import CurrencyDropdown from "@/components/layout/CurrencyDropdown";

const utilityLinks = ["Contact", "Sell on Modesy"];

export default function TopBar() {
  return (
    <div className="flex min-h-16 items-center justify-between border-b border-gray-200 bg-white px-5 text-base text-[#666666]">
      <div className="flex items-center gap-6">
        {utilityLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="transition-colors hover:text-[#00a99d]"
          >
            {link}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <button type="button" className="hover:text-[#00a99d]">
          📍 Location
        </button>

        <div className="hover:text-[#00a99d]">
          <CurrencyDropdown />
        </div>

        <button type="button" className="hover:text-[#00a99d]">
          🇺🇸 English⌄
        </button>

        <AuthButtons />
      </div>
    </div>
  );
}