"use client";

import React, { useState } from "react";



const LppmDashboardPage = () => {


  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Roadmap Penelitian & PkM IAIN Parepare</h2>
                <p className="text-gray-500 mt-1">
                    Mewujudkan Visi sebagai <strong>Pusat Akulturasi Budaya dan Islam</strong> untuk membangun masyarakat religius, moderat, inovatif, dan unggul.
                </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
                    <label htmlFor="prodi-selector" className="sr-only">Pilih Program Studi</label>
                    <select 
                    id="prodi-selector" 
                    // value={selectedProdi} 
                    // onChange={(e) => setSelectedProdi(e.target.value)} 
                    className="w-full md:w-72 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md shadow-sm"
                >
                    <option value="Semua Prodi">Semua Program Studi</option>
                    <optgroup label="Strata 1 (S1)">
                        {/* {prodiOptions.S1.map(prodi => <option key={prodi} value={prodi}>{prodi}</option>)} */}
                    </optgroup>
                    <optgroup label="Strata 2 (S2)">
                        {/* {prodiOptions.S2.map(prodi => <option key={prodi} value={prodi}>{prodi}</option>)} */}
                    </optgroup>
                </select>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LppmDashboardPage;
