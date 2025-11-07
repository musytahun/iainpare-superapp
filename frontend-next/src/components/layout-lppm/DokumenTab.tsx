"use client";

import { useMutation, useQuery } from '@apollo/client';
import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'lucide-react';
import { SearchIcon, PlusIcon, DownloadIcon, UploadIcon, PencilIcon, TrashIcon } from "@/components/icons/Icons";
import { GET_DOKUMEN, CREATE_DOKUMEN, UPDATE_DOKUMEN, DELETE_DOKUMEN } from "@/graphql/lppm/dokumen.graphql";
import AddDokumenModal from "@/components/ui/lppm/AddDokumenModal";
import EditDokumenModal from "@/components/ui/lppm/EditDokumenModal";
import ConfirmModal from '@/components/shared/ConfirmModal';


const getStatusClass = (status: getDokumen.status) => {
    switch (status) {
        case 'Tersedia': return 'bg-green-100 text-green-800';
        case 'Dalam Proses': return 'bg-yellow-100 text-yellow-800';
        case 'Belum Ada': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const DokumenTab = () => {

  const { data, loading, error } = useQuery(GET_DOKUMEN);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [editingDokumen, setEditingDokumen] = useState<any | null>(null);
  const [dokumenToDelete, setDokumenToDelete] = useState<number | null>(null);
  const [createDokumen] = useMutation(CREATE_DOKUMEN, { refetchQueries: [{ query: GET_DOKUMEN }], }); // refresh tabel otomatis setelah tambah
  const [updateDokumen] = useMutation(UPDATE_DOKUMEN, { refetchQueries: [{ query: GET_DOKUMEN }], });
  const [deleteDokumen] = useMutation(DELETE_DOKUMEN, { refetchQueries: [{ query: GET_DOKUMEN }], });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddDokumen = async (dokumen: any) => {
    try {
      const variables: any = {
        name: dokumen.name || null,
        keterangan: dokumen.keterangan || null,
        kriteriaTerkait: dokumen.kriteriaTerkait || null,
        status: dokumen.status || null,
        tahunId: dokumen.tahunId ? parseInt(dokumen.tahunId) : null,
        link: dokumen.link || null
      };
  
      await createDokumen({ variables });
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Gagal menambah dokumen:", err);
      alert("Terjadi kesalahan saat menyimpan data dokumen.");
    }
  };

  const handleEditClick = (dokumen: any) => {
      setEditingDokumen(dokumen);
      setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
      setIsEditModalOpen(false);
      setEditingDokumen(null);
  };

  const handleUpdateDokumen = async (dokumen: any) => {
    try {
      await updateDokumen({
        variables: {
          id: Number(dokumen.id),
          name: dokumen.name || null,
          keterangan: dokumen.keterangan || null,
          kriteriaTerkait: dokumen.kriteriaTerkait || null,
          status: dokumen.status || null,
          tahunId: dokumen.tahunId ? parseInt(dokumen.tahunId) : null,
          link: dokumen.link || null
        },
      });
      handleCloseEditModal();
    } catch (err) {
      console.error("Gagal menambah dokumen:", err);
      alert("Terjadi kesalahan saat menyimpan data dokumen.");
    }
  };

  const handleDeleteClick = async (dokumenId: number | string) => {
    setDokumenToDelete(dokumenId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (dokumenToDelete) {
      try {
        await deleteDokumen({ variables: { id: Number(dokumenToDelete) } });
        setIsConfirmModalOpen(false);
        setDokumenToDelete(null);
      } catch (err) {
        console.error("Gagal menghapus dokumen:", err);
        alert("Terjadi kesalahan saat menghapus data dokumen.");
      }
    }
  };

  const getDokumen = data?.getDokumen || [];
//   console.log("DATA dokumen:", getDublikasi);

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
                <th scope="col" className="px-6 py-3">Tahun</th>
                <th scope="col" className="px-6 py-3">Nama Dokumen</th>
                <th scope="col" className="px-6 py-3">Kriteria Terkait</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Link</th>
                <th scope="col" className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {getDokumen.map((getDokumen: any) => (
                <tr key={`${getDokumen.id}-${getDokumen.name}`} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{getDokumen.tahun?.name || "-"}</td> 
                  <td className="px-6 py-4 font-medium text-gray-900">{getDokumen.name}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold bg-teal-800/10 text-teal-800 px-2 py-1 rounded-full">
                        {getDokumen.kriteriaTerkait || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusClass(getDokumen.status)}`}>
                        {getDokumen.status || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{getDokumen.link || "-"}</td> 
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <Link 
                      to={`/lecturers/`} 
                      className="font-medium text-primary hover:underline"
                    >
                      Lihat Detail
                    </Link>
                    <button
                      onClick={() => handleEditClick(getDokumen)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      aria-label={`Edit ${getDokumen.name}`}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(getDokumen.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                      aria-label={`Hapus ${getDokumen.name}`}
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
      {editingDokumen && (
          <EditDokumenModal
              isOpen={isEditModalOpen}
              onClose={handleCloseEditModal}
              onSave={handleUpdateDokumen}
              dokumen={editingDokumen}
          />
      )}

      {/* Add Modal */}
      <AddDokumenModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddDokumen}
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

export default DokumenTab;