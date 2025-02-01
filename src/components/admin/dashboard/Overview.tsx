import React from 'react';
import { Users, Utensils, Star, TrendingUp } from 'lucide-react';
import { StatCard } from './StatCard';
import { ActivityChart } from './charts/ActivityChart';
import { PopularLocations } from './PopularLocations';

export const Overview: React.FC = () => {
  const stats = [
    { label: 'Total Users', value: '2,547', icon: Users, change: '+12%', color: 'bg-indigo-500' },
    { label: 'Active Trails', value: '1,234', icon: Star, change: '+8%', color: 'bg-pink-500' },
    { label: 'Reviews', value: '8,901', icon: Star, change: '+15%', color: 'bg-purple-500' },
    { label: 'Restaurants', value: '456', icon: Utensils, change: '+5%', color: 'bg-blue-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActivityChart />
        <PopularLocations />
      </div>
    </div>
  );
};