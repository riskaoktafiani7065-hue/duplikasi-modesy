"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  FolderTree,
  ShoppingBag,
  LogOut,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  isOpen?: boolean;
  collapsed?: boolean;
  onClose?: () => void;
};

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Categories", href: "/admin/categories", icon: FolderTree },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
];

export default function AdminSidebar({
  isOpen = false,
  collapsed = false,
  onClose,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Gagal logout:", error.message);
      return;
    }

    router.replace("/");
    router.refresh();
  }

  return (
    <>
      {/* Overlay untuk tampilan mobile */}
      {isOpen && (
        <button
          type="button"
          aria-label="Tutup sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        } ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div
          className={`flex min-h-18.25 items-center justify-between border-b border-gray-200 ${
            collapsed ? "px-4" : "px-6"
          }`}
        >
          <Link
            href="/admin"
            onClick={onClose}
            aria-label="Modesy Admin Dashboard"
            className="flex min-w-0 items-center gap-2"
          >
            <span className="text-2xl font-bold text-[#222]">
              {collapsed ? "M" : "modesy"}
              <span className="text-[#00a99d]">.</span>
            </span>

            {!collapsed && (
              <span className="rounded bg-[#00a99d]/10 px-2 py-0.5 text-xs font-semibold text-[#00a99d]">
                ADMIN
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label="Tutup sidebar"
            onClick={onClose}
            className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav
          aria-label="Menu admin"
          className="flex-1 overflow-y-auto px-3 py-4"
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" &&
                pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                title={collapsed ? item.name : undefined}
                aria-current={isActive ? "page" : undefined}
                className={`mb-1 flex items-center rounded-lg py-2.5 text-sm font-medium transition-colors ${
                  collapsed
                    ? "justify-center px-2"
                    : "gap-3 px-3"
                } ${
                  isActive
                    ? "bg-[#00a99d] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={18} className="shrink-0" />

                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-200 p-3">
          <button
            type="button"
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className={`flex w-full items-center rounded-lg py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 ${
              collapsed ? "justify-center px-2" : "gap-3 px-3"
            }`}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}