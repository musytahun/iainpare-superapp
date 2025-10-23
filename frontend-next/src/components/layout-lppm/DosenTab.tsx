"use client";

import { SearchIcon, PlusIcon, DownloadIcon, UploadIcon } from "@/components/icons/Icons";


const DosenTab = () => {

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
                    // onClick={() => setIsAddModalOpen(true)}
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
            {/* {filteredLecturers.map((lecturer) => (
              <tr key={lecturer.id} className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center">
                    <img className="w-10 h-10 rounded-full mr-4" src={lecturer.photoUrl} alt={lecturer.name} />
                    {lecturer.name}, {lecturer.title}
                </th>
                <td className="px-6 py-4">{lecturer.nidn}</td>
                <td className="px-6 py-4">{lecturer.functionalPosition}</td>
                <td className="px-6 py-4">{lecturer.prodi}</td>
                <td className="px-6 py-4 flex items-center space-x-4">
                  <Link 
                    to={`/lecturers/${lecturer.id}`} 
                    className="font-medium text-primary hover:underline"
                  >
                    Lihat Detail
                  </Link>
                   <button
                    onClick={() => handleEditClick(lecturer)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                    aria-label={`Edit ${lecturer.name}`}
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                   <button
                    onClick={() => handleDeleteClick(lecturer.id)}
                    className="p-1 text-red-600 hover:text-red-800"
                    aria-label={`Hapus ${lecturer.name}`}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
    
    {/* Edit Modal */}
    {/* {editingLecturer && (
        <EditLecturerModal
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            onSave={handleUpdateLecturer}
            lecturer={editingLecturer}
        />
    )} */}

    {/* Add Modal */}
    {/* <AddLecturerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddLecturer}
    /> */}

    {/* Confirm Delete Modal */}
    {/* <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus Dosen"
        message="Apakah Anda yakin ingin menghapus data dosen ini? Tindakan ini tidak dapat diurungkan."
    /> */}
    </>
  );
};

export default DosenTab;