"use client";

import React, { useState } from "react";

const YEARS = ['All Years', '2024', '2023', '2022', '2021', '2020'];

const LppmDashboardPage = () => {
  const [selectedYear, setSelectedYear] = useState<string>('All Years');

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Capaian Kinerja Akreditasi & Sasaran Strategis</h2>
                <p className="text-gray-500 mt-1">Baseline Kinerja Periode 2020-2024</p>
            </div>
            <div className="mt-4 sm:mt-0">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 -mb-2">
                    {YEARS.map(year => (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex-shrink-0 ${
                                selectedYear === year 
                                    ? 'bg-teal-800 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LppmDashboardPage;
