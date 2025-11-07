"use client";

import { useMutation, useQuery } from '@apollo/client';
import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'lucide-react';
import { SearchIcon, PlusIcon, DownloadIcon, UploadIcon, PencilIcon, TrashIcon } from "@/components/icons/Icons";
import { GET_KEGIATAN, CREATE_KEGIATAN, UPDATE_KEGIATAN, DELETE_KEGIATAN } from "@/graphql/lppm/kegiatan.graphql";
import AddKegiatanModal from "@/components/ui/lppm/AddKegiatanModal";
import EditKegiatanModal from "@/components/ui/lppm/EditKegiatanModal";
import ConfirmModal from '@/components/shared/ConfirmModal';


const getStatusClass = (status: getKegiatan.status) => {
    switch (status) {
        case 'Terjadwal': return 'bg-green-100 text-green-800';
        case 'Terlaksana': return 'bg-yellow-100 text-yellow-800';
        case 'Dibatalkan': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const KegiatanTab = () => {

  const { data, loading, error } = useQuery(GET_KEGIATAN);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [editingKegiatan, setEditingKegiatan] = useState<any | null>(null);
  const [kegiatanToDelete, setKegiatanToDelete] = useState<number | null>(null);
  const [createKegiatan] = useMutation(CREATE_KEGIATAN, { refetchQueries: [{ query: GET_KEGIATAN }], }); // refresh tabel otomatis setelah tambah
  const [updateKegiatan] = useMutation(UPDATE_KEGIATAN, { refetchQueries: [{ query: GET_KEGIATAN }], });
  const [deleteKegiatan] = useMutation(DELETE_KEGIATAN, { refetchQueries: [{ query: GET_KEGIATAN }], });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddKegiatan = async (kegiatan: any) => {
    try {
      const variables: any = {
        name: kegiatan.name || null,
        keterangan: kegiatan.keterangan || null,
        tanggal: kegiatan.tanggal || null,
        tempat: kegiatan.tempat || null,
        status: kegiatan.status || null,
        tahunId: kegiatan.tahunId ? parseInt(kegiatan.tahunId) : null,
        link: kegiatan.link || null,
        penganggungJawabId: kegiatan.penganggungJawabId ? parseInt(kegiatan.penganggungJawabId) : null,
      };
  
      await createKegiatan({ variables });
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Gagal menambah kegiatan:", err);
      alert("Terjadi kesalahan saat menyimpan data kegiatan.");
    }
  };

  const handleEditClick = (kegiatan: any) => {
      setEditingKegiatan(kegiatan);
      setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
      setIsEditModalOpen(false);
      setEditingKegiatan(null);
  };

  const handleUpdateKegiatan = async (kegiatan: any) => {
    try {
      await updateKegiatan({
        variables: {
          id: Number(kegiatan.id),
          name: kegiatan.name || null,
          keterangan: kegiatan.keterangan || null,
          tanggal: kegiatan.tanggal || null,
          tempat: kegiatan.tempat || null,
          status: kegiatan.status || null,
          tahunId: kegiatan.tahunId ? parseInt(kegiatan.tahunId) : null,
          link: kegiatan.link || null,
          penganggungJawabId: kegiatan.penganggungJawabId ? parseInt(kegiatan.penganggungJawabId) : null,
        },
      });
      handleCloseEditModal();
    } catch (err) {
      console.error("Gagal menambah kegiatan:", err);
      alert("Terjadi kesalahan saat menyimpan data kegiatan.");
    }
  };

  const handleDeleteClick = async (kegiatanId: number | string) => {
    setKegiatanToDelete(kegiatanId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (kegiatanToDelete) {
      try {
        await deleteKegiatan({ variables: { id: Number(kegiatanToDelete) } });
        setIsConfirmModalOpen(false);
        setKegiatanToDelete(null);
      } catch (err) {
        console.error("Gagal menghapus kegiatan:", err);
        alert("Terjadi kesalahan saat menghapus data kegiatan.");
      }
    }
  };

  const getKegiatan = data?.getKegiatan || [];
//   console.log("DATA kegiatan:", getDublikasi);

  return (
    <>
      <div className="bg-surface p-6 rounded-lg shadow-md">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div className="flex items-center space-x-4 flex-wrap">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari name atau peneliti..."
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
                <th scope="col" className="px-6 py-3">No</th>
                <th scope="col" className="px-6 py-3">Tahun</th>
                <th scope="col" className="px-6 py-3">Nama Kegiatan</th>
                <th scope="col" className="px-6 py-3">Waktu dan Tempat</th>
                <th scope="col" className="px-6 py-3">Penanggung Jawab</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Link</th>
                <th scope="col" className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {getKegiatan.map((getKegiatan: any) => (
                <tr key={`${getKegiatan.id}-${getKegiatan.name}`} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4"></td> 
                  <td className="px-6 py-4">{getKegiatan.tahun?.name || "-"}</td> 
                  <td className="px-6 py-4 font-medium text-gray-900">{getKegiatan.name}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold bg-teal-800/10 text-teal-800 px-2 py-1 rounded-full">
                        {getKegiatan.tanggal || "-"} - {getKegiatan.tempat || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4"></td> 
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusClass(getKegiatan.status)}`}>
                        {getKegiatan.status || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{getKegiatan.link || "-"}</td> 
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <Link 
                      to={`/lecturers/`} 
                      className="font-medium text-primary hover:underline"
                    >
                      Lihat Detail
                    </Link>
                    <button
                      onClick={() => handleEditClick(getKegiatan)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      aria-label={`Edit ${getKegiatan.name}`}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(getKegiatan.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                      aria-label={`Hapus ${getKegiatan.name}`}
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
      {editingKegiatan && (
          <EditKegiatanModal
              isOpen={isEditModalOpen}
              onClose={handleCloseEditModal}
              onSave={handleUpdateKegiatan}
              kegiatan={editingKegiatan}
          />
      )}

      {/* Add Modal */}
      <AddKegiatanModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddKegiatan}
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

export default KegiatanTab;