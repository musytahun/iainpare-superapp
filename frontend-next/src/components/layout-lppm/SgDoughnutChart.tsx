"use client";

import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CAPAIAN_COLOR = '#00695C'; // primary
const SISA_COLOR = '#E0E0E0'; // gray-300

// Interface data dari GraphQL
interface ACTION {
    id: string;
    current: number;
    target: number;
    yearlyData?: Record<number, number>; // contoh: { 2023: 80, 2024: 100 }
  }
  
  interface OBJECTIVE {
    id: string;
    name: string;
    actions: ACTION[];
  }
  
  interface GOAL {
    id: string;
    code: string;
    name: string;
    objectives: OBJECTIVE[];
  }
  
  interface SpDoughnutChartProps {
    sg: GOAL;
    selectedYear: string;
  }

  const SpDoughnutChart: React.FC<SpDoughnutChartProps> = ({ sg, selectedYear }) => {
    // 🔢 Hitung total capaian & target
    const { totalCurrent, totalTarget, percentage } = useMemo(() => {
      const allActions = sg.objectives?.flatMap((obj) => obj.actions || []) ?? [];
  
      let totalCurrent = 0;
      let totalTarget = 0;
  
      for (const action of allActions) {
        let currentValue = 0;
  
        if (selectedYear === "All Years") {
          // Ambil total dari field current (semua tahun)
          currentValue = action.current ?? 0;
        } else if (Array.isArray(action.yearlyData)) {
          // Cari berdasarkan tahun yang dipilih
          const match = action.yearlyData.find(
            (y) => y.year === parseInt(selectedYear)
          );
          currentValue = match ? match.value : 0;
        }
  
        totalCurrent += currentValue;
        totalTarget += action.target ?? 0;
      }
  
      const percentage =
        totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;
  
      return {
        totalCurrent,
        totalTarget,
        percentage: Math.round(percentage),
      };
    }, [sg, selectedYear]);
  
    // 📊 Data untuk PieChart
    const data = [
      { name: "Capaian", value: percentage },
      { name: "Sisa", value: 100 - percentage },
    ];

  return (
    <div className="flex flex-col items-center justify-start p-4 rounded-lg h-full bg-white shadow-sm">
      <h4 className="text-lg font-bold text-primary text-center">{sg.code}</h4>
      <p className="text-sm text-center text-gray-600 mb-2 h-10 overflow-hidden">{sg.name}</p>
      <div className="relative w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius="65%"
              outerRadius="85%"
              dataKey="value"
              cornerRadius={5}
              stroke="none"
            >
              <Cell fill={CAPAIAN_COLOR} />
              <Cell fill={SISA_COLOR} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-primary">{percentage}%</span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <p className="text-sm text-gray-500">Capaian / Target</p>
        <p className="font-bold text-gray-800 text-lg">{`${totalCurrent.toLocaleString()} / ${totalTarget.toLocaleString()}`}</p>
      </div>
    </div>
  );
};

export default SpDoughnutChart;