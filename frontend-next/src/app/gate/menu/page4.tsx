// src/app/gate/menu/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { USER_MODULES } from "@/graphql/modules.graphql";
import LogoutButton from "@/components/LogoutButton";

export default function MenuPage() {
  const router = useRouter();
  const { data, loading, error } = useQuery(USER_MODULES);

  if (loading)
    return <div className="p-8 text-center text-gray-500">Loading modules...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load modules: {error.message}
      </div>
    );

  const modules = data?.userModules ?? [];

  const handleSelect = (moduleCode: string, role: string) => {
    localStorage.setItem("activeModule", moduleCode);
    localStorage.setItem("activeRole", role);
    router.push(`/${moduleCode}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Pilih Modul</h1>

      <div className="grid gap-6 md:grid-cols-2 w-full max-w-4xl">
        {modules.map((mod: any) => (
          <div
            key={mod.code}
            className="p-6 bg-white border rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg mb-3 text-gray-800">
              {mod.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {mod.roles.map((role: any) => (
                <button
                  key={role.id}
                  onClick={() => handleSelect(mod.code, role.name)}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium transition"
                >
                  {role.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <LogoutButton />
      </div>
    </div>
  );
}
