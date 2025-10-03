"use client";

import { useQuery, useMutation } from "@apollo/client";
import { client } from "@/lib/apollo-client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { GET_USER_BY_ID } from "@/graphql/queries";
import { UPDATE_USER } from "@/graphql/mutations";

export default function UpdateUserPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: Number(id) },
    client,
    skip: !id,
  });

  const [updateUser] = useMutation(UPDATE_USER, { client });

  // state form
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  // isi state setelah data berhasil diambil
  useEffect(() => {
    if (data?.userById) {
      setUsername(data.userById.username || "");
      setEmail(data.userById.email || "");
      setFullName(data.userById.fullName || "");
    }
  }, [data]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error.message}</p>;

  // handler submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // fallback ke nilai lama jika state kosong
    const variables = {
      id: Number(id),
      username: username || data.userById.username,
      email: email || data.userById.email,
      fullName: fullName || data.userById.fullName,
    };

    await updateUser({ variables });
    alert("✅ User berhasil diupdate");
    router.push("/users"); // redirect ke /users
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Update User</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            className="border px-3 py-2 w-full"
            value={username} // controlled
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan username"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="border px-3 py-2 w-full"
            value={email} // controlled
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email"
            required
          />
        </div>

        <div>
          <label className="block mb-1">FullName</label>
          <input
            type="text"
            className="border px-3 py-2 w-full"
            value={fullName} // controlled
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}
