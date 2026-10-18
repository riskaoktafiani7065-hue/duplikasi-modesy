import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import AuthModals from "@/components/auth/AuthModals";
import { ModesySettingsProvider } from "@/lib/modesy-settings";
import { getServerLanguage } from "@/lib/i18n-server";
import { translate } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-arabic",
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLanguage();

  return {
    title: translate(lang, "Duplikasi Modesy"),
    description: translate(lang, "Marketplace clone"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getServerLanguage();

  return (
    // PERBAIKAN: dir diubah menjadi dinamis (rtl untuk Arab, ltr untuk English)
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body className={`${inter.className} ${notoArabic.variable}`}>
        <ModesySettingsProvider initialLanguage={lang}>
          {children}
          <AuthModals />
        </ModesySettingsProvider>
      </body>
    </html>
  );
}