"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_MODULE,
  UPDATE_MODULE,
  GET_MODULES,
} from "@/graphql/modules.graphql";
import { GET_ROLES } from "@/graphql/roles.graphql";
import { useRouter } from "next/navigation";
import QueryHandler from "@/components/QueryHandler";
import TableSkeleton from "@/components/skeletons/TableSkeleton"; // opsional, bisa diganti jika belum ada

export default function ModuleForm({ module }: { module?: any }) {
  const router = useRouter();
  const { data: rolesData, loading, error } = useQuery(GET_ROLES);

  const [form, setForm] = useState({
    name: module?.name || "",
    code: module?.code || "",
    icon: module?.icon || "",
    url: module?.url || "",
    roleIds: module?.roles?.map((r: any) => String(r.id)) || [],
  });

  const [createModule] = useMutation(CREATE_MODULE, {
    refetchQueries: [{ query: GET_MODULES }],
    onCompleted: () => router.push("/settings/modules"),
  });

  const [updateModule] = useMutation(UPDATE_MODULE, {
    refetchQueries: [{ query: GET_MODULES }],
    onCompleted: () => router.push("/settings/modules"),
  });

  const handleCheckboxChange = (roleId: string) => {
    setForm((prev) => {
      const selected = prev.roleIds.includes(roleId)
        ? prev.roleIds.filter((id) => id !== roleId)
        : [...prev.roleIds, roleId];
      return { ...prev, roleIds: selected };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (module) {
        await updateModule({
          variables: {
            id: Number(module.id),
            name: form.name,
            code: form.code,
            icon: form.icon,
            url: form.url,
            roleIds: form.roleIds.map((id) => parseInt(id, 10)),
          },
        });
        alert("✅ Module berhasil diperbarui");
      } else {
        await createModule({
          variables: {
            name: form.name,
            code: form.code,
            icon: form.icon,
            url: form.url,
            roleIds: form.roleIds.map((id) => parseInt(id, 10)),
          },
        });
        alert("✅ Module berhasil ditambahkan");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Terjadi kesalahan saat menyimpan Module");
    }
  };

  return (
    <QueryHandler loading={loading} error={error} skeleton={<TableSkeleton />}>
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
          {module ? "Edit Module" : "Tambah Module"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              required
            />
          </div>

          {/* Code */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              required
            />
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Icon
            </label>
            <input
              type="text"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              placeholder="mis. LucideIcon name"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              URL
            </label>
            <input
              type="text"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="/settings/modules"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>

          {/* Roles */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Roles
            </label>
            <div className="grid grid-cols-2 gap-2">
              {rolesData?.roles?.map((role: any) => (
                <label
                  key={role.id}
                  className="flex items-center space-x-2 text-slate-700 dark:text-slate-300"
                >
                  <input
                    type="checkbox"
                    checked={form.roleIds.includes(String(role.id))}
                    onChange={() => handleCheckboxChange(String(role.id))}
                    className="accent-primary-600"
                  />
                  <span>{role.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => router.push("/settings/modules")}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
            >
              {module ? "Simpan Perubahan" : "Tambah Module"}
            </button>
          </div>
        </form>
      </div>
    </QueryHandler>
  );
}
