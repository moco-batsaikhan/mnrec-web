"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  if (pathname && pathname.includes("/auth")) return null;

  const menuItems = [
    {
      title: "Хянах самбар",
      href: "/admin",
      icon: "fas fa-chart-line",
    },
    {
      title: "Мэдээ",
      href: "/admin/news",
      icon: "fas fa-newspaper",
    },
    {
      title: "Хэрэглэгчид",
      href: "/admin/users",
      icon: "fas fa-users",
    },
    {
      title: "Менежментийн баг",
      href: "/admin/team",
      icon: "fas fa-users",
    },
    {
      title: "Холбоо барих",
      href: "/admin/contact",
      icon: "fas fa-envelope",
    },
    {
      title: "Subscribe",
      href: "/admin/newsletter",
      icon: "fas fa-paper-plane",
    },
    
  ];

  return (
    <div className="admin-sidebar bg-white h-full w-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">MNREC Админ</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <i className={`${item.icon} w-5 text-sm`} />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
