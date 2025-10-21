"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { USERS, CREATE_USER, UPDATE_USER } from "@/graphql/users.graphql";
import { GET_ROLES } from "@/graphql/roles.graphql";
import QueryHandler from "@/components/QueryHandler";

export default function UserForm({ user }: { user?: any }) {
  const router = useRouter();
  const { data: rolesData, loading, error } = useQuery(GET_ROLES);

  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    fullName: user?.fullName || "",
    avatar: user?.avatar || "",
    password: "",
    roleIds: user?.roles?.map((r: any) => String(r.id)) || [],
  });

  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: USERS }],
    onCompleted: () => router.push("/settings/users"),
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: USERS }],
    onCompleted: () => router.push("/settings/users"),
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
      if (user) {
        await updateUser({
          variables: {
            id: Number(user.id),
            username: form.username,
            email: form.email,
            fullName: form.fullName,
            avatar: form.avatar,
            roleIds: form.roleIds.map(Number),
          },
        });
        alert("✅ User berhasil diperbarui");
      } else {
        await createUser({
          variables: {
            username: form.username,
            email: form.email,
            fullName: form.fullName,
            avatar: form.avatar,
            password: form.password,
            roleIds: form.roleIds.map(Number),
          },
        });
        alert("✅ User berhasil ditambahkan");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Terjadi kesalahan saat menyimpan user");
    }
  };

  return (
    <QueryHandler loading={loading} error={error}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            {user ? "Edit User" : "Tambah User"}
          </h1>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Username
              </label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            {/* Avatar */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Avatar
              </label>
              <input
                type="text"
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                required
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            {/* Password hanya saat create */}
            {!user && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
              </div>
            )}

            {/* Roles */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Role
              </label>
              <div className="flex flex-wrap gap-3">
                {rolesData?.roles?.map((role: any) => (
                  <label
                    key={role.id}
                    className="flex items-center space-x-2 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={form.roleIds.includes(String(role.id))}
                      onChange={() => handleCheckboxChange(String(role.id))}
                    />
                    <span className="text-slate-800 dark:text-slate-200 text-sm">
                      {role.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => router.push("/settings/users")}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
              >
                {user ? "Update User" : "Tambah User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </QueryHandler>
  );
}
