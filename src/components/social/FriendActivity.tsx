import React from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { Review } from '../../types/Review';

interface Props {
  activities: Review[];
}

export const FriendActivity: React.FC<Props> = ({ activities }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Friend Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={activity.userAvatar}
                alt={activity.userName}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium">{activity.userName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(activity.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < activity.rating
                      ? 'fill-yellow-500 stroke-yellow-500'
                      : 'stroke-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <p className="text-gray-600 mb-2">{activity.text}</p>
            
            {activity.images.length > 0 && (
              <div className="flex gap-2 mb-2">
                {activity.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MessageCircle className="h-4 w-4" />
              <span>{activity.likes} likes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};