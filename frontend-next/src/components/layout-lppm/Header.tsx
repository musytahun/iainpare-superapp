"use client";

import React, { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { SearchIcon, BellIcon } from "@/components/icons/Icons";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { ChevronDownIcon } from "@/components/icons/Icons";

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pageTitle = useMemo(() => {
    if (pathname === "/") return "Dashboard";
    if (pathname.startsWith("/lecturers/")) return "Profil Dosen";
    if (pathname === "/lppm/database") return "Database";
    if (pathname === "/lppm/instrumen-akreditasi") return "Instrumen Akreditasi";
    if (pathname === "/lppm/sasaran-strategis") return "Sasaran Strategis";
    if (pathname === "/lppm/roadmap") return "Roadmap Penelitian & PkM";
    return "Dashboard";
  }, [pathname]);

  const handleChangeModule = () => {
    setDropdownOpen(false);
    router.push("/gate/menu");
  };

  return (
    <header className="h-20 bg-surface border-b border-gray-200 flex items-center justify-between px-6 lg:px-8">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold text-gray-800">{pageTitle}</h2>
      </div>
      <div className="flex items-center space-x-6">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cari Dosen..."
            className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <BellIcon className="h-6 w-6 text-gray-600" />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        {/* <div className="flex items-center space-x-3">
          <img
            src="https://picsum.photos/id/1/40/40"
            alt="Admin"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">Admin</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div> */}

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <img
              src="https://picsum.photos/id/1/40/40"
              alt="Admin"
              className="h-10 w-10 rounded-full"
            />
            <span className="hidden md:inline text-slate-700 dark:text-slate-300">
              Unknown User
            </span>
            <ChevronDownIcon
              className={`w-5 h-5 text-slate-700 dark:text-slate-300 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg py-1 z-10">
              {/* Profil singkat */}
              <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                <p className="text-sm font-semibold">
                  Admin
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 break-all">
                  Administrator
                </p>
              </div>

              {/* Ganti modul/role */}
              <button
                onClick={handleChangeModule}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-teal-500 hover:text-white dark:hover:bg-primary-600"
              >
                Change Module/Role
              </button>

              {/* Logout */}
              <LogoutButton />
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
