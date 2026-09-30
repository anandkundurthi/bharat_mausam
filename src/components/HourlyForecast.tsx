import React, { useRef } from 'react';
import { Clock, ChevronLeft, ChevronRight, Droplets, Wind } from 'lucide-react';
import { HourlyForecastItem, TempUnit } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastProps {
  hourly: HourlyForecastItem[];
  tempUnit: TempUnit;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly, tempUnit }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const formatTemp = (c: number) => {
    return tempUnit === 'F' ? `${Math.round((c * 9) / 5 + 32)}°` : `${Math.round(c)}°`;
  };

  if (!hourly || hourly.length === 0) return null;

  return (
    <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-xl text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">24-Hour Forecast</h2>
            <p className="text-xs text-slate-400">Hourly weather outlook & precipitation probability</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors"
            title="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors"
            title="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="mt-5 flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-white/20 select-none scroll-smooth"
        style={{ scrollbarWidth: 'thin' }}
      >
        {hourly.map((item, idx) => {
          const isNow = idx === 0;
          return (
            <div
              key={item.time}
              className={`flex shrink-0 flex-col items-center justify-between rounded-2xl border p-3.5 transition-all w-24 text-center ${
                isNow
                  ? 'bg-gradient-to-b from-blue-600/30 to-indigo-600/20 border-blue-400/50 shadow-md'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <span className={`text-xs font-semibold ${isNow ? 'text-blue-300' : 'text-slate-300'}`}>
                {item.hour}
              </span>

              <div className="my-2 flex h-10 w-10 items-center justify-center">
                <WeatherIcon code={item.weatherCode} isDay={item.isDay} className="h-7 w-7" />
              </div>

              <span className="text-lg font-bold text-white">{formatTemp(item.temperature)}</span>

              {/* Rain Chance */}
              <div className="mt-2 flex items-center gap-1 text-[11px] text-sky-300">
                <Droplets className="h-3 w-3" />
                <span>{item.precipitationProbability}%</span>
              </div>

              {/* Wind Speed */}
              <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                <Wind className="h-2.5 w-2.5" />
                <span>{item.windSpeed} km/h</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
