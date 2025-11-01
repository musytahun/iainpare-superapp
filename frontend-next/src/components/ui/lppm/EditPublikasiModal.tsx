import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { XIcon } from "@/components/icons/Icons";
import { useQuery } from '@apollo/client';
import { GET_PERSON } from '@/graphql/people/person.graphql';
import { GET_INDEKSASI } from '@/graphql/references/indeksasi.graphql';
import { GET_KELOMPOK_KEILMUAN } from '@/graphql/references/kelompok_keilmuan.graphql';
import { GET_TAHUN } from '@/graphql/references/tahun.graphql';
import { GET_PENERBIT } from '@/graphql/references/penerbit.graphql';
import { GET_KARYA_ILMIAH } from '@/graphql/references/karya_ilmiah.graphql';

interface EditPublikasiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (publikasi: Publikasi) => void;
  publikasi: Publikasi;
}

const EditPublikasiModal: React.FC<EditPublikasiModalProps> = ({ isOpen, onClose, onSave, publikasi }) => {
  const [formData, setFormData] = useState<Publikasi>({
      id: publikasi?.id || 0,
      judul: publikasi?.judul || '',
      ketuaId: publikasi?.ketuaId || '',
      anggotaIds: publikasi?.anggotaIds || [],
      keterangan: publikasi?.keterangan || '',
      kelompokKeilmuanId: publikasi?.kelompokKeilmuanId || '',
      indeksasiId: publikasi?.indeksasiId || '',
      penerbitId: publikasi?.penerbitId || '',
      noRegis: publikasi?.noRegis || '',
      tahunId: publikasi?.tahunId || '',
      link: publikasi?.link || '',
      karyaIlmiahId: publikasi?.karyaIlmiahId || '',
      });
//  console.log("formData", formData);
  useEffect(() => {
  if (publikasi) {
      setFormData({
      id: publikasi.id || 0,
      judul: publikasi.judul || '',
      ketuaId: publikasi.ketua?.id || '',
      anggotaIds: publikasi.anggota?.map((person: Person) => person.id) || [],
      keterangan: publikasi.keterangan || '',
      kelompokKeilmuanId: publikasi.kelompokKeilmuan?.id || '',
      indeksasiId: publikasi.indeksasi?.id || '',
      penerbitId: publikasi.penerbit?.id || '',
      noRegis: publikasi.noRegis || '',
      tahunId: publikasi.tahun?.id || '',
      link: publikasi.link || '',
      karyaIlmiahId: publikasi.karyaIlmiah?.id || '',
      });
  }
  }, [publikasi]);

  const { data: personData, loading: personLoading, error: personError } = useQuery(GET_PERSON);
  const { data: indeksasiData, loading: indeksasiLoading, error: indeksasiError } = useQuery(GET_INDEKSASI);
  const { data: kelompokKeilmuanData, loading: kelompokKeilmuanLoading, error: kelompokKeilmuanError } = useQuery(GET_KELOMPOK_KEILMUAN);
  const { data: penerbitData, loading: penerbitLoading, error: penerbitError } = useQuery(GET_PENERBIT);
  const { data: tahunData, loading: tahunLoading, error: tahunError } = useQuery(GET_TAHUN);
  const { data: karyaIlmiahData, loading: karyaIlmiahLoading, error: karyaIlmiahError } = useQuery(GET_KARYA_ILMIAH);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b bg-white border-gray-200 flex justify-between items-center sticky top-0 bg-surface z-10">
            <h3 className="text-xl font-bold text-gray-800">Edit Data Publikasi</h3>
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
                    Penulis (Ketua)
                </label>

                {personLoading ? (
                    <p className="text-slate-500">Memuat data Penulis...</p>
                ) : personError ? (
                    <p className="text-red-500">Gagal memuat data Penulis</p>
                ) : (
                    <select
                    name="ketuaId"
                    value={formData.ketuaId}
                    onChange={(e) => setFormData({ ...formData, ketuaId: Number(e.target.value) })}
                    className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                
                    >
                    <option value="">-- Pilih Penulis --</option>
                    {personData?.getPerson?.map((person: any) => (
                        <option key={person.id} value={person.id}>
                        {person.name}
                        </option>
                    ))}
                    </select>
                )}
            </div>

            <div>
              <label htmlFor="noRegis" className="block text-sm font-medium text-gray-700">No. Regis</label>
              <input type="text" name="noRegis" id="noRegis" value={formData.noRegis} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
            </div>
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link</label>
              <input type="text" name="link" id="link" value={formData.link} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700">keterangan</label>
              <textarea name="keterangan" id="keterangan" value={formData.keterangan} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"></textarea>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Anggota Penulis
                </label>

                {personLoading ? (
                    <p className="text-slate-500">Memuat data Penulis...</p>
                ) : personError ? (
                    <p className="text-red-500">Gagal memuat data Penulis</p>
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
                    placeholder="Pilih anggota Penulis..."
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
                Indeksasi
              </label>

              {indeksasiLoading ? (
                <p className="text-slate-500">Memuat data Indeksasi...</p>
              ) : indeksasiError ? (
                <p className="text-red-500">Gagal memuat data Indeksasi</p>
              ) : (
                <select
                  value={formData.indeksasiId}
                  onChange={(e) => setFormData({ ...formData, indeksasiId: e.target.value })}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                
                >
                  <option value="">-- Pilih Indeksasi --</option>
                  {indeksasiData?.getindeksasi?.map((indeksasi: any) => (
                    <option key={indeksasi.id} value={indeksasi.id}>
                      {indeksasi.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Kajian
              </label>

              {kelompokKeilmuanLoading ? (
                <p className="text-slate-500">Memuat data Kajian...</p>
              ) : kelompokKeilmuanError ? (
                <p className="text-red-500">Gagal memuat data Kajian</p>
              ) : (
                <select
                  value={formData.kelompokKeilmuanId}
                  onChange={(e) => setFormData({ ...formData, kelompokKeilmuanId: e.target.value })}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                
                >
                  <option value="">-- Pilih Kajian --</option>
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
                Penerbit
              </label>

              {penerbitLoading ? (
                <p className="text-slate-500">Memuat data Penerbit...</p>
              ) : penerbitError ? (
                <p className="text-red-500">Gagal memuat data Penerbit</p>
              ) : (
                <select
                  value={formData.penerbitId}
                  onChange={(e) => setFormData({ ...formData, penerbitId: e.target.value })}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                
                >
                  <option value="">-- Pilih Penerbit --</option>
                  {penerbitData?.getPenerbit?.map((penerbit: any) => (
                    <option key={penerbit.id} value={penerbit.id}>
                      {penerbit.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Jenis Karya Ilmiah
              </label>

              {karyaIlmiahLoading ? (
                <p className="text-slate-500">Memuat data Jenis Karya Ilmiah...</p>
              ) : karyaIlmiahError ? (
                <p className="text-red-500">Gagal memuat data Jenis Karya Ilmiah</p>
              ) : (
                <select
                  value={formData.karyaIlmiahId}
                  onChange={(e) => setFormData({ ...formData, karyaIlmiahId: e.target.value })}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                
                >
                  <option value="">-- Pilih Jenis Karya Ilmiah --</option>
                  {karyaIlmiahData?.getKaryaIlmiah?.map((karyaIlmiah: any) => (
                    <option key={karyaIlmiah.id} value={karyaIlmiah.id}>
                      {karyaIlmiah.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Tahun
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
            <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-800 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPublikasiModal;
