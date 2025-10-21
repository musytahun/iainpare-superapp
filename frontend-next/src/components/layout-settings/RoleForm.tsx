"use client";

import { useMutation, useQuery } from "@apollo/client";
import { GET_ROLES, CREATE_ROLE, UPDATE_ROLE } from "@/graphql/roles.graphql";
import { GET_PERMISSIONS } from "@/graphql/permissions.graphql";
import { GET_MODULES } from "@/graphql/modules.graphql";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RoleForm({ role }: { role?: any }) {
  const router = useRouter();

  // --- Fetch data dari GraphQL ---
  const { data: permData, loading: permLoading } = useQuery(GET_PERMISSIONS);
  const { data: moduleData, loading: moduleLoading } = useQuery(GET_MODULES);

  const [form, setForm] = useState({
    name: role?.name || "",
    permissions: role?.permissions?.map((p: any) => p.id) || [],
    modules: role?.modules?.map((m: any) => m.id) || [],
  });

  // --- Mutation setup ---
  const [createRole] = useMutation(CREATE_ROLE, {
    refetchQueries: [{ query: GET_ROLES }],
    onCompleted: () => router.push("/settings/roles"),
  });

  const [updateRole] = useMutation(UPDATE_ROLE, {
    onCompleted: () => router.push("/settings/roles"),
  });

  // --- Handle Submit ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const variables = {
      name: form.name,
      permissionIds: form.permissions.map((id) => parseInt(id, 10)),
      moduleIds: form.modules.map((id) => parseInt(id, 10)),
      id: role ? parseInt(role.id, 10) : undefined,
    };

    if (role) await updateRole({ variables });
    else await createRole({ variables });
  };

  // --- Loading state ---
  if (permLoading || moduleLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 space-y-6"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
        {role ? "Edit Role" : "Tambah Role"}
      </h2>

      {/* Role Name */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Nama Role
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Contoh: Administrator"
          required
          className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Permissions */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Permissions
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {permData?.permissions?.map((perm: any) => {
            const checked = form.permissions.includes(perm.id);
            return (
              <label
                key={perm.id}
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer border ${
                  checked
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/40"
                    : "border-slate-300 dark:border-slate-600"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      permissions: checked
                        ? prev.permissions.filter((id) => id !== perm.id)
                        : [...prev.permissions, perm.id],
                    }))
                  }
                  className="accent-primary-600"
                />
                <span className="text-slate-700 dark:text-slate-200 text-sm">
                  {perm.name}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Modules */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Modules
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {moduleData?.modules?.map((mod: any) => {
            const checked = form.modules.includes(mod.id);
            return (
              <label
                key={mod.id}
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer border ${
                  checked
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/40"
                    : "border-slate-300 dark:border-slate-600"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      modules: checked
                        ? prev.modules.filter((id) => id !== mod.id)
                        : [...prev.modules, mod.id],
                    }))
                  }
                  className="accent-blue-600"
                />
                <span className="text-slate-700 dark:text-slate-200 text-sm">
                  {mod.name}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/settings/roles")}
          className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
        >
          {role ? "Simpan Perubahan" : "Tambah Role"}
        </button>
      </div>
    </form>
  );
}
