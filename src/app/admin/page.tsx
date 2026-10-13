import { createClient } from "@/lib/supabase/server";
import { Package, Users, ShoppingBag, DollarSign } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [productsRes, usersRes, ordersRes, pendingRes] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("orders").select("id, total"),
    supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("status", "PENDING"),
  ]);

  const totalProducts = productsRes.count ?? 0;
  const totalUsers = usersRes.count ?? 0;
  const totalOrders = ordersRes.data?.length ?? 0;
  const totalRevenue =
    ordersRes.data?.reduce(
      (sum, o) => sum + parseFloat(o.total?.toString() || "0"),
      0
    ) ?? 0;
  const pendingProducts = pendingRes.count ?? 0;

  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-purple-600 bg-purple-50",
    },
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "text-orange-600 bg-orange-50",
    },
    {
      label: "Revenue",
      value: new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(totalRevenue),
      icon: DollarSign,
      color: "text-green-600 bg-green-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Selamat datang di panel admin duplikasi Modesy
        </p>
      </div>

      {pendingProducts > 0 && (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm font-medium text-yellow-800">
            Ada <strong>{pendingProducts}</strong> produk menunggu moderasi.
          </p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
                >
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <a
          href="/admin/products"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-[#00a99d]/40 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-900">
            Moderasi Produk
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Approve atau reject produk yang menunggu.
          </p>
        </a>

        <a
          href="/admin/users"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-[#00a99d]/40 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-900">
            Manajemen User
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Kelola role dan status user.
          </p>
        </a>
      </div>
    </div>
  );
}
