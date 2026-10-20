import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import arLocale from "i18n-iso-countries/langs/ar.json";
import type { LanguageCode } from "@/lib/i18n";

countries.registerLocale(enLocale);
countries.registerLocale(arLocale);

export type CountryOption = { en: string; ar: string };

const enNames = countries.getNames("en", { select: "official" });
const arNames = countries.getNames("ar", { select: "official" });

// Nilai yang disimpan tetap nama Inggris agar kompatibel dengan data lama.
export const countryOptions: CountryOption[] = Object.entries(enNames)
  .map(([code, en]) => ({ en, ar: arNames[code] ?? en }))
  .sort((a, b) => a.en.localeCompare(b.en));

export function countryLabel(enName: string, lang: LanguageCode): string {
  if (lang === "en") return enName;
  return countryOptions.find((item) => item.en === enName)?.ar ?? enName;
}