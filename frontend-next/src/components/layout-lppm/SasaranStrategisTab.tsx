"use client";

import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ChevronDownIcon } from "@/components/icons/Icons";
import { GET_STRATEGIC_GOAL } from "@/graphql/lppm/strategic_goal.graphql";


const ProgressBar: React.FC<{ current: number; target: number, unit: string }> = ({ current, target, unit }) => {
    const percentage = target > 0 ? (current / target) * 100 : 0;
    const displayPercentage = Math.min(Math.round(percentage), 100);
  
    return (
      <div className="w-full">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-primary">{`${current} / ${target} ${unit}`}</span>
          <span className="text-sm font-medium text-primary">{`${displayPercentage}%`}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-teal-500 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${displayPercentage}%` }}
          ></div>
        </div>
      </div>
    );
};

const SasaranStrategisTab = () => {

    const { data, loading, error } = useQuery(GET_STRATEGIC_GOAL);
    const [openObjective, setOpenObjective] = useState<string | null>(null);

    const handleToggle = (code: string) => {
        setOpenObjective(prevCode => (prevCode === code ? null : code));
    };
    
    const getStrategicGoal = [...(data?.getStrategicGoal || [])]
        .sort((a, b) => a.code.localeCompare(b.code));
    console.log("DATA GET STRATEGIC GOAL:", getStrategicGoal);

    return (
    <>
    {getStrategicGoal.map(sg => (
        <div key={sg.code} className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="pb-4 border-b border-gray-200">
                <h3 className="text-lg sm:text-xl font-bold text-primary">{sg.code}</h3>
                <p className="text-gray-600 font-medium mt-1">{sg.name}</p>
            </div>
            <div className="mt-4 space-y-3">
                {[...(sg.objectives || [])]
                    .sort((a, b) => a.code.localeCompare(b.code))
                    .map(objective => (
                    <div key={objective.code} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                            onClick={() => handleToggle(objective.code)}
                            className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none"
                            aria-expanded={openObjective === objective.code}
                        >
                            <div className="text-left">
                            <p className="font-semibold text-primary">{objective.code}</p>
                            <p className="text-gray-700">{objective.name}</p>
                            </div>
                            <ChevronDownIcon className={`h-6 w-6 text-gray-500 transform transition-transform duration-200 ${openObjective === objective.code ? 'rotate-180' : ''}`} />
                        </button>

                        {openObjective === objective.code && (
                            <div className="p-4 border-t border-gray-200 divide-y divide-gray-200">
                                {[...(objective.actions || [])]
                                    .sort((a, b) => a.code.localeCompare(b.code))
                                    .map(action => (
                                    <div key={action.code} className="py-4 first:pt-0 last:pb-0">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-grow">
                                                <p className="text-sm font-semibold text-gray-800">{action.code}</p>
                                                <p className="text-sm text-gray-600 mb-2">{action.name}</p>
                                            </div>
                                        </div>
                                        <ProgressBar current={action.current} target={action.target} unit={action.unit} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    ))}
    </>
    );
};

export default SasaranStrategisTab;