"use client";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ROLES, CREATE_ROLE, UPDATE_ROLE } from "@/graphql/roles.graphql";
import { GET_PERMISSIONS } from "@/graphql/permissions.graphql";
import { GET_MODULES } from "@/graphql/modules.graphql";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RoleForm({ role }: { role?: any }) {
  const router = useRouter();

  // --- Ambil data permissions dan modules dari GraphQL ---
  const { data: permData } = useQuery(GET_PERMISSIONS);
  const { data: moduleData } = useQuery(GET_MODULES);

  const [form, setForm] = useState({
    name: role?.name || "",
    permissions: role?.permissions?.map((p: any) => p.id) || [],
    modules: role?.modules?.map((m: any) => m.id) || [],
  });

  // --- Mutasi GraphQL ---
  const [createRole] = useMutation(CREATE_ROLE, {
    refetchQueries: [{ query: GET_ROLES }], // tambahkan ini supaya refetch dan ditampilkan jadi tidak perlu reload /roles
    onCompleted: () => router.push("/settings/roles"),
  });

  const [updateRole] = useMutation(UPDATE_ROLE, {
    onCompleted: () => router.push("/settings/roles"),
  });

  // --- Handle Submit ---
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const variables = {
      name: form.name,
      permissionIds: form.permissions.map((id: any) => parseInt(id, 10)), // ✅ konversi ke Int
      moduleIds: form.modules.map((id: any) => parseInt(id, 10)),
      id: role ? parseInt(role.id, 10) : undefined,
    };
    if (role) await updateRole({ variables });
    else await createRole({ variables });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label className="block font-semibold">Nama Role</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Permissions</label>
        <div className="grid grid-cols-2 gap-2">
          {permData?.permissions?.map((perm: any) => (
            <label key={perm.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={form.permissions.includes(perm.id)}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    permissions: prev.permissions.includes(perm.id)
                      ? prev.permissions.filter((id: any) => id !== perm.id)
                      : [...prev.permissions, perm.id],
                  }))
                }
              />
              <span>{perm.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-2">Modules</label>
        <div className="grid grid-cols-2 gap-2">
          {moduleData?.modules?.map((module: any) => (
            <label key={module.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={form.modules.includes(module.id)}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    modules: prev.modules.includes(module.id)
                      ? prev.modules.filter((id: any) => id !== module.id)
                      : [...prev.modules, module.id],
                  }))
                }
              />
              <span>{module.name}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        {role ? "Update" : "Tambah"}
      </button>
    </form>
  );
}
