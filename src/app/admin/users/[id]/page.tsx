import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Calendar, Shield } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import RoleBadge from "@/components/admin/RoleBadge";
import UserRoleForm from "@/components/admin/UserRoleForm";
import { createTranslator } from "@/lib/i18n";
import { getServerLanguage } from "@/lib/i18n-server";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminUserDetailPage({ params }: Props) {
  const { id } = await params;
  const lang = await getServerLanguage();
  const t = createTranslator(lang);
  const locale = lang === "ar" ? "ar-EG" : "id-ID";
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
          {t("Kembali ke Users")}
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
              {t("Informasi Akun")}
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">{t("User ID")}</dt>
                <dd className="font-mono text-xs text-gray-700">{user.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex items-center gap-1 text-gray-500">
                  <Mail size={14} /> {t("Email")}
                </dt>
                <dd className="font-medium text-gray-900">{user.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex items-center gap-1 text-gray-500">
                  <Calendar size={14} /> {t("Bergabung")}
                </dt>
                <dd className="font-medium text-gray-900">
                  {new Date(user.created_at).toLocaleDateString(locale, {
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
                {t("Info Vendor")}
              </h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">{t("Nama Toko")}</dt>
                  <dd className="font-medium text-gray-900">
                    {vendor.shop_name}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">{t("Slug")}</dt>
                  <dd className="font-mono text-xs text-gray-700">
                    {vendor.slug}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">{t("Saldo")}</dt>
                  <dd className="font-medium text-gray-900">
                    Rp {Number(vendor.balance).toLocaleString("id-ID")}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">{t("Status")}</dt>
                  <dd>
                    {vendor.is_verified ? (
                      <span className="text-green-600 font-semibold">
                        {t("Terverifikasi")}
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">
                        {t("Belum Verifikasi")}
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
              {t("Edit Role")}
            </h2>
            <UserRoleForm userId={user.id} currentRole={user.role} />
          </div>
        </div>
      </div>
    </div>
  );
}
