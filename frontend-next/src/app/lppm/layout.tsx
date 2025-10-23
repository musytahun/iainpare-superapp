"use client";

import React, { ReactNode } from "react";
import Header from "@/components/layout-lppm/Header";
import Sidebar from "@/components/layout-lppm/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function LayoutLppm({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
