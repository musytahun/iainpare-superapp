import React, { useState } from 'react';
import Select from "react-select";
import { XIcon } from "@/components/icons/Icons";
import { useQuery } from '@apollo/client';
import { GET_TAHUN } from '@/graphql/references/tahun.graphql';
import { GET_POSITION } from '@/graphql/references/position.graphql';

interface AddKegiatanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (publikasi: any) => void;
}

const AddKegiatanModal: React.FC<AddKegiatanModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    keterangan: '',
    tanggal: '',
    tempat: '',
    status: '',
    tahunId: '',
    link: '',
    penanggungJawabId: ''
  });

  const { data: tahunData, loading: tahunLoading, error: tahunError } = useQuery(GET_TAHUN);
  const { data: positionData, loading: positionLoading, error: positionError } = useQuery(GET_POSITION);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.name) {
        alert("Nama Kegiatan wajib diisi.");
        return;
    }
    onSave(formData);
    setFormData({
        name: '',
        keterangan: '',
        tanggal: '',
        tempat: '',
        status: '',
        tahunId: '',
        link: '',
        penanggungJawabId: ''
    }); // Reset form after saving
  };

  if (!isOpen) return null;

  const isFormInvalid = !formData.name;
 

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b bg-white border-gray-200 flex justify-between items-center sticky top-0 bg-surface z-10">
            <h3 className="text-xl font-bold text-gray-800">Tambah Data Kegiatan</h3>
            <button type="button" onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Kegiatan <span className="text-red-500">*</span></label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
            </div>

            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link</label>
              <input type="text" name="link" id="link" value={formData.link} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
            </div>

            <div>
              <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700">Tanggal</label>
              <input type="date" name="tanggal" id="tanggal" value={formData.tanggal} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
            </div>

            <div>
              <label htmlFor="tempat" className="block text-sm font-medium text-gray-700">Tempat</label>
              <input type="text" name="tempat" id="tempat" value={formData.tempat} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Status
              </label>

                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                
                >
                    <option value="">-- Pilih Status --</option>
                    <option value="Tersedia">Tersedia</option>
                    <option value="Dalam Proses">Dalam Proses</option>
                    <option value="Belum Ada">Belum Ada</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Penanggung Jawab <span className="text-red-500">*</span>
                </label>

                {positionLoading ? (
                    <p className="text-slate-500">Memuat data Penanggung Jawab...</p>
                ) : positionError ? (
                    <p className="text-red-500">Gagal memuat data Penanggung Jawab</p>
                ) : (
                    <select
                    name="penanggungJawabId"
                    value={formData.penanggungJawabId}
                    onChange={(e) => setFormData({ ...formData, penanggungJawabId: Number(e.target.value) })}
                    className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                
                    >
                    <option value="">-- Pilih Penanggung Jawab --</option>
                    {positionData?.getposition?.map((position: any) => (
                        <option key={position.id} value={position.id}>
                        {position.name}
                        </option>
                    ))}
                    </select>
                )}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700">keterangan</label>
              <textarea name="keterangan" id="keterangan" value={formData.keterangan} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"></textarea>
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

export default AddKegiatanModal;