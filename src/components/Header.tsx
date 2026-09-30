import React, { useState, useRef, useEffect } from 'react';
import {
  Navigation,
  Search,
  MapPin,
  Compass,
  X,
  Scale,
  Sparkles,
} from 'lucide-react';
import { ActiveLocation, TempUnit } from '../types/weather';
import { searchCuratedIndianCities } from '../data/indianCities';

import { WindUnit } from '../types/weather';

interface HeaderProps {
  currentLocation: ActiveLocation | null;
  detectingLocation: boolean;
  onDetectLocation: () => void;
  onSelectCity: (location: ActiveLocation) => void;
  onOpenDirectory: () => void;
  onOpenCompare: () => void;
  tempUnit: TempUnit;
  onToggleTempUnit: () => void;
  windUnit: WindUnit;
  onToggleWindUnit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  detectingLocation,
  onDetectLocation,
  onSelectCity,
  onOpenDirectory,
  onOpenCompare,
  tempUnit,
  onToggleTempUnit,
  windUnit,
  onToggleWindUnit,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Search filtered curated cities
  const searchResults = searchCuratedIndianCities(searchQuery).slice(0, 6);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectFromSearch = (cityItem: ReturnType<typeof searchCuratedIndianCities>[0]) => {
    onSelectCity({
      city: cityItem.name,
      district: cityItem.famousFor,
      state: cityItem.state,
      country: 'India',
      latitude: cityItem.latitude,
      longitude: cityItem.longitude,
      isUserLocation: false,
      detectionSource: 'search',
    });
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 shadow-md text-white font-bold">
              <span className="text-lg">🌤️</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white">
                  Bharat<span className="text-sky-400">Mausam</span>
                </span>
                <span className="hidden sm:inline-block rounded-md bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                  भारत मौसम
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Live Geolocation & All Indian Cities Weather
              </p>
            </div>
          </div>

          {/* Search Box in Header */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-md min-w-[240px]">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsDropdownOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                placeholder="Search Indian city (e.g. Pune, Jaipur, Kochi)..."
                className="w-full rounded-2xl bg-white/5 border border-white/10 pl-10 pr-9 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:bg-white/10 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Dropdown Results */}
            {isDropdownOpen && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl bg-slate-900 border border-white/15 shadow-2xl overflow-hidden z-50 divide-y divide-white/5">
                {searchResults.length > 0 ? (
                  searchResults.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => handleSelectFromSearch(city)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <MapPin className="h-4 w-4 text-sky-400 shrink-0" />
                        <div>
                          <div className="font-semibold text-white text-sm">
                            {city.name} {city.hindiName ? `(${city.hindiName})` : ''}
                          </div>
                          <div className="text-xs text-slate-400">
                            {city.state} • {city.region} India
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-sky-400 font-medium">Select</span>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400">
                    <p>No quick matches in curated list.</p>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onOpenDirectory();
                      }}
                      className="mt-2 inline-flex items-center gap-1 text-sky-400 hover:underline font-semibold"
                    >
                      <Sparkles className="h-3 w-3" />
                      Search all Indian cities & towns
                    </button>
                  </div>
                )}

                <div className="p-2.5 bg-slate-950/70 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Want to browse all 36 States & UTs?</span>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onOpenDirectory();
                    }}
                    className="text-sky-300 hover:text-sky-200 font-semibold underline"
                  >
                    Open Directory
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live GPS Button */}
            <button
              onClick={onDetectLocation}
              disabled={detectingLocation}
              title="Detect your current city by GPS location"
              className={`relative inline-flex items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-bold transition-all ${
                currentLocation?.isUserLocation
                  ? 'bg-emerald-600/25 border border-emerald-500/40 text-emerald-300'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
              }`}
            >
              <Navigation className={`h-3.5 w-3.5 ${detectingLocation ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">
                {detectingLocation
                  ? 'Detecting GPS...'
                  : currentLocation?.isUserLocation
                  ? 'My City (Active)'
                  : 'Get By Location'}
              </span>
              <span className="sm:hidden">
                {detectingLocation ? '...' : 'Location'}
              </span>
              {currentLocation?.isUserLocation && (
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>

            {/* All Indian Cities Button */}
            <button
              onClick={onOpenDirectory}
              title="Explore all cities of India"
              className="inline-flex items-center gap-1.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 px-3.5 py-2 text-xs font-semibold text-white transition-colors"
            >
              <Compass className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden md:inline">All Cities of India</span>
              <span className="md:hidden">Cities</span>
            </button>

            {/* Compare Cities Button */}
            <button
              onClick={onOpenCompare}
              title="Compare 2 Indian cities"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 transition-colors"
            >
              <Scale className="h-3.5 w-3.5 text-purple-400" />
              <span>Compare</span>
            </button>

            {/* Temperature Unit Toggle (°C / °F) */}
            <button
              onClick={onToggleTempUnit}
              title="Toggle Temperature Unit (°C / °F)"
              className="flex h-9 w-11 items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-extrabold text-white transition-colors"
            >
              °{tempUnit}
            </button>

            {/* Wind Unit Toggle (km/h / mph) */}
            <button
              onClick={onToggleWindUnit}
              title="Toggle Wind Unit (km/h / mph)"
              className="hidden sm:flex h-9 px-2 items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-[11px] font-bold text-slate-200 transition-colors"
            >
              {windUnit}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
