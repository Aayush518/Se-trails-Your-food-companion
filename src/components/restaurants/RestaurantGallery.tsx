import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface Props {
  images: string[];
  onImageClick?: (index: number) => void;
}

export const RestaurantGallery: React.FC<Props> = ({ images, onImageClick }) => {
  if (!images.length) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <ImageIcon className="h-5 w-5 text-purple-600" />
        Photo Gallery
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div 
            key={index}
            className="relative aspect-square cursor-pointer group"
            onClick={() => onImageClick?.(index)}
          >
            <img
              src={image}
              alt={`Restaurant photo ${index + 1}`}
              className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};