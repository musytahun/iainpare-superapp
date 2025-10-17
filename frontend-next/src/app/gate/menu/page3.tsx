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

interface Module {
  id: string;
  name: string;
  code: string;
  roles: string[];
}

export default function MenuPage() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUser(decoded.username);
      setRoles(decoded.roles);

      // === Fetch modules yang melekat pada user ===
      const fetchModules = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              query: `
                query {
                  userModules {
                    id
                    name
                    code
                    roles {
                      name
                    }
                  }
                }
              `,
            }),
          });

          const result = await res.json();
          if (result.data && result.data.userModules) {
            const formattedModules = result.data.userModules.map((mod: any) => ({
              id: mod.id,
              name: mod.name,
              code: mod.code,
              roles: mod.roles.map((r: any) => r.name),
            }));
            setModules(formattedModules);
          }
        } catch (err) {
          console.error("Failed to fetch modules:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchModules();
    } catch (error) {
      console.error("Invalid token:", error);
      setUser(null);
      setLoading(false);
    }
  }, [router]);

  const handleSelect = (moduleCode: string, role: string) => {
    localStorage.setItem("activeModule", moduleCode);
    localStorage.setItem("activeRole", role);
    router.push(`/${moduleCode}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Memuat menu...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Selamat datang, {user ?? "User"}!</h1>
          {roles.length > 0 && (
            <p className="text-gray-600">
              Role Anda:{" "}
              <span className="font-semibold">{roles.join(", ")}</span>
            </p>
          )}
        </div>
        <LogoutButton />
      </div>

      {modules.length === 0 ? (
        <p className="text-gray-600">Anda belum memiliki akses ke modul apa pun.</p>
      ) : (
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
      )}
    </div>
  );
}
