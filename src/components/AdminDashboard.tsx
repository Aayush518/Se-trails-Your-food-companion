import React from 'react';
import { Users, Utensils, Star, TrendingUp, BarChart3, PieChart, Activity, Map } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B1121] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Users', value: '2,547', icon: Users, change: '+12%', color: 'bg-indigo-500' },
            { label: 'Active Trails', value: '1,234', icon: Map, change: '+8%', color: 'bg-pink-500' },
            { label: 'Reviews', value: '8,901', icon: Star, change: '+15%', color: 'bg-purple-500' },
            { label: 'Restaurants', value: '456', icon: Utensils, change: '+5%', color: 'bg-blue-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-[#1F2937] rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400">{stat.label}</p>
                  <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-500">{stat.change}</span>
                <span className="text-gray-400">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Activity Chart */}
          <div className="bg-[#1F2937] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Activity className="text-indigo-500" />
                User Activity
              </h3>
              <select className="bg-[#374151] text-gray-300 rounded-lg px-3 py-1 border border-gray-700">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {[65, 45, 75, 55, 80, 60, 70].map((height, i) => (
                <div key={i} className="w-full">
                  <div 
                    className="bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-gray-400 text-sm">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

          {/* Popular Locations */}
          <div className="bg-[#1F2937] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Map className="text-indigo-500" />
                Popular Locations
              </h3>
              <button className="text-indigo-400 hover:text-indigo-300">View All</button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Lakeside', visits: 1234, growth: '+12%' },
                { name: 'Lamachaur', visits: 956, growth: '+8%' },
                { name: 'Mahendrapool', visits: 845, growth: '+15%' },
                { name: 'Bagar', visits: 654, growth: '+5%' }
              ].map((location, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#374151] rounded-lg">
                  <div>
                    <h4 className="font-medium">{location.name}</h4>
                    <p className="text-sm text-gray-400">{location.visits} visits</p>
                  </div>
                  <span className="text-green-500">{location.growth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
          <div className="bg-[#1F2937] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#374151]">
                  <th className="px-6 py-3 text-left text-gray-300">User</th>
                  <th className="px-6 py-3 text-left text-gray-300">Action</th>
                  <th className="px-6 py-3 text-left text-gray-300">Location</th>
                  <th className="px-6 py-3 text-left text-gray-300">Time</th>
                  <th className="px-6 py-3 text-left text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {[
                  { user: 'John Doe', action: 'Added new trail', location: 'Lakeside', time: '2 min ago', status: 'Completed' },
                  { user: 'Jane Smith', action: 'Posted review', location: 'Lamachaur', time: '5 min ago', status: 'Pending' },
                  { user: 'Mike Johnson', action: 'Updated profile', location: 'Mahendrapool', time: '10 min ago', status: 'Completed' }
                ].map((activity, index) => (
                  <tr key={index} className="hover:bg-[#374151]">
                    <td className="px-6 py-4">{activity.user}</td>
                    <td className="px-6 py-4">{activity.action}</td>
                    <td className="px-6 py-4">{activity.location}</td>
                    <td className="px-6 py-4 text-gray-400">{activity.time}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        activity.status === 'Completed' 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};