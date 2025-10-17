"use client";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ROLES, DELETE_ROLE } from "@/graphql/roles.graphql";
import Link from "next/link";

export default function RoleList() {
  const { data, loading, error } = useQuery(GET_ROLES);
  const [deleteRole] = useMutation(DELETE_ROLE, {
    refetchQueries: [{ query: GET_ROLES }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading roles.</p>;

  const handleDelete = async (id: number | string) => {
    if (confirm("Hapus role ini?")) {
      await deleteRole({ variables: { id: Number(id) } }); // Int cannot represent non-integer values
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Roles</h1>
        <Link href="/settings/roles/create" className="btn btn-primary">
          + Tambah Role
        </Link>
      </div>

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nama Role</th>
            <th className="p-2 border">Permissions</th>
            <th className="p-2 border">Module</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data?.roles?.map((role: any) => (
            <tr key={role.id}>
              <td className="p-2 border">{role.name}</td>
              <td className="p-2 border">
                {role.permissions.map((p: any) => p.name).join(", ")}
              </td>
              <td className="p-2 border">
                {role.modules.map((p: any) => p.name).join(", ")}
              </td>
              <td className="p-2 border text-center">
                <Link href={`/settings/roles/${role.id}`} className="text-blue-600 mr-2">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(role.id)}
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
