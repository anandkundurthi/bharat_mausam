import React from 'react';
import {
  Sun,
  SunMedium,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudLightning,
  Snowflake,
  CloudSunRain,
  AlertTriangle,
  Moon,
  CloudMoon,
} from 'lucide-react';

interface WeatherIconProps {
  code: number;
  isDay?: boolean;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  code,
  isDay = true,
  className = 'w-6 h-6',
}) => {
  // Clear sky
  if (code === 0) {
    return isDay ? (
      <Sun className={`text-amber-500 animate-spin-slow ${className}`} />
    ) : (
      <Moon className={`text-indigo-300 ${className}`} />
    );
  }

  // Mainly clear
  if (code === 1) {
    return isDay ? (
      <SunMedium className={`text-amber-500 ${className}`} />
    ) : (
      <Moon className={`text-indigo-300 ${className}`} />
    );
  }

  // Partly cloudy
  if (code === 2) {
    return isDay ? (
      <CloudSun className={`text-amber-400 ${className}`} />
    ) : (
      <CloudMoon className={`text-slate-300 ${className}`} />
    );
  }

  // Overcast
  if (code === 3) {
    return <Cloud className={`text-slate-400 ${className}`} />;
  }

  // Fog / Mist
  if (code === 45 || code === 48) {
    return <CloudFog className={`text-slate-400 ${className}`} />;
  }

  // Drizzle
  if (code >= 51 && code <= 55) {
    return <CloudDrizzle className={`text-cyan-400 ${className}`} />;
  }

  // Freezing rain / Snow
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
    return <Snowflake className={`text-sky-300 ${className}`} />;
  }

  // Heavy Rain / Showers
  if (code === 65 || code === 82) {
    return <CloudRainWind className={`text-blue-500 ${className}`} />;
  }

  // Moderate Rain / Showers
  if (code === 61 || code === 63 || code === 80 || code === 81) {
    return isDay ? (
      <CloudSunRain className={`text-blue-400 ${className}`} />
    ) : (
      <CloudRain className={`text-blue-400 ${className}`} />
    );
  }

  // Thunderstorms
  if (code === 95) {
    return <CloudLightning className={`text-amber-400 ${className}`} />;
  }

  // Severe Thunderstorm & Hail
  if (code === 96 || code === 99) {
    return <AlertTriangle className={`text-rose-500 ${className}`} />;
  }

  return isDay ? (
    <Sun className={`text-amber-500 ${className}`} />
  ) : (
    <Moon className={`text-indigo-300 ${className}`} />
  );
};
