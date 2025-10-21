"use client";

import React from "react";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PERMISSIONS, DELETE_PERMISSION } from "@/graphql/permissions.graphql";
import ActionButtons from "@/components/ui/ActionButtons";

export default function PermissionsPage() {
  const { data, loading, error } = useQuery(GET_PERMISSIONS);
  const [deletePermission] = useMutation(DELETE_PERMISSION, {
    refetchQueries: [{ query: GET_PERMISSIONS }],
  });

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus permission ini?")) {
      await deletePermission({ variables: { id: Number(id) } });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-slate-600 dark:text-slate-300">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Terjadi kesalahan saat memuat data.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Permissions</h1>
          <ActionButtons
            basePath="/settings/permissions"
              entityName="Permission"
            permissions={{ create: "permission.create" }}
            showCreate
          />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"
              >
                Permission Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"
              >
                Code
              </th>
              <th
                scope="col"
                className="relative px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-slate-800/50 divide-y divide-slate-200 dark:divide-slate-700">
            {data?.permissions?.map((perm: any) => (
              <tr key={perm.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200">
                  <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full">
                    {perm.name}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                  {perm.code}
                </td>

                {/* Tombol aksi di setiap baris tabel: */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <ActionButtons
                    basePath="/settings/permissions"
                    id={perm.id}
                    onDelete={handleDelete}
                    permissions={{
                      update: "permission.update",
                      delete: "permission.delete",
                    }}
                    showEdit
                    showDelete
                  />
                </td>

              </tr>
            ))}

            {data?.permissions?.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 text-center text-slate-500 dark:text-slate-400 text-sm"
                >
                  Tidak ada data permission.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
