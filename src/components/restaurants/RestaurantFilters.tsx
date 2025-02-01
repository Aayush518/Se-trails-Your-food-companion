import React from 'react';
import { Filter, Star, DollarSign } from 'lucide-react';

interface Props {
  onFilterChange: (filters: { cuisine?: string; rating?: number; price?: string }) => void;
}

export const RestaurantFilters: React.FC<Props> = ({ onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="text-purple-600" />
        <h3 className="font-semibold">Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select 
          onChange={(e) => onFilterChange({ cuisine: e.target.value })}
          className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All Cuisines</option>
          <option value="Nepali">Nepali</option>
          <option value="Continental">Continental</option>
          <option value="Fast Food">Fast Food</option>
        </select>

        <div className="flex items-center gap-2">
          <Star className="text-yellow-500" />
          <select 
            onChange={(e) => onFilterChange({ rating: Number(e.target.value) })}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className="text-gray-600" />
          <select 
            onChange={(e) => onFilterChange({ price: e.target.value })}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Any Price</option>
            <option value="$">Budget</option>
            <option value="$$">Moderate</option>
            <option value="$$$">Premium</option>
          </select>
        </div>
      </div>
    </div>
  );
};