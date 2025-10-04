"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import { client } from "@/lib/apollo-client";
import { DELETE_USER, GET_USER_BY_ID, USERS } from "@/graphql/users.graphql";
import QueryHandler from "@/components/QueryHandler";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

export default function UserDetailPage() {
  const { id } = useParams(); // ambil parameter [id]
  const router = useRouter(); // Untuk navigasi setelah hapus
  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: Number(id) },
    client,
    skip: !id, // Hindari query sebelum id tersedia
  });
  
  const [deleteUser] = useMutation(DELETE_USER, {
    client,
    refetchQueries: [{ query: USERS }], // tambahkan ini
    awaitRefetchQueries: true,          // tunggu sampai refetch selesai
  });

  const user = data?.userById;
  const handleDelete = async (userId: number | string) => {
    if (!confirm("Apakah yakin ingin menghapus user ini?")) return;
    try {
      await deleteUser({ variables: { id: Number(userId) } });
      alert("✅ User berhasil dihapus");
      router.push("/users"); // Arahkan balik ke daftar user
    } catch (err) {
      console.error(err);
      alert("❌ Gagal menghapus user");
    }
  };

  return (
    <QueryHandler loading={loading} error={error} skeleton={<TableSkeleton rows={6} />}>
      {!user ? (
        <p className="p-6">User tidak ditemukan</p>
      ) : (
      <div className="p-6 space-y-4">
        <h1 className="text-xl font-bold">Detail User</h1>

        <div className="border p-4 rounded bg-gray-50 space-y-2">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Fullname:</strong> {user.fullName}</p>
        </div>

        <div className="flex space-x-2">
          {/* 🔙 Kembali */}
          <Link
            href="/users"
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Kembali
          </Link>

          {/* ✏️ Edit */}
          <Link
            href={`/users/${user.id}/edit`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit
          </Link>

          {/* ❌ Hapus */}
          <button
            onClick={() => handleDelete(user.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      </div>
      )}
    </QueryHandler>
  );
}
