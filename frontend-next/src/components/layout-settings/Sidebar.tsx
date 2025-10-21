"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartBarIcon,
  UsersIcon,
  KeyIcon,
  ShieldCheckIcon,
  CubeIcon,
} from "@/components/icons/Icons";

const baseNavigation = [
  { name: "Dashboard", href: "/settings", icon: ChartBarIcon },
];

const settingsNavigation = [
  { name: "Users", href: "/settings/users", icon: UsersIcon },
  { name: "Roles", href: "/settings/roles", icon: KeyIcon },
  { name: "Permissions", href: "/settings/permissions", icon: ShieldCheckIcon },
  { name: "Modules", href: "/settings/modules", icon: CubeIcon },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  // 🔹 Buat statis: misal modul aktif adalah "Settings"
  const selectedModule = { name: "Settings" };

  const navigation = useMemo(() => {
    if (selectedModule.name === "Settings") {
      return [...baseNavigation, ...settingsNavigation];
    }
    return baseNavigation;
  }, [selectedModule]);

  const navLinkClasses =
    "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors group";
  const activeClass = "bg-teal-500 text-white";
  const inactiveClass =
    "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white";

  return (
    <aside className="flex-col w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden md:flex">
      {/* 🔹 Header/Logo Sidebar */}
      <div className="flex items-center justify-center h-16 border-b border-slate-200 dark:border-slate-700">
        <CubeIcon className="w-8 h-8 text-primary-500" />
        <span className="ml-2 text-xl font-bold text-slate-800 dark:text-white">
          Boilerplate
        </span>
      </div>

      {/* 🔹 Navigasi */}
      <div className="flex-1 overflow-y-auto">
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive =
              item.href === "/settings"
                ? pathname === "/settings" // hanya aktif di /settings
                : pathname.startsWith(item.href); // aktif di /settings/users dsb

            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${navLinkClasses} ${
                  isActive ? activeClass : inactiveClass
                }`}
              >
                <Icon
                  className={`w-6 h-6 mr-3 ${
                    isActive
                      ? "text-white"
                      : "text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
