"use client";

import React from "react";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MODULES, DELETE_MODULE } from "@/graphql/modules.graphql";
import QueryHandler from "@/components/QueryHandler";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
// import Permission from "@/components/Permission"; // aktifkan jika sistem permission sudah siap
import ActionButtons from "@/components/ui/ActionButtons";

export default function ModulesPage() {
  const { data, loading, error, refetch } = useQuery(GET_MODULES);
  const [deleteModule] = useMutation(DELETE_MODULE);

  const handleDelete = async (id: number | string) => {
    if (!confirm("Apakah yakin ingin menghapus module ini?")) return;
    try {
      await deleteModule({ variables: { id: Number(id) } });
      alert("✅ Module berhasil dihapus");
      refetch();
    } catch {
      alert("❌ Gagal menghapus module");
    }
  };

  return (
    <QueryHandler loading={loading} error={error} skeleton={<TableSkeleton rows={6} />}>
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Modules</h1>
            <ActionButtons
              basePath="/settings/modules"
              entityName="Module"
              permissions={{ create: "module.create" }}
              showCreate
            />
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Module Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Icon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  URL
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
              {data?.modules?.map((module: any, index: number) => (
                <tr
                  key={module.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300 text-center">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {module.icon && (
                        <span className="w-6 h-6 mr-3 text-primary-500">
                          <i className={module.icon}></i>
                        </span>
                      )}
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-200">
                        {module.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                    {module.code}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                    {module.icon || "-"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                    {module.url || "-"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                    {module.roles.length > 0 ? (
                      module.roles.map((role: any) => (
                        <span
                          key={role.id}
                          className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-2 py-1 rounded mr-1 text-xs"
                        >
                          {role.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400 italic">No Roles</span>
                    )}
                  </td>

                  {/* Tombol aksi di setiap baris tabel: */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <ActionButtons
                      basePath="/settings/modules"
                      id={module.id}
                      onDelete={handleDelete}
                      permissions={{
                        update: "module.update",
                        delete: "module.delete",
                      }}
                      showEdit
                      showDelete
                    />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {data?.modules?.length === 0 && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              Tidak ada module.
            </div>
          )}
        </div>
      </div>
    </QueryHandler>
  );
}
