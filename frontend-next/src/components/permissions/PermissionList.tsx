"use client";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PERMISSIONS, DELETE_PERMISSION } from "@/graphql/permissions.graphql";
import Link from "next/link";

export default function PermissionList() {
  const { data, loading, error } = useQuery(GET_PERMISSIONS);
  const [deletePermission] = useMutation(DELETE_PERMISSION, {
    refetchQueries: [{ query: GET_PERMISSIONS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading permissions.</p>;

  const handleDelete = async (id: string) => {
    if (confirm("Hapus permission ini?")) {
      await deletePermission({ variables: { id: Number(id) } }); // Int cannot represent non-integer values
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Permissions</h1>
        <Link href="/permissions/create" className="btn btn-primary">
          + Tambah Permission
        </Link>
      </div>

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Code</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data?.permissions?.map((perm: any) => (
            <tr key={perm.id}>
              <td className="p-2 border">{perm.name}</td>
              <td className="p-2 border">{perm.code}</td>
              <td className="p-2 border text-center">
                <Link href={`/permissions/${perm.id}`} className="text-blue-600 mr-2">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(perm.id)}
                  className="text-red-600"
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
