"use client";

import React from "react";

const ReferencesDashboardPage: React.FC = () => {
  const user = { name: "John Doe" };
  const selectedModule = { name: "References" };
  const selectedRole = { name: "Administrator" };
  const permissions = [
    { id: 1, name: "View Users" },
    { id: 2, name: "Edit Roles" },
    { id: 3, name: "Manage Modules" },
  ];

  return (
    <div>
      {/* Judul dan sambutan */}
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
        References Dashboard Overview
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Welcome back, {user.name}!
      </p>

      {/* Grid utama */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Kartu sesi aktif */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-semibold text-primary-600 dark:text-primary-400">
            Current Session
          </h2>
          <p className="mt-2 text-slate-700 dark:text-slate-300">
            Module:{" "}
            <span className="font-medium">{selectedModule.name}</span>
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            Role:{" "}
            <span className="font-medium">{selectedRole.name}</span>
          </p>
        </div>

        {/* Kartu izin pengguna */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 col-span-1 lg:col-span-2 shadow-sm">
          <h2 className="text-lg font-semibold text-primary-600 dark:text-primary-400">
            Your Permissions
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {permissions.length > 0 ? (
              permissions.map((permission) => (
                <span
                  key={permission.id}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full font-medium"
                >
                  {permission.name}
                </span>
              ))
            ) : (
              <p className="text-slate-500 dark:text-slate-400">
                You have no specific permissions in this role.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferencesDashboardPage;
