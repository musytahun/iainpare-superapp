import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { XIcon } from "@/components/icons/Icons";
import { useQuery } from '@apollo/client';
import { GET_PERSON } from '@/graphql/people/person.graphql';
import { GET_SUMBER_DANA } from '@/graphql/references/sumber_dana.graphql';
import { GET_KELOMPOK_RISET } from '@/graphql/references/kelompok_riset.graphql';
import { GET_JENIS_KOLABORASI } from '@/graphql/references/jenis_kolaborasi.graphql';
import { GET_TAHUN } from '@/graphql/references/tahun.graphql';

interface EditPenelitianModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (penelitian: Penelitian) => void;
  penelitian: Penelitian;
}

const EditPenelitianModal: React.FC<EditPenelitianModalProps> = ({ isOpen, onClose, onSave, penelitian }) => {
  const [formData, setFormData] = useState<Penelitian>({
      id: penelitian?.id || 0,
      judul: penelitian?.judul || '',
      keterangan: penelitian?.keterangan || '',
      jumlahDana: penelitian?.jumlahDana || '',
      ketuaPenelitiId: penelitian?.ketuaPenelitiId || '',
      anggotaPenelitiIds: penelitian?.anggotaPenelitiIds || [],
      sumberDanaId: penelitian?.sumberDanaId || '',
      kelompokRisetId: penelitian?.kelompokRisetId || '',
      jenisKolaborasiId: penelitian?.jenisKolaborasiId || '',
      tahunId: penelitian?.tahunId || '',
      });

  useEffect(() => {
  if (penelitian) {
      setFormData({
      id: penelitian.id || 0,
      judul: penelitian.judul || '',
      keterangan: penelitian.keterangan || '',
      jumlahDana: penelitian.jumlahDana || '',
      // Ambil ID dari objek relasi
      ketuaPenelitiId: penelitian.ketuaPeneliti?.id || '',
      anggotaPenelitiIds: penelitian.anggotaPeneliti?.map((person: Person) => person.id) || [],
      sumberDanaId: penelitian.sumberDana?.id || '',
      kelompokRisetId: penelitian.kelompokRiset?.id || '',
      jenisKolaborasiId: penelitian.jenisKolaborasi?.id || '',
      tahunId: penelitian.tahun?.id || '',
      });
  }
  }, [penelitian]);

  const { data: personData, loading: personLoading, error: personError } = useQuery(GET_PERSON);
  const { data: sumberDanaData, loading: sumberDanaLoading, error: sumberDanaError } = useQuery(GET_SUMBER_DANA);
  const { data: kelompokRisetData, loading: kelompokRisetLoading, error: kelompokRisetError } = useQuery(GET_KELOMPOK_RISET);
  const { data: jenisKolaborasiData, loading: jenisKolaborasiLoading, error: jenisKolaborasiError } = useQuery(GET_JENIS_KOLABORASI);
  const { data: tahunData, loading: tahunLoading, error: tahunError } = useQuery(GET_TAHUN);

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
            <h3 className="text-xl font-bold text-gray-800">Tambah Data Penelitian</h3>
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
                    Peneliti (Ketua) <span className="text-red-500">*</span>
                </label>

                {personLoading ? (
                    <p className="text-slate-500">Memuat data Peneliti...</p>
                ) : personError ? (
                    <p className="text-red-500">Gagal memuat data Peneliti</p>
                ) : (
                    <select
                    name="ketuaPenelitiId"
                    value={formData.ketuaPenelitiId}
                    onChange={(e) => setFormData({ ...formData, ketuaPenelitiId: Number(e.target.value) })}
                    className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                
                    >
                    <option value="">-- Pilih Peneliti --</option>
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
                    Anggota Peneliti
                </label>

                {personLoading ? (
                    <p className="text-slate-500">Memuat data peneliti...</p>
                ) : personError ? (
                    <p className="text-red-500">Gagal memuat data peneliti</p>
                ) : (
                    <Select
                    isMulti
                    name="anggotaPenelitiIds"
                    options={personData?.getPerson?.map((person: any) => ({
                        value: person.id,
                        label: person.name,
                    }))}
                    className="basic-multi-select text-sm"
                    classNamePrefix="select"
                    placeholder="Pilih anggota peneliti..."
                    onChange={(selectedOptions) =>
                        setFormData({
                        ...formData,
                        anggotaPenelitiIds: selectedOptions.map((opt: any) => opt.value),
                        })
                    }
                    value={personData?.getPerson
                        ?.filter((d: any) => formData.anggotaPenelitiIds?.includes(d.id))
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
                Kelompok Riset <span className="text-red-500">*</span>
              </label>

              {kelompokRisetLoading ? (
                <p className="text-slate-500">Memuat data Kelompok Riset...</p>
              ) : kelompokRisetError ? (
                <p className="text-red-500">Gagal memuat data Kelompok Riset</p>
              ) : (
                <select
                  value={formData.kelompokRisetId}
                  onChange={(e) => setFormData({ ...formData, kelompokRisetId: e.target.value })}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                
                >
                  <option value="">-- Pilih Kelompok Riset --</option>
                  {kelompokRisetData?.getKelompokRiset?.map((kelompokRiset: any) => (
                    <option key={kelompokRiset.id} value={kelompokRiset.id}>
                      {kelompokRiset.name}
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
            <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-800 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPenelitianModal;
