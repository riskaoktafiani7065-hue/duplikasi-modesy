"use client"; // Ini wajib, karena menggunakan hook/context client

import Link from "next/link";
import { useModesySettings } from "@/lib/modesy-settings"; // Contoh hook client
// ... import ikon, komponen Panel, EmptyRow, dll.

export default function AdminDashboardClient({ initialData, lang }: { initialData: any, lang: string }) {
  const { t } = useModesySettings(); // Sekarang aman karena ini Client Component
  
  // ... logika UI dan state di sini
  
  return (
    <div>
      {/* Render UI dashboard di sini */}
    </div>
  );
}