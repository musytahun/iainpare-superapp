"use client";

import React from "react";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ROLES, DELETE_ROLE } from "@/graphql/roles.graphql";
import ActionButtons from "@/components/ui/ActionButtons";

const RolesPage: React.FC = () => {
  const { data, loading, error } = useQuery(GET_ROLES);
  const [deleteRole] = useMutation(DELETE_ROLE, {
    refetchQueries: [{ query: GET_ROLES }],
  });

  const handleDelete = async (id: number | string) => {
    if (confirm("Apakah Anda yakin ingin menghapus role ini?")) {
      await deleteRole({ variables: { id: Number(id) } });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Terjadi kesalahan memuat data.</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Roles</h1>
          <ActionButtons
            basePath="/settings/roles"
            entityName="Role"
            permissions={{ create: "role.create" }}
            showCreate
          />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Modules
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-slate-800/50 divide-y divide-slate-200 dark:divide-slate-700">
            {data?.roles?.map((role: any) => (
              <tr key={role.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                {/* Role name */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200">
                  {role.name}
                </td>

                {/* Permissions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((p: any) => (
                      <span
                        key={p.id}
                        className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full"
                      >
                        {p.name}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Modules */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex flex-wrap gap-1">
                    {role.modules.map((m: any) => (
                      <span
                        key={m.id}
                        className="px-2 py-0.5 bg-blue-100 dark:bg-blue-800/40 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                      >
                        {m.name}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Tombol aksi di setiap baris tabel: */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <ActionButtons
                    basePath="/settings/roles"
                    id={role.id}
                    onDelete={handleDelete}
                    permissions={{
                      update: "role.update",
                      delete: "role.delete",
                    }}
                    showEdit
                    showDelete
                  />
                </td>

              </tr>
            ))}

            {data?.roles?.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-slate-500 dark:text-slate-400">
                  Belum ada data role.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolesPage;
