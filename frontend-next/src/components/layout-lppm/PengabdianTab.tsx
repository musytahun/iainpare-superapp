"use client";

import { useMutation, useQuery } from '@apollo/client';
import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'lucide-react';
import { SearchIcon, PlusIcon, DownloadIcon, UploadIcon, PencilIcon, TrashIcon } from "@/components/icons/Icons";
import { GET_PENGABDIAN, CREATE_PENGABDIAN, UPDATE_PENGABDIAN, DELETE_PENGABDIAN } from "@/graphql/lppm/pengabdian.graphql";
import AddPengabdianModal from "@/components/ui/lppm/AddPengabdianModal";
import EditPengabdianModal from "@/components/ui/lppm/EditPengabdianModal";
import ConfirmModal from '@/components/shared/ConfirmModal';


const PengabdianTab = () => {

  const { data, loading, error } = useQuery(GET_PENGABDIAN);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [editingPengabdian, setEditingPengabdian] = useState<any | null>(null);
  const [pengabdianToDelete, setPengabdianToDelete] = useState<number | null>(null);
  const [createPengabdian] = useMutation(CREATE_PENGABDIAN, { refetchQueries: [{ query: GET_PENGABDIAN }], }); // refresh tabel otomatis setelah tambah
  const [updatePengabdian] = useMutation(UPDATE_PENGABDIAN, { refetchQueries: [{ query: GET_PENGABDIAN }], });
  const [deletePengabdian] = useMutation(DELETE_PENGABDIAN, { refetchQueries: [{ query: GET_PENGABDIAN }], });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddPengabdian = async (pengabdian: any) => {
    try {
      const variables: any = {
        judul: pengabdian.judul || null,
        ketuaId: pengabdian.ketuaId ? parseInt(pengabdian.ketuaId) : null,
        anggotaIds:
          pengabdian.anggotaIds && pengabdian.anggotaIds.length > 0
            ? pengabdian.anggotaIds.map((id: string | number) => parseInt(id))
            : [],
        keterangan: pengabdian.keterangan || null,
        jumlahDana: pengabdian.jumlahDana || null,
        sumberDanaId: pengabdian.sumberDanaId ? parseInt(pengabdian.sumberDanaId) : null,
        kelompokKeilmuanId: pengabdian.kelompokKeilmuanId ? parseInt(pengabdian.kelompokKeilmuanId) : null,
        jenisKolaborasiId: pengabdian.jenisKolaborasiId ? parseInt(pengabdian.jenisKolaborasiId) : null,
        tahunId: pengabdian.tahunId ? parseInt(pengabdian.tahunId) : null,
        lokasiId: pengabdian.lokasiId ? parseInt(pengabdian.lokasiId) : null
      };
  
      await createPengabdian({ variables });
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Gagal menambah pengabdian:", err);
      alert("Terjadi kesalahan saat menyimpan data pengabdian.");
    }
  };

  const handleEditClick = (pengabdian: any) => {
      setEditingPengabdian(pengabdian);
      setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
      setIsEditModalOpen(false);
      setEditingPengabdian(null);
  };

  const handleUpdatePengabdian = async (pengabdian: any) => {
    try {
      await updatePengabdian({
        variables: {
          id: Number(pengabdian.id),
          judul: pengabdian.judul || null,
          ketuaId: pengabdian.ketuaId ? parseInt(pengabdian.ketuaId) : null,
          anggotaIds:
            pengabdian.anggotaIds && pengabdian.anggotaIds.length > 0
              ? pengabdian.anggotaIds.map((id: string | number) => parseInt(id))
              : [],
          keterangan: pengabdian.keterangan || null,
          jumlahDana: pengabdian.jumlahDana || null,
          sumberDanaId: pengabdian.sumberDanaId ? parseInt(pengabdian.sumberDanaId) : null,
          kelompokKeilmuanId: pengabdian.kelompokKeilmuanId ? parseInt(pengabdian.kelompokKeilmuanId) : null,
          jenisKolaborasiId: pengabdian.jenisKolaborasiId ? parseInt(pengabdian.jenisKolaborasiId) : null,
          tahunId: pengabdian.tahunId ? parseInt(pengabdian.tahunId) : null,
          lokasiId: pengabdian.lokasiId ? parseInt(pengabdian.lokasiId) : null
        },
      });
      handleCloseEditModal();
    } catch (err) {
      console.error("Gagal menambah pengabdian:", err);
      alert("Terjadi kesalahan saat menyimpan data pengabdian.");
    }
  };

  const handleDeleteClick = async (pengabdianId: number | string) => {
    setPengabdianToDelete(pengabdianId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (pengabdianToDelete) {
      try {
        await deletePengabdian({ variables: { id: Number(pengabdianToDelete) } });
        setIsConfirmModalOpen(false);
        setPengabdianToDelete(null);
      } catch (err) {
        console.error("Gagal menghapus pengabdian:", err);
        alert("Terjadi kesalahan saat menghapus data pengabdian.");
      }
    }
  };
  
  const formatCurrency = (amount?: number) => {
      if (typeof amount !== 'number') return '-';
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    }

  const getPengabdian = data?.getPengabdian || [];
  console.log("DATA Pengabdian:", getPengabdian);

  return (
    <>
      <div className="bg-surface p-6 rounded-lg shadow-md">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div className="flex items-center space-x-4 flex-wrap">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari judul atau peneliti..."
                  // value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {/* <select value={yearFilter} onChange={e => setYearFilter(e.target.value)} className="w-full md:w-auto pl-3 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white">
                <option value="">Semua Tahun</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select> */}
              <select onChange={e => setYearFilter(e.target.value)} className="w-full md:w-auto pl-3 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white">
                <option value="">Semua Tahun</option>
                {/* {years.map(y => <option key={y} value={y}>{y}</option>)} */}
              </select>
              {/* <select value={sourceFilter} onChange={e => setSourceFilter(e.target.value)} className="w-full md:w-auto pl-3 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white">
                <option value="">Semua Sumber Dana</option>
                {sources.map(s => <option key={s} value={s}>{s}</option>)}
              </select> */}
              <select onChange={e => setSourceFilter(e.target.value)} className="w-full md:w-auto pl-3 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white">
                <option value="">Semua Sumber Dana</option>
                {/* {sources.map(s => <option key={s} value={s}>{s}</option>)} */}
              </select>
            </div>
          <div className="flex items-center space-x-2">
              {/* <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".csv" className="hidden"/> */}
              {/* <input type="file" accept=".csv" className="hidden"/> */}
              <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-teal-800 rounded-lg hover:bg-primary/90 transition-colors"
              >
                  <PlusIcon className="h-5 w-5" />
                  <span>Tambah</span>
              </button>
              <button 
                  // onClick={handleExportData}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-100 border border-green-200 rounded-lg hover:bg-green-200 transition-colors"
              >
                  <UploadIcon className="h-5 w-5" />
                  <span>Export</span>
              </button>
              <button 
                  // onClick={handleDownloadTemplate}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-teal-800 bg-teal-700/10 border border-teal-900/20 rounded-lg hover:bg-primary/20 transition-colors"
              >
                  <DownloadIcon className="h-5 w-5" />
                  <span>Template</span>
              </button>
              <button 
                  // onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 transition-colors"
              >
                  <DownloadIcon className="h-5 w-5" />
                  <span>Import</span>
              </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Judul Pengabdian</th>
                <th scope="col" className="px-6 py-3">Ketua Pengabdi</th>
                <th scope="col" className="px-6 py-3">Anggota</th>
                <th scope="col" className="px-6 py-3">Lokasi</th>
                <th scope="col" className="px-6 py-3">Sumber Dana</th>
                <th scope="col" className="px-6 py-3">Kelompok Pengabdi</th>
                <th scope="col" className="px-6 py-3">Tahun</th>
                <th scope="col" className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {getPengabdian.map((getPengabdian: any) => (
                <tr key={`${getPengabdian.id}-${getPengabdian.judul}`} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{getPengabdian.judul}</td>
                  <td className="px-6 py-4">{getPengabdian.ketua?.name || "-"}</td>
                  <td className="px-6 py-4">
                    {getPengabdian.anggota?.map((anggota: any) => anggota.name).join(", ") || "-"}
                  </td>
                  <td className="px-6 py-4">{getPengabdian.lokasi?.name || "-"}</td>
                  <td className="px-6 py-4">{getPengabdian.sumberDana?.name || "-"}</td>
                  <td className="px-6 py-4">{getPengabdian.kelompokKeilmuan?.name || "-"}</td>
                  <td className="px-6 py-4">{getPengabdian.tahun?.name || "-"}</td>
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <Link 
                      to={`/lecturers/`} 
                      className="font-medium text-primary hover:underline"
                    >
                      Lihat Detail
                    </Link>
                    <button
                      onClick={() => handleEditClick(getPengabdian)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      aria-label={`Edit ${getPengabdian.judul}`}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(getPengabdian.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                      aria-label={`Hapus ${getPengabdian.judul}`}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Edit Modal */}
      {editingPengabdian && (
          <EditPengabdianModal
              isOpen={isEditModalOpen}
              onClose={handleCloseEditModal}
              onSave={handleUpdatePengabdian}
              pengabdian={editingPengabdian}
          />
      )}

      {/* Add Modal */}
      <AddPengabdianModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddPengabdian}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Konfirmasi Hapus"
          message="Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat diurungkan."
      />
    </>
  );
};

export default PengabdianTab;