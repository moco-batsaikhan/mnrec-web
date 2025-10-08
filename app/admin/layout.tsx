import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MNREC CMS - Удирдлагын систем",
  description: "MNREC веб сайтын удирдлагын систем",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn">
      <body className="antialiased">{children}</body>
    </html>
  );
}
