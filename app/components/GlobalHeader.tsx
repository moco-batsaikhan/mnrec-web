"use client";

import { useRouter, usePathname } from "next/navigation";

export default function GlobalHeader() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide header on auth pages (e.g. /auth/login) including locale-prefixed paths like /en/auth/login
  if (pathname && pathname.includes("/auth")) return null;

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      router.push("/auth/login");
    }
  };

  return (
    <header className="global-header bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          <div className="text-lg font-semibold">MNREC</div>
          <div>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Гарах
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
