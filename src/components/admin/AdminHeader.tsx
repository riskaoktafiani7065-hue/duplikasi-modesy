"use client";

import { Bell, ChevronDown, Globe, Menu } from "lucide-react";

export default function AdminHeader({
  email,
  onMenuClick,
}: {
  email: string;
  onMenuClick: () => void;
}) {
  return (
    <header className="admin-topbar sticky top-0 z-30 flex h-15.25 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Buka atau tutup sidebar"
        className="flex size-9 items-center justify-center text-gray-500 transition hover:text-gray-900"
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-4 sm:gap-6">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-sm bg-[#00a88f] px-3 py-2 text-[11px] font-semibold text-white hover:bg-[#008f7a]"
        >
          <Globe size={12} />
          View Site
        </a>

        <button
          type="button"
          className="hidden items-center gap-1 text-xs text-gray-500 sm:flex"
        >
          <Globe size={14} />
          English
          <ChevronDown size={12} />
        </button>

        <button
          type="button"
          aria-label="Notifikasi"
          className="relative flex size-9 items-center justify-center text-gray-500 hover:text-gray-900"
        >
          <Bell size={17} />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#00a88f]" />
        </button>

        <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cyan-200 to-violet-400 text-xs font-bold text-white">
            {(email.trim().charAt(0) || "A").toUpperCase()}
          </div>

          <div className="hidden min-w-0 sm:block">
            <p className="text-xs font-semibold text-gray-500">Admin</p>
          </div>

          <ChevronDown size={12} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
}