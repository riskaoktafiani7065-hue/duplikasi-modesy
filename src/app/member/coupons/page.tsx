
"use client";

import { useState } from "react";
import Link from "next/link";
import MemberTopBar from "../components/MemberTopBar";
import MemberMainHeader from "../components/MemberMainHeader";
import CategoryNavbar from "@/components/layout/CategoryNavbar";
import Footer from "@/components/layout/Footer";

const coupons = [
  {
    id: 1,
    code: "WELCOME20",
    title: "Welcome Discount",
    description: "Get 20% off your first eligible purchase.",
    discount: "20% OFF",
    minimum: "$25.00",
    expiry: "Oct 31, 2026",
    status: "Active",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    id: 2,
    code: "SAVE10",
    title: "Special Member Offer",
    description: "Save $10 on an eligible purchase.",
    discount: "$10 OFF",
    minimum: "$50.00",
    expiry: "Nov 15, 2026",
    status: "Active",
    color: "bg-blue-50 text-blue-700",
  },
  {
    id: 3,
    code: "SUMMER15",
    title: "Summer Sale",
    description: "A sample coupon that has already been used.",
    discount: "15% OFF",
    minimum: "$30.00",
    expiry: "Sep 30, 2026",
    status: "Used",
    color: "bg-gray-100 text-gray-600",
  },
  {
    id: 4,
    code: "OLD25",
    title: "Seasonal Discount",
    description: "A sample coupon that is no longer valid.",
    discount: "25% OFF",
    minimum: "$40.00",
    expiry: "Aug 31, 2026",
    status: "Expired",
    color: "bg-red-50 text-red-600",
  },
];

const accountLinks = [
  { label: "Profile", href: "/member/profile", icon: "♙" },
  { label: "Wallet", href: "/member/wallet", icon: "▱" },
  { label: "Orders", href: "/member/orders", icon: "▤" },
  { label: "My Coupons", href: "/member/coupons", icon: "◇" },
  { label: "Messages", href: "/member/messages", icon: "▢" },
  { label: "Profile Settings", href: "/member/settings", icon: "⚙" },
];

type CouponStatus = "All" | "Active" | "Used" | "Expired";

export default function MemberCouponsPage() {
  const [filter, setFilter] = useState<CouponStatus>("All");
  const [copiedCode, setCopiedCode] = useState("");
  const [notice, setNotice] = useState("");

  const filteredCoupons =
    filter === "All"
      ? coupons
      : coupons.filter((coupon) => coupon.status === filter);

  async function copyCoupon(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setNotice(`Coupon code ${code} copied.`);
    } catch {
      setCopiedCode("");
      setNotice(
        `Your coupon code is ${code}. Please select and copy it manually.`
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      <MemberTopBar />
      <MemberMainHeader />
      <CategoryNavbar />

      <section className="mx-auto max-w-330 px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/member" className="hover:text-[#00a99d]">
            Home
          </Link>
          <span>/</span>
          <span>My Account</span>
          <span>/</span>
          <span className="text-gray-900">My Coupons</span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#222222] sm:text-3xl">
            My Coupons
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            View your discount coupons and their validity.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Sidebar akun */}
          <aside className="overflow-hidden rounded-md border border-gray-200 bg-white">
            <div className="flex flex-col items-center border-b border-gray-100 px-5 py-7">
              <img
                src="https://i.pravatar.cc/160?img=12"
                alt="Foto profil Peter Jone"
                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-sm"
              />
              <h2 className="mt-4 text-lg font-semibold text-gray-800">
                Peter Jone
              </h2>
              <p className="mt-1 break-all text-sm text-gray-500">
                peter.jone@example.com
              </p>
              <span className="mt-3 rounded-full bg-[#e7f8f5] px-3 py-1 text-xs font-medium text-[#008f85]">
                Member Account
              </span>
            </div>

            <nav className="space-y-1 p-3">
              {accountLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm transition-colors ${
                    item.href === "/member/coupons"
                      ? "bg-[#e8f8f6] font-medium text-[#008f85]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#008f85]"
                  }`}
                >
                  <span className="w-4 text-center" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Konten kupon */}
          <section className="min-w-0">
            <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { label: "All Coupons", value: coupons.length },
                {
                  label: "Active Coupons",
                  value: coupons.filter((c) => c.status === "Active").length,
                },
                {
                  label: "Used Coupons",
                  value: coupons.filter((c) => c.status === "Used").length,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-md border border-gray-200 bg-white p-4 sm:p-5"
                >
                  <p className="text-xs text-gray-500 sm:text-sm">
                    {item.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-gray-800">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-gray-800">
                Available Coupons
              </h2>

              <label className="flex items-center gap-2 text-sm text-gray-600">
                <span>Filter:</span>
                <select
                  value={filter}
                  onChange={(event) =>
                    setFilter(event.target.value as CouponStatus)
                  }
                  className="rounded-md border border-gray-200 bg-white px-3 py-2 outline-none focus:border-[#00a99d]"
                >
                  <option value="All">All Coupons</option>
                  <option value="Active">Active</option>
                  <option value="Used">Used</option>
                  <option value="Expired">Expired</option>
                </select>
              </label>
            </div>

            {notice && (
              <p
                role="status"
                className="mb-4 rounded-md bg-[#e8f8f6] px-4 py-3 text-sm text-[#008f85]"
              >
                {notice}
              </p>
            )}

            <div className="space-y-4">
              {filteredCoupons.map((coupon) => (
                <article
                  key={coupon.id}
                  className="overflow-hidden rounded-md border border-gray-200 bg-white"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex min-h-32 items-center justify-center border-b border-dashed border-gray-200 bg-[#f2fbf9] px-6 py-5 sm:w-44 sm:border-b-0 sm:border-r">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#009f93]">
                          {coupon.discount}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Member Coupon
                        </p>
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 p-5 sm:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {coupon.title}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-gray-500">
                            {coupon.description}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${coupon.color}`}
                        >
                          {coupon.status}
                        </span>
                      </div>

                      <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-gray-100 pt-4">
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">
                            Coupon Code
                          </p>
                          <p className="font-mono text-sm font-semibold tracking-wider text-gray-800">
                            {coupon.code}
                          </p>
                          <p className="text-xs text-gray-500">
                            Minimum purchase: {coupon.minimum}
                          </p>
                          <p className="text-xs text-gray-500">
                            Expiry date: {coupon.expiry}
                          </p>
                        </div>

                        {coupon.status === "Active" && (
                          <button
                            type="button"
                            onClick={() => copyCoupon(coupon.code)}
                            className="rounded-md border border-[#00a99d] px-4 py-2.5 text-sm font-medium text-[#008f85] transition hover:bg-[#e8f8f6]"
                          >
                            {copiedCode === coupon.code
                              ? "Copied!"
                              : "Copy Code"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {filteredCoupons.length === 0 && (
                <div className="rounded-md border border-gray-200 bg-white px-5 py-12 text-center">
                  <p className="font-medium text-gray-700">
                    No coupons found
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    There are no coupons in this category.
                  </p>
                </div>
              )}
            </div>

            <p className="mt-5 text-xs leading-5 text-gray-500">
              Semua kupon di halaman ini merupakan data contoh. Menyalin kode
              hanya menyalin teks dan belum menerapkan diskon pada pembelian.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
