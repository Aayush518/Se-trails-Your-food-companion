import { useState, useMemo } from 'react';
import { Restaurant } from '../types/Restaurant';

interface Filters {
  cuisine?: string;
  rating?: number;
  price?: string;
  search?: string;
}

export const useRestaurantFilters = (restaurants: Restaurant[]) => {
  const [filters, setFilters] = useState<Filters>({});

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant => {
      if (filters.cuisine && restaurant.cuisine !== filters.cuisine) {
        return false;
      }
      if (filters.rating && restaurant.rating < filters.rating) {
        return false;
      }
      if (filters.price && restaurant.priceRange !== filters.price) {
        return false;
      }
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        return (
          restaurant.name.toLowerCase().includes(searchTerm) ||
          restaurant.cuisine.toLowerCase().includes(searchTerm) ||
          restaurant.address.toLowerCase().includes(searchTerm)
        );
      }
      return true;
    });
  }, [restaurants, filters]);

  return {
    filters,
    setFilters,
    filteredRestaurants
  };
};