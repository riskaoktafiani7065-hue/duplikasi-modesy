
"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { useModesySettings } from "@/lib/modesy-settings";
import { countryOptions } from "../../lib/countries";

type LocationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: string;
  onSelect: (country: string) => void;
};


export default function LocationModal({
  isOpen,
  onClose,
  selectedCountry,
  onSelect,
}: LocationModalProps) {
  const { language, t } = useModesySettings();
  const [search, setSearch] = useState("");
  const [chosenCountry, setChosenCountry] = useState(selectedCountry);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setChosenCountry(selectedCountry);
    }
  }, [isOpen, selectedCountry]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredCountries = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    if (!query) return countryOptions;

    return countryOptions.filter(
      (country) =>
        country.en.toLocaleLowerCase().includes(query) ||
        country.ar.toLocaleLowerCase().includes(query),
    );
  }, [search]);

  if (!isOpen) return null;

  function handleSubmit() {
    if (!chosenCountry) return;
    onSelect(chosenCountry);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-[1px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-modal-title"
        className="relative w-full max-w-125 animate-in fade-in zoom-in-95 duration-200 rounded-[3px] bg-white px-7.5 pb-8.25 pt-6.75 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("Close location dialog")}
          className="absolute right-4.25 top-4.25 text-gray-400 transition-colors hover:text-gray-800"
        >
          <X size={19} strokeWidth={1.7} />
        </button>

        <h2
          id="location-modal-title"
          className="text-center text-[23px] font-medium text-[#222]"
        >
          {t("Select Location")}
        </h2>

        <p className="mt-4 text-center text-sm text-[#999]">
          {t("Filter products by location")}
        </p>

        <div className="relative mt-5.25">
          <div className="flex h-11.5 items-center rounded-[3px] border border-[#d9dce2] transition-colors focus-within:border-[#00a99d]">
            <Search
              size={17}
              className="ml-3 shrink-0 text-gray-400"
              aria-hidden="true"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setChosenCountry("");
              }}
              placeholder={t("Search country...")}
              aria-label={t("Search country")}
              autoComplete="off"
              className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-[#555] outline-none placeholder:text-[#999]"
            />

            <ChevronDown
              size={16}
              className="mr-3 shrink-0 text-gray-400"
              aria-hidden="true"
            />
          </div>

          <div className="mt-2 max-h-47.5 overflow-y-auto rounded-[3px] border border-gray-100 bg-white">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => {
                const label = language === "ar" ? country.ar : country.en;
                const isSelected = chosenCountry === country.en;

                return (
                  <button
                    key={country.en}
                    type="button"
                    onClick={() => {
                      setChosenCountry(country.en);
                      setSearch(label);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#f4fbfa] hover:text-[#00a99d] ${
                      isSelected
                        ? "bg-[#f0fbf9] text-[#009e92]"
                        : "text-[#555]"
                    }`}
                  >
                    <span>{label}</span>
                    {isSelected && <Check size={16} />}
                  </button>
                );
              })
            ) : (
              <p className="px-4 py-4 text-center text-sm text-gray-500">
                {t("No countries found")}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!chosenCountry}
          className="mt-5 flex h-11.5 w-full items-center justify-center rounded-[3px] bg-[#00a99d] text-sm font-medium text-white transition-all duration-200 hover:bg-[#008f85] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("Select Location")}
        </button>
      </section>
    </div>
  );
}
