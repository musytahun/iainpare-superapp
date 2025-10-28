"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { jwtDecode } from "jwt-decode";
import {
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
} from "@/components/icons/Icons";
import LogoutButton from "@/components/LogoutButton";
import { getAccessToken } from "@/lib/auth";

// ========================================
// Type definitions
// ========================================
interface DecodedToken {
  user_id: number;
  username: string;
  email?: string;
  full_name?: string;
  avatar?: string;
  roles: string[];
  exp: number;
}

const Header: React.FC = () => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [selectedModule, setSelectedModule] = useState<{ name: string } | null>(null);
  const [selectedRole, setSelectedRole] = useState<{ name: string } | null>(null);


  // ========================================
  // Decode JWT token untuk ambil data user
  // ========================================
  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUser(decoded);
    } catch (err) {
      console.error("Invalid token:", err);
      router.push("/login");
    }
  }, [router]);

  // ========================================
  // Ambil module & role aktif dari localStorage
  // ========================================
  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const moduleStorage = localStorage.getItem("activeModule");
    const roleStorage = localStorage.getItem("activeRole");
  
    if (moduleStorage) {
      try {
        const parsed = JSON.parse(moduleStorage);
        setSelectedModule({ name: parsed.name.toUpperCase() });
      } catch {
        setSelectedModule({ name: moduleStorage.toUpperCase() });
      }
    }
  
    if (roleStorage) {
      try {
        const parsed = JSON.parse(roleStorage);
        setSelectedRole({ name: parsed.name.toUpperCase() });
      } catch {
        setSelectedRole({ name: roleStorage.toUpperCase() });
      }
    }
  }, []);

  // ========================================
  // Fungsi ubah modul/role
  // ========================================
  const handleChangeModule = () => {
    setDropdownOpen(false);
    router.push("/gate/menu");
  };

  return (
    <header className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center">
      {/* Kiri: Judul modul/role */}
      <div>
        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          {selectedModule?.name || "No Module"} /{" "}
          <span className="text-primary-500 dark:text-primary-400">
            {selectedRole?.name || "No Role"}
          </span>
        </h1>
      </div>

      {/* Kanan: Tombol tema & user dropdown */}
      <div className="flex items-center space-x-4">
        {/* Toggle tema */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          {theme === "light" ? (
            <MoonIcon className="w-6 h-6 text-slate-600" />
          ) : (
            <SunIcon className="w-6 h-6 text-yellow-400" />
          )}
        </button>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Image
              src={`/${user?.avatar || "default-avatar.png"}`}
              alt={user?.full_name || user?.username || "User"}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="hidden md:inline text-slate-700 dark:text-slate-300">
              {user?.full_name || user?.username || "Unknown User"}
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
                  {user?.full_name || user?.username}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 break-all">
                  {user?.email || "-"}
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
