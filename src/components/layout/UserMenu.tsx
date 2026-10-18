"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  Wallet,
  Package,
  Ticket,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  user: {
    id: string;
    email: string;
    user_metadata?: { name?: string; avatar_url?: string };
  };
  role: string | null;
};

export default function UserMenu({ user, role }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  const displayName =
    user.user_metadata?.name || user.email?.split("@")[0] || "User";
  const avatarUrl = user.user_metadata?.avatar_url;
  const initial = displayName.charAt(0).toUpperCase();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const isAdmin = role === "ADMIN" || role === "MODERATOR";

  const menuItems = [
    ...(isAdmin
      ? [{ label: "Admin Panel", href: "/admin", icon: LayoutDashboard }]
      : []),
    { label: "Profile", href: "/profile", icon: User },
    { label: "Wallet", href: "/wallet", icon: Wallet },
    { label: "Orders", href: "/orders", icon: Package },
    { label: "My Coupons", href: "/coupons", icon: Ticket },
    { label: "Messages", href: "/messages", icon: MessageSquare },
    { label: "Profile Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-sm text-[#444444] transition hover:text-[#00a99d]"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-[#00a99d] to-[#008f85] text-xs font-bold text-white">
            {initial}
          </span>
        )}
        <span className="hidden font-medium sm:inline">{displayName}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#666666] transition hover:bg-gray-50 hover:text-[#00a99d]"
              >
                <Icon size={16} className="shrink-0 text-gray-400" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Logout */}
          <div className="my-1 border-t border-gray-100" />
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#666666] transition hover:bg-gray-50 hover:text-[#00a99d]"
          >
            <LogOut size={16} className="shrink-0 text-gray-400" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
