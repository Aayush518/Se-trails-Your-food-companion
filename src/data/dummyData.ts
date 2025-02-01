import { Review } from '../types/Review';
import { User } from '../types/User';
import { Restaurant } from '../types/Restaurant';

export const dummyVisitHistory = [
  {
    id: '1',
    restaurantId: '1',
    date: '2024-03-15',
    rating: 5,
    notes: 'Amazing momo and thukpa! Will definitely come back.',
    photos: [
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb',
      'https://images.unsplash.com/photo-1529042410759-befb1204b468',
      'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae'
    ]
  },
  {
    id: '2',
    restaurantId: '2',
    date: '2024-03-10',
    rating: 4,
    notes: 'Great ambiance and mountain view. The pasta was delicious!',
    photos: [
      'https://images.unsplash.com/photo-1481931098730-318b6f776db0',
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141'
    ]
  }
];

export const dummyReviews: Review[] = [
  {
    id: '1',
    userId: '1',
    restaurantId: '1',
    rating: 5,
    text: 'Amazing momo and thukpa! The authentic Nepali flavors really shine through.',
    images: [
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb',
      'https://images.unsplash.com/photo-1529042410759-befb1204b468'
    ],
    likes: 24,
    createdAt: '2024-03-15T10:30:00Z',
    userName: 'Aarav Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
  },
  {
    id: '2',
    userId: '2',
    restaurantId: '1',
    rating: 4,
    text: 'Great student hangout spot with reasonable prices. The chowmein is a must-try!',
    images: [
      'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae'
    ],
    likes: 18,
    createdAt: '2024-03-14T15:45:00Z',
    userName: 'Priya Patel',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
  }
];

export const dummyFriends: User[] = [
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    location: 'Lamachaur, Pokhara',
    friendIds: ['1'],
    pendingFriendIds: [],
    favoriteRestaurants: ['1', '3']
  },
  {
    id: '3',
    name: 'Raj Kumar',
    email: 'raj@example.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    location: 'Lamachaur, Pokhara',
    friendIds: ['1'],
    pendingFriendIds: [],
    favoriteRestaurants: ['2']
  }
];

export const dummyPendingFriends: User[] = [
  {
    id: '4',
    name: 'Maya Gurung',
    email: 'maya@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    location: 'Lamachaur, Pokhara',
    friendIds: [],
    pendingFriendIds: ['1'],
    favoriteRestaurants: ['1']
  }
];

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Hungry Hub Lamachaur',
    cuisine: 'Nepali',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1625398407796-82650a8c9285',
    address: 'Lamachaur Road, Near Engineering College',
    coordinates: [28.2622, 83.9722],
    reviews: 342,
    priceRange: '$$',
    description: 'Popular spot for engineering students serving authentic Nepali thali',
    specialties: ['Thakali Set', 'Momo', 'Chowmein'],
    openingHours: '10:00 AM - 9:00 PM'
  },
  {
    id: '2',
    name: 'Mountain View Restaurant',
    cuisine: 'Continental',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e',
    address: 'Lamachaur Heights, Pokhara',
    coordinates: [28.2625, 83.9725],
    reviews: 256,
    priceRange: '$$$',
    description: 'Scenic dining with Annapurna mountain views',
    specialties: ['Wood-fired Pizza', 'Pasta', 'Grilled Fish'],
    openingHours: '11:00 AM - 10:00 PM'
  },
  {
    id: '3',
    name: 'Campus Corner Café',
    cuisine: 'Fast Food',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
    address: 'Near Engineering Campus Gate',
    coordinates: [28.2620, 83.9720],
    reviews: 189,
    priceRange: '$',
    description: 'Student-friendly café with quick bites',
    specialties: ['Burgers', 'Sandwiches', 'Coffee'],
    openingHours: '8:00 AM - 8:00 PM'
  }
];