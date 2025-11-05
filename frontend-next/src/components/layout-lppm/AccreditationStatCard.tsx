import React from 'react';

interface StatBreakdownItem {
  name: string;
  value: number;
}

interface AccreditationStatCardProps {
  title: string;
  total: number;
  description?: string;
  icon: React.ReactNode;
  breakdown?: StatBreakdownItem[];
}

const AccreditationStatCard: React.FC<AccreditationStatCardProps> = ({ title, total, description, icon, breakdown }) => {
  return (
    <div className="bg-slate-100 p-4 rounded-lg flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
            <div className="flex-grow">
                <p className="text-sm font-semibold text-gray-600">{title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{total.toLocaleString()}</p>
            </div>
            <div className="text-teal-800 opacity-80">
                {icon}
            </div>
        </div>
      </div>
      <div className="mt-4">
        {breakdown && breakdown.length > 0 ? (
          <div className="space-y-2">
            {breakdown.map((item) => {
              if(item.value === 0) return null; // Don't show empty bars
              const percentage = total > 0 ? (item.value / total) * 100 : 0;
              return (
                <div key={item.name}>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="font-medium">{item.name}</span>
                    <span className="font-semibold">{item.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div
                      className="bg-primary h-1.5 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-gray-400 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};

export default AccreditationStatCard;