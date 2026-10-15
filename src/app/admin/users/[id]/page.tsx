import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Calendar, Shield } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import RoleBadge from "@/components/admin/RoleBadge";
import UserRoleForm from "@/components/admin/UserRoleForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminUserDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (!user) notFound();

  // Cek apakah user punya vendor
  const { data: vendor } = await supabase
    .from("vendors")
    .select("id, shop_name, slug, is_verified, balance")
    .eq("user_id", id)
    .single();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-1 text-sm text-gray-500 transition hover:text-[#00a99d]"
        >
          <ArrowLeft size={16} />
          Kembali ke Users
        </Link>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {user.name || user.email}
            </h1>
            <div className="mt-2 flex items-center gap-3">
              <RoleBadge role={user.role} />
              <span className="text-sm text-gray-500">
                {user.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left — Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Info Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-900">
              <Shield size={16} />
              Informasi Akun
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">User ID</dt>
                <dd className="font-mono text-xs text-gray-700">{user.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex items-center gap-1 text-gray-500">
                  <Mail size={14} /> Email
                </dt>
                <dd className="font-medium text-gray-900">{user.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex items-center gap-1 text-gray-500">
                  <Calendar size={14} /> Bergabung
                </dt>
                <dd className="font-medium text-gray-900">
                  {new Date(user.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </dd>
              </div>
            </dl>
          </div>

          {/* Vendor Card */}
          {vendor && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-sm font-bold text-gray-900">
                Info Vendor
              </h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Nama Toko</dt>
                  <dd className="font-medium text-gray-900">
                    {vendor.shop_name}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Slug</dt>
                  <dd className="font-mono text-xs text-gray-700">
                    {vendor.slug}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Saldo</dt>
                  <dd className="font-medium text-gray-900">
                    Rp {Number(vendor.balance).toLocaleString("id-ID")}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Status</dt>
                  <dd>
                    {vendor.is_verified ? (
                      <span className="text-green-600 font-semibold">
                        Terverifikasi
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">
                        Belum Verifikasi
                      </span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>

        {/* Right — Actions */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-sm font-bold text-gray-900">
              Edit Role
            </h2>
            <UserRoleForm userId={user.id} currentRole={user.role} />
          </div>
        </div>
      </div>
    </div>
  );
}
