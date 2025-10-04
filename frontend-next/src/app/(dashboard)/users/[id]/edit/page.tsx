"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { client } from "@/lib/apollo-client";
import { GET_USER_BY_ID, UPDATE_USER } from "@/graphql/users.graphql";
import QueryHandler from "@/components/QueryHandler";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: Number(id) },
    client,
  });

  const [updateUser] = useMutation(UPDATE_USER, { client });

  // 🧱 state untuk form
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  // isi form dengan data awal user
  useEffect(() => {
    if (data?.userById) {
      setUsername(data.userById.username || "");
      setEmail(data.userById.email || "");
      setFullName(data.userById.fullName || "");
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
        // fallback ke nilai lama jika state kosong
    const variables = {
      id: Number(id),
      username: username,
      email: email,
      fullName: fullName,
    };

    try {
      await updateUser({ variables });
      alert("✅ User berhasil diperbarui");
      router.push(`/users/${id}`); // kembali ke halaman detail
    } catch (err) {
      console.error(err);
      alert("❌ Gagal memperbarui user");
    }
  };

  return (
    <QueryHandler loading={loading} error={error} skeleton={<TableSkeleton rows={6} />}>
      <div className="p-6 max-w-lg">
        <h1 className="text-xl font-bold mb-4">Edit User</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fullname</label>
            <input
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </QueryHandler>
  );
}
