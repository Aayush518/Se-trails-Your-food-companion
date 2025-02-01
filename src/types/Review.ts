export interface Review {
  id: string;
  userId: string;
  restaurantId: string;
  rating: number;
  text: string;
  images: string[];
  likes: number;
  createdAt: string;
  userName: string;
  userAvatar?: string;
}