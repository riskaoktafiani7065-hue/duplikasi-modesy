
import Link from "next/link";
import MemberTopBar from "../components/MemberTopBar";
import MemberMainHeader from "../components/MemberMainHeader";
import CategoryNavbar from "@/components/layout/CategoryNavbar";
import Footer from "@/components/layout/Footer";

const orders = [
  {
    id: "MD-2026-001",
    date: "Oct 08, 2026",
    product: "Classic Denim Jacket",
    category: "Clothing",
    price: 59.99,
    quantity: 1,
    status: "Completed",
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=160&h=160&fit=crop",
  },
  {
    id: "MD-2026-002",
    date: "Oct 10, 2026",
    product: "Minimalist Wrist Watch",
    category: "Accessories",
    price: 39.5,
    quantity: 1,
    status: "Processing",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=160&h=160&fit=crop",
  },
  {
    id: "MD-2026-003",
    date: "Oct 12, 2026",
    product: "Everyday Backpack",
    category: "Bags",
    price: 45,
    quantity: 2,
    status: "Pending",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=160&h=160&fit=crop",
  },
];

const statusStyles: Record<string, string> = {
  Completed: "bg-emerald-50 text-emerald-700",
  Processing: "bg-blue-50 text-blue-700",
  Pending: "bg-amber-50 text-amber-700",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export default function MemberOrdersPage() {
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
          <span className="text-gray-900">Orders</span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#222222] sm:text-3xl">
            My Orders
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            View and track your order history.
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
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm transition-colors ${
                    item.href === "/member/orders"
                      ? "bg-[#e8f8f6] font-medium text-[#008f85]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#008f85]"
                  }`}
                >
                  <span className="w-4 text-center" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Daftar pesanan */}
          <section className="min-w-0 overflow-hidden rounded-md border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-5 py-5 sm:px-7">
              <h2 className="text-lg font-semibold text-gray-800">
                Order History
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                You have {orders.length} sample orders.
              </p>
            </div>

            <div className="divide-y divide-gray-100">
              {orders.map((order) => (
                <article key={order.id} className="p-5 sm:p-7">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Order #{order.id}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Placed on {order.date}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                        statusStyles[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="h-24 w-24 shrink-0 rounded-md border border-gray-100 bg-gray-50 object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-800">
                        {order.product}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {order.category}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        Quantity: {order.quantity}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xs text-gray-500">Order total</p>
                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        {formatPrice(order.price * order.quantity)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-4">
                    <Link
                      href={`/member/orders/${order.id}`}
                      className="rounded-md border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
              <p className="text-xs leading-5 text-gray-500">
                Data pesanan di atas hanya contoh untuk pengembangan frontend,
                bukan transaksi atau pesanan sungguhan.
              </p>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
