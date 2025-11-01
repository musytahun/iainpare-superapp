"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  GET_INDEKSASI,
  CREATE_INDEKSASI,
  UPDATE_INDEKSASI,
} from "@/graphql/references/indeksasi.graphql";
import { useRouter } from "next/navigation";

export default function IndeksasiForm({ getIndeksasi }: { getIndeksasi: any }) {
  const router = useRouter();

  const [form, setForm] = useState({
    code: getIndeksasi?.code || "",
    name: getIndeksasi?.name || "",
  });

  const [createIndeksasi] = useMutation(CREATE_INDEKSASI, {
    refetchQueries: [{ query: GET_INDEKSASI }],
    onCompleted: () => router.push("/references/jenis-publikasi"),
  });

  const [updateIndeksasi] = useMutation(UPDATE_INDEKSASI, {
    refetchQueries: [{ query: GET_INDEKSASI }],
    onCompleted: () => router.push("/references/jenis-publikasi"),
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (getIndeksasi) {
        await updateIndeksasi({
          variables: {
            id: Number(getIndeksasi.id),
            code: form.code,
            name: form.name,
          },
        });
        alert("✅ Data berhasil diperbarui");
      } else {
        await createIndeksasi({
          variables: {
            code: form.code,
            name: form.name,
          },
        });
        alert("✅ Data berhasil ditambahkan");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Terjadi kesalahan saat menyimpan Data");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm p-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
        {getIndeksasi ? "Edit Jenis Publikasi" : "Tambah Jenis Publikasi"}
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


        {/* Submit */}
        <div className="pt-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => router.push("/references/jenis-publikasi")}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
          >
            {getIndeksasi ? "Simpan Perubahan" : "Tambah Data"}
          </button>
        </div>
      </form>
    </div>
  );
}
