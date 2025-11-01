import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { XIcon } from "@/components/icons/Icons";
import { useQuery } from '@apollo/client';
import { GET_PERSON } from '@/graphql/people/person.graphql';
import { GET_SUMBER_DANA } from '@/graphql/references/sumber_dana.graphql';
import { GET_KELOMPOK_KEILMUAN } from '@/graphql/references/kelompok_keilmuan.graphql';
import { GET_JENIS_KOLABORASI } from '@/graphql/references/jenis_kolaborasi.graphql';
import { GET_TAHUN } from '@/graphql/references/tahun.graphql';
import { GET_KABUPATEN_KOTA } from '@/graphql/references/kabupaten_kota.graphql';

interface AddPengabdianModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pengabdian: any) => void;
}

const AddPengabdianModal: React.FC<AddPengabdianModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    judul: '',
    ketuaId: '',
    anggotaIds: [] as number[],
    keterangan: '',
    jumlahDana: '',
    sumberDanaId: '',
    kelompokKeilmuanId: '',
    jenisKolaborasiId: '',
    tahunId: '',
    lokasiId: '',
  });

  const { data: personData, loading: personLoading, error: personError } = useQuery(GET_PERSON);
  const { data: sumberDanaData, loading: sumberDanaLoading, error: sumberDanaError } = useQuery(GET_SUMBER_DANA);
  const { data: kelompokKeilmuanData, loading: kelompokKeilmuanLoading, error: kelompokKeilmuanError } = useQuery(GET_KELOMPOK_KEILMUAN);
  const { data: jenisKolaborasiData, loading: jenisKolaborasiLoading, error: jenisKolaborasiError } = useQuery(GET_JENIS_KOLABORASI);
  const { data: tahunData, loading: tahunLoading, error: tahunError } = useQuery(GET_TAHUN);
  const { data: kabupatenKotaData, loading: kabupatenKotaLoading, error: kabupatenKotaError } = useQuery(GET_KABUPATEN_KOTA);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.judul) {
        alert("Judul wajib diisi.");
        return;
    }
    onSave(formData);
    setFormData({
        judul: '',
        ketuaId: '',
        anggotaIds: [] as number[],
        keterangan: '',
        jumlahDana: '',
        sumberDanaId: '',
        kelompokKeilmuanId: '',
        jenisKolaborasiId: '',
        tahunId: '',
        lokasiId: '',
    }); // Reset form after saving
  };

  if (!isOpen) return null;

  const isFormInvalid = !formData.judul;
 

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b bg-white border-gray-200 flex justify-between items-center sticky top-0 bg-surface z-10">
            <h3 className="text-xl font-bold text-gray-800">Tambah Data Pengabdian</h3>
            <button type="button" onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="judul" className="block text-sm font-medium text-gray-700">Judul <span className="text-red-500">*</span></label>
              <input type="text" name="judul" id="judul" value={formData.judul} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Pengabdi (Ketua) <span className="text-red-500">*</span>
                </label>

                {personLoading ? (
                    <p className="text-slate-500">Memuat data Pengabdi...</p>
                ) : personError ? (
                    <p className="text-red-500">Gagal memuat data Pengabdi</p>
                ) : (
                    <select
                    name="ketuaId"
                    value={formData.ketuaId}
                    onChange={(e) => setFormData({ ...formData, ketuaId: Number(e.target.value) })}
                    className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                
                    >
                    <option value="">-- Pilih Pengabdi --</option>
                    {personData?.getPerson?.map((person: any) => (
                        <option key={person.id} value={person.id}>
                        {person.name}
                        </option>
                    ))}
                    </select>
                )}
            </div>

            <div>
              <label htmlFor="jumlahDana" className="block text-sm font-medium text-gray-700">Jumlah Dana <span className="text-red-500">*</span></label>
              <input type="text" name="jumlahDana" id="jumlahDana" value={formData.jumlahDana} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700">keterangan</label>
              <textarea name="keterangan" id="keterangan" value={formData.keterangan} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"></textarea>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Anggota Pengabdi
                </label>

                {personLoading ? (
                    <p className="text-slate-500">Memuat data Pengabdi...</p>
                ) : personError ? (
                    <p className="text-red-500">Gagal memuat data Pengabdi</p>
                ) : (
                    <Select
                    isMulti
                    name="anggotaIds"
                    options={personData?.getPerson?.map((person: any) => ({
                        value: person.id,
                        label: person.name,
                    }))}
                    className="basic-multi-select text-sm"
                    classNamePrefix="select"
                    placeholder="Pilih anggota Pengabdi..."
                    onChange={(selectedOptions) =>
                        setFormData({
                        ...formData,
                        anggotaIds: selectedOptions.map((opt: any) => opt.value),
                        })
                    }
                    value={personData?.getPerson
                        ?.filter((d: any) => formData.anggotaIds?.includes(d.id))
                        .map((d: any) => ({ value: d.id, label: d.name })) || []}
                    />
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Sumber Dana <span className="text-red-500">*</span>
              </label>

              {sumberDanaLoading ? (
                <p className="text-slate-500">Memuat data Sumber Dana...</p>
              ) : sumberDanaError ? (
                <p className="text-red-500">Gagal memuat data Sumber Dana</p>
              ) : (
                <select
                  value={formData.sumberDanaId}
                  onChange={(e) => setFormData({ ...formData, sumberDanaId: e.target.value })}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                
                >
                  <option value="">-- Pilih Sumber Dana --</option>
                  {sumberDanaData?.getSumberDana?.map((sumberDana: any) => (
                    <option key={sumberDana.id} value={sumberDana.id}>
                      {sumberDana.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Kelompok Keilmuan <span className="text-red-500">*</span>
              </label>

              {kelompokKeilmuanLoading ? (
                <p className="text-slate-500">Memuat data Kelompok Keilmuan...</p>
              ) : kelompokKeilmuanError ? (
                <p className="text-red-500">Gagal memuat data Kelompok Keilmuan</p>
              ) : (
                <select
                  value={formData.kelompokKeilmuanId}
                  onChange={(e) => setFormData({ ...formData, kelompokKeilmuanId: e.target.value })}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                
                >
                  <option value="">-- Pilih Kelompok Keilmuan --</option>
                  {kelompokKeilmuanData?.getKelompokKeilmuan?.map((kelompokKeilmuan: any) => (
                    <option key={kelompokKeilmuan.id} value={kelompokKeilmuan.id}>
                      {kelompokKeilmuan.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Jenis Kolaborasi <span className="text-red-500">*</span>
              </label>

              {jenisKolaborasiLoading ? (
                <p className="text-slate-500">Memuat data Jenis Kolaborasi...</p>
              ) : jenisKolaborasiError ? (
                <p className="text-red-500">Gagal memuat data Jenis Kolaborasi</p>
              ) : (
                <select
                  value={formData.jenisKolaborasiId}
                  onChange={(e) => setFormData({ ...formData, jenisKolaborasiId: e.target.value })}
                  className="w-full text-sm text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                
                >
                  <option value="">-- Pilih Jenis Kolaborasi --</option>
                  {jenisKolaborasiData?.getJenisKolaborasi?.map((jenisKolaborasi: any) => (
                    <option key={jenisKolaborasi.id} value={jenisKolaborasi.id}>
                      {jenisKolaborasi.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Lokasi <span className="text-red-500">*</span>
              </label>

              {kabupatenKotaLoading ? (
                <p className="text-slate-500">Memuat data Lokasi...</p>
              ) : kabupatenKotaError ? (
                <p className="text-red-500">Gagal memuat data Lokasi</p>
              ) : (
                <select
                  value={formData.lokasiId}
                  onChange={(e) => setFormData({ ...formData, lokasiId: e.target.value })}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                
                >
                  <option value="">-- Pilih Lokasi --</option>
                  {kabupatenKotaData?.getKabupatenKota?.map((lokasi: any) => (
                    <option key={lokasi.id} value={lokasi.id}>
                      {lokasi.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Tahun <span className="text-red-500">*</span>
              </label>

              {tahunLoading ? (
                <p className="text-slate-500">Memuat data Tahun...</p>
              ) : tahunError ? (
                <p className="text-red-500">Gagal memuat data Tahun</p>
              ) : (
                <select
                  value={formData.tahunId}
                  onChange={(e) => setFormData({ ...formData, tahunId: e.target.value })}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                
                >
                  <option value="">-- Pilih Tahun --</option>
                  {tahunData?.getTahun?.map((tahun: any) => (
                    <option key={tahun.id} value={tahun.id}>
                      {tahun.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3 sticky bottom-0 z-10">
            <button type="button" onClick={onClose} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Batal
            </button>
            <button 
              type="submit" 
              disabled={isFormInvalid}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-800 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPengabdianModal;