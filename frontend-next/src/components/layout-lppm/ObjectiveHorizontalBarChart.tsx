"use client";

import React, { useMemo } from 'react';

interface YearlyData {
    year: number;
    value: number;
  }
  
  interface ACTION {
    id: string;
    code?: string;
    name?: string;
    current: number;
    target: number;
    yearlyData?: YearlyData[]; // bentuk array seperti dari GraphQL
  }
  
  interface OBJECTIVE {
    id: string;
    code: string;
    name: string;
    actions?: ACTION[];
  }
  
  interface ObjectiveProgressBarProps {
    objective: OBJECTIVE;
    selectedYear: string;
  }

const ObjectiveProgressBar: React.FC<ObjectiveProgressBarProps> = ({ objectives, selectedYear }) => {
    const { totalCurrent, totalTarget, percentage } = useMemo(() => {
        const actions = objectives.actions ?? [];
        let totalCurrent = 0;
        let totalTarget = 0;
    
        for (const action of actions) {
          let yearlyValue = 0;
    
          if (selectedYear === "All Years") {
            yearlyValue = action.current ?? 0;
          } else {
            const yearInt = parseInt(selectedYear);
            const found = action.yearlyData?.find((yd) => yd.year === yearInt);
            yearlyValue = found?.value ?? 0;
          }
    
          totalCurrent += yearlyValue;
          totalTarget += action.target ?? 0;
        }
    
        const percentage = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;
    
        return {
          totalCurrent,
          totalTarget,
          percentage: Math.round(percentage),
        };
      }, [objectives, selectedYear]);

    return (
        <div>
            <div className="flex justify-between mb-1 items-center">
                <span className="text-sm font-medium text-gray-700 w-4/5 truncate" title={objectives.name}>
                    <span className="font-bold">{objectives.code}:</span> {objectives.name}
                </span>
                <span className="text-sm font-bold text-teal-800">{`${percentage}%`}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                    className="bg-teal-800 h-4 rounded-full transition-all duration-500" 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <div className="flex justify-end mt-1">
              <span className="text-xs text-gray-500 font-medium">{`Capaian: ${totalCurrent.toLocaleString()} / ${totalTarget.toLocaleString()}`}</span>
            </div>
        </div>
    );
}

interface ObjectiveHorizontalBarChartProps {
    objectives: OBJECTIVE[];
    selectedYear: string;
}

const ObjectiveHorizontalBarChart: React.FC<ObjectiveHorizontalBarChartProps> = ({ objectives, selectedYear }) => {
    return (
        <div className="p-4 rounded-lg h-full bg-white shadow-sm">
            <div className="space-y-4">
                {objectives.map(objectives => (
                    <ObjectiveProgressBar key={objectives.code} objectives={objectives} selectedYear={selectedYear} />
                ))}
            </div>
        </div>
    );
}

export default ObjectiveHorizontalBarChart;