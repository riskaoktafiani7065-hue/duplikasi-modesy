
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  Globe,
  Bell,
  ChevronDown,
  Eye,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  onToggleSidebar: () => void;
};

export default function AdminTopbar({ onToggleSidebar }: Props) {
  const [user, setUser] = useState<any>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active) setUser(data.user);
    });

    return () => {
      active = false;
    };
  }, [supabase]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const displayName =
    user?.user_metadata?.name || user?.email?.split("@")[0] || "Admin";
  const initial = displayName.charAt(0).toUpperCase() || "A";

  return (
    <header className="admin-topbar sticky top-0 z-30 flex h-[61px] items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 sm:px-6">
      {/* Kiri: tombol sidebar */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex size-9 items-center justify-center rounded text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          aria-label="Buka atau tutup sidebar"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Kanan: kontrol admin */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-sm bg-[#00a88f] px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-[#008f7a]"
        >
          <Eye size={13} />
          View Site
        </Link>

        <button
          type="button"
          className="hidden items-center gap-1.5 text-xs text-gray-500 transition hover:text-gray-900 sm:flex"
        >
          <Globe size={14} />
          English
          <ChevronDown size={12} />
        </button>

        <button
          type="button"
          className="relative flex size-9 items-center justify-center rounded text-gray-500 transition hover:bg-gray-100"
          aria-label="Notifikasi"
        >
          <Bell size={17} />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#00a88f]" />
        </button>

        {/* Profil admin */}
        <div className="relative border-l border-gray-200 pl-3" ref={menuRef}>
          <button
            type="button"
            onClick={() => setOpenMenu((value) => !value)}
            aria-expanded={openMenu}
            className="flex items-center gap-2 rounded-sm py-1 transition hover:bg-gray-50"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-200 to-violet-400 text-xs font-bold text-white">
              {initial}
            </span>

            <span className="hidden max-w-32 truncate text-xs text-gray-600 sm:inline">
              {displayName}
            </span>

            <ChevronDown size={12} className="text-gray-400" />
          </button>

          {openMenu && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded border border-gray-200 bg-white py-1 shadow-lg">
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {displayName}
                </p>
                <p className="truncate text-xs text-gray-500">{user?.email}</p>
              </div>

              <Link
                href="/admin/settings"
                onClick={() => setOpenMenu(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
              >
                <Settings size={15} className="text-gray-400" />
                Pengaturan
              </Link>

              <Link
                href="/"
                onClick={() => setOpenMenu(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
              >
                <User size={15} className="text-gray-400" />
                Lihat Toko
              </Link>

              <div className="my-1 border-t border-gray-100" />

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
