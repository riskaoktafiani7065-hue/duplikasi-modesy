
"use client";

import { useState } from "react";
import Link from "next/link";
import MemberTopBar from "../components/MemberTopBar";
import MemberMainHeader from "../components/MemberMainHeader";
import CategoryNavbar from "@/components/layout/CategoryNavbar";
import Footer from "@/components/layout/Footer";

export default function MemberSettingsPage() {
  const [settings, setSettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: true,
    messageNotifications: true,
    orderNotifications: true,
  });

  const [message, setMessage] = useState("");

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setSettings((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      settings.newPassword &&
      settings.newPassword !== settings.confirmPassword
    ) {
      setMessage("Konfirmasi kata sandi baru tidak cocok.");
      return;
    }

    setMessage(
      "Pengaturan berhasil diperbarui untuk sesi ini. Kata sandi belum benar-benar diubah."
    );
  }

  function toggleNotification(
    name:
      | "emailNotifications"
      | "messageNotifications"
      | "orderNotifications"
  ) {
    setSettings((current) => ({
      ...current,
      [name]: !current[name],
    }));

    setMessage("");
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
          <span className="text-gray-900">Profile Settings</span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#222222] sm:text-3xl">
            Profile Settings
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your account preferences and security settings.
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
              {[
                { label: "Profile", href: "/member/profile", icon: "♙" },
                { label: "Wallet", href: "/member/wallet", icon: "▱" },
                { label: "Orders", href: "/member/orders", icon: "▤" },
                { label: "My Coupons", href: "/member/coupons", icon: "◇" },
                { label: "Messages", href: "/member/messages", icon: "▢" },
                {
                  label: "Profile Settings",
                  href: "/member/settings",
                  icon: "⚙",
                },
              ].map((item) => {
                const active = item.href === "/member/settings";

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm transition-colors ${
                      active
                        ? "bg-[#e8f8f6] font-medium text-[#008f85]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#008f85]"
                    }`}
                  >
                    <span className="w-4 text-center" aria-hidden="true">
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Pengaturan akun */}
          <div className="space-y-6">
            <section className="overflow-hidden rounded-md border border-gray-200 bg-white">
              <div className="border-b border-gray-100 px-5 py-5 sm:px-7">
                <h2 className="text-lg font-semibold text-gray-800">
                  Change Password
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update your password settings.
                </p>
              </div>

              <form onSubmit={handleSave} className="space-y-5 p-5 sm:p-7">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    autoComplete="current-password"
                    value={settings.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    className="w-full rounded-md border text-gray-900 border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#00a99d]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      autoComplete="new-password"
                      minLength={8}
                      value={settings.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="At least 8 characters"
                      className="w-full rounded-md border text-gray-900 border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#00a99d]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      minLength={8}
                      value={settings.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Re-enter new password"
                      className="w-full rounded-md border text-gray-900 border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#00a99d]"
                    />
                  </div>
                </div>

                <p className="text-xs leading-5 text-gray-500">
                  Catatan: formulir ini masih berupa simulasi frontend.
                  Kata sandi tidak disimpan atau diubah secara nyata.
                </p>

                {/* Preferensi notifikasi */}
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-base font-semibold text-gray-800">
                    Notification Preferences
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Choose which notifications you want to receive.
                  </p>

                  <div className="mt-4 space-y-4">
                    {[
                      {
                        key: "emailNotifications" as const,
                        title: "Email Notifications",
                        description: "Receive account updates by email.",
                      },
                      {
                        key: "messageNotifications" as const,
                        title: "New Messages",
                        description: "Get notified when you receive a message.",
                      },
                      {
                        key: "orderNotifications" as const,
                        title: "Order Updates",
                        description: "Receive updates about your orders.",
                      },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className="flex cursor-pointer items-start justify-between gap-4 rounded-md border border-gray-100 p-4"
                      >
                        <span>
                          <span className="block text-sm font-medium text-gray-800">
                            {item.title}
                          </span>
                          <span className="mt-1 block text-xs text-gray-500">
                            {item.description}
                          </span>
                        </span>

                        <input
                          type="checkbox"
                          checked={settings[item.key]}
                          onChange={() => toggleNotification(item.key)}
                          className="mt-1 h-4 w-4 accent-[#00a99d]"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {message && (
                  <p
                    role="status"
                    className={`rounded-md px-4 py-3 text-sm ${
                      message.includes("tidak cocok")
                        ? "bg-red-50 text-red-600"
                        : "bg-[#e8f8f6] text-[#008f85]"
                    }`}
                  >
                    {message}
                  </p>
                )}

                <div className="border-t border-gray-100 pt-5">
                  <button
                    type="submit"
                    className="rounded-md bg-[#00a99d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#008f85]"
                  >
                    Save Settings
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
