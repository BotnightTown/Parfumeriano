'use client';

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export function NavLink({ href, children }: any) {
  const segments = useSelectedLayoutSegments();
  const active = segments.join("/") === href.replace("/", "");

  return (
    <Link
      href={href}
      className={active ? "border-b-2" : ""}
    >
      {children}
    </Link>
  );
}
