import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "../../lib/auth";
import GlobalHeader from "../components/GlobalHeader";
import AdminSidebar from "./components/AdminSidebar";
import styles from "./admin.module.css";

export const metadata: Metadata = {
  title: "MNREC CMS - Удирдлагын систем",
  description: "MNREC веб сайтын удирдлагын систем",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Server-side check for access token cookie
  const cookieStore = cookies() as any;
  const token = cookieStore.get?.("accessToken")?.value;
  if (!token) {
    redirect("/admin/login");
  }

  try {
    verifyAccessToken(token as string);
  } catch (err) {
    // invalid token
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
        <GlobalHeader />
      </div>

      {/* Fixed Sidebar - Hidden on mobile */}
      <div className="hidden lg:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-40 overflow-y-auto">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 pt-16">
        <main className="p-0">{children}</main>
      </div>
    </div>
  );
}
