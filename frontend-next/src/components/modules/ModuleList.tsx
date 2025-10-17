"use client";

import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MODULES, DELETE_MODULE } from "@/graphql/modules.graphql";
import QueryHandler from "@/components/QueryHandler";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import Permission from "@/components/Permission";

export default function ModuleList() {
  const { data, loading, error, refetch } = useQuery(GET_MODULES);
  const [deleteModule] = useMutation(DELETE_MODULE);

  const handleDelete = async (id: number | string) => {
    if (!confirm("Apakah yakin ingin menghapus Module ini?")) return;
    try {
      await deleteModule({ variables: { id: Number(id) } });
      alert("✅ Module berhasil dihapus");
      refetch();
    } catch {
      alert("❌ Gagal menghapus Module");
    }
  };

  return (
    <QueryHandler loading={loading} error={error} skeleton={<TableSkeleton rows={6} />}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Daftar Module</h1>
          {/* <Permission check="module.create"> */}
          <Link
            href="/settings/modules/create"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Tambah Module
          </Link>
          {/* </Permission> */}
        </div>

        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">No</th>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Code</th>
              <th className="border px-3 py-2">Icon</th>
              <th className="border px-3 py-2">Url</th>
              <th className="border px-3 py-2">Role</th>
              <th className="border px-3 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data?.modules?.map((module: any, index: number) => (
              <tr key={module.id}>
                <td className="border px-3 py-2 text-center">{index + 1}</td>
                <td className="border px-3 py-2">{module.name}</td>
                <td className="border px-3 py-2">{module.code}</td>
                <td className="border px-3 py-2">{module.icon}</td>
                <td className="border px-3 py-2">{module.url}</td>

                <td className="border px-3 py-2">
                  {module.roles.length > 0 ? (
                    module.roles.map((role: any) => (
                      <span
                        key={role.id}
                        className="bg-gray-200 text-gray-800 px-2 py-1 rounded mr-1 text-sm"
                      >
                        {role.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 italic">No Roles</span>
                  )}
                </td>

                <td className="border px-3 py-2 space-x-2 text-center">
                  {/* Tampilkan Edit jika ada permission module.update */}
                  {/* <Permission check="module.update"> */}
                  <Link
                    href={`/settings/modules/${module.id}`}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  {/* </Permission> */}
                  {/* <Permission check="module.delete"> */}
                  <button
                    onClick={() => handleDelete(module.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                  {/* </Permission> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </QueryHandler>
  );
}
