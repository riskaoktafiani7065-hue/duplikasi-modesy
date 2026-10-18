"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  userId: string;
  currentRole: string;
};

const roles = ["USER", "VENDOR", "MODERATOR", "ADMIN"];

export default function UserRoleForm({ userId, currentRole }: Props) {
  const [role, setRole] = useState(currentRole);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function handleSave() {
    if (role === currentRole) {
      setMessage({ type: "err", text: "Role belum berubah" });
      return;
    }

    setLoading(true);
    setMessage(null);

    const { error } = await supabase
      .from("profiles")
      .update({ role })
      .eq("id", userId);

    if (error) {
      setMessage({ type: "err", text: error.message });
      setLoading(false);
      return;
    }

    setMessage({ type: "ok", text: "Role berhasil diubah" });
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Role User
      </label>

      <div className="flex gap-3">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#00a99d]"
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleSave}
          disabled={loading || role === currentRole}
          className="inline-flex items-center gap-2 rounded-lg bg-[#00a99d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#008f85] disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          Simpan
        </button>
      </div>

      {message && (
        <p
          className={`text-sm ${
            message.type === "ok" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
