"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { jwtDecode } from "jwt-decode";
import { getAccessToken } from "@/lib/auth";

interface DecodedToken {
  username: string;
  roles: string[];
  exp: number;
}

export default function MenuPage() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);

  const modules = [
    { name: "BKD", code: "bkd", roles: ["Dosen", "Reviewer"] },
    { name: "Akademik", code: "akademik", roles: ["Admin"] },
  ];

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUser(decoded.username);
        setRoles(decoded.roles);
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null);
      }
    }
  }, []);

  const handleSelect = (moduleCode: string, role: string) => {
    localStorage.setItem("activeModule", moduleCode);
    localStorage.setItem("activeRole", role);
    router.push(`/${moduleCode}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Selamat datang, {user ?? "User"}!</h1>
          {roles.length > 0 && (
            <p className="text-gray-600">
              Role Anda:{" "}
              <span className="font-semibold">
                {roles.join(", ")}
              </span>
            </p>
          )}
        </div>
        <LogoutButton />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {modules.map((mod) => (
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
    </div>
  );
}
