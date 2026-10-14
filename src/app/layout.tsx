
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthModals from "@/components/auth/AuthModals";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Duplikasi Modesy",
  description: "Marketplace clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
        <AuthModals />
      </body>
    </html>
  );
}
