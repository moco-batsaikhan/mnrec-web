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
    <>
      <GlobalHeader />
      <AdminSidebar />
      <div className={styles.content}>
        <div className="admin-content-box">{children}</div>
      </div>
    </>
  );
}
