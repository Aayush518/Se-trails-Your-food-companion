import React from 'react';
import { Clock, MapPin, Calendar, Navigation } from 'lucide-react';
import { Restaurant } from '../../types/Restaurant';

interface VisitHistory {
  id: string;
  restaurantId: string;
  date: string;
  rating: number;
  notes: string;
  photos: string[];
  coordinates?: [number, number];
}

interface Props {
  history: VisitHistory[];
  restaurants: Restaurant[];
}

export const RestaurantHistory: React.FC<Props> = ({ history, restaurants }) => {
  const getRestaurant = (id: string) => restaurants.find(r => r.id === id);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
        <Clock className="text-indigo-600" />
        Your Food Journey
      </h2>

      <div className="grid gap-6">
        {history.map((visit) => {
          const restaurant = visit.restaurantId === 'custom' ? null : getRestaurant(visit.restaurantId);

          return (
            <div key={visit.id} className="bg-[#1F2937] rounded-xl shadow-lg overflow-hidden border border-gray-800">
              {restaurant ? (
                // Restaurant Visit
                <div className="relative h-48">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{restaurant.name}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-4 w-4" />
                      {restaurant.address}
                    </div>
                  </div>
                </div>
              ) : (
                // Custom Trail Point
                <div className="relative h-48 bg-gradient-to-br from-indigo-600 to-purple-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Navigation className="h-16 w-16 text-white/50" />
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Custom Trail Point</h3>
                    {visit.coordinates && (
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-4 w-4" />
                        {visit.coordinates[0].toFixed(6)}, {visit.coordinates[1].toFixed(6)}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="p-4 text-white">
                <div className="flex items-center gap-2 text-gray-400 mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(visit.date).toLocaleDateString()}</span>
                </div>

                {visit.notes && (
                  <p className="text-gray-300 mb-4">{visit.notes}</p>
                )}

                {visit.photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {visit.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Visit photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};