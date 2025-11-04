"use client";

import React from "react";
import SasaranStrategisTab from "@/components/layout-lppm/SasaranStrategisTab";

import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { UPDATE_ALL_STRATEGIC_ACTIONS } from "@/graphql/lppm/strategic_action.graphql";
import { GET_STRATEGIC_GOAL } from "@/graphql/lppm/strategic_goal.graphql";


const LppmSasaranStrategisPage = () => {
  const [updateAll, { loading }] = useMutation(UPDATE_ALL_STRATEGIC_ACTIONS, { refetchQueries: [{ query: GET_STRATEGIC_GOAL }], });

  const handleUpdate = async () => {
    try {
      await updateAll();
      alert("Data berhasil diupdate");
    } catch (err) {
      alert("Gagal mengupdate data", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">Ketercapaian Kinerja LPPM</h2>
        <p className="text-gray-500 mt-1">Berdasarkan Rencana Strategis Tahun 2025-2029</p>
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50 mt-2"
        >
          {loading ? "Memperbarui..." : "Refresh Data"}
        </button>
      </div>
      <SasaranStrategisTab />
    </div>
  );
};

export default LppmSasaranStrategisPage;
