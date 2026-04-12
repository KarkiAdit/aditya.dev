"use client";

import { usePathname } from "next/navigation";

import { Navbar } from "@/components/layout/Navbar";

/** Home renders its own overlay navbar with the hero; other routes get an in-flow header. */
export function SiteHeader() {
  const pathname = usePathname();
  if (pathname === "/") {
    return null;
  }
  return <Navbar variant="static" />;
}
