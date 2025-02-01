import React, { useState } from 'react';
import { Search, UserPlus, MapPin, Coffee } from 'lucide-react';
import { User } from '../../types/User';

const dummyUsers: User[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    location: 'Lamachaur, Pokhara',
    bio: 'Food enthusiast exploring local cuisines',
    friendIds: [],
    pendingFriendIds: [],
    favoriteRestaurants: ['1', '2']
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    location: 'Lakeside, Pokhara',
    bio: 'Foodie and photographer',
    friendIds: [],
    pendingFriendIds: [],
    favoriteRestaurants: ['3', '4']
  },
  // Add more dummy users as needed
];

export const UserSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(dummyUsers);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = dummyUsers.filter(user => 
      user.name.toLowerCase().includes(term) ||
      user.location?.toLowerCase().includes(term) ||
      user.bio?.toLowerCase().includes(term)
    );
    
    setFilteredUsers(filtered);
  };

  const handleConnect = (userId: string) => {
    // In a real app, this would send a friend request
    console.log('Sending friend request to:', userId);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#1F2937] rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Find Food Enthusiasts</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, location, or interests..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 bg-[#374151] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map(user => (
          <div key={user.id} className="bg-[#1F2937] rounded-xl overflow-hidden border border-gray-800">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-2 border-indigo-600"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                  <div className="flex items-center gap-1 text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{user.location}</span>
                  </div>
                </div>
              </div>

              {user.bio && (
                <p className="text-gray-300 mb-4">{user.bio}</p>
              )}

              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <Coffee className="h-4 w-4" />
                <span className="text-sm">{user.favoriteRestaurants.length} favorite spots</span>
              </div>

              <button
                onClick={() => handleConnect(user.id)}
                className="w-full flex items-center justify-center gap-2 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};