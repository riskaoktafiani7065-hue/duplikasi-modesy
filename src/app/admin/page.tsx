import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createTranslator } from "@/lib/i18n";
import { getServerLanguage } from "@/lib/i18n-server";
import {
  Package,
  Users,
  ShoppingBag,
  Eye,
  ArrowRight,
  Clock,
  Star,
  MessageSquare,
  CreditCard,
} from "lucide-react";

const currency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

function Panel({
  title,
  children,
  href,
  viewAll,
}: {
  title: string;
  children: React.ReactNode;
  href?: string;
  viewAll?: string;
}) {
  return (
    <section className="admin-card min-w-0 overflow-hidden rounded-[3px] bg-white">
      <div className="admin-card-heading flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <span className="text-sm font-medium text-[#3b4654]">{title}</span>
        {href && (
          <Link
            href={href}
            className="flex items-center gap-1 text-[10px] text-[#00a88f] hover:underline"
          >
            {viewAll} <ArrowRight size={12} />
          </Link>
        )}
      </div>
      <div className="px-5 py-3">{children}</div>
    </section>
  );
}

function EmptyRow({
  colSpan,
  children,
}: {
  colSpan: number;
  children: React.ReactNode;
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-8 text-center text-xs text-gray-400">
        {children}
      </td>
    </tr>
  );
}

export default async function AdminDashboardPage() {
  const lang = await getServerLanguage();
  const t = createTranslator(lang);
  const locale = lang === "ar" ? "ar-EG" : "id-ID";
  const supabase = await createClient();

  const [
    productsCountRes,
    usersCountRes,
    pendingProductsRes,
    totalRevenueRes,
    latestOrdersRes,
    latestProductsRes,
    latestMembersRes,
    ordersCountRes,
  ] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),

    supabase.from("profiles").select("id", { count: "exact", head: true }),

    supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("status", "PENDING"),

    supabase.from("orders").select("total").in("status", ["PAID", "COMPLETED"]),

    supabase
      .from("orders")
      .select("id, total, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),

    supabase
      .from("products")
      .select("id, title, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),

    supabase
      .from("profiles")
      .select("id, name, role")
      .order("created_at", { ascending: false })
      .limit(6),

    supabase.from("orders").select("id", { count: "exact", head: true }),
  ]);

  const totalProducts = productsCountRes.count ?? 0;
  const totalUsers = usersCountRes.count ?? 0;
  const pendingProducts = pendingProductsRes.count ?? 0;
  const totalOrders = ordersCountRes.count ?? 0;

  const totalRevenue = (totalRevenueRes.data ?? []).reduce(
    (sum, order) => sum + Number(order.total ?? 0),
    0,
  );

  const latestOrders = latestOrdersRes.data ?? [];
  const latestProducts = latestProductsRes.data ?? [];
  const latestMembers = latestMembersRes.data ?? [];

  const stats = [
    {
      label: t("Orders"),
      value: String(totalOrders),
      icon: ShoppingBag,
      color: "#00a88f",
    },
    {
      label: t("Products"),
      value: String(totalProducts),
      icon: Package,
      color: "#6960a8",
    },
    {
      label: t("Pending Products"),
      value: String(pendingProducts),
      icon: Eye,
      color: "#ff393f",
    },
    {
      label: t("Members"),
      value: String(totalUsers),
      icon: Users,
      color: "#ffa936",
    },
  ];

  return (
    <div className="space-y-5 px-0">
      {/* Dashboard heading */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-[#394553]">{t("Dashboard")}</h1>
          <p className="mt-1 text-[11px] text-gray-500">
            {t("Welcome to your marketplace control panel.")}
          </p>
        </div>
        <p className="text-[10px] text-gray-400">
          {t("Home")} <span className="mx-1">/</span> {t("Dashboard")}
        </p>
      </div>

      {/* Pending alert */}
      {pendingProducts > 0 && (
        <Link
          href="/admin/products?status=PENDING"
          className="flex items-center justify-between gap-3 border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800"
        >
          <span>
            <strong>{pendingProducts}</strong> {t("products are waiting for moderation.")}
          </span>
          <ArrowRight size={15} />
        </Link>
      )}

      {/* Colored statistic cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="relative flex min-h-[124px] items-center overflow-hidden rounded-[2px] p-5 text-white"
              style={{ backgroundColor: stat.color }}
            >
              <div className="relative z-10 min-w-0">
                <p className="text-[32px] font-bold leading-tight">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm font-medium">{stat.label}</p>
              </div>

              <Icon
                size={76}
                strokeWidth={3}
                className="absolute right-4 top-2 opacity-[0.13]"
              />
            </div>
          );
        })}
      </div>

      {/* Orders and transactions */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Panel title={t("Latest Orders")} viewAll={t("View All")} href="/admin/orders">
          <div className="max-h-[310px] overflow-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t("Order")}</th>
                  <th>{t("Total")}</th>
                  <th>{t("Status")}</th>
                  <th>{t("Date")}</th>
                  <th>{t("Details")}</th>
                </tr>
              </thead>
              <tbody>
                {latestOrders.length ? (
                  latestOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="whitespace-nowrap text-gray-500">
                        #{String(order.id).slice(0, 8)}
                      </td>
                      <td className="whitespace-nowrap">
                        {currency(Number(order.total ?? 0))}
                      </td>
                      <td>
                        <span className="admin-badge bg-amber-50 text-amber-700">
                          {order.status ?? t("Unknown")}
                        </span>
                      </td>
                      <td className="whitespace-nowrap text-gray-500">
                        {order.created_at
                          ? new Date(order.created_at).toLocaleString(locale, {
                              dateStyle: "short",
                              timeStyle: "short",
                            })
                          : "—"}
                      </td>
                      <td>
                        <Link
                          href={`/admin/orders/${order.id}`}
                          aria-label={t("Lihat pesanan")}
                          className="inline-flex rounded bg-[#00b6c4] px-2 py-1 text-[10px] text-white"
                        >
                          {t("Details")}
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <EmptyRow colSpan={5}>{t("Belum ada data pesanan.")}</EmptyRow>
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title={t("Latest Transactions")} viewAll={t("View All")} href="/admin/payments">
          <div className="max-h-[310px] overflow-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t("Id")}</th>
                  <th>{t("Order")}</th>
                  <th>{t("Payment Amount")}</th>
                  <th>{t("Payment Method")}</th>
                  <th>{t("Status")}</th>
                  <th>{t("Date")}</th>
                </tr>
              </thead>
              <tbody>
                {latestOrders.length ? (
                  latestOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{String(order.id).slice(0, 8)}</td>
                      <td>#{String(order.id).slice(0, 8)}</td>
                      <td className="whitespace-nowrap">
                        {currency(Number(order.total ?? 0))}
                      </td>
                      <td>{t("Order payment")}</td>
                      <td>
                        <span className="admin-badge bg-emerald-50 text-emerald-700">
                          {order.status ?? t("Unknown")}
                        </span>
                      </td>
                      <td className="whitespace-nowrap">
                        {order.created_at
                          ? new Date(order.created_at).toLocaleDateString(
                              locale,
                            )
                          : "—"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <EmptyRow colSpan={6}>{t("Belum ada transaksi.")}</EmptyRow>
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* Products */}
        <Panel title={t("Latest Products")} viewAll={t("View All")} href="/admin/products">
          <div className="max-h-[310px] overflow-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t("ID")}</th>
                  <th>{t("Product")}</th>
                  <th>{t("Status")}</th>
                  <th>{t("Details")}</th>
                </tr>
              </thead>
              <tbody>
                {latestProducts.length ? (
                  latestProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="text-gray-500">
                        {String(product.id).slice(0, 8)}
                      </td>
                      <td className="max-w-40 truncate">{product.title}</td>
                      <td>
                        <span className="admin-badge bg-gray-100 text-gray-600">
                          {product.status ?? "—"}
                        </span>
                      </td>
                      <td>
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="rounded bg-[#00b6c4] px-2 py-1 text-[10px] text-white"
                        >
                          {t("Details")}
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <EmptyRow colSpan={4}>{t("Produk belum tersedia.")}</EmptyRow>
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* Pending products */}
        <Panel
          title={t("Latest Pending Products")} viewAll={t("View All")}
          href="/admin/products?status=PENDING"
        >
          <div className="flex min-h-36 flex-col items-center justify-center text-center">
            <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-amber-50 text-amber-600">
              <Clock size={19} />
            </div>
            <p className="text-sm font-semibold text-gray-700">
              {pendingProducts} {t("pending products")}
            </p>
            <p className="mt-1 text-[10px] text-gray-400">
              {t("Products awaiting admin review")}
            </p>
            <Link
              href="/admin/products?status=PENDING"
              className="mt-3 rounded bg-[#00b6a0] px-3 py-2 text-[10px] text-white"
            >
              {t("View All")}
            </Link>
          </div>
        </Panel>

        {/* Reviews */}
        <Panel title={t("Latest Reviews")} viewAll={t("View All")} href="/admin/reviews">
          <div className="flex min-h-24 flex-col items-center justify-center text-center">
            <Star size={22} className="mb-2 text-amber-400" />
            <p className="text-xs font-medium text-gray-600">{t("Reviews panel")}</p>
            <p className="mt-1 text-[10px] text-gray-400">
              {t("Data ulasan belum dihubungkan.")}
            </p>
          </div>
        </Panel>

        {/* Comments */}
        <Panel title={t("Latest Comments")} viewAll={t("View All")} href="/admin/comments">
          <div className="flex min-h-24 flex-col items-center justify-center text-center">
            <MessageSquare size={22} className="mb-2 text-gray-300" />
            <p className="text-xs font-medium text-gray-600">{t("Comments panel")}</p>
            <p className="mt-1 text-[10px] text-gray-400">
              {t("Data komentar belum dihubungkan.")}
            </p>
          </div>
        </Panel>

        {/* Members */}
        <Panel title={t("Latest Members")} viewAll={t("View All")} href="/admin/users">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {latestMembers.length ? (
              latestMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex min-w-0 flex-col items-center"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    <Users size={19} />
                  </div>
                  <p className="mt-2 w-full truncate text-center text-[10px] text-gray-600">
                    {member.name || t("Member")}
                  </p>
                  <p className="mt-1 text-[9px] text-gray-400">
                    {member.role || t("User")}
                  </p>
                </div>
              ))
            ) : (
              <p className="col-span-full py-5 text-center text-xs text-gray-400">
                {t("Belum ada data anggota.")}
              </p>
            )}
          </div>
        </Panel>

        {/* Revenue */}
        <Panel title={t("Revenue Summary")}>
          <div className="flex min-h-24 items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded bg-emerald-50 text-emerald-600">
              <CreditCard size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-500">{t("Paid & completed orders")}</p>
              <p className="mt-1 text-xl font-semibold text-gray-800">
                {currency(totalRevenue)}
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}