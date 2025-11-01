"use client";

import { useMutation, useQuery } from '@apollo/client';
import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'lucide-react';
import { SearchIcon, PlusIcon, DownloadIcon, UploadIcon, PencilIcon, TrashIcon } from "@/components/icons/Icons";
import { GET_PUBLIKASI, CREATE_PUBLIKASI, UPDATE_PUBLIKASI, DELETE_PUBLIKASI } from "@/graphql/lppm/publikasi.graphql";
import AddPublikasiModal from "@/components/ui/lppm/AddPublikasiModal";
import EditPublikasiModal from "@/components/ui/lppm/EditPublikasiModal";
import ConfirmModal from '@/components/shared/ConfirmModal';


const PublikasiTab = () => {

  const { data, loading, error } = useQuery(GET_PUBLIKASI);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [editingPublikasi, setEditingPublikasi] = useState<any | null>(null);
  const [publikasiToDelete, setPublikasiToDelete] = useState<number | null>(null);
  const [createPublikasi] = useMutation(CREATE_PUBLIKASI, { refetchQueries: [{ query: GET_PUBLIKASI }], }); // refresh tabel otomatis setelah tambah
  const [updatePublikasi] = useMutation(UPDATE_PUBLIKASI, { refetchQueries: [{ query: GET_PUBLIKASI }], });
  const [deletePublikasi] = useMutation(DELETE_PUBLIKASI, { refetchQueries: [{ query: GET_PUBLIKASI }], });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddPublikasi = async (publikasi: any) => {
    try {
      const variables: any = {
        judul: publikasi.judul || null,
        ketuaId: publikasi.ketuaId ? parseInt(publikasi.ketuaId) : null,
        anggotaIds:
        publikasi.anggotaIds && publikasi.anggotaIds.length > 0
        ? publikasi.anggotaIds.map((id: string | number) => parseInt(id))
        : [],
        keterangan: publikasi.keterangan || null,
        kelompokKeilmuanId: publikasi.kelompokKeilmuanId ? parseInt(publikasi.kelompokKeilmuanId) : null,
        indeksasiId: publikasi.indeksasiId ? parseInt(publikasi.indeksasiId) : null,
        penerbitId: publikasi.penerbitId ? parseInt(publikasi.penerbitId) : null,
        noRegis: publikasi.noRegis || null,
        tahunId: publikasi.tahunId ? parseInt(publikasi.tahunId) : null,
        link: publikasi.link || null,
        karyaIlmiahId: publikasi.karyaIlmiahId ? parseInt(publikasi.karyaIlmiahId) : null
      };
  
      await createPublikasi({ variables });
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Gagal menambah publikasi:", err);
      alert("Terjadi kesalahan saat menyimpan data publikasi.");
    }
  };

  const handleEditClick = (publikasi: any) => {
      setEditingPublikasi(publikasi);
      setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
      setIsEditModalOpen(false);
      setEditingPublikasi(null);
  };

  const handleUpdatePublikasi = async (publikasi: any) => {
    try {
      await updatePublikasi({
        variables: {
          id: Number(publikasi.id),
          judul: publikasi.judul || null,
          ketuaId: publikasi.ketuaId ? parseInt(publikasi.ketuaId) : null,
          anggotaIds:
          publikasi.anggotaIds && publikasi.anggotaIds.length > 0
          ? publikasi.anggotaIds.map((id: string | number) => parseInt(id))
          : [],
          keterangan: publikasi.keterangan || null,
          kelompokKeilmuanId: publikasi.kelompokKeilmuanId ? parseInt(publikasi.kelompokKeilmuanId) : null,
          indeksasiId: publikasi.indeksasiId ? parseInt(publikasi.indeksasiId) : null,
          penerbitId: publikasi.penerbitId ? parseInt(publikasi.penerbitId) : null,
          noRegis: publikasi.noRegis || null,
          tahunId: publikasi.tahunId ? parseInt(publikasi.tahunId) : null,
          link: publikasi.link || null,
          karyaIlmiahId: publikasi.karyaIlmiahId ? parseInt(publikasi.karyaIlmiahId) : null
        },
      });
      handleCloseEditModal();
    } catch (err) {
      console.error("Gagal menambah publikasi:", err);
      alert("Terjadi kesalahan saat menyimpan data publikasi.");
    }
  };

  const handleDeleteClick = async (publikasiId: number | string) => {
    setPublikasiToDelete(publikasiId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (publikasiToDelete) {
      try {
        await deletePublikasi({ variables: { id: Number(publikasiToDelete) } });
        setIsConfirmModalOpen(false);
        setPublikasiToDelete(null);
      } catch (err) {
        console.error("Gagal menghapus publikasi:", err);
        alert("Terjadi kesalahan saat menghapus data publikasi.");
      }
    }
  };
  
  const formatCurrency = (amount?: number) => {
      if (typeof amount !== 'number') return '-';
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    }

  const getPublikasi = data?.getPublikasi || [];
//   console.log("DATA Publikasi:", getPublikasi);

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
                <th scope="col" className="px-6 py-3">Judul</th>
                <th scope="col" className="px-6 py-3">Penulis</th>
                <th scope="col" className="px-6 py-3">Anggota</th>
                <th scope="col" className="px-6 py-3">Jenis</th>
                <th scope="col" className="px-6 py-3">Penerbit/No.Regis</th>
                <th scope="col" className="px-6 py-3">Indeksasi</th>
                <th scope="col" className="px-6 py-3">Kajian</th>
                <th scope="col" className="px-6 py-3">Tahun</th>
                <th scope="col" className="px-6 py-3">Link</th>
                <th scope="col" className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {getPublikasi.map((getPublikasi: any) => (
                <tr key={`${getPublikasi.id}-${getPublikasi.judul}`} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{getPublikasi.judul}</td>
                  <td className="px-6 py-4">{getPublikasi.ketua?.name || "-"}</td>
                  <td className="px-6 py-4">
                    {getPublikasi.anggota?.map((anggota: any) => anggota.name).join(", ") || "-"}
                  </td>
                  <td className="px-6 py-4">{getPublikasi.karyaIlmiah?.name || "-" }</td>
                  <td className="px-6 py-4">{getPublikasi.penerbit?.name || "-"} / {getPublikasi.noRegis || "-"}</td>
                  <td className="px-6 py-4">{getPublikasi.indeksasi?.name || "-"}</td>
                  <td className="px-6 py-4">{getPublikasi.kelompokKeilmuan?.name || "-"}</td>
                  <td className="px-6 py-4">{getPublikasi.tahun?.name || "-"}</td> 
                  <td className="px-6 py-4">{getPublikasi.link || "-"}</td> 
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <Link 
                      to={`/lecturers/`} 
                      className="font-medium text-primary hover:underline"
                    >
                      Lihat Detail
                    </Link>
                    <button
                      onClick={() => handleEditClick(getPublikasi)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      aria-label={`Edit ${getPublikasi.judul}`}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(getPublikasi.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                      aria-label={`Hapus ${getPublikasi.judul}`}
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
      {editingPublikasi && (
          <EditPublikasiModal
              isOpen={isEditModalOpen}
              onClose={handleCloseEditModal}
              onSave={handleUpdatePublikasi}
              publikasi={editingPublikasi}
          />
      )}

      {/* Add Modal */}
      <AddPublikasiModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddPublikasi}
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

export default PublikasiTab;