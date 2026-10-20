
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthModals from "@/components/auth/AuthModals";
import { CurrencyProvider } from "@/components/layout/CurrencyContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Duplikasi Modesy",
  description: "Marketplace clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <CurrencyProvider>
          {children}
          <AuthModals />
        </CurrencyProvider>
      </body>
    </html>
  );
}
