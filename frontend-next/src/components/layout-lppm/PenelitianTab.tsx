"use client";

import { useMutation, useQuery } from '@apollo/client';
import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'lucide-react';
import { SearchIcon, PlusIcon, DownloadIcon, UploadIcon, PencilIcon, TrashIcon } from "@/components/icons/Icons";
import { GET_PENELITIAN, CREATE_PENELITIAN, UPDATE_PENELITIAN, DELETE_PENELITIAN } from "@/graphql/lppm/penelitian.graphql";
import AddPenelitianModal from "@/components/ui/lppm/AddPenelitianModal";
import EditPenelitianModal from "@/components/ui/lppm/EditPenelitianModal";
import ConfirmModal from '@/components/shared/ConfirmModal';


const PenelitianTab = () => {

  const { data, loading, error } = useQuery(GET_PENELITIAN);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [editingPenelitian, setEditingPenelitian] = useState<any | null>(null);
  const [penelitianToDelete, setPenelitianToDelete] = useState<number | null>(null);
  const [createPenelitian] = useMutation(CREATE_PENELITIAN, { refetchQueries: [{ query: GET_PENELITIAN }], }); // refresh tabel otomatis setelah tambah
  const [updatePenelitian] = useMutation(UPDATE_PENELITIAN, { refetchQueries: [{ query: GET_PENELITIAN }], });
  const [deletePenelitian] = useMutation(DELETE_PENELITIAN, { refetchQueries: [{ query: GET_PENELITIAN }], });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddPenelitian = async (penelitian: any) => {
    try {
      const variables: any = {
        judul: penelitian.judul || null,
        keterangan: penelitian.keterangan || null,
        jumlahDana: penelitian.jumlahDana || null,
        ketuaPenelitiId: penelitian.ketuaPenelitiId ? parseInt(penelitian.ketuaPenelitiId) : null,
        sumberDanaId: penelitian.sumberDanaId ? parseInt(penelitian.sumberDanaId) : null,
        kelompokRisetId: penelitian.kelompokRisetId ? parseInt(penelitian.kelompokRisetId) : null,
        jenisKolaborasiId: penelitian.jenisKolaborasiId ? parseInt(penelitian.jenisKolaborasiId) : null,
        tahunId: penelitian.tahunId ? parseInt(penelitian.tahunId) : null,
        anggotaPenelitiIds:
          penelitian.anggotaPenelitiIds && penelitian.anggotaPenelitiIds.length > 0
            ? penelitian.anggotaPenelitiIds.map((id: string | number) => parseInt(id))
            : [],
      };
  
      await createPenelitian({ variables });
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Gagal menambah penelitian:", err);
      alert("Terjadi kesalahan saat menyimpan data penelitian.");
    }
  };

  const handleEditClick = (penelitian: any) => {
      setEditingPenelitian(penelitian);
      setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
      setIsEditModalOpen(false);
      setEditingPenelitian(null);
  };

  const handleUpdatePenelitian = async (penelitian: any) => {
    try {
      await updatePenelitian({
        variables: {
          id: Number(penelitian.id),
          judul: penelitian.judul || null,
          keterangan: penelitian.keterangan || null,
          jumlahDana: penelitian.jumlahDana || null,
          ketuaPenelitiId: penelitian.ketuaPenelitiId ? parseInt(penelitian.ketuaPenelitiId) : null,
          sumberDanaId: penelitian.sumberDanaId ? parseInt(penelitian.sumberDanaId) : null,
          kelompokRisetId: penelitian.kelompokRisetId ? parseInt(penelitian.kelompokRisetId) : null,
          jenisKolaborasiId: penelitian.jenisKolaborasiId ? parseInt(penelitian.jenisKolaborasiId) : null,
          tahunId: penelitian.tahunId ? parseInt(penelitian.tahunId) : null,
          anggotaPenelitiIds:
            penelitian.anggotaPenelitiIds && penelitian.anggotaPenelitiIds.length > 0
              ? penelitian.anggotaPenelitiIds.map((id: string | number) => parseInt(id))
              : [],
        },
      });
      handleCloseEditModal();
    } catch (err) {
      console.error("Gagal menambah penelitian:", err);
      alert("Terjadi kesalahan saat menyimpan data penelitian.");
    }
  };

  const handleDeleteClick = async (penelitianId: number | string) => {
    setPenelitianToDelete(penelitianId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (penelitianToDelete) {
      try {
        await deletePenelitian({ variables: { id: Number(penelitianToDelete) } });
        setIsConfirmModalOpen(false);
        setPenelitianToDelete(null);
      } catch (err) {
        console.error("Gagal menghapus penelitian:", err);
        alert("Terjadi kesalahan saat menghapus data penelitian.");
      }
    }
  };
  
  const formatCurrency = (amount?: number) => {
      if (typeof amount !== 'number') return '-';
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    }

  const getPenelitian = data?.getPenelitian || [];
  console.log("DATA Penelitian:", getPenelitian);

  return (
    <>
      <div className="bg-surface p-6 rounded-lg shadow-md">
        {/* <AddPenelitianModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleAddPenelitian} /> */}
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
                  <span>Tambah Penelitian</span>
              </button>
              {/* <button onClick={handleExportData} className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-100 border border-green-200 rounded-lg hover:bg-green-200 transition-colors">
                  <DownloadIcon className="h-5 w-5" />
                  <span>Export</span>
              </button>
              <button onClick={handleDownloadTemplate} className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors">
                  <DownloadIcon className="h-5 w-5" />
                  <span>Template</span>
              </button>
              <button onClick={() => fileInputRef.current?.click()} className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 transition-colors">
                  <UploadIcon className="h-5 w-5" />
                  <span>Import</span>
              </button> */}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Judul Penelitian</th>
                <th scope="col" className="px-6 py-3">Ketua Peneliti</th>
                <th scope="col" className="px-6 py-3">Anggota Peneliti</th>
                <th scope="col" className="px-6 py-3">Jumlah Dana</th>
                <th scope="col" className="px-6 py-3">Sumber Dana</th>
                <th scope="col" className="px-6 py-3">Kelompok Riset</th>
                <th scope="col" className="px-6 py-3">Jenis Kolaborasi</th>
                <th scope="col" className="px-6 py-3">Tahun</th>
                <th scope="col" className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {getPenelitian.map((getPenelitian: any) => (
                <tr key={`${getPenelitian.id}-${getPenelitian.judul}`} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{getPenelitian.judul}</td>
                  <td className="px-6 py-4">{getPenelitian.ketuaPeneliti?.name || "-"}</td>
                  <td className="px-6 py-4">
                    {getPenelitian.anggotaPeneliti?.map((anggota: any) => anggota.name).join(", ") || "-"}
                  </td>
                  <td className="px-6 py-4 text-right font-mono">{getPenelitian?.jumlahDana? formatCurrency(Number(getPenelitian.jumlahDana)): "-"}</td>
                  <td className="px-6 py-4">{getPenelitian.sumberDana?.name || "-"}</td>
                  <td className="px-6 py-4">{getPenelitian.kelompokRiset?.name || "-"}</td>
                  <td className="px-6 py-4">{getPenelitian.jenisKolaborasi?.name || "-"}</td>
                  <td className="px-6 py-4">{getPenelitian.tahun?.name || "-"}</td>
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <Link 
                      to={`/lecturers/`} 
                      className="font-medium text-primary hover:underline"
                    >
                      Lihat Detail
                    </Link>
                    <button
                      onClick={() => handleEditClick(getPenelitian)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      aria-label={`Edit ${getPenelitian.judul}`}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(getPenelitian.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                      aria-label={`Hapus ${getPenelitian.judul}`}
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
      {editingPenelitian && (
          <EditPenelitianModal
              isOpen={isEditModalOpen}
              onClose={handleCloseEditModal}
              onSave={handleUpdatePenelitian}
              penelitian={editingPenelitian}
          />
      )}

      {/* Add Modal */}
      <AddPenelitianModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddPenelitian}
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

export default PenelitianTab;