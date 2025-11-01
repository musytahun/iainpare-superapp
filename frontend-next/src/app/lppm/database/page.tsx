"use client";

import React, { useState } from "react";
import { UsersIconLppm, BriefcaseIcon, GlobeAltIcon, BookOpenIcon } from "@/components/icons/Icons";
import DosenTab from "@/components/layout-lppm/DosenTab";
import PenelitianTab from "@/components/layout-lppm/PenelitianTab";
import PengabdianTab from "@/components/layout-lppm/PengabdianTab";
import PublikasiTab from "@/components/layout-lppm/PublikasiTab";


type Tab = 'dosen' | 'penelitian' | 'pengabdian' | 'publikasi';

const LppmDatabasePage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dosen');

  const tabs: {id: Tab, name: string, icon: React.ReactNode}[] = [
    { id: 'dosen', name: 'Dosen', icon: <UsersIconLppm className="h-5 w-5 mr-2" /> },
    { id: 'penelitian', name: 'Penelitian', icon: <BriefcaseIcon className="h-5 w-5 mr-2" /> },
    { id: 'pengabdian', name: 'Pengabdian', icon: <GlobeAltIcon className="h-5 w-5 mr-2" /> },
    { id: 'publikasi', name: 'Publikasi', icon: <BookOpenIcon className="h-5 w-5 mr-2" /> }
];

const renderContent = () => {
  switch(activeTab) {
      case 'dosen':
          return <DosenTab />;
      case 'penelitian':
          return <PenelitianTab />;
      case 'pengabdian':
        return <PengabdianTab />;
      case 'publikasi':
        return <PublikasiTab />;
      default:
          return null;
  }
}

  return (
    <div className="space-y-6">
      <div className="bg-white p-2 rounded-lg shadow-md">
          <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                  {tabs.map(tab => (
                      <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`${
                          activeTab === tab.id
                              ? 'border-primary text-primary'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          } whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm flex items-center transition-colors`}
                          aria-current={activeTab === tab.id ? 'page' : undefined}
                      >
                        {tab.icon} {tab.name}
                      </button>
                  ))}
              </nav>
          </div>
      </div>
      <div className="bg-white p-2 rounded-lg shadow-sm mb-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default LppmDatabasePage;
