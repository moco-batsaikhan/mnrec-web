"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  // Hide sidebar on auth pages including localized paths like /en/auth/login
  if (pathname && pathname.includes("/auth")) return null;

  const menuItems = [
    {
      title: "Хянах самбар",
      href: "/admin",
      icon: "fas fa-chart-line",
    },
    {
      title: "Хэрэглэгчид",
      href: "/admin/users",
      icon: "fas fa-users",
    },
    {
      title: "Мэдээ",
      href: "/admin/news",
      icon: "fas fa-newspaper",
    },
  ];

  return (
    <div className="admin-sidebar bg-white h-screen w-64 fixed left-0 top-0 shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">MNREC Админ</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <i className={`${item.icon} w-5`} />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}