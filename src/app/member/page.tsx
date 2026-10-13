
const stats = [
  {
    label: "Total Orders",
    value: "0",
    icon: "📦",
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Pending Orders",
    value: "0",
    icon: "⏳",
    color: "bg-amber-50 text-amber-600",
  },
  {
    label: "Wishlist Items",
    value: "0",
    icon: "♡",
    color: "bg-rose-50 text-rose-600",
  },
];

const menuItems = [
  { label: "Dashboard", href: "/member", icon: "▦", active: true },
  { label: "My Profile", href: "/member/profile", icon: "♙", active: false },
  { label: "My Orders", href: "/member/orders", icon: "▤", active: false },
  { label: "Wishlist", href: "/member/wishlist", icon: "♡", active: false },
];

export default function MemberDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="text-xl font-bold tracking-tight">
            Modesy<span className="text-emerald-500">.</span>
          </a>

          <a
            href="/"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
          >
            ← Back to Shop
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-emerald-600">
            MEMBER AREA
          </p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            My Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your profile, orders, and favorite products.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4">
            <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Account Menu
            </p>

            <nav className="space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    item.active
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-6 border-t border-slate-100 pt-4">
              <p className="px-3 text-xs leading-5 text-slate-400">
                Member account
                <br />
                Demo interface
              </p>
            </div>
          </aside>

          <section className="min-w-0 space-y-6">
            <div className="rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
              <p className="text-sm text-slate-300">
                Welcome back!
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                Hello, Member 👋
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300">
                Welcome to your personal dashboard. Track your orders
                and keep your favorite products organized in one place.
              </p>
              <a
                href="/"
                className="mt-5 inline-flex rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                Explore Products
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                      {stat.label}
                    </p>
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${stat.color}`}
                    >
                      {stat.icon}
                    </span>
                  </div>
                  <p className="mt-4 text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-bold">Recent Orders</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Your latest purchases will appear here.
                  </p>
                </div>
                <a
                  href="/member/orders"
                  className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  View All →
                </a>
              </div>

              <div className="mt-6 rounded-xl border border-dashed border-slate-200 px-4 py-10 text-center">
                <span className="text-3xl">📦</span>
                <p className="mt-3 font-medium">No orders yet</p>
                <p className="mt-1 text-sm text-slate-500">
                  Your order history will appear here.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
