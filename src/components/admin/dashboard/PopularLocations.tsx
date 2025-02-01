import React from 'react';
import { Map, TrendingUp } from 'lucide-react';

export const PopularLocations: React.FC = () => {
  const locations = [
    { name: 'Lakeside', visits: 1234, growth: '+12%' },
    { name: 'Lamachaur', visits: 956, growth: '+8%' },
    { name: 'Mahendrapool', visits: 845, growth: '+15%' },
    { name: 'Bagar', visits: 654, growth: '+5%' }
  ];

  return (
    <div className="bg-[#1F2937] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Map className="text-indigo-500" />
          Popular Locations
        </h3>
        <button className="text-indigo-400 hover:text-indigo-300">View All</button>
      </div>
      <div className="space-y-4">
        {locations.map((location, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-[#374151] rounded-lg">
            <div>
              <h4 className="font-medium text-white">{location.name}</h4>
              <p className="text-sm text-gray-400">{location.visits} visits</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-500">{location.growth}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};