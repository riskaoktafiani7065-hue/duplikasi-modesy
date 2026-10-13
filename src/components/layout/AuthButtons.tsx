"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AuthButtons() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  function openAuth(mode: "login" | "register") {
    window.dispatchEvent(new CustomEvent("open-auth", { detail: mode }));
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return <div className="h-9 w-32 animate-pulse rounded bg-gray-100" />;
  }

  if (user) {
    return (
      <div className="flex shrink-0 items-center gap-3">
        <span className="text-sm text-[#444444]">
          Hi, {user.user_metadata?.name || user.email?.split("@")[0]}
        </span>
        <button
          type="button"
          onClick={handleLogout}
          className="text-sm font-medium text-[#444444] transition hover:text-[#2563ff]"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-2 text-sm">
      <button
        type="button"
        onClick={() => openAuth("login")}
        className="text-[#444444] transition hover:text-[#2563ff]"
      >
        Login
      </button>
      <span className="text-gray-300">/</span>
      <button
        type="button"
        onClick={() => openAuth("register")}
        className="font-medium text-[#444444] transition hover:text-[#2563ff]"
      >
        Register
      </button>
    </div>
  );
}
