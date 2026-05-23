"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitch } from "./theme-switch";
import { metaData } from "../config";
import Image from "next/image";

const navItems = {
  "/blog": { name: "Blog" },
  "/projects": { name: "Projects" },
  "/ask": { name: "Ask AI" },
};

export function Navbar() {
  const pathname = usePathname();
  const compact = pathname === "/ask";

  return (
    <nav className={compact ? "py-2 mb-1 border-b border-neutral-100 dark:border-neutral-800" : "lg:mb-6 py-5"}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Link href="/">
            <Image
              src="/profile.jpg"
              alt="Profile photo"
              className="rounded-full bg-gray-100"
              unoptimized
              width={compact ? 30 : 44}
              height={compact ? 30 : 44}
              priority
            />
          </Link>
          <Link href="/" className={`font-semibold tracking-tight ${compact ? "text-base" : "text-2xl sm:text-3xl"}`}>
            {metaData.title}
          </Link>
        </div>

        <div className="flex flex-row gap-3 md:ml-auto items-center">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              href={path}
              className={`transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative ${compact ? "text-sm" : ""}`}
            >
              {name}
            </Link>
          ))}
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}
