"use client";

import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client";
import { USERS, DELETE_USER } from "@/graphql/users.graphql";
import QueryHandler from "@/components/QueryHandler";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import Permission from "@/components/Permission";

export default function UserList() {
  const { data, loading, error, refetch } = useQuery(USERS);
  const [deleteUser] = useMutation(DELETE_USER);

  const handleDelete = async (id: number | string) => {
    if (!confirm("Apakah yakin ingin menghapus user ini?")) return;
    try {
      await deleteUser({ variables: { id: Number(id) } });
      alert("✅ User berhasil dihapus");
      refetch();
    } catch {
      alert("❌ Gagal menghapus user");
    }
  };

  return (
    <QueryHandler loading={loading} error={error} skeleton={<TableSkeleton rows={6} />}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Daftar User</h1>
          <Permission check="user.create">
          <Link
            href="/users/create"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Tambah User
          </Link>
          </Permission>
        </div>

        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">No</th>
              <th className="border px-3 py-2">Username</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Fullname</th>
              <th className="border px-3 py-2">Role</th>
              <th className="border px-3 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.map((user: any, index: number) => (
              <tr key={user.id}>
                <td className="border px-3 py-2 text-center">{index + 1}</td>
                <td className="border px-3 py-2">{user.username}</td>
                <td className="border px-3 py-2">{user.email}</td>
                <td className="border px-3 py-2">{user.fullName}</td>

                {/* Role badges */}
                <td className="border px-3 py-2">
                  <div className="flex flex-wrap gap-1">
                    {user.roles?.length > 0 ? (
                      user.roles.map((role: any) => (
                        <span
                          key={role.id}
                          className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full"
                        >
                          {role.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm italic">Belum ada role</span>
                    )}
                  </div>
                </td>

                <td className="border px-3 py-2 space-x-2 text-center">
                  {/* Tampilkan Edit jika ada permission user.update */}
                  <Permission check="user.update">
                  <Link
                    href={`/users/${user.id}`}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  </Permission>
                  <Permission check="user.delete">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                  </Permission>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </QueryHandler>
  );
}
