import React, { useState } from 'react';
import { Star, Clock, MapPin, DollarSign, MessageCircle, Camera, Heart, Share2, X, Phone, Globe, Tag, ThumbsUp } from 'lucide-react';
import { Restaurant } from '../../types/Restaurant';
import { Review } from '../../types/Review';
import { ReviewList } from './ReviewList';
import { AddReview } from './AddReview';
import { RestaurantGallery } from './RestaurantGallery';
import { RestaurantInfo } from './RestaurantInfo';

interface Props {
  restaurant: Restaurant;
  onClose: () => void;
}

export const RestaurantDetails: React.FC<Props> = ({ restaurant, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'photos' | 'menu'>('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = () => {
    // In a real app, this would open a share dialog
    console.log('Sharing restaurant:', restaurant.name);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Header Image */}
        <div className="relative h-80">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <Heart className={`h-6 w-6 ${isFavorite ? 'fill-red-500 stroke-red-500' : 'stroke-gray-600'}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <Share2 className="h-6 w-6 stroke-gray-600" />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 stroke-gray-600" />
            </button>
          </div>

          {/* Restaurant Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">{restaurant.name}</h2>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-500 stroke-yellow-500" />
                <span className="font-semibold">{restaurant.rating}</span>
                <span className="text-gray-300">({restaurant.reviews} reviews)</span>
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-5 w-5" />
                {restaurant.priceRange}
              </span>
              <span className="flex items-center gap-1">
                <Tag className="h-5 w-5" />
                {restaurant.cuisine}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b">
          <div className="flex">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'photos', label: 'Photos' },
              { id: 'menu', label: 'Menu' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <RestaurantInfo restaurant={restaurant} />
              
              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex items-center justify-center gap-2 p-3 bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100">
                  <Phone className="h-5 w-5" />
                  Call
                </button>
                <button className="flex items-center justify-center gap-2 p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100">
                  <Globe className="h-5 w-5" />
                  Website
                </button>
                <button className="flex items-center justify-center gap-2 p-3 bg-green-50 rounded-lg text-green-700 hover:bg-green-100">
                  <MessageCircle className="h-5 w-5" />
                  Message
                </button>
                <button className="flex items-center justify-center gap-2 p-3 bg-yellow-50 rounded-lg text-yellow-700 hover:bg-yellow-100">
                  <Camera className="h-5 w-5" />
                  Add Photo
                </button>
              </div>

              {/* Popular Dishes */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Popular Dishes</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {restaurant.specialties.map((dish, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium">{dish}</h4>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                        <ThumbsUp className="h-4 w-4" />
                        {Math.floor(Math.random() * 50 + 20)} recommendations
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Location & Hours</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-gray-600 mt-1" />
                    <div>
                      <p className="font-medium">{restaurant.address}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Located in the heart of Lamachaur, near the Engineering College
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-600 mt-1" />
                    <div>
                      <p className="font-medium">Opening Hours</p>
                      <p className="text-sm text-gray-600 mt-1">{restaurant.openingHours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <AddReview restaurantId={restaurant.id} />
              <ReviewList restaurantId={restaurant.id} />
            </div>
          )}

          {activeTab === 'photos' && (
            <RestaurantGallery 
              images={[
                restaurant.image,
                'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb',
                'https://images.unsplash.com/photo-1529042410759-befb1204b468',
                'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae',
                'https://images.unsplash.com/photo-1481931098730-318b6f776db0'
              ]}
            />
          )}

          {activeTab === 'menu' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-800">
                  Menu photos and prices are for reference only. Please contact the restaurant for the latest menu and prices.
                </p>
              </div>

              {/* Sample Menu Categories */}
              {[
                {
                  name: 'Popular Items',
                  items: [
                    { name: 'Special Thakali Set', price: 'Rs. 350', description: 'Traditional Nepali thali with dal, rice, and assorted curries' },
                    { name: 'Chicken Momo', price: 'Rs. 180', description: 'Steamed dumplings filled with spiced minced chicken' }
                  ]
                },
                {
                  name: 'Main Course',
                  items: [
                    { name: 'Butter Chicken', price: 'Rs. 400', description: 'Creamy tomato-based curry with tender chicken pieces' },
                    { name: 'Veg Pulao', price: 'Rs. 220', description: 'Fragrant rice cooked with mixed vegetables and spices' }
                  ]
                }
              ].map((category) => (
                <div key={category.name}>
                  <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                  <div className="space-y-4">
                    {category.items.map((item, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{item.name}</h4>
                          <span className="text-purple-600 font-medium">{item.price}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};