"use client";

import React from "react";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client";
import { USERS, DELETE_USER } from "@/graphql/users.graphql";
import QueryHandler from "@/components/QueryHandler";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import Permission from "@/components/Permission";
import ActionButtons from "@/components/ui/ActionButtons";

const UsersPage: React.FC = () => {
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
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Users</h1>
            <ActionButtons
              basePath="/settings/users"
              entityName="User"
              permissions={{ create: "user.create" }}
              showCreate
            />
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Fullname
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Avatar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Roles
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800/50 divide-y divide-slate-200 dark:divide-slate-700">
              {data?.users?.map((user: any, index: number) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-700 dark:text-slate-300">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-900 dark:text-slate-100 font-medium">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                    {user.fullName || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                    {user.avatar || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                        <span className="text-gray-400 text-sm italic">No roles</span>
                      )}
                    </div>
                  </td>

                  {/* Tombol aksi di setiap baris tabel: */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <ActionButtons
                      basePath="/settings/users"
                      id={user.id}
                      onDelete={handleDelete}
                      permissions={{
                        update: "user.update",
                        delete: "user.delete",
                      }}
                      showEdit
                      showDelete
                    />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </QueryHandler>
  );
};

export default UsersPage;
