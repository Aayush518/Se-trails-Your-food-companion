import { useState, useEffect } from 'react';
import { Review } from '../types/Review';
import { dummyReviews } from '../data/dummyData';

export const useReviews = (restaurantId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from an API
    setReviews(dummyReviews.filter(review => review.restaurantId === restaurantId));
  }, [restaurantId]);

  const likeReview = async (reviewId: string) => {
    setReviews(reviews.map(review =>
      review.id === reviewId
        ? { ...review, likes: review.likes + 1 }
        : review
    ));
  };

  const addReview = async (review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: Math.random().toString(),
      createdAt: new Date().toISOString()
    };
    setReviews([newReview, ...reviews]);
  };

  return {
    reviews,
    likeReview,
    addReview
  };
};