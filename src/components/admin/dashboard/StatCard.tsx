import React from 'react';
import { TrendingUp, DivideIcon as LucideIcon } from 'lucide-react';

interface Props {
  label: string;
  value: string;
  icon: LucideIcon;
  change: string;
  color: string;
}

export const StatCard: React.FC<Props> = ({ label, value, icon: Icon, change, color }) => {
  return (
    <div className="bg-[#1F2937] rounded-xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400">{label}</p>
          <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <TrendingUp className="h-4 w-4 text-green-500" />
        <span className="text-green-500">{change}</span>
        <span className="text-gray-400">vs last month</span>
      </div>
    </div>
  );
};