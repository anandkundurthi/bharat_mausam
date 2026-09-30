import React from 'react';
import { MapPin, Navigation, AlertCircle, RefreshCw, Radio } from 'lucide-react';
import { ActiveLocation } from '../types/weather';

interface LocationBannerProps {
  location: ActiveLocation | null;
  loading: boolean;
  detectingLocation: boolean;
  locationError: string | null;
  onRefreshLocation: () => void;
  onOpenDirectory: () => void;
}

export const LocationBanner: React.FC<LocationBannerProps> = ({
  location,
  detectingLocation,
  locationError,
  onRefreshLocation,
  onOpenDirectory,
}) => {
  if (detectingLocation) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900/40 border border-blue-500/30 p-4 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
              <Radio className="h-5 w-5 animate-pulse" />
              <span className="absolute inline-flex h-full w-full animate-ping rounded-xl bg-blue-400 opacity-20"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <p className="text-sm font-semibold text-white">Detecting Your Exact City in India...</p>
              </div>
              <p className="text-xs text-blue-200/80">
                Acquiring high-accuracy GPS coordinates & reverse geocoding to Indian state and district.
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-blue-300">
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            <span>Scanning...</span>
          </div>
        </div>
      </div>
    );
  }

  if (locationError) {
    return (
      <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 backdrop-blur-md shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-200">
                {locationError}
              </p>
              <p className="text-xs text-amber-300/80">
                You can grant location access or browse any city from all 28 Indian States & 8 UTs.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onRefreshLocation}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/20 px-3.5 py-1.5 text-xs font-semibold text-amber-200 hover:bg-amber-500/30 border border-amber-500/40 transition-colors"
            >
              <Navigation className="h-3.5 w-3.5" />
              Enable Location
            </button>
            <button
              onClick={onOpenDirectory}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-white/15 border border-white/20 transition-colors"
            >
              Browse All Cities
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!location) return null;

  return (
    <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-3.5 sm:px-4 backdrop-blur-md shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400">
                {location.isUserLocation
                  ? location.detectionSource === 'gps'
                    ? '📍 Live GPS Location:'
                    : '🌐 Network Detected Location:'
                  : 'Selected Indian City:'}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                {location.city}
                {location.state ? `, ${location.state}` : ''}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Lat: {location.latitude.toFixed(3)}°N, Lon: {location.longitude.toFixed(3)}°E • Country: {location.country}
              {location.district && location.district !== location.city && ` • District: ${location.district}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!location.isUserLocation && (
            <button
              onClick={onRefreshLocation}
              title="Return to your GPS location"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/40 border border-blue-500/40 px-2.5 py-1.5 text-xs font-medium text-blue-200 transition-colors"
            >
              <Navigation className="h-3 w-3" />
              Use My Current GPS
            </button>
          )}
          <button
            onClick={onOpenDirectory}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-colors"
          >
            All Cities of India ({">"}150)
          </button>
        </div>
      </div>
    </div>
  );
};
