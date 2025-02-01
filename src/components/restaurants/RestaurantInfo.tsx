import React from 'react';
import { Clock, MapPin, DollarSign, Tag } from 'lucide-react';
import { Restaurant } from '../../types/Restaurant';

interface Props {
  restaurant: Restaurant;
}

export const RestaurantInfo: React.FC<Props> = ({ restaurant }) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center gap-2 text-gray-600">
        <MapPin className="h-5 w-5 text-purple-600" />
        <span>{restaurant.address}</span>
      </div>

      <div className="flex items-center gap-2 text-gray-600">
        <Clock className="h-5 w-5 text-purple-600" />
        <span>{restaurant.openingHours}</span>
      </div>

      <div className="flex items-center gap-2 text-gray-600">
        <DollarSign className="h-5 w-5 text-purple-600" />
        <span>{restaurant.priceRange}</span>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Tag className="h-5 w-5 text-purple-600" />
          <span className="font-medium">Specialties</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {restaurant.specialties.map((specialty) => (
            <span
              key={specialty}
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      <p className="text-gray-600 mt-4">{restaurant.description}</p>
    </div>
  );
};