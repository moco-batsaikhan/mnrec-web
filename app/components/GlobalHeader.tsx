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

  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <header className="global-header bg-white shadow-sm border-b w-full h-16">
      <div className={`${isAdminPage ? "px-6" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}`}>
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            <div className="text-xl font-bold text-blue-600">MNREC</div>
            {isAdminPage && (
              <div className="text-sm text-gray-500 border-l border-gray-300 pl-4">
                Удирдлагын систем
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {isAdminPage && <div className="text-sm text-gray-600">Админ хэрэглэгч</div>}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Гарах
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
