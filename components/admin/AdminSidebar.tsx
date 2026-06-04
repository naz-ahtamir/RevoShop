"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/orders", label: "Orders", icon: "📦" },
  { href: "/admin/products", label: "Products", icon: "🏷️" },
  { href: "/admin/users", label: "Users", icon: "👥" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-full shrink-0 border-r border-[var(--gray-200)] bg-white lg:w-60">
      <div className="border-b border-[var(--gray-200)] p-5">
        <div className="font-[family-name:var(--font-montserrat)] text-lg font-extrabold uppercase text-[var(--black)]">
          RevoShop
        </div>
        <div className="text-xs text-[var(--gray-500)]">Admin Panel</div>
      </div>
      <nav className="p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-[var(--orange-pale)] text-[var(--orange)]"
                    : "text-[var(--gray-700)] hover:bg-[var(--gray-50)] hover:text-[var(--orange)]"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto border-t border-[var(--gray-200)] p-4">
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--gray-700)] hover:bg-[var(--gray-50)] hover:text-[var(--orange)]"
        >
          <span className="text-lg">👋</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
