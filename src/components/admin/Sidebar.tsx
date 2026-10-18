"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  Home,
  Palette,
  SlidersHorizontal,
  Image as ImageIcon,
  ShoppingBag,
  Package,
  Tags,
  FolderTree,
  CreditCard,
  Wallet,
  FileText,
  MessageSquare,
  Users,
  Settings,
  Star,
  Newspaper,
  Mail,
  ChevronDown,
  ChevronRight,
  LogOut,
  Globe,
  ShieldCheck,
  BarChart3,
  RotateCcw,
  CircleHelp,
  Database,
  Bell,
  Building2,
  Ticket,
  Megaphone,
  BadgeCheck,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type MenuChild = {
  label: string;
  href: string;
};

type MenuItem = {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  children?: MenuChild[];
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

const groups: MenuGroup[] = [
  {
    title: "NAVIGATION",
    items: [
      { label: "Home", href: "/admin", icon: Home },
      { label: "Theme", href: "/admin/theme", icon: Palette },
      { label: "Slider", href: "/admin/slider", icon: SlidersHorizontal },
      { label: "Homepage Manager", href: "/admin/homepage", icon: ImageIcon },
    ],
  },
  {
    title: "ORDERS",
    items: [
      {
        label: "Orders",
        href: "/admin/orders",
        icon: ShoppingBag,
        children: [
          { label: "All Orders", href: "/admin/orders" },
          { label: "Completed Orders", href: "/admin/orders?status=completed" },
          { label: "Pending Orders", href: "/admin/orders?status=pending" },
        ],
      },
      { label: "Digital Sales", href: "/admin/digital-sales", icon: FileText },
      { label: "Refund Requests", href: "/admin/refunds", icon: RotateCcw },
    ],
  },
  {
    title: "PRODUCTS",
    items: [
      {
        label: "Products",
        href: "/admin/products",
        icon: Package,
        children: [
          { label: "All Products", href: "/admin/products" },
          { label: "Pending Products", href: "/admin/products?status=pending" },
        ],
      },
      { label: "Quote Requests", href: "/admin/quotes", icon: MessageSquare },
      { label: "Categories", href: "/admin/categories", icon: FolderTree },
      { label: "Tags", href: "/admin/tags", icon: Tags },
      { label: "Brands", href: "/admin/brands", icon: BadgeCheck },
      {
        label: "Custom Fields",
        href: "/admin/custom-fields",
        icon: SlidersHorizontal,
      },
    ],
  },
  {
    title: "PAYMENTS",
    items: [
      { label: "Payments", href: "/admin/payments", icon: CreditCard },
      { label: "Earnings", href: "/admin/earnings", icon: Wallet },
      { label: "Payouts", href: "/admin/payouts", icon: Building2 },
    ],
  },
  {
    title: "CONTENT",
    items: [
      { label: "Pages", href: "/admin/pages", icon: FileText },
      { label: "Blog", href: "/admin/blog", icon: Newspaper },
      { label: "Location", href: "/admin/location", icon: Globe },
    ],
  },
  {
    title: "MEMBERSHIP",
    items: [
      { label: "Membership", href: "/admin/membership", icon: Ticket },
      { label: "Roles & Permissions", href: "/admin/roles", icon: ShieldCheck },
    ],
  },
  {
    title: "MARKETPLACE TOOLS",
    items: [
      { label: "Help Center", href: "/admin/help-center", icon: CircleHelp },
      { label: "Cache System", href: "/admin/cache", icon: Database },
      { label: "SEO Tools", href: "/admin/seo", icon: BarChart3 },
      { label: "Ad Spaces", href: "/admin/ad-spaces", icon: Megaphone },
      { label: "Chat Messages", href: "/admin/chats", icon: MessageSquare },
      {
        label: "Contact Messages",
        href: "/admin/contact-messages",
        icon: Mail,
      },
      { label: "Reviews", href: "/admin/reviews", icon: Star },
      { label: "Comments", href: "/admin/comments", icon: MessageSquare },
      { label: "Newsletter", href: "/admin/newsletter", icon: Bell },
      { label: "Affiliate Program", href: "/admin/affiliate", icon: Users },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      {
        label: "Preferences",
        href: "/admin/preferences",
        icon: SlidersHorizontal,
      },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

type Props = {
  isOpen?: boolean;
  collapsed?: boolean;
  onClose?: () => void;
};

export default function AdminSidebar({
  isOpen = false,
  collapsed = false,
  onClose,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [user, setUser] = useState<{
    email?: string;
    user_metadata?: { name?: string; full_name?: string };
  } | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();
      if (!error && active) setUser(data.user);
    }

    void loadUser();

    return () => {
      active = false;
    };
  }, [supabase]);

  useEffect(() => {
    setOpenMenus((previous) => {
      const next = { ...previous };

      for (const group of groups) {
        for (const item of group.items) {
          if (
            item.children?.some(
              (child) => pathname === child.href.split("?")[0],
            )
          ) {
            next[item.label] = true;
          }
        }
      }

      return next;
    });
  }, [pathname]);

  function handleClose() {
    onClose?.();
  }

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Gagal logout:", error.message);
        setLoggingOut(false);
        return;
      }

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Terjadi kesalahan saat logout:", error);
      setLoggingOut(false);
    }
  }

  const displayName =
    user?.user_metadata?.name ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Admin";

  const initial = displayName.charAt(0).toUpperCase();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      {/* Overlay untuk mobile */}
      {isOpen && (
        <button
          type="button"
          aria-label="Tutup menu navigasi"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={handleClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[260px] shrink-0 flex-col overflow-hidden bg-[#1f2a3a] text-white transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:hidden" : ""}`}
      >
        {/* Logo */}
        <div className="relative flex h-[61px] shrink-0 items-center justify-center border-b border-white/[0.08] px-4">
          <Link
            href="/admin"
            onClick={handleClose}
            className="text-[17px] font-semibold tracking-[0.2px]"
          >
            Modesy <span className="font-normal text-slate-300">Panel</span>
          </Link>

          <button
            type="button"
            aria-label="Tutup sidebar"
            onClick={handleClose}
            className="absolute right-3 rounded p-1 text-slate-400 hover:bg-white/10 lg:hidden"
          >
            <X size={17} />
          </button>
        </div>

        {/* Profil admin */}
        <div className="flex min-h-[91px] shrink-0 items-center gap-3 border-b border-white/[0.08] px-5 py-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e9edf2] text-sm font-semibold text-[#354253]">
            {initial}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-white">
              {displayName}
            </p>
            <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="size-[7px] rounded-full bg-[#19c99a]" />
              Online
            </p>
          </div>
        </div>

        {/* Navigasi */}
        <nav className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto pb-4 pt-2 [scrollbar-width:thin] [scrollbar-color:#3a4658_transparent]">
          {groups.map((group) => (
            <section key={group.title} className="mb-2">
              <p className="px-5 pb-2 pt-4 text-[10px] tracking-[0.15em] text-[#94a2b4]">
                {group.title}
              </p>

              {group.items.map((item) => {
                const Icon = item.icon;
                const hasChildren = Boolean(item.children?.length);
                const active = isActive(item.href);
                const expanded = openMenus[item.label] ?? false;

                const linkClass = `flex min-h-10 w-full items-center gap-3 px-5 text-left text-[12px] transition-colors ${
                  active
                    ? "bg-white/[0.09] font-medium text-white"
                    : "text-[#c0cad6] hover:bg-white/[0.06] hover:text-white"
                }`;

                return (
                  <div key={item.label}>
                    {hasChildren ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenus((previous) => ({
                              ...previous,
                              [item.label]: !expanded,
                            }))
                          }
                          aria-expanded={expanded}
                          className={linkClass}
                        >
                          <Icon size={16} strokeWidth={1.7} />
                          <span className="min-w-0 flex-1">{item.label}</span>
                          {expanded ? (
                            <ChevronDown size={14} />
                          ) : (
                            <ChevronRight size={14} />
                          )}
                        </button>

                        {expanded && (
                          <div className="mb-1 ml-[43px] border-l border-white/[0.13] py-1 pl-2">
                            {item.children?.map((child) => {
                              const childActive =
                                pathname === child.href.split("?")[0];

                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={handleClose}
                                  className={`block rounded-sm px-2.5 py-2 text-[11px] transition-colors ${
                                    childActive
                                      ? "bg-white/[0.09] text-white"
                                      : "text-[#b4bfcc] hover:bg-white/[0.05] hover:text-white"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={handleClose}
                        className={linkClass}
                      >
                        <Icon size={16} strokeWidth={1.7} />
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </section>
          ))}
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-white/[0.08] p-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-1 flex min-h-10 items-center gap-3 rounded-sm px-4 text-[12px] text-[#c0cad6] transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <Globe size={16} strokeWidth={1.7} />
            <span>View Site</span>
          </Link>

          <button
            type="button"
            disabled={loggingOut}
            onClick={handleLogout}
            className="flex min-h-10 w-full items-center gap-3 rounded-sm px-4 text-left text-[12px] text-[#c0cad6] transition-colors hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
          >
            <LogOut size={16} strokeWidth={1.7} />
            <span>{loggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
