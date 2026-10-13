"use client";

import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

type Mode = "login" | "register" | null;

export default function AuthModals() {
  const [mode, setMode] = useState<Mode>(null);

  useEffect(() => {
    function handleOpen(e: Event) {
      setMode((e as CustomEvent).detail as Mode);
    }
    window.addEventListener("open-auth", handleOpen);
    return () => window.removeEventListener("open-auth", handleOpen);
  }, []);

  return (
    <>
      <LoginModal
        isOpen={mode === "login"}
        onClose={() => setMode(null)}
        onSwitchToRegister={() => setMode("register")}
      />
      <RegisterModal
        isOpen={mode === "register"}
        onClose={() => setMode(null)}
        onSwitchToLogin={() => setMode("login")}
      />
    </>
  );
}
