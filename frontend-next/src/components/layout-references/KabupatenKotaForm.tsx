"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_KABUPATEN_KOTA,
  CREATE_KABUPATEN_KOTA,
  UPDATE_KABUPATEN_KOTA,
} from "@/graphql/references/kabupaten_kota.graphql";
import { GET_PROVINSI } from "@/graphql/references/provinsi.graphql";
import { useRouter } from "next/navigation";

export default function KabupatenKotaForm({ getKabupatenKota }: { getKabupatenKota: any }) {
  const router = useRouter();
  const { data: provinsiData, loading: provinsiLoading, error: provinsiError } = useQuery(GET_PROVINSI);

  const [form, setForm] = useState({
    code: getKabupatenKota?.code || "",
    name: getKabupatenKota?.name || "",
    provinsiId: getKabupatenKota?.provinsi?.id ? String(getKabupatenKota.provinsi.id) : "",
  });

  const [createKabupatenKota] = useMutation(CREATE_KABUPATEN_KOTA, {
    refetchQueries: [{ query: GET_KABUPATEN_KOTA }],
    onCompleted: () => router.push("/references/kabupaten-kota"),
  });

  const [updateKabupatenKota] = useMutation(UPDATE_KABUPATEN_KOTA, {
    refetchQueries: [{ query: GET_KABUPATEN_KOTA }],
    onCompleted: () => router.push("/references/kabupaten-kota"),
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (getKabupatenKota) {
        await updateKabupatenKota({
          variables: {
            id: Number(getKabupatenKota.id),
            code: form.code,
            name: form.name,
            provinsiId: Number(form.provinsiId),
          },
        });
        alert("✅ Data berhasil diperbarui");
      } else {
        await createKabupatenKota({
          variables: {
            code: form.code,
            name: form.name,
            provinsiId: Number(form.provinsiId),
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
        {getKabupatenKota ? "Edit Kabupaten Kota" : "Tambah Kabupaten Kota"}
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

        {/* Provinsi */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Provinsi <span className="text-red-500">*</span>
          </label>

          {provinsiLoading ? (
            <p className="text-slate-500">Memuat data provinsi...</p>
          ) : provinsiError ? (
            <p className="text-red-500">Gagal memuat data provinsi</p>
          ) : (
            <select
              value={form.provinsiId}
              onChange={(e) => setForm({ ...form, provinsiId: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              required
            >
              <option value="">-- Pilih Provinsi --</option>
              {provinsiData?.getProvinsi?.map((provinsi: any) => (
                <option key={provinsi.id} value={provinsi.id}>
                  {provinsi.name}
                </option>
              ))}
            </select>
          )}
        </div>


        {/* Submit */}
        <div className="pt-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => router.push("/references/kabupaten-kota")}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
          >
            {getKabupatenKota ? "Simpan Perubahan" : "Tambah Data"}
          </button>
        </div>
      </form>
    </div>
  );
}
