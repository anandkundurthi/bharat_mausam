import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { LocationBanner } from './components/LocationBanner';
import { CurrentWeatherHero } from './components/CurrentWeatherHero';
import { QuickCityTabs } from './components/QuickCityTabs';
import { AirQualityCard } from './components/AirQualityCard';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';
import { SunMoonDetails } from './components/SunMoonDetails';
import { MonsoonSeasonTracker } from './components/MonsoonSeasonTracker';
import { IndiaRegionalWeatherGrid } from './components/IndiaRegionalWeatherGrid';
import { AllIndianCitiesDirectory } from './components/AllIndianCitiesDirectory';
import { CityComparisonModal } from './components/CityComparisonModal';

import { ActiveLocation, WeatherDataResponse, TempUnit, WindUnit } from './types/weather';
import { getInitialUserLocation } from './services/locationService';
import { fetchLiveWeatherData } from './services/weatherService';
import { INDIAN_CITIES } from './data/indianCities';

import {
  Loader2,
  AlertTriangle,
  Compass,
  Navigation,
  Radio,
  RefreshCw,
} from 'lucide-react';

export default function App() {
  const [activeLocation, setActiveLocation] = useState<ActiveLocation | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherDataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [detectingLocation, setDetectingLocation] = useState<boolean>(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // Modals & Panels
  const [isDirectoryOpen, setIsDirectoryOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

  // Preferences
  const [tempUnit, setTempUnit] = useState<TempUnit>(() => {
    return (localStorage.getItem('bm_temp_unit') as TempUnit) || 'C';
  });
  const [windUnit, setWindUnit] = useState<WindUnit>(() => {
    return (localStorage.getItem('bm_wind_unit') as WindUnit) || 'kmh';
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bm_favorites');
      return saved ? JSON.parse(saved) : ['Mumbai', 'Bengaluru', 'New Delhi'];
    } catch {
      return ['Mumbai', 'Bengaluru', 'New Delhi'];
    }
  });

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('bm_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save tempUnit to localStorage
  const handleToggleTempUnit = () => {
    const next = tempUnit === 'C' ? 'F' : 'C';
    setTempUnit(next);
    localStorage.setItem('bm_temp_unit', next);
  };

  // Toggle windUnit
  const handleToggleWindUnit = () => {
    const next = windUnit === 'kmh' ? 'mph' : 'kmh';
    setWindUnit(next);
    localStorage.setItem('bm_wind_unit', next);
  };

  // Toggle favorite city
  const handleToggleFavorite = () => {
    if (!activeLocation) return;
    const name = activeLocation.city;
    if (favorites.includes(name)) {
      setFavorites(favorites.filter((f) => f !== name));
    } else {
      setFavorites([...favorites, name]);
    }
  };

  // Load weather data for a given location
  const loadWeatherDataForLocation = useCallback(async (loc: ActiveLocation) => {
    setLoading(true);
    setWeatherError(null);
    try {
      const data = await fetchLiveWeatherData(loc);
      setWeatherData(data);
      setActiveLocation(loc);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Could not fetch weather data';
      console.error('Weather load error:', err);
      setWeatherError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Primary entry: Detect user location directly on first load!
  const detectLocationAndLoad = useCallback(async () => {
    setDetectingLocation(true);
    setLocationError(null);

    try {
      const result = await getInitialUserLocation();

      if (result.success) {
        setLocationError(null);
        await loadWeatherDataForLocation(result.location);
      } else {
        // Location failed or was denied
        setLocationError(
          result.message ||
            'Location access was denied or unavailable. Tap "Enable Location" to show your local city.'
        );
        // Fall back gracefully to the capital or nearest city
        await loadWeatherDataForLocation(result.location);
      }
    } catch (err) {
      console.error('Initial detection error:', err);
      setLocationError('Could not detect location. Select any Indian city below.');
      const defaultCity = INDIAN_CITIES[0];
      await loadWeatherDataForLocation({
        city: defaultCity.name,
        state: defaultCity.state,
        country: 'India',
        latitude: defaultCity.latitude,
        longitude: defaultCity.longitude,
        isUserLocation: false,
        detectionSource: 'fallback',
      });
    } finally {
      setDetectingLocation(false);
    }
  }, [loadWeatherDataForLocation]);

  // Execute location detection on startup
  useEffect(() => {
    detectLocationAndLoad();
  }, [detectLocationAndLoad]);

  // Handle manual city selection
  const handleSelectCity = (location: ActiveLocation) => {
    setLocationError(null);
    loadWeatherDataForLocation(location);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if current city is favorite
  const isCurrentFavorite = activeLocation ? favorites.includes(activeLocation.city) : false;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Sticky Header */}
      <Header
        currentLocation={activeLocation}
        detectingLocation={detectingLocation}
        onDetectLocation={detectLocationAndLoad}
        onSelectCity={handleSelectCity}
        onOpenDirectory={() => setIsDirectoryOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        tempUnit={tempUnit}
        onToggleTempUnit={handleToggleTempUnit}
        windUnit={windUnit}
        onToggleWindUnit={handleToggleWindUnit}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Quick Popular Indian Metros & Favorites Bar */}
        <div className="pb-1">
          <QuickCityTabs
            currentCityName={activeLocation?.city || ''}
            favorites={favorites}
            onSelectCity={handleSelectCity}
            onOpenDirectory={() => setIsDirectoryOpen(true)}
          />
        </div>

        {/* Location Detection / Status Banner */}
        <LocationBanner
          location={activeLocation}
          loading={loading}
          detectingLocation={detectingLocation}
          locationError={locationError}
          onRefreshLocation={detectLocationAndLoad}
          onOpenDirectory={() => setIsDirectoryOpen(true)}
        />

        {/* Initial First-Load Detecting State */}
        {detectingLocation && !weatherData && (
          <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-950/40 via-slate-900/60 to-slate-950 p-8 sm:p-14 text-center backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-6 shadow-lg shadow-blue-500/20">
              <Radio className="h-12 w-12 animate-pulse text-blue-400" />
              <span className="absolute inline-flex h-full w-full animate-ping rounded-3xl bg-blue-400 opacity-20" />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300 mb-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>GPS Geolocation Protocol Active</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Detecting Your City by Location...
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              Acquiring your device coordinates, reverse geocoding to your Indian district and state, and retrieving live atmospheric and CPCB air quality indices.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 text-xs text-blue-300 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Scanning coordinates...</span>
              </div>
              <button
                onClick={() => setIsDirectoryOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 px-4 py-1.5 text-xs font-semibold text-white transition-colors"
              >
                <Compass className="h-3.5 w-3.5 text-amber-400" />
                <span>Or Pick Any Indian City (150+)</span>
              </button>
            </div>
          </div>
        )}

        {/* Weather Fetch Error View */}
        {weatherError && !loading && (
          <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-8 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 mb-4">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-rose-200">
              Unable to Retrieve Live Weather
            </h3>
            <p className="mt-1 text-xs text-rose-300/80 max-w-md mx-auto">
              {weatherError}. Please verify your network connection or select another city from the directory.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => activeLocation && loadWeatherDataForLocation(activeLocation)}
                className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Retry
              </button>
              <button
                onClick={() => setIsDirectoryOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15 border border-white/15"
              >
                <Compass className="h-3.5 w-3.5" />
                Browse Indian Cities
              </button>
            </div>
          </div>
        )}

        {/* Live Weather Content Display */}
        {weatherData && (
          <div className={`space-y-6 transition-opacity duration-300 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            {/* Main Weather Hero Card */}
            <CurrentWeatherHero
              weatherData={weatherData}
              tempUnit={tempUnit}
              windUnit={windUnit}
              isFavorite={isCurrentFavorite}
              onToggleFavorite={handleToggleFavorite}
              onOpenDirectory={() => setIsDirectoryOpen(true)}
            />

            {/* Air Quality Index (CPCB India Standard) */}
            <AirQualityCard
              airQuality={weatherData.airQuality}
              cityName={weatherData.location.city}
            />

            {/* 24-Hour Forecast */}
            <HourlyForecast
              hourly={weatherData.hourly}
              tempUnit={tempUnit}
            />

            {/* 7-Day Extended Forecast */}
            <DailyForecast
              daily={weatherData.daily}
              tempUnit={tempUnit}
            />

            {/* Solar Trajectory and UV Radiation */}
            <SunMoonDetails
              sunMoon={weatherData.sunMoon}
              uvIndex={weatherData.current.uvIndex}
            />

            {/* Indian Seasonal Climate / Monsoon Tracker */}
            <MonsoonSeasonTracker />

            {/* Regional Weather Grid: North, South, East, West, Central, North-East */}
            <IndiaRegionalWeatherGrid
              currentCityName={weatherData.location.city}
              onSelectCity={handleSelectCity}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-white/10 bg-slate-950/90 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">🌤️</span>
              <div>
                <span className="font-bold text-white">Bharat Mausam</span>
                <span className="text-slate-500 ml-2">भारत मौसम वेदर पोर्टल</span>
                <p className="text-[11px] text-slate-400">
                  Live geolocation-based weather & complete directory of Indian cities, states, and union territories.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <button
                onClick={() => setIsDirectoryOpen(true)}
                className="text-slate-300 hover:text-white underline underline-offset-4"
              >
                All Indian Cities (150+)
              </button>
              <button
                onClick={() => setIsCompareOpen(true)}
                className="text-slate-300 hover:text-white underline underline-offset-4"
              >
                City Comparison
              </button>
              <button
                onClick={detectLocationAndLoad}
                className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold"
              >
                <Navigation className="h-3 w-3" />
                Detect My Location
              </button>
            </div>
          </div>

          <div className="mt-6 border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <span>
              Real-time meteorological models by Open-Meteo & Air Quality standards aligned with Central Pollution Control Board (CPCB India).
            </span>
            <span>All 28 States & 8 Union Territories • Indian Standard Time (IST)</span>
          </div>
        </div>
      </footer>

      {/* Full "All Cities of India" Directory Modal */}
      <AllIndianCitiesDirectory
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
        onSelectCity={handleSelectCity}
        currentCityName={activeLocation?.city}
      />

      {/* Side-by-Side City Comparison Modal */}
      <CityComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        defaultCity1={activeLocation?.city || 'New Delhi'}
        tempUnit={tempUnit}
      />
    </div>
  );
}
