import React from 'react';
import { Star, MapPin, DollarSign, MessageCircle } from 'lucide-react';
import { Restaurant } from '../types/Restaurant';

interface Props {
  restaurant: Restaurant;
  onClick?: () => void;
}

export const RestaurantCard: React.FC<Props> = ({ restaurant, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={restaurant.image} 
        alt={restaurant.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{restaurant.name}</h3>
          <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-sm">
            <Star size={16} className="fill-yellow-500 stroke-yellow-500" />
            {restaurant.rating}
          </span>
        </div>
        <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
        <div className="flex items-center gap-1 text-gray-500 mb-2">
          <MapPin size={16} />
          <span className="text-sm">{restaurant.address}</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="flex items-center gap-1 text-gray-600">
            <DollarSign size={16} />
            {restaurant.priceRange}
          </span>
          <span className="flex items-center gap-1 text-gray-600">
            <MessageCircle size={16} />
            {restaurant.reviews} reviews
          </span>
        </div>
      </div>
    </div>
  );
};