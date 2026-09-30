import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  X,
  MapPin,
  Sparkles,
  Mountain,
  Compass,
  Filter,
  ArrowRight,
  Loader2,
  Building2,
  Landmark,
  Waves,
} from 'lucide-react';
import { IndianCity, Region, CityCategory, ActiveLocation } from '../types/weather';
import { INDIAN_CITIES, INDIAN_STATES, INDIAN_REGIONS } from '../data/indianCities';
import { searchAllIndianCities } from '../services/weatherService';

interface AllIndianCitiesDirectoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (location: ActiveLocation) => void;
  currentCityName?: string;
}

export const AllIndianCitiesDirectory: React.FC<AllIndianCitiesDirectoryProps> = ({
  isOpen,
  onClose,
  onSelectCity,
  currentCityName,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<CityCategory | 'All'>('All');
  const [liveGeoResults, setLiveGeoResults] = useState<Array<{
    id: string;
    name: string;
    state: string;
    latitude: number;
    longitude: number;
  }>>([]);
  const [isSearchingLive, setIsSearchingLive] = useState(false);

  // Debounced live geocoding search for towns/villages outside curated list
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 3) {
      setLiveGeoResults([]);
      setIsSearchingLive(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingLive(true);
      try {
        const results = await searchAllIndianCities(searchQuery);
        // Deduplicate against curated cities
        const curatedNames = new Set(INDIAN_CITIES.map((c) => c.name.toLowerCase()));
        const uniqueLive = results.filter(
          (r) => !curatedNames.has(r.name.toLowerCase())
        );
        setLiveGeoResults(uniqueLive);
      } catch (err) {
        console.warn('Live search error:', err);
      } finally {
        setIsSearchingLive(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter curated cities
  const filteredCities = useMemo(() => {
    let list = INDIAN_CITIES;

    // Filter by Region
    if (selectedRegion !== 'All') {
      list = list.filter((c) => c.region === selectedRegion);
    }

    // Filter by State
    if (selectedState !== 'All') {
      list = list.filter((c) => c.state === selectedState);
    }

    // Filter by Category
    if (selectedCategory !== 'All') {
      list = list.filter((c) => c.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.state.toLowerCase().includes(q) ||
          c.region.toLowerCase().includes(q) ||
          (c.famousFor && c.famousFor.toLowerCase().includes(q)) ||
          (c.hindiName && c.hindiName.includes(q))
      );
    }

    return list;
  }, [selectedRegion, selectedState, selectedCategory, searchQuery]);

  if (!isOpen) return null;

  const handleSelectCurated = (city: IndianCity) => {
    onSelectCity({
      city: city.name,
      district: city.famousFor,
      state: city.state,
      country: 'India',
      latitude: city.latitude,
      longitude: city.longitude,
      isUserLocation: false,
      detectionSource: 'directory',
    });
    onClose();
  };

  const handleSelectLive = (geo: { name: string; state: string; latitude: number; longitude: number }) => {
    onSelectCity({
      city: geo.name,
      state: geo.state,
      country: 'India',
      latitude: geo.latitude,
      longitude: geo.longitude,
      isUserLocation: false,
      detectionSource: 'search',
    });
    onClose();
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('All');
    setSelectedState('All');
    setSelectedCategory('All');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex flex-col h-[92vh] w-full max-w-5xl rounded-3xl bg-slate-900 border border-white/15 shadow-2xl text-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-black shadow-lg">
              🇮🇳
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                All Cities of India Directory
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {INDIAN_CITIES.length}+ Cities Cataloged
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Explore weather across all 28 Indian States & 8 Union Territories
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="border-b border-white/10 px-6 py-3.5 bg-slate-900/90">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any Indian city, district, state or Hindi name (e.g. Pune, Jaipur, Varanasi, शिमला, लद्दाख)..."
              className="w-full rounded-2xl bg-slate-800/80 border border-white/10 pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              autoFocus
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

          {/* Category Quick Pills */}
          <div className="mt-3 flex flex-wrap gap-1.5 items-center">
            <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="h-3 w-3" /> Filter:
            </span>

            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedCategory('metro')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors flex items-center gap-1 ${
                selectedCategory === 'metro'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Building2 className="h-3 w-3" /> Metros & Tier 1
            </button>
            <button
              onClick={() => setSelectedCategory('hill_station')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors flex items-center gap-1 ${
                selectedCategory === 'hill_station'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Mountain className="h-3 w-3 text-teal-400" /> Hill Stations
            </button>
            <button
              onClick={() => setSelectedCategory('spiritual')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors flex items-center gap-1 ${
                selectedCategory === 'spiritual'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Landmark className="h-3 w-3 text-amber-400" /> Spiritual & Heritage
            </button>
            <button
              onClick={() => setSelectedCategory('coastal')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors flex items-center gap-1 ${
                selectedCategory === 'coastal'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Waves className="h-3 w-3 text-sky-400" /> Coastal
            </button>
          </div>

          {/* Region and State Filters */}
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {/* Region pills */}
            <div className="flex flex-wrap gap-1 items-center">
              <span className="text-[11px] text-slate-400 mr-1 flex items-center gap-1">
                <Compass className="h-3 w-3" /> Region:
              </span>
              <button
                onClick={() => setSelectedRegion('All')}
                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-medium transition-colors ${
                  selectedRegion === 'All'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                All Regions
              </button>
              {INDIAN_REGIONS.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1 ${
                    selectedRegion === reg.id
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{reg.icon}</span>
                  <span>{reg.label}</span>
                </button>
              ))}
            </div>

            {/* State selector dropdown */}
            <div className="ml-auto flex items-center gap-2">
              <label htmlFor="state-select" className="text-xs text-slate-400">State/UT:</label>
              <select
                id="state-select"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="rounded-xl bg-slate-800 border border-white/15 px-2.5 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All States & UTs (36)</option>
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/20">
          {/* Active Filter Indicators */}
          {(selectedRegion !== 'All' || selectedState !== 'All' || selectedCategory !== 'All' || searchQuery) && (
            <div className="mb-4 flex items-center justify-between rounded-xl bg-white/5 p-2.5 px-4 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span>Showing results for:</span>
                {selectedCategory !== 'All' && (
                  <span className="font-semibold text-blue-300">{selectedCategory}</span>
                )}
                {selectedRegion !== 'All' && (
                  <span className="font-semibold text-emerald-300">{selectedRegion} India</span>
                )}
                {selectedState !== 'All' && (
                  <span className="font-semibold text-amber-300">{selectedState}</span>
                )}
                {searchQuery && (
                  <span className="font-semibold text-white">"{searchQuery}"</span>
                )}
              </div>
              <button
                onClick={resetFilters}
                className="text-slate-400 hover:text-white underline underline-offset-2"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Curated Indian Cities Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Curated Indian Cities ({filteredCities.length})
              </h3>
              <span className="text-xs text-slate-500">Click any city to view live weather</span>
            </div>

            {filteredCities.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-slate-400">
                <p className="text-sm font-semibold">No curated city matched the filter criteria.</p>
                <p className="text-xs text-slate-500 mt-1">
                  Try clearing the filters or check the live geocoding results below.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredCities.map((city) => {
                  const isCurrent =
                    currentCityName &&
                    city.name.toLowerCase() === currentCityName.toLowerCase();

                  return (
                    <button
                      key={city.id}
                      onClick={() => handleSelectCurated(city)}
                      className={`group flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
                        isCurrent
                          ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-bold text-white group-hover:text-blue-300 transition-colors">
                                {city.name}
                              </h4>
                              {city.isCapital && (
                                <span className="rounded bg-amber-500/20 px-1.5 py-0.2 text-[10px] font-semibold text-amber-300 border border-amber-500/30">
                                  Capital
                                </span>
                              )}
                            </div>
                            {city.hindiName && (
                              <span className="text-xs text-amber-300/80 block mt-0.5">
                                {city.hindiName}
                              </span>
                            )}
                          </div>

                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/10 shrink-0">
                            {city.region}
                          </span>
                        </div>

                        <div className="mt-2 text-xs text-slate-300 flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          <span>{city.state}</span>
                        </div>

                        {city.famousFor && (
                          <p className="mt-2 text-[11px] text-slate-400 line-clamp-1 italic">
                            {city.famousFor}
                          </p>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[11px]">
                        <span className="text-slate-500">
                          {city.latitude.toFixed(2)}°N, {city.longitude.toFixed(2)}°E
                        </span>
                        <span className="flex items-center gap-1 text-blue-400 font-medium group-hover:translate-x-0.5 transition-transform">
                          {isCurrent ? 'Current City' : 'View Weather'}
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Live Open-Meteo Geocoding Results (For any town, taluk, village in India) */}
          {(searchQuery.trim().length >= 3 || isSearchingLive || liveGeoResults.length > 0) && (
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Live Indian Town & Taluk Geocoder Results
                </h3>
                {isSearchingLive && <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />}
              </div>

              {liveGeoResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {liveGeoResults.map((geo) => (
                    <button
                      key={geo.id}
                      onClick={() => handleSelectLive(geo)}
                      className="group flex flex-col justify-between rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-left transition-all hover:bg-amber-500/10 hover:border-amber-500/40"
                    >
                      <div>
                        <h4 className="font-bold text-white group-hover:text-amber-300 transition-colors">
                          {geo.name}
                        </h4>
                        <div className="mt-1 text-xs text-slate-300 flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-amber-400" />
                          <span>{geo.state}, India</span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[11px]">
                        <span className="text-slate-500">
                          {geo.latitude.toFixed(2)}°N, {geo.longitude.toFixed(2)}°E
                        </span>
                        <span className="flex items-center gap-1 text-amber-400 font-medium group-hover:translate-x-0.5 transition-transform">
                          Select <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                !isSearchingLive &&
                searchQuery.length >= 3 && (
                  <p className="text-xs text-slate-500 italic">
                    Type a town or district name to scan all locations across India.
                  </p>
                )
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 px-6 py-3.5 bg-slate-950/70 text-xs text-slate-400">
          <span>
            Covering all 28 States & 8 Union Territories with high-resolution real-time meteorological models
          </span>
          <button
            onClick={onClose}
            className="rounded-xl bg-white/10 px-4 py-1.5 font-semibold text-white hover:bg-white/15"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
