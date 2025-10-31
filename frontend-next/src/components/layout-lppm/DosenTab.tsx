"use client";

import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { Link } from "lucide-react";
import Image from "next/image";
import { SearchIcon, PlusIcon, DownloadIcon, UploadIcon, PencilIcon, TrashIcon } from "@/components/icons/Icons";
import { GET_DOSEN, CREATE_DOSEN, UPDATE_DOSEN, DELETE_DOSEN } from "@/graphql/people/dosen.graphql";
import AddDosenModal from "@/components/ui/lppm/AddDosenModal";
import EditDosenModal from "@/components/ui/lppm/EditDosenModal";
import ConfirmModal from '@/components/shared/ConfirmModal';


const DosenTab = () => {

  const { data, loading, error } = useQuery(GET_DOSEN);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [editingDosen, setEditingDosen] = useState<any | null>(null);
  const [dosenToDelete, setDosenToDelete] = useState<number | null>(null);
  const [createDosen] = useMutation(CREATE_DOSEN, { refetchQueries: [{ query: GET_DOSEN }], }); // refresh tabel otomatis setelah tambah
  const [updateDosen] = useMutation(UPDATE_DOSEN, { refetchQueries: [{ query: GET_DOSEN }], });
  const [deleteDosen] = useMutation(DELETE_DOSEN, { refetchQueries: [{ query: GET_DOSEN }], });
  
  const handleAddDosen = async (dosen: any) => {
    try {
      await createDosen({
        variables: {
          name: dosen.name || null,
          email: dosen.email || null,
          nomorHp: dosen.nomorHp || null,
          alamat: dosen.alamat || null,
          fotoProfil: dosen.fotoProfil || null,
          nidn: dosen.nidn || null,
          nip: dosen.nip || null,
          gelarDepan: dosen.gelarDepan || null,
          gelarBelakang: dosen.gelarBelakang || null,
          jabatanFungsionalId: dosen.jabatanFungsionalId ? parseInt(dosen.jabatanFungsionalId) : null,
          pangkatGolonganId: dosen.pangkatGolonganId ? parseInt(dosen.pangkatGolonganId) : null,
          programStudiId: dosen.programStudiId ? parseInt(dosen.programStudiId) : null,
          bidangKepakaranId: dosen.bidangKepakaranId ? parseInt(dosen.bidangKepakaranId) : null,
        },
      });
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Gagal menambah dosen:", err);
      alert("Terjadi kesalahan saat menyimpan data dosen.");
    }
  };

  const handleEditClick = (dosen: any) => {
      setEditingDosen(dosen);
      setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
      setIsEditModalOpen(false);
      setEditingDosen(null);
  };

  const handleUpdateDosen = async (dosen: any) => {
    try {
      console.log("Dosen ID:", dosen);
      await updateDosen({
        variables: {
          id: Number(dosen.id),
          name: dosen.name || null,
          email: dosen.email || null,
          nomorHp: dosen.nomorHp || null,
          alamat: dosen.alamat || null,
          fotoProfil: dosen.fotoProfil || null,
          nidn: dosen.nidn || null,
          nip: dosen.nip || null,
          gelarDepan: dosen.gelarDepan || null,
          gelarBelakang: dosen.gelarBelakang || null,
          jabatanFungsionalId: dosen.jabatanFungsionalId ? parseInt(dosen.jabatanFungsionalId) : null,
          pangkatGolonganId: dosen.pangkatGolonganId ? parseInt(dosen.pangkatGolonganId) : null,
          programStudiId: dosen.programStudiId ? parseInt(dosen.programStudiId) : null,
          bidangKepakaranId: dosen.bidangKepakaranId ? parseInt(dosen.bidangKepakaranId) : null,
        },
      });
      handleCloseEditModal();
    } catch (err) {
      console.error("Gagal menambah dosen:", err);
      alert("Terjadi kesalahan saat menyimpan data dosen.");
    }
  };

  const handleDeleteClick = async (dosenId: number | string) => {
    setDosenToDelete(dosenId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (dosenToDelete) {
      try {
        await deleteDosen({ variables: { id: Number(dosenToDelete) } });
        setIsConfirmModalOpen(false);
        setDosenToDelete(null);
      } catch (err) {
        console.error("Gagal menghapus dosen:", err);
        alert("Terjadi kesalahan saat menghapus data dosen.");
      }
    }
  };


  if (loading) return <p className="p-4 text-gray-500">Memuat data...</p>;
  if (error) return <p className="p-4 text-red-500">Terjadi kesalahan: {error.message}</p>;

  const getDosen = data?.getDosen || [];
  console.log("DATA DOSEN:", getDosen);

  return (
      <>
      <div className="bg-surface p-6 rounded-lg shadow-md">
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <div className="flex flex-wrap items-center space-x-4">
                  <div className="relative">
                      <input
                          type="text"
                          placeholder="Cari nama atau NIDN..."
                          // value={searchTerm}
                          // onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <SearchIcon className="h-5 w-5 text-gray-400" />
                      </div>
                  </div>
                  <div>
                      <select
                          id="prodi-filter"
                          // value={prodiFilter}
                          // onChange={(e) => setProdiFilter(e.target.value)}
                          className="w-full md:w-48 pl-3 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                      >
                          {/* {prodiOptions.map(prodi => (
                              <option key={prodi} value={prodi}>
                                  {prodi}
                              </option>
                          ))} */}
                      </select>
                  </div>
              </div>
              <div className="flex items-center space-x-2">
                  <input 
                      type="file" 
                      // ref={fileInputRef} 
                      // onChange={handleFileUpload}
                      accept=".csv"
                      className="hidden"
                  />
                  <button 
                      onClick={() => setIsAddModalOpen(true)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-teal-800 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                      <PlusIcon className="h-5 w-5" />
                      <span>Tambah Dosen</span>
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
                <th scope="col" className="px-6 py-3">Nama</th>
                <th scope="col" className="px-6 py-3">NIDN</th>
                <th scope="col" className="px-6 py-3">Jabatan Fungsional</th>
                <th scope="col" className="px-6 py-3">Program Studi</th>
                <th scope="col" className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              { getDosen.map((getDosen: any) => (
                <tr key={getDosen.id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center">
                      <Image
                        src={
                          getDosen?.fotoProfil
                            ? `/${getDosen.fotoProfil}`
                            // : `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/200/200`
                            : "/default-avatar.png"
                        }
                        alt={getDosen.name || "User"}
                        width={32}
                        height={32}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      {getDosen.gelarDepan} {getDosen.name}, {getDosen.gelarBelakang}
                  </th>
                  <td className="px-6 py-4">{getDosen.nidn}</td>
                  <td className="px-6 py-4">{getDosen.jabatanFungsional?.name || "-"}</td>
                  <td className="px-6 py-4">{getDosen.programStudi?.name || "-"}</td>
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <Link 
                      // to={`/lecturers/${lecturer.id}`} 
                      to={`/lecturers/`} 
                      className="font-medium text-primary hover:underline"
                    >
                      Lihat Detail
                    </Link>
                    <button
                      onClick={() => handleEditClick(getDosen)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      aria-label={`Edit ${getDosen.name}`}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(getDosen.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                      aria-label={`Hapus ${getDosen.name}`}
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
      {editingDosen && (
          <EditDosenModal
              isOpen={isEditModalOpen}
              onClose={handleCloseEditModal}
              onSave={handleUpdateDosen}
              dosen={editingDosen}
          />
      )}

      {/* Add Modal */}
      <AddDosenModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddDosen}
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

export default DosenTab;