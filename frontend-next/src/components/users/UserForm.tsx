"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER, UPDATE_USER, USERS } from "@/graphql/users.graphql";
import { GET_ROLES } from "@/graphql/roles.graphql";
import { useRouter } from "next/navigation";

export default function UserForm({ user }: { user?: any }) {
  const router = useRouter();
  const { data: rolesData } = useQuery(GET_ROLES);

  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    fullName: user?.fullName || "",
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
            roleIds: form.roleIds.map(Number), // ✅
          },
        });
        alert("✅ User berhasil diperbarui");
      } else {
        await createUser({
          variables: {
            username: form.username,
            email: form.email,
            fullName: form.fullName,
            password: form.password,
            roleIds: form.roleIds.map(Number), // ✅ array of int
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
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-lg">
      <div>
        <label className="block font-semibold">Username</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Email</label>
        <input
          type="email"
          className="border rounded px-3 py-2 w-full"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Full Name</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
        />
      </div>

      {!user && (
        <div>
          <label className="block font-semibold">Password</label>
          <input
            type="password"
            className="border rounded px-3 py-2 w-full"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
      )}

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
        {user ? "Update User" : "Tambah User"}
      </button>
    </form>
  );
}
