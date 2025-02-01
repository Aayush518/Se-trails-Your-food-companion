import React, { useState, useEffect } from 'react';
import { MessageCircle, Heart, Share2, MapPin, Star, Camera, Calendar } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface FeedItem {
  id: string;
  type: 'review' | 'trail' | 'visit';
  user: {
    name: string;
    avatar: string;
  };
  content: {
    text: string;
    images?: string[];
    rating?: number;
    location?: string;
    restaurantName?: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
}

const generateDummyFeed = (page: number): FeedItem[] => {
  const items: FeedItem[] = [];
  const startIndex = page * 10;
  
  const restaurantNames = [
    'Thakali Kitchen', 'Mountain View Café', 'Campus Corner', 
    'Himalayan Bites', 'Student Hub', 'Engineering Café'
  ];
  
  const locations = [
    'Lamachaur', 'IOE Campus', 'Deepjyoti Chowk', 
    'Engineering Block', 'Library Area', 'Campus Gate'
  ];
  
  const foodImages = [
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb',
    'https://images.unsplash.com/photo-1529042410759-befb1204b468',
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929',
    'https://images.unsplash.com/photo-1606787366850-de6330128bfc',
  ];
  
  for (let i = 0; i < 10; i++) {
    const uniqueId = `${page}-${startIndex + i}`;
    const types = ['review', 'trail', 'visit'] as const;
    const type = types[Math.floor(Math.random() * types.length)];
    
    items.push({
      id: uniqueId,
      type,
      user: {
        name: `User ${uniqueId}`,
        avatar: `https://i.pravatar.cc/150?u=${uniqueId}`,
      },
      content: {
        text: type === 'review' 
          ? `Just had an amazing meal at ${restaurantNames[Math.floor(Math.random() * restaurantNames.length)]}! The flavors were incredible and the atmosphere was perfect for studying. 🍽️ #CampusLife #FoodieLife`
          : `Discovered a great new spot in ${locations[Math.floor(Math.random() * locations.length)]}! Perfect for hanging out between classes. 🌟 #CampusExplorer`,
        images: [
          foodImages[Math.floor(Math.random() * foodImages.length)],
          foodImages[Math.floor(Math.random() * foodImages.length)]
        ],
        rating: type === 'review' ? Math.floor(Math.random() * 2) + 4 : undefined,
        location: locations[Math.floor(Math.random() * locations.length)],
        restaurantName: type === 'review' ? restaurantNames[Math.floor(Math.random() * restaurantNames.length)] : undefined,
      },
      timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 20),
    });
  }
  
  return items;
};

export const SocialFeed: React.FC = () => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newItems = generateDummyFeed(page);
      setItems(prev => [...prev, ...newItems]);
      setPage(prev => prev + 1);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {items.map((item) => (
        <div key={item.id} className="bg-white dark:bg-[#1F2937] rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          {/* Header */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={item.user.avatar}
                alt={item.user.name}
                className="w-12 h-12 rounded-full ring-2 ring-purple-500/20"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.user.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  {new Date(item.timestamp).toLocaleDateString()}
                </div>
              </div>
            </div>
            {item.content.rating && (
              <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-full font-medium">
                <Star className="h-4 w-4 fill-yellow-500" />
                <span>{item.content.rating}</span>
              </div>
            )}
          </div>

          {/* Location */}
          {item.content.location && (
            <div className="px-6 pb-3 flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">{item.content.location}</span>
              {item.content.restaurantName && (
                <>
                  <span className="mx-1">•</span>
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">{item.content.restaurantName}</span>
                </>
              )}
            </div>
          )}

          {/* Content */}
          <p className="px-6 pb-6 text-gray-700 dark:text-gray-300 leading-relaxed">{item.content.text}</p>

          {/* Images */}
          {item.content.images && item.content.images.length > 0 && (
            <div className="grid grid-cols-2 gap-0.5">
              {item.content.images.map((image, index) => (
                <div key={`${item.id}-image-${index}`} className="relative group">
                  <img
                    src={image}
                    alt={`Post ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors">
                <Heart className="h-5 w-5" />
                <span className="font-medium">{item.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">{item.comments}</span>
              </button>
            </div>
            <button className="text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-full">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      {/* Loading indicator */}
      <div ref={ref} className="py-6 text-center">
        {loading && (
          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" />
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-100" />
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-200" />
          </div>
        )}
      </div>
    </div>
  );
};