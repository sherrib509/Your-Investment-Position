"use client";

import { useEffect, useState } from "react";

if (typeof window !== "undefined") {
  // @ts-ignore
  window.global = window;
  // @ts-ignore
  window.process = window.process || { env: {} };
}

export function ClientInit({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}

