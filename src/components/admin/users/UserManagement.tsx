import React, { useState } from 'react';
import { User, UserX, Search, Filter } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'blocked';
  joinDate: string;
  lastActive: string;
  reviews: number;
  avatar: string;
}

const dummyUsers: UserData[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2024-03-20',
    reviews: 45,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya@example.com',
    status: 'blocked',
    joinDate: '2024-02-01',
    lastActive: '2024-03-15',
    reviews: 23,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
  }
];

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'blocked'>('all');

  const handleBlockUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' } 
        : user
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || user.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="bg-[#1F2937] p-6 rounded-xl">
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#374151] border border-gray-700 rounded-lg text-white placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="bg-[#374151] text-gray-300 rounded-lg px-3 py-2 border border-gray-700"
            >
              <option value="all">All Users</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-3 text-gray-400 font-medium">User</th>
                <th className="pb-3 text-gray-400 font-medium">Status</th>
                <th className="pb-3 text-gray-400 font-medium">Joined</th>
                <th className="pb-3 text-gray-400 font-medium">Last Active</th>
                <th className="pb-3 text-gray-400 font-medium">Reviews</th>
                <th className="pb-3 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map(user => (
                <tr key={user.id} className="text-gray-300">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      user.status === 'active' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                  <td>{new Date(user.lastActive).toLocaleDateString()}</td>
                  <td>{user.reviews}</td>
                  <td>
                    <button
                      onClick={() => handleBlockUser(user.id)}
                      className={`p-2 rounded-lg ${
                        user.status === 'active'
                          ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                          : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                      }`}
                    >
                      {user.status === 'active' ? <UserX size={20} /> : <User size={20} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};