"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PARTNER_NAV = [
  { href: "/partner/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/partner/pricing", label: "My Services", icon: "💰" },
  { href: "/partner/earnings", label: "Earnings", icon: "📈" },
  { href: "/partner/availability", label: "Availability", icon: "⏰" },
  { href: "/partner/profile", label: "Profile", icon: "👤" },
];

export default function PartnerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-green-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-center">Groomsta Partner</h1>
      </div>
      
      <nav className="space-y-2">
        {PARTNER_NAV.map(item => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? "bg-green-600 text-white" 
                  : "text-gray-300 hover:bg-green-800 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 border-t border-green-700">
        <div className="text-xs text-gray-400 text-center">
          Partner Portal v1.0.0
        </div>
      </div>
    </aside>
  );
}
