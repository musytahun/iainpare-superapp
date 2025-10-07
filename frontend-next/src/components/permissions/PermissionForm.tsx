"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PERMISSIONS, CREATE_PERMISSION, UPDATE_PERMISSION } from "@/graphql/permissions.graphql";
import { useRouter } from "next/navigation";

export default function PermissionForm({ permission }: { permission?: any }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: permission?.name || "",
    code: permission?.code || "",
  });

  const [createPermission] = useMutation(CREATE_PERMISSION, {
    refetchQueries: [{ query: GET_PERMISSIONS }], // tambahkan ini supaya refetch dan ditampilkan jadi tidak perlu reload /permissions
    onCompleted: () => router.push("/permissions"),
  });
  const [updatePermission] = useMutation(UPDATE_PERMISSION, {
    onCompleted: () => router.push("/permissions"),
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (permission) {
      await updatePermission({ variables: { id: Number(permission.id), ...form } });
    } else {
      await createPermission({ variables: form });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label className="block font-semibold">Nama Permission</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="block font-semibold">Code</label>
        <input
          type="text"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          className="input input-bordered w-full"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {permission ? "Update" : "Tambah"}
      </button>
    </form>
  );
}
