"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery, gql } from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import LogoutButton from "@/components/LogoutButton";
import { getAccessToken } from "@/lib/auth";
import { USER_MODULES } from "@/graphql/modules.graphql";

// ============================
// Types
// ============================
interface DecodedToken {
  username: string;
  roles: string[];
  exp: number;
}

interface Module {
  id: string;
  name: string;
  code: string;
  roles: { name: string }[];
}

// ============================
// Component
// ============================
export default function MenuPage() {
  const router = useRouter();
  const token = getAccessToken();

  const [user, setUser] = useState<string | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);

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
      setUser(decoded.username);
      setUserRoles(decoded.roles);
    } catch (err) {
      console.error("Invalid token:", err);
      setUser(null);
      router.push("/login");
    }
  }, [token, router]);

  // ============================
  // Filter Modules: hanya role milik user
  // ============================
  const filteredModules = useMemo(() => {
    if (!data?.userModules) return [];

    return data.userModules
      .map((mod: Module) => ({
        ...mod,
        roles: mod.roles
          .map((r) => r.name)
          .filter((rname) => userRoles.includes(rname)),
      }))
      .filter((mod) => mod.roles.length > 0); // tampilkan modul hanya jika ada role yg cocok
  }, [data, userRoles]);

  // ============================
  // Handle Role Select
  // ============================
  const handleSelect = (moduleCode: string, role: string) => {
    localStorage.setItem("activeModule", moduleCode);
    localStorage.setItem("activeRole", role);
    router.push(`/${moduleCode}`);
  };

  // ============================
  // Render
  // ============================
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Memuat menu...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Terjadi kesalahan: {error.message}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Selamat datang, {user ?? "User"}!</h1>
          {userRoles.length > 0 && (
            <p className="text-gray-600">
              Role Anda:{" "}
              <span className="font-semibold">{userRoles.join(", ")}</span>
            </p>
          )}
        </div>
        <LogoutButton />
      </div>

      {filteredModules.length === 0 ? (
        <p className="text-gray-600">
          Anda belum memiliki akses ke modul apa pun.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredModules.map((mod: Module) => (
            <div
              key={mod.code}
              className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
            >
              <h2 className="font-bold text-xl mb-2">{mod.name}</h2>
              <div className="flex flex-wrap gap-2">
                {mod.roles.map((role) => (
                  <button
                    key={role}
                    className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
                    onClick={() => handleSelect(mod.code, role)}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
