import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { useReviews } from '../../hooks/useReviews';

interface Props {
  restaurantId: string;
}

export const ReviewList: React.FC<Props> = ({ restaurantId }) => {
  const { reviews, likeReview } = useReviews(restaurantId);

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <img
                src={review.userAvatar}
                alt={review.userName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{review.userName}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'fill-yellow-500 stroke-yellow-500'
                          : 'stroke-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p className="text-gray-600 mb-4">{review.text}</p>

          {review.images.length > 0 && (
            <div className="flex gap-2 mb-4">
              {review.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Review ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          <button
            onClick={() => likeReview(review.id)}
            className="flex items-center gap-1 text-gray-500 hover:text-purple-600"
          >
            <ThumbsUp className="h-4 w-4" />
            {review.likes} likes
          </button>
        </div>
      ))}
    </div>
  );
};