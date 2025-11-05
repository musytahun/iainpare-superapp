"use client";

import React, { useState } from "react";
import { BadgeCheckIcon, BookOpenIcon, CashIcon, GlobeAltIcon, PuzzleIcon, TrendingUpIcon, UsersIcon } from "@/components/icons/Icons";
import AccreditationStatCard from '@/components/layout-lppm/AccreditationStatCard';
import SpDoughnutChart from '@/components/layout-lppm/SpDoughnutChart';
import { GET_STRATEGIC_GOAL } from "@/graphql/lppm/strategic_goal.graphql";
import { useQuery } from "@apollo/client";
import ObjectiveHorizontalBarChart from "@/components/layout-lppm/ObjectiveHorizontalBarChart";

const YEARS = ['All Years', '2025', '2024', '2023', '2022', '2021', '2020'];

const LppmDashboardPage = () => {
  const [selectedYear, setSelectedYear] = useState<string>("All Years");
  const { data, loading, error } = useQuery(GET_STRATEGIC_GOAL);

  // Urutkan data dari GraphQL jika sudah tersedia
  const strategicGoals = [...(data?.getStrategicGoal || [])].sort((a, b) =>
    a.code.localeCompare(b.code)
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
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
      
      {/* Sasaran Strategis Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4 border-b pb-4 border-gray-200">
              <div className="bg-primary/10 text-primary p-2 rounded-full mr-3"><TrendingUpIcon className="h-6 w-6" /></div>
              <h3 className="text-xl font-bold text-gray-800">Progress Sasaran Strategis</h3>
          </div>

            {error ? (
              <p className="text-red-500 text-center py-10">{error.message}</p>
            ) : loading ? (
              <p className="text-gray-500 text-center py-10">Memuat data...</p>
            ) : strategicGoals.length > 0 ? (
              <div className="space-y-8">
                {strategicGoals.map((sg) => (
                  console.log("SG:", sg),
                  <div
                    key={sg.code}
                    className="p-4 rounded-lg border border-gray-200 bg-gray-50/50"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-1">
                        <SpDoughnutChart sg={sg} selectedYear={selectedYear} />
                      </div>
                      <div className="lg:col-span-2">
                        <ObjectiveHorizontalBarChart objectives={sg.objectives} selectedYear={selectedYear} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-10">
                Data sasaran strategis tidak ditemukan.
              </p>
            )}
      </div>

       {/* Akreditasi Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4 border-b pb-4 border-gray-200">
              <div className="bg-primary/10 text-primary p-2 rounded-full mr-3"><BadgeCheckIcon className="h-6 w-6" /></div>
              <h3 className="text-xl font-bold text-gray-800">Capaian Kinerja Akreditasi</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <AccreditationStatCard 
                  title="Produktivitas" 
                  total="9"
                  icon={<PuzzleIcon className="h-8 w-8" />}
                  // breakdown={accreditationMetrics.produktivitas.breakdown}
              />
              <AccreditationStatCard 
                  title="Luaran" 
                  total="7"
                  icon={<BookOpenIcon className="h-8 w-8" />}
                  // breakdown={accreditationMetrics.luaran.breakdown}
              />
              <AccreditationStatCard 
                  title="Pendanaan" 
                  total="5"
                  icon={<CashIcon className="h-8 w-8" />}
                  // breakdown={accreditationMetrics.pendanaan.breakdown}
              />
              <AccreditationStatCard 
                  title="Kelompok" 
                  total="3"
                  icon={<UsersIcon className="h-8 w-8" />}
                  // breakdown={accreditationMetrics.kelompok.breakdown}
              />
              <AccreditationStatCard 
                  title="Kerjasama" 
                  total="6"
                  icon={<GlobeAltIcon className="h-8 w-8" />}
                  // breakdown={accreditationMetrics.kerjasama.breakdown}
              />
          </div>
      </div>
    </div>
  );
};

export default LppmDashboardPage;
