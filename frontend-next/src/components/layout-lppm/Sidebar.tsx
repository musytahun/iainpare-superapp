"use client";

import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, UsersIconLppm, BookOpenIcon, BadgeCheckIcon, NewspaperIcon, MapIcon, DatabaseIcon } from "@/components/icons/Icons";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', to: '/lppm', icon: <HomeIcon /> },
    { name: 'Instrumen Akreditasi', to: '/lppm/instrumen-akreditasi', icon: <BadgeCheckIcon /> },
    { name: 'Sasaran Strategis', to: '/lppm/sasaran-strategis', icon: <NewspaperIcon /> },
    { name: 'Roadmap', to: '/lppm/roadmap', icon: <MapIcon /> },
    { name: 'Database', to: '/lppm/database', icon: <DatabaseIcon /> },
  ];

  return (
    <div className="w-64 bg-teal-800 text-on-primary flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <BookOpenIcon className="h-8 w-8 text-yellow-500" />
          <h1 className="text-xl font-bold tracking-wider text-white">LPPM Jago</h1>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.to ||
            (item.to !== "/lppm" && pathname.startsWith(item.to));
          return (
            <Link
              key={item.name}
              href={item.to}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              {item.icon}
              <span className="ml-4 font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/20 text-center text-xs text-white/60">
        <p>IAIN Parepare</p>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default Sidebar;