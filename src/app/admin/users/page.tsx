import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import RoleBadge from "@/components/admin/RoleBadge";
import { Users as UsersIcon, Eye } from "lucide-react";

type SearchParams = Promise<{ role?: string; q?: string }>;

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const roleFilter = params.role ?? "ALL";
  const query = params.q ?? "";

  const supabase = await createClient();

  let queryBuilder = supabase
    .from("profiles")
    .select("id, email, name, avatar, role, created_at")
    .order("created_at", { ascending: false });

  if (roleFilter !== "ALL") {
    queryBuilder = queryBuilder.eq("role", roleFilter);
  }

  if (query) {
    queryBuilder = queryBuilder.or(
      `email.ilike.%${query}%,name.ilike.%${query}%`
    );
  }

  const { data: users } = await queryBuilder;

  const roles = ["ALL", "USER", "VENDOR", "MODERATOR", "ADMIN"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="mt-1 text-sm text-gray-500">
          Kelola semua user terdaftar
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {roles.map((r) => (
            <Link
              key={r}
              href={`/admin/users${r !== "ALL" ? `?role=${r}` : ""}`}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                roleFilter === r
                  ? "border-[#00a99d] bg-[#00a99d] text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-[#00a99d]/40"
              }`}
            >
              {r}
            </Link>
          ))}
        </div>

        <form method="GET" className="flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Cari nama atau email..."
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#00a99d]"
          />
          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            Cari
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {users && users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">
                    User
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">
                    Bergabung
                  </th>
                  <th className="px-6 py-3 text-right font-semibold text-gray-600">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u: any) => (
                  <tr key={u.id} className="transition hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {u.avatar ? (
                          <img
                            src={u.avatar}
                            alt={u.name || u.email}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#00a99d] to-[#008f85] text-sm font-bold text-white">
                            {(u.name || u.email || "?").charAt(0).toUpperCase()}
                          </span>
                        )}
                        <p className="font-medium text-gray-900">
                          {u.name || "—"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{u.email}</td>
                    <td className="px-6 py-4">
                      <RoleBadge role={u.role} />
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(u.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/users/${u.id}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-200"
                      >
                        <Eye size={14} />
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <UsersIcon size={40} className="mx-auto text-gray-300" />
            <p className="mt-3 text-sm text-gray-500">
              Nggak ada user di filter ini
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
