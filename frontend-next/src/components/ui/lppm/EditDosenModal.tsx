import React, { useEffect, useState } from 'react';
import { XIcon } from "@/components/icons/Icons";
import { useQuery } from '@apollo/client';
import { GET_JABATAN_FUNGSIONAL } from '@/graphql/references/jabatan_fungsional.graphql';
import { GET_PANGKAT_GOLONGAN } from '@/graphql/references/pangkat_golongan.graphql';
import { GET_PROGRAM_STUDI } from '@/graphql/references/program_studi.graphql';
import { GET_BIDANG_KEPAKARAN } from '@/graphql/references/bidang_kepakaran.graphql';

interface EditDosenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dosen: Dosen) => void;
  dosen: Dosen;
}

const EditDosenModal: React.FC<EditDosenModalProps> = ({ isOpen, onClose, onSave, dosen }) => {
  const [formData, setFormData] = useState<Dosen>({
      id: dosen?.id || 0,
      name: dosen?.name || '',
      email: dosen?.email || '',
      nomorHp: dosen?.nomorHp || '',
      alamat: dosen?.alamat || '',
      fotoProfil: dosen?.fotoProfil || '',
      nidn: dosen?.nidn || '',
      nip: dosen?.nip || '',
      gelarDepan: dosen?.gelarDepan || '',
      gelarBelakang: dosen?.gelarBelakang || '',
      jabatanFungsionalId: dosen?.jabatanFungsionalId || '',
      pangkatGolonganId: dosen?.pangkatGolonganId || '',
      programStudiId: dosen?.programStudiId || '',
      bidangKepakaranId: dosen?.bidangKepakaranId || '',
      fakultas: dosen?.fakultas?.name || '',
      });

  useEffect(() => {
  if (dosen) {
      setFormData({
      id: dosen.id || 0,
      name: dosen.name || '',
      email: dosen.email || '',
      nomorHp: dosen.nomorHp || '',
      alamat: dosen.alamat || '',
      fotoProfil: dosen.fotoProfil || '',
      nidn: dosen.nidn || '',
      nip: dosen.nip || '',
      gelarDepan: dosen.gelarDepan || '',
      gelarBelakang: dosen.gelarBelakang || '',
      // Ambil ID dari objek relasi
      jabatanFungsionalId: dosen.jabatanFungsional?.id || '',
      pangkatGolonganId: dosen.pangkatGolongan?.id || '',
      programStudiId: dosen.programStudi?.id || '',
      bidangKepakaranId: dosen.bidangKepakaran?.id || '',
      // Ambil nama fakultas dari relasi program studi
      fakultas: dosen.programStudi?.fakultas?.name || '',
      });
  }
  }, [dosen]);

  const { data: jabatanFungsionalData, loading: jabatanFungsionalLoading, error: jabatanFungsionalError } = useQuery(GET_JABATAN_FUNGSIONAL);
  const { data: pangkatGolonganData, loading: pangkatGolonganLoading, error: pangkatGolonganError } = useQuery(GET_PANGKAT_GOLONGAN);
  const { data: programStudiData, loading: programStudiLoading, error: programStudiError } = useQuery(GET_PROGRAM_STUDI);
  const { data: bidangKepakaranData, loading: bidangKepakaranLoading, error: bidangKepakaranError } = useQuery(GET_BIDANG_KEPAKARAN);

  useEffect(() => {
    if (!formData.programStudiId || !programStudiData) return;

    const selectedProdi = programStudiData?.getProgramStudi?.find(
      (p: any) => p.id === formData.programStudiId
    );

    if (selectedProdi && selectedProdi.fakultas) {
      setFormData(prev => ({ ...prev, fakultas: selectedProdi.fakultas.name }));
    } else {
      setFormData(prev => ({ ...prev, fakultas: '' }));
    }
  }, [formData.programStudiId, programStudiData]);

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
            <h3 className="text-xl font-bold text-gray-800">Edit Data Dosen</h3>
            <button type="button" onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
            </div>
            <div>
              <label htmlFor="nidn" className="block text-sm font-medium text-gray-700">NIDN</label>
              <input type="text" name="nidn" id="nidn" value={formData.nidn} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 sm:text-sm cursor-not-allowed" />
            </div>
            <div>
              <label htmlFor="nip" className="block text-sm font-medium text-gray-700">NIP</label>
              <input type="text" name="nip" id="nip" value={formData.nip} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
            </div>
            <div>
              <label htmlFor="gelarDepan" className="block text-sm font-medium text-gray-700">Gelar Depan</label>
              <input type="text" name="gelarDepan" id="gelarDepan" value={formData.gelarDepan} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
            </div>
            <div>
              <label htmlFor="gelarBelakang" className="block text-sm font-medium text-gray-700">Gelar Belakang</label>
              <input type="text" name="gelarBelakang" id="gelarBelakang" value={formData.gelarBelakang} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
            </div>
            <div>
              <label htmlFor="nomorHp" className="block text-sm font-medium text-gray-700">No. HP</label>
              <input type="tel" name="nomorHp" id="nomorHp" value={formData.nomorHp} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
              <textarea name="alamat" id="alamat" value={formData.alamat} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"></textarea>
            </div>
            {/* Column 2 */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Program Studi <span className="text-red-500">*</span>
              </label>

              {programStudiLoading ? (
                <p className="text-slate-500">Memuat data Program Studi...</p>
              ) : programStudiError ? (
                <p className="text-red-500">Gagal memuat data Program Studi</p>
              ) : (
                <select
                  value={formData.programStudiId}
                  onChange={(e) => setFormData({ ...formData, programStudiId: e.target.value })}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  <option key="" value="">-- Pilih Program Studi --</option>
                  {programStudiData?.getProgramStudi?.map((programStudi: any) => (
                    <option key={programStudi.id} value={programStudi.id}>
                      {programStudi.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label htmlFor="fakultas" className="block text-sm font-medium text-gray-700">
                Fakultas
              </label>
              <input
                type="text"
                name="fakultas"
                id="fakultas"
                value={formData.fakultas}
                readOnly
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Jabatan Fungsional <span className="text-red-500">*</span>
              </label>

              {jabatanFungsionalLoading ? (
                <p className="text-slate-500">Memuat data Jabatan Fungsional...</p>
              ) : jabatanFungsionalError ? (
                <p className="text-red-500">Gagal memuat data Jabatan Fungsional</p>
              ) : (
                <select
                  value={formData.jabatanFungsionalId}
                  onChange={(e) => setFormData({ ...formData, jabatanFungsionalId: e.target.value })}
                  className="w-full text-sm text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  <option value="">-- Pilih Jabatan Fungsional --</option>
                  {jabatanFungsionalData?.getJabatanFungsional?.map((jabatanFungsional: any) => (
                    <option key={jabatanFungsional.id} value={jabatanFungsional.id}>
                      {jabatanFungsional.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Pangkat/Golongan <span className="text-red-500">*</span>
              </label>

              {pangkatGolonganLoading ? (
                <p className="text-slate-500">Memuat data Pangkat/Golongan...</p>
              ) : pangkatGolonganError ? (
                <p className="text-red-500">Gagal memuat data Pangkat/Golongan</p>
              ) : (
                <select
                  value={formData.pangkatGolonganId}
                  onChange={(e) => setFormData({ ...formData, pangkatGolonganId: e.target.value })}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  <option value="">-- Pilih Pangkat/Golongan --</option>
                  {pangkatGolonganData?.getPangkatGolongan?.map((pangkatGolongan: any) => (
                    <option key={pangkatGolongan.id} value={pangkatGolongan.id}>
                      {pangkatGolongan.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Bidang Kepakaran <span className="text-red-500">*</span>
              </label>

              {bidangKepakaranLoading ? (
                <p className="text-slate-500">Memuat data Bidang Kepakaran...</p>
              ) : bidangKepakaranError ? (
                <p className="text-red-500">Gagal memuat data Bidang Kepakaran</p>
              ) : (
                <select
                  value={formData.bidangKepakaranId}
                  onChange={(e) => setFormData({ ...formData, bidangKepakaranId: e.target.value })}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  <option value="">-- Pilih Bidang Kepakaran --</option>
                  {bidangKepakaranData?.getBidangKepakaran?.map((bidangKepakaran: any) => (
                    <option key={bidangKepakaran.id} value={bidangKepakaran.id}>
                      {bidangKepakaran.name}
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

export default EditDosenModal;
