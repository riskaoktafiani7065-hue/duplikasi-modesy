"use client";

import { useState, type ReactNode } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminShell({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) {
  // Desktop (>= lg): sidebar bisa disembunyikan
  const [collapsed, setCollapsed] = useState(false);
  // Mobile: sidebar tampil sebagai drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleMenuClick() {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setCollapsed((value) => !value);
    } else {
      setMobileOpen((value) => !value);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f0f2f5]">
      <AdminSidebar
        isOpen={mobileOpen}
        collapsed={collapsed}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader email={email} onMenuClick={handleMenuClick} />

        <main className="min-w-0 flex-1 p-3 sm:p-5 lg:p-6">{children}</main>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 bg-white px-5 py-3 text-[11px] text-gray-500">
          <span>
            Copyright © {new Date().getFullYear()} Modesy. All Rights Reserved.
          </span>
          <span>Version 2.7</span>
        </footer>
      </div>
    </div>
  );
}