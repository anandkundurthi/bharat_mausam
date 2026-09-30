import React, { useState, useEffect } from 'react';
import {
  Wind,
  Droplets,
  Gauge,
  Sun,
  Eye,
  CloudRain,
  Compass,
  Star,
  Share2,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { WeatherDataResponse, TempUnit, WindUnit } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherHeroProps {
  weatherData: WeatherDataResponse;
  tempUnit: TempUnit;
  windUnit: WindUnit;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpenDirectory: () => void;
}

export const CurrentWeatherHero: React.FC<CurrentWeatherHeroProps> = ({
  weatherData,
  tempUnit,
  windUnit,
  isFavorite,
  onToggleFavorite,
  onOpenDirectory,
}) => {
  const { location, current, imdAlert, airQuality } = weatherData;
  const [istTime, setIstTime] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Maintain live Indian Standard Time (Asia/Kolkata)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setIstTime(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTemp = (celsius: number) => {
    if (tempUnit === 'F') {
      return `${Math.round((celsius * 9) / 5 + 32)}°F`;
    }
    return `${Math.round(celsius)}°C`;
  };

  const formatWind = (kmh: number) => {
    if (windUnit === 'mph') {
      return `${Math.round(kmh * 0.621371)} mph`;
    }
    return `${kmh} km/h`;
  };

  const getCompassDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const idx = Math.round(deg / 45) % 8;
    return directions[idx];
  };

  const handleShare = () => {
    const text = `Current weather in ${location.city}, ${location.state}: ${formatTemp(
      current.temperature
    )}, ${current.weatherDesc}. AQI: ${airQuality.aqi} (${airQuality.aqiBand}) - Checked on Bharat Mausam`;
    if (navigator.share) {
      navigator.share({ title: `Weather in ${location.city}`, text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Determine atmospheric background gradient based on condition and day/night
  const getSkyBackground = () => {
    const code = current.weatherCode;
    const isDay = current.isDay;

    if (!isDay) {
      return 'from-slate-950 via-indigo-950 to-blue-950 border-indigo-500/20';
    }
    if (code === 95 || code === 96 || code === 99) {
      return 'from-slate-900 via-purple-950 to-slate-950 border-purple-500/30';
    }
    if (code >= 61 && code <= 67) {
      return 'from-slate-900 via-blue-950 to-sky-950 border-blue-500/30';
    }
    if (code >= 45 && code <= 48) {
      return 'from-zinc-900 via-slate-900 to-zinc-800 border-zinc-500/20';
    }
    // Sunny/Clear daylight
    return 'from-sky-900 via-indigo-900/90 to-blue-950 border-sky-400/20';
  };

  const alertBadgeColor = {
    green: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    yellow: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    orange: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    red: 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse',
  }[imdAlert.level];

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getSkyBackground()} border p-6 sm:p-8 text-white shadow-2xl backdrop-blur-xl transition-all duration-500`}
    >
      {/* Decorative background glow rings */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Top Bar: Location & Quick Actions */}
      <div className="relative flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
              {location.city}
            </h1>
            <button
              onClick={onToggleFavorite}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              className="p-1.5 rounded-xl hover:bg-white/10 text-amber-300 transition-colors"
            >
              <Star className={`h-5 w-5 ${isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
            </button>
            <button
              onClick={handleShare}
              title="Share weather"
              className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 transition-colors relative"
            >
              <Share2 className="h-4 w-4" />
              {copied && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-2 py-0.5 text-[10px] text-emerald-300 whitespace-nowrap shadow border border-white/10">
                  Copied!
                </span>
              )}
            </button>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-300">
            {location.district && location.district !== location.city && (
              <span>{location.district},</span>
            )}
            <span className="font-medium text-white">{location.state}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              🇮🇳 India (भारत)
            </span>
            <button
              onClick={onOpenDirectory}
              className="text-sky-300 hover:text-sky-200 underline underline-offset-2 ml-1"
            >
              Change City
            </button>
          </div>
        </div>

        {/* IST Clock & Status */}
        <div className="flex flex-col items-start sm:items-end">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-md border border-white/10">
            <Clock className="h-3.5 w-3.5 text-amber-300" />
            <span>IST: {istTime || 'Loading...'}</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1">
            Updated {weatherData.updatedAt}
          </span>
        </div>
      </div>

      {/* IMD Alert Notification if applicable */}
      <div className="mt-4">
        <div
          className={`flex items-start gap-2.5 rounded-2xl border px-3.5 py-2.5 text-xs sm:text-sm ${alertBadgeColor}`}
        >
          <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold flex items-center gap-2">
              <span>{imdAlert.title}</span>
            </div>
            <p className="mt-0.5 opacity-90 text-[11px] sm:text-xs">
              {imdAlert.message}
            </p>
          </div>
        </div>
      </div>

      {/* Main Temperature and Conditions Display */}
      <div className="relative mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 shadow-inner">
              <WeatherIcon
                code={current.weatherCode}
                isDay={current.isDay}
                className="h-12 w-12 sm:h-14 sm:w-14"
              />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl sm:text-7xl font-black tracking-tight text-white">
                  {formatTemp(current.temperature)}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-slate-300">
                <span>Feels like {formatTemp(current.feelsLike)}</span>
                <span>•</span>
                <span className="text-emerald-300 font-medium">
                  H: {formatTemp(current.tempMax)}
                </span>
                <span>/</span>
                <span className="text-sky-300 font-medium">
                  L: {formatTemp(current.tempMin)}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t sm:border-t-0 sm:border-l border-white/15 pt-3 sm:pt-0 sm:pl-6 w-full sm:w-auto">
            <div className="text-lg sm:text-xl font-bold text-white">
              {current.weatherDesc}
            </div>
            <div className="text-sm font-medium text-amber-300/90 mt-0.5">
              {current.hindiDesc}
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-xs text-slate-200">
              <span className={`h-2 w-2 rounded-full ${current.isDay ? 'bg-amber-400' : 'bg-indigo-300'}`}></span>
              <span>{current.isDay ? 'Daytime' : 'Night'}</span>
              <span>•</span>
              <span>Cloud Cover: {current.cloudCover}%</span>
            </div>
          </div>
        </div>

        {/* Quick AQI Badge on Hero */}
        <div className="md:col-span-5 flex flex-col justify-end">
          <div className="rounded-2xl bg-black/25 border border-white/10 p-4 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                India NAQI (Air Quality)
              </span>
              <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${airQuality.aqiBgColor}`}>
                {airQuality.aqiBand}
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-white">
                {airQuality.aqi}
              </span>
              <span className="text-xs text-slate-400">
                AQI (CPCB Scale 0-500)
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              {airQuality.healthAdvisory}
            </p>
          </div>
        </div>
      </div>

      {/* Atmospheric Metrics Grid */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Humidity */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-md hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Droplets className="h-4 w-4 text-sky-400" />
            <span>Humidity</span>
          </div>
          <div className="mt-2 text-xl font-bold text-white">
            {current.humidity}%
          </div>
          <span className="text-[11px] text-slate-400">
            Dew point {formatTemp(current.dewPoint)}
          </span>
        </div>

        {/* Wind Speed & Compass */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-md hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Wind className="h-4 w-4 text-teal-400" />
            <span>Wind Speed</span>
          </div>
          <div className="mt-2 text-xl font-bold text-white">
            {formatWind(current.windSpeed)}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-300">
            <Compass className="h-3 w-3 text-teal-300" />
            <span>{getCompassDirection(current.windDirection)} ({current.windDirection}°)</span>
          </div>
        </div>

        {/* Pressure */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-md hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Gauge className="h-4 w-4 text-indigo-400" />
            <span>Air Pressure</span>
          </div>
          <div className="mt-2 text-xl font-bold text-white">
            {current.pressure}
          </div>
          <span className="text-[11px] text-slate-400">hPa (MSL)</span>
        </div>

        {/* UV Index */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-md hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Sun className="h-4 w-4 text-amber-400" />
            <span>UV Index</span>
          </div>
          <div className="mt-2 text-xl font-bold text-white">
            {current.uvIndex}
          </div>
          <span className="text-[11px] text-amber-300">
            {current.uvIndex <= 2 ? 'Low' : current.uvIndex <= 5 ? 'Moderate' : current.uvIndex <= 7 ? 'High' : 'Very High'}
          </span>
        </div>

        {/* Precipitation */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-md hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <CloudRain className="h-4 w-4 text-blue-400" />
            <span>Precipitation</span>
          </div>
          <div className="mt-2 text-xl font-bold text-white">
            {current.precipitation} mm
          </div>
          <span className="text-[11px] text-slate-400">Rainfall today</span>
        </div>

        {/* Visibility */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-md hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Eye className="h-4 w-4 text-emerald-400" />
            <span>Visibility</span>
          </div>
          <div className="mt-2 text-xl font-bold text-white">
            {current.visibility}+ km
          </div>
          <span className="text-[11px] text-emerald-300">Clear horizon</span>
        </div>
      </div>
    </div>
  );
};
