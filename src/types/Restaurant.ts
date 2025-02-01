export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  image: string;
  address: string;
  coordinates: [number, number];
  reviews: number;
  priceRange: string;
  description: string;
  specialties: string[];
  openingHours: string;
  phone?: string;
  website?: string;
  features?: string[];
  popularTimes?: {
    [key: string]: number[];
  };
  photos?: string[];
  menu?: {
    category: string;
    items: {
      name: string;
      price: number;
      description: string;
      image?: string;
      isSpicy?: boolean;
      isVegetarian?: boolean;
    }[];
  }[];
}