"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  Palette,
  SlidersHorizontal,
  Image,
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

type MenuChild = { label: string; href: string };

type MenuItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
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
      { label: "Homepage Manager", href: "/admin/homepage", icon: Image },
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
  isOpen: boolean;
  onClose: () => void;
};

export default function AdminSidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, [supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  }

  // Info user
  const displayName =
    user?.user_metadata?.name || user?.email?.split("@")[0] || "Admin";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <>
      {/* Overlay — mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`admin-sidebar fixed inset-y-0 left-0 z-50 flex w-[250px] flex-col overflow-hidden text-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header — logo + close button */}
        <div className="flex h-[54px] shrink-0 items-center justify-between border-b border-white/[0.07] px-5">
          <Link
            href="/admin"
            className="text-[15px] font-semibold tracking-wide"
            onClick={onClose}
          >
            Modesy <span className="font-normal text-gray-300">Panel</span>
          </Link>
          <button
            type="button"
            aria-label="Tutup sidebar"
            onClick={onClose}
            className="rounded p-1 text-gray-400 hover:bg-white/10 lg:hidden"
          >
            <X size={16} />
          </button>
        </div>

        {/* User info */}
        <div className="flex shrink-0 items-center gap-3 border-b border-white/[0.07] px-4 py-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-violet-500 text-sm font-bold text-slate-900">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold">{displayName}</p>
            <p className="mt-1 flex items-center gap-1.5 text-[10px] text-gray-400">
              <span className="size-1.5 rounded-full bg-emerald-400" /> Online
            </p>
          </div>
        </div>

        {/* Menu */}
        <nav className="admin-sidebar-nav flex-1 overflow-y-auto px-2 pb-5 pt-3">
          {groups.map((group) => (
            <section key={group.title} className="mb-3">
              <p className="px-3 pb-2 pt-2 text-[9px] font-semibold tracking-[0.13em] text-slate-400/70">
                {group.title}
              </p>
              {group.items.map((item) => {
                const Icon = item.icon;
                const children = item.children;
                const active =
                  pathname === item.href ||
                  (item.href !== "/admin" &&
                    pathname.startsWith(item.href + "/"));
                const expanded =
                  openMenus[item.label] ??
                  Boolean(
                    children?.some(
                      (child) => pathname === child.href.split("?")[0]
                    )
                  );

                return (
                  <div key={item.label}>
                    {children ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenus((prev) => ({
                              ...prev,
                              [item.label]: !expanded,
                            }))
                          }
                          aria-expanded={expanded}
                          className={`admin-nav-link ${
                            active ? "admin-nav-active" : ""
                          }`}
                        >
                          <Icon size={14} strokeWidth={1.8} />
                          <span className="flex-1 text-left">{item.label}</span>
                          {expanded ? (
                            <ChevronDown size={13} />
                          ) : (
                            <ChevronRight size={13} />
                          )}
                        </button>
                        {expanded && (
                          <div className="mb-1 ml-[27px] border-l border-white/10 pl-2">
                            {children.map((child) => {
                              const childPath = child.href.split("?")[0];
                              const childActive = pathname === childPath;
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={onClose}
                                  className={`block rounded px-2.5 py-2 text-[10px] transition ${
                                    childActive
                                      ? "bg-white/10 text-white"
                                      : "text-slate-400 hover:text-white"
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
                        onClick={onClose}
                        className={`admin-nav-link ${
                          active ? "admin-nav-active" : ""
                        }`}
                      >
                        <Icon size={14} strokeWidth={1.8} />
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </section>
          ))}
        </nav>

        {/* Footer — View Site + Logout */}
        <div className="shrink-0 border-t border-white/[0.07] p-3">
          <Link
            href="/"
            target="_blank"
            className="mb-1 flex items-center gap-2 rounded px-3 py-2 text-xs text-slate-300 hover:bg-white/[0.06]"
          >
            <Globe size={14} /> View Site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded px-3 py-2 text-xs text-slate-300 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
