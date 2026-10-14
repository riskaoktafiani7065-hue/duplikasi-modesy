import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const supabase = await createClient();

  // Periksa sesi pengguna
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/");
  }

  // Pastikan pengguna memiliki role ADMIN
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || profile?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="admin-shell min-h-screen">
      {/* Sidebar navigasi admin */}
      <AdminSidebar isOpen={true} />

      {/* Konten utama */}
      <div className="admin-main min-h-screen min-w-0">
        <AdminHeader email={user.email ?? "Admin"} />

        <main className="min-w-0 p-3 sm:p-5 lg:p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 bg-white px-5 py-3 text-[10px] text-gray-500">
          <span>
            Copyright © {new Date().getFullYear()} Modesy. All Rights Reserved.
          </span>

          <span>Version 2.7</span>
        </footer>
      </div>
    </div>
  );
}
