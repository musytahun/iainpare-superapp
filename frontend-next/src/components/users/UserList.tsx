"use client";

import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client";
import { USERS, DELETE_USER, UPDATE_USER_ROLE } from "@/graphql/users.graphql";
import { GET_ROLES } from "@/graphql/roles.graphql";
import QueryHandler from "@/components/QueryHandler";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

export default function UserList() {
  const { data, loading, error, refetch } = useQuery(USERS);
  const { data: rolesData } = useQuery(GET_ROLES);
  const [deleteUser] = useMutation(DELETE_USER);
  const [updateUserRole] = useMutation(UPDATE_USER_ROLE, {
    onCompleted: () => refetch(),
  });

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

  const handleRoleChange = async (id: number | string, roleId: number | string) => {
    try {
      await updateUserRole({ variables: { id: Number(id), roleId: Number(roleId) } });
      alert("✅ Role user berhasil diupdate");
    } catch {
      alert("❌ Gagal mengupdate role");
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
                <td className="border px-3 py-2">{index + 1}</td>
                <td className="border px-3 py-2">{user.username}</td>
                <td className="border px-3 py-2">{user.email}</td>
                <td className="border px-3 py-2">{user.fullName}</td>

                {/* Pilihan role */}
                <td className="border px-3 py-2">
                  <select
                    value={user.role?.id || ""}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="">Pilih Role</option>
                    {rolesData?.roles?.map((role: any) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="border px-3 py-2 space-x-2">
                  <Link
                    href={`/users/${user.id}`}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
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
