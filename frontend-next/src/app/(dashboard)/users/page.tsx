"use client";

import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client";
import { client } from "@/lib/apollo-client";
import { useRouter } from "next/navigation";
import { USERS, DELETE_USER } from "@/graphql/users.graphql";
import QueryHandler from "@/components/QueryHandler";
import TableSkeleton from "@/components/skeletons/TableSkeleton";


export default function UsersPage() {
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery(USERS, { client });
  const [deleteUser] = useMutation(DELETE_USER, { client });

  // Handler hapus user
  const handleDelete = async (id: number | string) => {
    if (!confirm("Apakah yakin ingin menghapus user ini?")) return;
    try {
      await deleteUser({ variables: { id: Number(id) } });
      alert("✅ User berhasil dihapus");
      refetch(); // Refresh list user
    } catch (err) {
      console.error(err);
      alert("❌ Gagal menghapus user");
    }
  };

  return (
    <QueryHandler loading={loading} error={error} skeleton={<TableSkeleton rows={6} />}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Daftar User</h1>
          <Link
            href="/users/create"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Tambah User
          </Link>
        </div>

        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">No</th>
              <th className="border px-3 py-2">ID</th>
              <th className="border px-3 py-2">Username</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Fullname</th>
              <th className="border px-3 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.map((user: any, index: number) => (
              <tr key={user.id}>
                <td className="border px-3 py-2">{index + 1}</td>
                <td className="border px-3 py-2">{user.id}</td>
                <td className="border px-3 py-2">{user.username}</td>
                <td className="border px-3 py-2">{user.email}</td>
                <td className="border px-3 py-2">{user.fullName}</td>
                <td className="border px-3 py-2 space-x-2">
                  {/* tombol detail/update */}
                  <Link
                    href={`/users/${user.id}`}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Detail
                  </Link>

                  {/* tombol hapus */}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </QueryHandler>
  );
}
