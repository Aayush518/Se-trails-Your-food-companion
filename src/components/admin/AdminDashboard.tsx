import React, { useState } from 'react';
import { Shield, Users, Utensils, BarChart2, Settings, LogOut } from 'lucide-react';
import { Overview } from './dashboard/Overview';
import { UserManagement } from './users/UserManagement';
import { RestaurantManagement } from './restaurants/RestaurantManagement';

interface Props {
  onLogout: () => void;
}

type Tab = 'overview' | 'users' | 'restaurants' | 'settings';

export const AdminDashboard: React.FC<Props> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'restaurants', label: 'Restaurants', icon: Utensils },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#0B1121]">
      {/* Header */}
      <header className="bg-[#1F2937] border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600/10 rounded-lg">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <h1 className="text-xl font-bold text-white">SE-Trails Admin</h1>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/10 text-red-600 rounded-lg hover:bg-red-600/20 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-[#1F2937] text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'restaurants' && <RestaurantManagement />}
        {activeTab === 'settings' && (
          <div className="bg-[#1F2937] p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-4">Settings</h2>
            {/* Add settings content */}
          </div>
        )}
      </div>
    </div>
  );
};