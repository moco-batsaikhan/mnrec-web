"use client";

import { useEffect, useRef } from "react";

interface BoldBeforeColonProps {
  children: React.ReactNode;
  className?: string;
}

export default function BoldBeforeColon({ children, className }: BoldBeforeColonProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const paragraphs = contentRef.current.querySelectorAll("p");
      
      paragraphs.forEach((p) => {
        const text = p.textContent || "";
        const colonIndex = text.indexOf(":");
        
        if (colonIndex !== -1) {
          const beforeColon = text.substring(0, colonIndex);
          const afterColon = text.substring(colonIndex);
          
          p.innerHTML = `<strong>${beforeColon}</strong>${afterColon}`;
        }
      });
    }
  }, [children]);

  return (
    <div ref={contentRef} className={className}>
      {children}
    </div>
  );
}
