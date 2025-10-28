"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_PROGRAM_STUDI,
  CREATE_PROGRAM_STUDI,
  UPDATE_PROGRAM_STUDI,
} from "@/graphql/references/program_studi.graphql";
import { GET_FAKULTAS } from "@/graphql/references/fakultas.graphql";
import { useRouter } from "next/navigation";

export default function ProgramStudiForm({ getProgramStudi }: { getProgramStudi: any }) {
  const router = useRouter();
  const { data: fakultasData, loading: fakultasLoading, error: fakultasError } = useQuery(GET_FAKULTAS);

  const [form, setForm] = useState({
    code: getProgramStudi?.code || "",
    name: getProgramStudi?.name || "",
    fakultasId: getProgramStudi?.fakultas?.id ? String(getProgramStudi.fakultas.id) : "",
  });

  const [createProgramStudi] = useMutation(CREATE_PROGRAM_STUDI, {
    refetchQueries: [{ query: GET_PROGRAM_STUDI }],
    onCompleted: () => router.push("/references/program-studi"),
  });

  const [updateProgramStudi] = useMutation(UPDATE_PROGRAM_STUDI, {
    refetchQueries: [{ query: GET_PROGRAM_STUDI }],
    onCompleted: () => router.push("/references/program-studi"),
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (getProgramStudi) {
        await updateProgramStudi({
          variables: {
            id: Number(getProgramStudi.id),
            code: form.code,
            name: form.name,
            fakultasId: Number(form.fakultasId),
          },
        });
        alert("✅ Data berhasil diperbarui");
      } else {
        await createProgramStudi({
          variables: {
            code: form.code,
            name: form.name,
            fakultasId: Number(form.fakultasId),
          },
        });
        alert("✅ Data berhasil ditambahkan");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan data: " + err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm p-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
        {getProgramStudi ? "Edit Program Studi" : "Tambah Program Studi"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Code */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            required
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            required
          />
        </div>

        {/* Fakultas */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Fakultas <span className="text-red-500">*</span>
          </label>

          {fakultasLoading ? (
            <p className="text-slate-500">Memuat data fakultas...</p>
          ) : fakultasError ? (
            <p className="text-red-500">Gagal memuat data fakultas</p>
          ) : (
            <select
              value={form.fakultasId}
              onChange={(e) => setForm({ ...form, fakultasId: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              required
            >
              <option value="">-- Pilih Fakultas --</option>
              {fakultasData?.getFakultas?.map((fakultas: any) => (
                <option key={fakultas.id} value={fakultas.id}>
                  {fakultas.name}
                </option>
              ))}
            </select>
          )}
        </div>


        {/* Submit */}
        <div className="pt-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => router.push("/references/program-studi")}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
          >
            {getProgramStudi ? "Simpan Perubahan" : "Tambah Data"}
          </button>
        </div>
      </form>
    </div>
  );
}
