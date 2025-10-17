"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_MODULE, UPDATE_MODULE, GET_MODULES } from "@/graphql/modules.graphql";
import { GET_ROLES } from "@/graphql/roles.graphql";
import { useRouter } from "next/navigation";

export default function ModuleForm({ module }: { module?: any }) {
  const router = useRouter();
  const { data: rolesData } = useQuery(GET_ROLES);

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
            roleIds: form.roleIds.map((id: any) => parseInt(id, 10)),
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
            roleIds: form.roleIds.map((id: any) => parseInt(id, 10)),
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
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-lg">
      <div>
        <label className="block font-semibold">Name</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Code</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Icon</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
        />
      </div>

      <div>
        <label className="block font-semibold">URL</label>
        <input
        type="text"
        className="border rounded px-3 py-2 w-full"
        value={form.url}
        onChange={(e) => setForm({ ...form, url: e.target.value })}
        />
      </div>

      <div>
        <label className="block font-semibold">Role</label>
        <div className="flex flex-col gap-1">
          {rolesData?.roles?.map((role: any) => (
            <label key={role.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={form.roleIds.includes(String(role.id))}
                onChange={() => handleCheckboxChange(String(role.id))}
              />
              <span>{role.name}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {module ? "Update Module" : "Tambah Module"}
      </button>
    </form>
  );
}
