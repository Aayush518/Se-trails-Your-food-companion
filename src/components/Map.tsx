import React, { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Restaurant } from '../types/Restaurant';
import { Plus, Navigation, Camera, MapPin } from 'lucide-react';
import L from 'leaflet';

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Props {
  restaurants: Restaurant[];
  onRestaurantClick?: (restaurant: Restaurant) => void;
  onAddTrail?: (coordinates: [number, number], details: TrailDetails) => void;
  customTrails?: { coordinates: [number, number]; details: TrailDetails }[];
}

interface TrailDetails {
  title: string;
  description: string;
  photos: string[];
}

const MapEvents: React.FC<{ onAddTrail: (coordinates: [number, number], details: TrailDetails) => void }> = ({ onAddTrail }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState<[number, number] | null>(null);
  const [details, setDetails] = useState<TrailDetails>({
    title: '',
    description: '',
    photos: []
  });

  const handleMapClick = useCallback((e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    setPopupPosition([lat, lng]);
    setShowPopup(true);
  }, []);

  useMapEvents({
    contextmenu: handleMapClick,
    click: () => {
      if (!showPopup) return;
      setShowPopup(false);
      setDetails({ title: '', description: '', photos: [] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!popupPosition) return;
    onAddTrail(popupPosition, details);
    setShowPopup(false);
    setDetails({ title: '', description: '', photos: [] });
  };

  return popupPosition && showPopup ? (
    <Popup
      position={popupPosition}
      onClose={() => {
        setShowPopup(false);
        setDetails({ title: '', description: '', photos: [] });
      }}
    >
      <form onSubmit={handleSubmit} className="w-64 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            required
            value={details.title}
            onChange={(e) => setDetails({ ...details, title: e.target.value })}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            required
            value={details.description}
            onChange={(e) => setDetails({ ...details, description: e.target.value })}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Photos</label>
          <input
            type="url"
            placeholder="Photo URL"
            value={details.photos[0] || ''}
            onChange={(e) => setDetails({ ...details, photos: [e.target.value] })}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          <Plus className="h-4 w-4" />
          Add Trail Point
        </button>
      </form>
    </Popup>
  ) : null;
};

const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const Map: React.FC<Props> = ({ restaurants, onRestaurantClick, onAddTrail, customTrails = [] }) => {
  // Lamachaur, Pokhara coordinates
  const center: [number, number] = [28.2622, 83.9722];

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-[1000] bg-[#1F2937]/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-700">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Plus className="h-4 w-4 text-indigo-400" />
          Right-click on map to add a trail
        </div>
      </div>
      <MapContainer
        center={center}
        zoom={15}
        className="w-full h-[500px] rounded-xl shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={restaurant.coordinates}
            eventHandlers={{
              click: () => onRestaurantClick?.(restaurant),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{restaurant.name}</h3>
                <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                <p className="text-sm text-gray-600">{restaurant.rating} ★</p>
              </div>
            </Popup>
          </Marker>
        ))}
        {customTrails.map((trail, index) => (
          <Marker
            key={`trail-${index}`}
            position={trail.coordinates}
            icon={customIcon}
          >
            <Popup>
              <div className="p-2 w-64">
                <h3 className="font-semibold">{trail.details.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{trail.details.description}</p>
                {trail.details.photos.length > 0 && (
                  <img
                    src={trail.details.photos[0]}
                    alt="Trail"
                    className="mt-2 w-full h-32 object-cover rounded-lg"
                  />
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        {onAddTrail && <MapEvents onAddTrail={onAddTrail} />}
      </MapContainer>
    </div>
  );
};