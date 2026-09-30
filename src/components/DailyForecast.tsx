import React from 'react';
import { Calendar, Droplets, Wind, Sun } from 'lucide-react';
import { DailyForecastItem, TempUnit } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface DailyForecastProps {
  daily: DailyForecastItem[];
  tempUnit: TempUnit;
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ daily, tempUnit }) => {
  const formatTemp = (c: number) => {
    return tempUnit === 'F' ? `${Math.round((c * 9) / 5 + 32)}°` : `${Math.round(c)}°`;
  };

  if (!daily || daily.length === 0) return null;

  // Find overall min and max across all days to render proportional range bars
  const allMins = daily.map((d) => d.tempMin);
  const allMaxs = daily.map((d) => d.tempMax);
  const lowestMin = Math.min(...allMins);
  const highestMax = Math.max(...allMaxs);
  const totalRange = Math.max(highestMax - lowestMin, 1);

  return (
    <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-xl text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Calendar className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">7-Day Extended Forecast</h2>
            <p className="text-xs text-slate-400">Weekly weather outlook with temperature ranges</p>
          </div>
        </div>
      </div>

      <div className="mt-4 divide-y divide-white/5">
        {daily.map((day, idx) => {
          const isToday = idx === 0;

          // Compute left offset % and width % for temperature bar
          const leftPercent = Math.max(0, ((day.tempMin - lowestMin) / totalRange) * 100);
          const barWidthPercent = Math.max(12, ((day.tempMax - day.tempMin) / totalRange) * 100);

          return (
            <div
              key={day.date}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 px-2 rounded-2xl transition-colors ${
                isToday ? 'bg-white/5 border border-white/10' : 'hover:bg-white/[0.03]'
              }`}
            >
              {/* Day name & Date */}
              <div className="w-32 shrink-0">
                <span className={`text-sm font-semibold block ${isToday ? 'text-amber-400' : 'text-white'}`}>
                  {day.dayName}
                </span>
                <span className="text-[11px] text-slate-400">{day.date}</span>
              </div>

              {/* Weather condition & Icon */}
              <div className="flex items-center gap-2.5 sm:w-48 shrink-0">
                <WeatherIcon code={day.weatherCode} isDay={true} className="h-6 w-6 shrink-0" />
                <span className="text-xs text-slate-200 truncate">{day.weatherDesc}</span>
              </div>

              {/* Rain Chance & Wind */}
              <div className="flex items-center gap-4 text-xs text-slate-300 sm:w-36 shrink-0">
                <div className="flex items-center gap-1 text-sky-400" title="Precipitation probability">
                  <Droplets className="h-3.5 w-3.5" />
                  <span>{day.precipitationProbability}%</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400" title="Max wind speed">
                  <Wind className="h-3.5 w-3.5" />
                  <span>{day.windSpeedMax} km/h</span>
                </div>
              </div>

              {/* Temperature Range Bar */}
              <div className="flex items-center gap-3 flex-1 sm:max-w-xs">
                <span className="text-xs font-semibold text-sky-300 w-8 text-right">
                  {formatTemp(day.tempMin)}
                </span>

                <div className="relative h-2 flex-1 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-rose-400"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${barWidthPercent}%`,
                    }}
                  />
                </div>

                <span className="text-xs font-semibold text-rose-300 w-8">
                  {formatTemp(day.tempMax)}
                </span>
              </div>

              {/* UV Tag */}
              <div className="hidden lg:flex items-center gap-1 text-[11px] text-amber-300 w-16 justify-end">
                <Sun className="h-3 w-3" />
                <span>UV {day.uvIndexMax}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
