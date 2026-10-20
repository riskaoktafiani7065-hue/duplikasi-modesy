"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import MemberTopBar from "./MemberTopBar";
import MemberMainHeader from "./MemberMainHeader";
import CategoryNavbar from "@/components/layout/CategoryNavbar";
import Footer from "@/components/layout/Footer";

const accountMenu = [
  {
    label: "Profile",
    href: "/member/profile",
    icon: "♙",
  },
  {
    label: "Wallet",
    href: "/member/wallet",
    icon: "▱",
  },
  {
    label: "Orders",
    href: "/member/orders",
    icon: "▤",
  },
  {
    label: "My Coupons",
    href: "/member/coupons",
    icon: "◇",
  },
  {
    label: "Messages",
    href: "/member/messages",
    icon: "▢",
  },
  {
    label: "Profile Settings",
    href: "/member/settings",
    icon: "⚙",
  },
];

type MemberAccountLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function MemberAccountLayout({
  title,
  description,
  children,
}: MemberAccountLayoutProps) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      <MemberTopBar />
      <MemberMainHeader />
      <CategoryNavbar />

      <div className="mx-auto w-full max-w-330 px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500"
        >
          <Link href="/member" className="transition hover:text-[#008f85]">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span>My Account</span>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-gray-800">{title}</span>
        </nav>

        {/* Page heading */}
        <header className="mb-7">
          <h1 className="text-2xl font-semibold tracking-tight text-[#222222] sm:text-3xl">
            {title}
          </h1>

          {description && (
            <p className="mt-2 text-sm leading-6 text-gray-500">
              {description}
            </p>
          )}
        </header>

        {/* Account layout */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[270px_minmax(0,1fr)]">
          <aside className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            {/* Member summary */}
            <div className="flex flex-col items-center border-b border-gray-100 px-5 py-7 text-center">
              <img
                src="https://i.pravatar.cc/160?img=12"
                alt="Member profile"
                className="h-20 w-20 rounded-full border border-gray-200 object-cover"
              />

              <h2 className="mt-3 text-base font-semibold text-gray-800">
                Peter Jone
              </h2>

              <p className="mt-1 max-w-full break-all text-sm text-gray-500">
                peter.jone@example.com
              </p>

              <span className="mt-3 rounded-full bg-[#e7f8f5] px-3 py-1 text-xs font-medium text-[#008f85]">
                Member Account
              </span>
            </div>

            {/* Account navigation */}
            <nav aria-label="Member account navigation" className="space-y-1 p-3">
              {accountMenu.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex min-h-11 items-center gap-3 rounded-md px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? "bg-[#e8f8f6] font-medium text-[#008f85]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#008f85]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="w-5 text-center text-base"
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Page content */}
          <section className="min-w-0">{children}</section>
        </div>
      </div>

      <Footer />
    </main>
  );
}