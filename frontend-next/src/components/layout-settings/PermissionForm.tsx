"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  GET_PERMISSIONS,
  CREATE_PERMISSION,
  UPDATE_PERMISSION,
} from "@/graphql/permissions.graphql";
import { useRouter } from "next/navigation";

export default function PermissionForm({ permission }: { permission?: any }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: permission?.name || "",
    code: permission?.code || "",
  });

  const [createPermission, { loading: creating }] = useMutation(CREATE_PERMISSION, {
    refetchQueries: [{ query: GET_PERMISSIONS }],
    onCompleted: () => router.push("/settings/permissions"),
  });

  const [updatePermission, { loading: updating }] = useMutation(UPDATE_PERMISSION, {
    refetchQueries: [{ query: GET_PERMISSIONS }],
    onCompleted: () => router.push("/settings/permissions"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.code) {
      alert("Semua field wajib diisi.");
      return;
    }

    if (permission) {
      await updatePermission({
        variables: { id: Number(permission.id), ...form },
      });
    } else {
      await createPermission({ variables: form });
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          {permission ? "Edit Permission" : "Tambah Permission"}
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm p-6 space-y-5"
      >
        {/* Nama Permission */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Nama Permission
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Masukkan nama permission..."
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        {/* Code Permission */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Code
          </label>
          <input
            type="text"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            placeholder="Masukkan kode permission..."
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push("/settings/permissions")}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={creating || updating}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
          >
            {creating || updating
              ? "Menyimpan..."
              : permission
              ? "Update"
              : "Tambah"}
          </button>
        </div>
      </form>
    </div>
  );
}
