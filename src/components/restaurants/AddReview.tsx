import React, { useState } from 'react';
import { Star, Image as ImageIcon, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useReviews } from '../../hooks/useReviews';

interface Props {
  restaurantId: string;
}

export const AddReview: React.FC<Props> = ({ restaurantId }) => {
  const { user } = useAuth();
  const { addReview } = useReviews(restaurantId);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addReview({
        userId: user.id,
        restaurantId,
        rating,
        text,
        images,
        likes: 0,
        userName: user.name,
        userAvatar: user.avatar
      });
      
      // Reset form
      setRating(0);
      setText('');
      setImages([]);
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Convert files to URLs (in a real app, you'd upload these to a server)
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <Star
                className={`h-6 w-6 ${
                  star <= (hoveredStar || rating)
                    ? 'fill-yellow-500 stroke-yellow-500'
                    : 'stroke-gray-400'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[100px]"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="flex items-center gap-1 text-gray-600 hover:text-purple-600">
              <ImageIcon className="h-5 w-5" />
              <span>Add Photos</span>
            </div>
          </label>
          {images.length > 0 && (
            <span className="text-sm text-gray-500">
              {images.length} photo{images.length > 1 ? 's' : ''} selected
            </span>
          )}
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Send className="h-4 w-4" />
          Post Review
        </button>
      </div>

      {images.length > 0 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Preview ${index + 1}`}
              className="h-20 w-20 object-cover rounded-lg"
            />
          ))}
        </div>
      )}
    </form>
  );
};