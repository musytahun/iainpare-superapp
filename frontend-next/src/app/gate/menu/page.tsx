"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { jwtDecode } from "jwt-decode";

import { getAccessToken } from "@/lib/auth";
import { USER_MODULES } from "@/graphql/modules.graphql";
import LogoutButton from "@/components/LogoutButton";
import Modal from "@/components/ui/Modal";

import {
  UsersIcon,
  ChartBarIcon,
  CubeIcon,
  BuildingStorefrontIcon,
  CogIcon,
  KeyIcon,
  ShieldCheckIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon, // default fallback
} from "@/components/icons/Icons";

// peta nama icon string (dari backend) -> komponen React
const ICON_MAP: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  UsersIcon,
  ChartBarIcon,
  CubeIcon,
  BuildingStorefrontIcon,
  CogIcon,
  KeyIcon,
  ShieldCheckIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon, // default fallback
};

// ============================
// Types
// ============================
interface DecodedToken {
  username: string;
  full_name?: string; // optional
  roles: string[];
  exp: number;
}

interface Role {
  id: string;
  name: string;
}

interface Module {
  id: string;
  name: string;
  code: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; // <-- komponen, bukan string
  roles: Role[];
}

// ============================
// Sub Component
// ============================
const ModuleCard: React.FC<{ module: Module; onClick: () => void }> = ({
  module,
  onClick,
}) => {
  console.log("🧩 Rendering:", module.name, "icon:", module.icon);
  const Icon = module.icon || ArrowRightOnRectangleIcon; // fallback
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-lg"
    >
      <Icon className="w-16 h-16 text-slate-500 dark:text-slate-400 group-hover:text-teal-500 dark:group-hover:text-primary-400 transition-colors" />
      <span className="mt-4 text-lg font-semibold text-slate-700 dark:text-slate-200">
        {module.name}
      </span>
    </button>
  );
};

// ============================
// Main Page
// ============================
export default function MenuPage() {
  const router = useRouter();
  const token = getAccessToken();

  const [user, setUser] = useState<string | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const { data, loading, error } = useQuery(USER_MODULES);

  // ============================
  // Decode Token
  // ============================
  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUser(decoded.full_name || decoded.username); // ← ambil full name kalau ada
      setUserRoles(decoded.roles);
      console.log("decoded token:", decoded);
    } catch (err) {
      console.error("Invalid token:", err);
      router.push("/login");
    }
  }, [token, router]);
  

  // ============================
  // Filter modules sesuai role user
  // ============================
  const filteredModules = useMemo(() => {
    if (!data?.userModules) return [];
  
    return data.userModules
      .map((mod: any) => {
        console.log("🟢 Module:", mod.name, "icon:", mod.icon, "=>", !!ICON_MAP[mod.icon]);
        // Ambil string icon dari backend, lalu cocokkan ke ICON_MAP
        const iconKey = mod.icon && ICON_MAP[mod.icon] ? mod.icon : "ArrowRightOnRectangleIcon";
        const IconComponent = ICON_MAP[iconKey];
        console.log("🟢 Icon:", iconKey);
  
        return {
          ...mod,
          // pastikan roles cuma yg sesuai user
          roles: mod.roles?.filter((r: any) => userRoles.includes(r.name)) ?? [],
          // pasang komponen icon, bukan string
          icon: IconComponent,
        } as Module;
      })
      .filter((mod: Module) => mod.roles.length > 0)
      .sort((a: Module, b: Module) => {
        // pastikan "Settings" (atau nama lain seperti "References") selalu terakhir
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
    
        if (aName === "settings" || aName === "references") return -1; // dorong ke akhir
        if (bName === "settings" || bName === "references") return -1;
    
        return aName.localeCompare(bName, "id"); // urutkan abjad (locale Indonesia)
      });
  }, [data, userRoles]);

  // ============================
  // Handle Role Select
  // ============================
  const handleRoleSelect = (role: Role) => {
    if (selectedModule) {
      localStorage.setItem("activeModule", selectedModule.code);
      localStorage.setItem("activeRole", role.name);
      
      setSelectedModule(null);
      router.push(`/${selectedModule.code}`);
    }
  };

  // ============================
  // Render
  // ============================
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Memuat modul...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Terjadi kesalahan: {error.message}</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 p-4 relative">
      {/* Logout */}
      <div className="absolute top-4 right-4">
        <LogoutButton />
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-3xl font-bold text-white">
          {user?.charAt(0)?.toUpperCase() ?? "U"}
        </div>
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
          Selamat datang, {user ?? "User"}!
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          Silakan pilih modul untuk melanjutkan.
        </p>
      </div>

      {/* Modules */}
      {filteredModules.length === 0 ? (
        <p className="text-gray-600">
          Anda belum memiliki akses ke modul apa pun.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl w-full">
          {filteredModules.map((module: Module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onClick={() => setSelectedModule(module)}
            />
          ))}
        </div>
      )}

      {/* Modal Pilih Role */}
      {selectedModule && (
        <Modal
          isOpen={!!selectedModule}
          onClose={() => setSelectedModule(null)}
          title={`Pilih Role untuk ${selectedModule.name}`}
        >
          <div className="flex flex-col space-y-3">
            <p className="text-slate-600 dark:text-slate-400">
              Pilih role yang ingin Anda gunakan di sesi ini.
            </p>
            {selectedModule.roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role)}
                className="w-full text-left p-4 bg-slate-100 dark:bg-slate-700 rounded-md hover:bg-teal-500 hover:text-white dark:hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <h3 className="font-semibold">{role.name}</h3>
              </button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
