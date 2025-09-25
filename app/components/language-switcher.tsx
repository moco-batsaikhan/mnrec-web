"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher({ alt }: { alt: string }) {
  const pathname = usePathname();
  const currentPath = pathname.replace(/^\/(en|mn)/, "") || "";
  const altHref = `/${alt}${currentPath}`;

  return (
    <Link href={altHref} className="switcher px-4 py-1.5 text-[16px] border border-gray-200">
      {alt.toUpperCase()}
    </Link>
  );
}
