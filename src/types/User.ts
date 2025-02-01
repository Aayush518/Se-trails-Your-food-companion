export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  role?: 'user' | 'admin';
  friendIds: string[];
  pendingFriendIds: string[];
  favoriteRestaurants: string[];
}