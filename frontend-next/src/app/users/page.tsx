"use client";

import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client";
import { client } from "@/lib/apollo-client";
import { useRouter } from "next/navigation";
import { USERS } from "@/graphql/queries";
import { DELETE_USER } from "@/graphql/mutations";


export default function UsersPage() {
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery(USERS, { client });
  const [deleteUser] = useMutation(DELETE_USER, { client });

  // Handler hapus user
  const handleDelete = async (id: number | string) => {
    if (!confirm("Apakah yakin ingin menghapus user ini?")) return;
    await deleteUser({ variables: { id: Number(id) } });
    alert("✅ User berhasil dihapus");
    refetch(); // refresh list user
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Daftar User</h1>
        <Link
          href="/users/create"
          className="bg-blue-500 text-white px-4 py-2 rounded"
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
          {data.users.map((user: any, index: number) => (
            <tr key={user.id}>
              <td className="border px-3 py-2">{index + 1}</td>
              <td className="border px-3 py-2">{user.id}</td>
              <td className="border px-3 py-2">{user.username}</td>
              <td className="border px-3 py-2">{user.email}</td>
              <td className="border px-3 py-2">{user.fullName}</td>
              <td className="border px-3 py-2 space-x-2">
                {/* tombol detail/update */}
                <Link
                  href={`/users/update?id=${user.id}`}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Detail
                </Link>

                {/* tombol hapus */}
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
