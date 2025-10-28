"use client";

import React from "react";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client";
import { GET_KABUPATEN_KOTA, DELETE_KABUPATEN_KOTA } from "@/graphql/references/kabupaten_kota.graphql";
import QueryHandler from "@/components/QueryHandler";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
// import Permission from "@/components/Permission"; // aktifkan jika sistem permission sudah siap
import ActionButtons from "@/components/ui/ActionButtons";

export default function KabupatenKotaPage() {
  const { data, loading, error, refetch } = useQuery(GET_KABUPATEN_KOTA);
  const [deleteKabupatenKota] = useMutation(DELETE_KABUPATEN_KOTA);

  const handleDelete = async (id: number | string) => {
    if (!confirm("Apakah yakin ingin menghapus data ini?")) return;
    try {
      const res = await deleteKabupatenKota({ variables: { id: Number(id) } });
      console.log("DELETE RESPONSE:", res);
      alert("✅ data berhasil dihapus");
      refetch();
    } catch (err: any) {
      console.error("DELETE ERROR:", err);
      alert("❌ Gagal menghapus data: " + err.message);
    }
  };

  return (
    <QueryHandler loading={loading} error={error} skeleton={<TableSkeleton rows={6} />}>
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Kabupaten Kota</h1>
            <ActionButtons
              basePath="/references/kabupaten-kota"
              entityName="Kabupaten Kota"
              permissions={{ create: "kabupaten_kota.create" }}
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
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Provinsi
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-slate-800/50 divide-y divide-slate-200 dark:divide-slate-700">
              {data?.getKabupatenKota?.map((getKabupatenKota: any, index: number) => (
                <tr
                  key={getKabupatenKota.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300 text-center">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                    {getKabupatenKota.code}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                    {getKabupatenKota.name}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                    {getKabupatenKota.provinsi?.name || "-"}
                  </td>

                  {/* Tombol aksi di setiap baris tabel: */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <ActionButtons
                      basePath="/references/kabupaten-kota"
                      id={getKabupatenKota.id}
                      onDelete={handleDelete}
                      permissions={{
                        update: "kabupaten_kota.update",
                        delete: "kabupaten_kota.delete",
                      }}
                      showEdit
                      showDelete
                    />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {data?.getKabupatenKota?.length === 0 && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              Tidak ada data.
            </div>
          )}
        </div>
      </div>
    </QueryHandler>
  );
}
