import React, { useState, useCallback } from 'react';
import { Search, MapPin, Utensils, Clock, Users, Bell, Home, Compass, UserSearch } from 'lucide-react';
import { RestaurantCard } from './RestaurantCard';
import { Map } from './Map';
import { Header } from './Header';
import { RestaurantHistory } from './restaurants/RestaurantHistory';
import { FriendActivity } from './social/FriendActivity';
import { FriendsList } from './social/FriendsList';
import { RestaurantFilters } from './restaurants/RestaurantFilters';
import { RestaurantDetails } from './restaurants/RestaurantDetails';
import { SocialFeed } from './social/SocialFeed';
import { UserSearch as UserSearchComponent } from './social/UserSearch';
import { restaurants } from '../data/restaurants';
import { dummyReviews, dummyVisitHistory } from '../data/dummyData';
import { useRestaurantFilters } from '../hooks/useRestaurantFilters';

interface TrailDetails {
  title: string;
  description: string;
  photos: string[];
}

interface CustomTrail {
  coordinates: [number, number];
  details: TrailDetails;
}

export const MainApp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'history' | 'social' | 'search'>('home');
  const { filters, setFilters, filteredRestaurants } = useRestaurantFilters(restaurants);
  const [visitHistory, setVisitHistory] = useState(dummyVisitHistory);
  const [customTrails, setCustomTrails] = useState<CustomTrail[]>([]);

  const handleRestaurantClick = (id: string) => {
    setSelectedRestaurant(id);
  };

  const handleAddTrail = useCallback((coordinates: [number, number], details: TrailDetails) => {
    setCustomTrails(prev => [...prev, { coordinates, details }]);
  }, []);

  const selectedRestaurantData = selectedRestaurant 
    ? restaurants.find(r => r.id === selectedRestaurant)
    : null;

  return (
    <div className="min-h-screen bg-[#0B1121]">
      <Header />

      {/* Navigation Tabs */}
      <div className="bg-[#111827] border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'explore', icon: Compass, label: 'Explore' },
              { id: 'history', icon: Clock, label: 'History' },
              { id: 'social', icon: Users, label: 'Social' },
              { id: 'search', icon: UserSearch, label: 'Search Users' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="grid gap-8">
            <div className="bg-[#1F2937] rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Welcome to SE-Trails</h2>
              <p className="text-gray-300 mb-6">Discover the best food spots in Lamachaur and connect with fellow food enthusiasts.</p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[#374151] p-4 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Popular Now</h3>
                  <p className="text-gray-400">See what's trending in your area</p>
                </div>
                <div className="bg-[#374151] p-4 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">New Reviews</h3>
                  <p className="text-gray-400">Latest food experiences shared</p>
                </div>
                <div className="bg-[#374151] p-4 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Friend Activity</h3>
                  <p className="text-gray-400">See where your friends are dining</p>
                </div>
              </div>
            </div>
            <SocialFeed />
          </div>
        )}

        {activeTab === 'explore' && (
          <>
            {/* Search Section */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for restaurants in Lamachaur..."
                  className="w-full pl-10 pr-4 py-3 bg-[#1F2937] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <RestaurantFilters onFilterChange={setFilters} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Map Section */}
              <div className="order-2 lg:order-1">
                <div className="sticky top-4">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                    <MapPin className="text-indigo-600" />
                    Lamachaur Food Map
                  </h2>
                  <Map 
                    restaurants={filteredRestaurants} 
                    onRestaurantClick={(restaurant) => handleRestaurantClick(restaurant.id)}
                    onAddTrail={handleAddTrail}
                    customTrails={customTrails}
                  />
                </div>
              </div>

              {/* Restaurant List */}
              <div className="order-1 lg:order-2">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                  <Utensils className="text-indigo-600" />
                  Popular Restaurants
                </h2>
                <div className="grid gap-6">
                  {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard 
                      key={restaurant.id} 
                      restaurant={restaurant}
                      onClick={() => handleRestaurantClick(restaurant.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'history' && (
          <RestaurantHistory 
            history={visitHistory}
            restaurants={restaurants}
          />
        )}

        {activeTab === 'social' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SocialFeed />
            </div>
            <div className="space-y-6">
              <FriendsList />
              <FriendActivity activities={dummyReviews} />
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <UserSearchComponent />
        )}
      </main>

      {/* Restaurant Details Modal */}
      {selectedRestaurantData && (
        <RestaurantDetails
          restaurant={selectedRestaurantData}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </div>
  );
};