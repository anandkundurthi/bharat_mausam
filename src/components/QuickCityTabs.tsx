import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { ActiveLocation } from '../types/weather';
import { INDIAN_CITIES } from '../data/indianCities';

interface QuickCityTabsProps {
  currentCityName: string;
  favorites: string[]; // List of city names
  onSelectCity: (loc: ActiveLocation) => void;
  onOpenDirectory: () => void;
}

// Top Indian metros for fast 1-tap switching
const POPULAR_METROS = [
  'New Delhi',
  'Mumbai',
  'Bengaluru',
  'Kolkata',
  'Chennai',
  'Hyderabad',
  'Ahmedabad',
  'Pune',
  'Jaipur',
  'Lucknow',
  'Chandigarh',
  'Kochi (Cochin)',
  'Varanasi (Kashi)',
  'Shimla',
];

export const QuickCityTabs: React.FC<QuickCityTabsProps> = ({
  currentCityName,
  favorites,
  onSelectCity,
  onOpenDirectory,
}) => {
  const handleSelectMetro = (cityName: string) => {
    const found = INDIAN_CITIES.find(
      (c) => c.name.toLowerCase() === cityName.toLowerCase()
    );
    if (found) {
      onSelectCity({
        city: found.name,
        district: found.famousFor,
        state: found.state,
        country: 'India',
        latitude: found.latitude,
        longitude: found.longitude,
        isUserLocation: false,
        detectionSource: 'directory',
      });
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none select-none">
      <span className="text-xs font-semibold text-slate-400 shrink-0 flex items-center gap-1 pl-1">
        <MapPin className="h-3 w-3 text-sky-400" />
        Popular:
      </span>

      {/* User Favorites first */}
      {favorites.length > 0 &&
        favorites.map((favName) => {
          const isSelected =
            currentCityName.toLowerCase() === favName.toLowerCase();
          return (
            <button
              key={`fav-${favName}`}
              onClick={() => handleSelectMetro(favName)}
              className={`inline-flex shrink-0 items-center gap-1 rounded-xl px-3 py-1 text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                  : 'bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25'
              }`}
            >
              <Star className="h-3 w-3 fill-current" />
              <span>{favName}</span>
            </button>
          );
        })}

      {/* Popular Metros */}
      {POPULAR_METROS.map((name) => {
        const isSelected =
          currentCityName.toLowerCase() === name.toLowerCase();

        return (
          <button
            key={name}
            onClick={() => handleSelectMetro(name)}
            className={`shrink-0 rounded-xl px-3 py-1 text-xs font-medium transition-all ${
              isSelected
                ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            {name}
          </button>
        );
      })}

      {/* All Cities Link */}
      <button
        onClick={onOpenDirectory}
        className="shrink-0 rounded-xl bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300 hover:bg-blue-600/40"
      >
        + View All 150+ Cities
      </button>
    </div>
  );
};
