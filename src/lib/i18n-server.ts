// src/lib/i18n-server.ts
import { cookies } from "next/headers";
import {
  LANGUAGE_COOKIE,
  normalizeLanguage,
  type LanguageCode,
} from "@/lib/i18n";

export async function getServerLanguage(): Promise<LanguageCode> {
  const store = await cookies();
  return normalizeLanguage(store.get(LANGUAGE_COOKIE)?.value);
}