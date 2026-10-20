
"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import UserMenu from "./UserMenu";


export default function AuthButtons() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("AuthButtons");

  useEffect(() => {
    const supabase = createClient();

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        setRole(profile?.role ?? null);
      }

      setLoading(false);
    }

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);

        if (!session?.user) {
          setRole(null);
        }

        if (session?.user) {
          supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single()
            .then(({ data }) => setRole(data?.role ?? null));
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  function openAuth(mode: "login" | "register") {
    window.dispatchEvent(new CustomEvent("open-auth", { detail: mode }));
  }

  if (loading) {
    return (
      <div className="h-9 w-32 animate-pulse rounded-full bg-gray-100" />
    );
  }

  if (user) {
    return <UserMenu user={user} role={role} />;
  }

  return (
    <div className="flex shrink-0 items-center gap-2 text-sm">
      <button
        type="button"
        onClick={() => openAuth("login")}
        className="text-[#444444] transition hover:text-[#00a99d]"
      >
        {t("login")}
      </button>

      <span className="text-gray-300">/</span>

      <button
        type="button"
        onClick={() => openAuth("register")}
        className="font-medium text-[#444444] transition hover:text-[#00a99d]"
      >
        {t("register")}
      </button>
    </div>
  );
}
