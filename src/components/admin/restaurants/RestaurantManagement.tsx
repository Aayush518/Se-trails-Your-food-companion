import React, { useState } from 'react';
import { Search, Filter, Edit, Trash2, Plus } from 'lucide-react';
import { Restaurant } from '../../../types/Restaurant';
import { restaurants as initialRestaurants } from '../../../data/restaurants';

export const RestaurantManagement: React.FC = () => {
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');

  const handleDeleteRestaurant = (id: string) => {
    setRestaurants(restaurants.filter(r => r.id !== id));
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="bg-[#1F2937] p-6 rounded-xl">
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#374151] border border-gray-700 rounded-lg text-white placeholder-gray-400"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Plus size={20} />
            Add Restaurant
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-3 text-gray-400 font-medium">Restaurant</th>
                <th className="pb-3 text-gray-400 font-medium">Cuisine</th>
                <th className="pb-3 text-gray-400 font-medium">Rating</th>
                <th className="pb-3 text-gray-400 font-medium">Reviews</th>
                <th className="pb-3 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredRestaurants.map(restaurant => (
                <tr key={restaurant.id} className="text-gray-300">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium text-white">{restaurant.name}</div>
                        <div className="text-sm text-gray-400">{restaurant.address}</div>
                      </div>
                    </div>
                  </td>
                  <td>{restaurant.cuisine}</td>
                  <td>{restaurant.rating}</td>
                  <td>{restaurant.reviews}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20">
                        <Edit size={20} />
                      </button>
                      <button 
                        onClick={() => handleDeleteRestaurant(restaurant.id)}
                        className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
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