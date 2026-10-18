"use client";

import { useEffect, useRef, useState } from "react";

const languages = [
  {
    code: "en",
    name: "Bahasa inggris",
    flag: "https://flagcdn.com/w40/us.png",
  },
  {
    code: "ar",
    name: "Arab",
    flag: "https://flagcdn.com/w40/sa.png",
  },
];

export default function LanguageDropdown() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[1]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-50">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex items-center gap-2 whitespace-nowrap text-base text-[#666666] hover:text-[#00a99d]"
      >
        <img
          src={selectedLanguage.flag}
          alt=""
          className="h-3.5 w-5 object-cover"
        />

        <span>{selectedLanguage.name === "Bahasa inggris" ? "English" : "Arab"}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-5 w-62.5 rounded-md border border-[#e5e5e5] bg-white py-2 shadow-sm">
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => {
                setSelectedLanguage(language);
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-2 px-9 py-3 text-left text-[18px] text-[#808080] hover:bg-gray-50"
            >
              <img
                src={language.flag}
                alt=""
                className="h-3.5 w-6.75 object-cover"
              />

              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}