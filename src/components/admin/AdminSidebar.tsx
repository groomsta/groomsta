"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/partners", label: "Partners", icon: "👥" },
  { href: "/admin/bookings", label: "Bookings", icon: "📅" },
  { href: "/admin/payouts", label: "Payouts", icon: "💰" },
  { href: "/admin/services", label: "Services", icon: "✂️" },
  { href: "/admin/categories", label: "Categories", icon: "📁" },
  { href: "/admin/coupons", label: "Coupons", icon: "🎟️" },
  { href: "/admin/logs", label: "System Logs", icon: "📝" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-center">Groomsta Admin</h1>
      </div>
      
      <nav className="space-y-2">
        {ADMIN_NAV.map(item => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 border-t border-gray-700">
        <div className="text-xs text-gray-500 text-center">
          v1.0.0 • Dev 3
        </div>
      </div>
    </aside>
  );
}
