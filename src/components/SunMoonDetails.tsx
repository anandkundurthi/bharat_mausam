import React from 'react';
import { Sunrise, Sunset, Sun, Shield } from 'lucide-react';
import { SunMoonData } from '../types/weather';

interface SunMoonDetailsProps {
  sunMoon: SunMoonData;
  uvIndex: number;
}

export const SunMoonDetails: React.FC<SunMoonDetailsProps> = ({ sunMoon, uvIndex }) => {
  const getUvRiskLevel = (uv: number) => {
    if (uv <= 2) return { label: 'Low', color: 'text-emerald-400', desc: 'No special protection needed.' };
    if (uv <= 5) return { label: 'Moderate', color: 'text-yellow-400', desc: 'Wear hat and sunscreen in direct sunlight.' };
    if (uv <= 7) return { label: 'High', color: 'text-orange-400', desc: 'Seek shade during midday peak hours (11am-3pm).' };
    if (uv <= 10) return { label: 'Very High', color: 'text-rose-400', desc: 'Avoid prolonged sun exposure. Use SPF 30+.' };
    return { label: 'Extreme', color: 'text-purple-400', desc: 'Take full precautions. Direct skin harm within minutes.' };
  };

  const uvRisk = getUvRiskLevel(uvIndex);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Sun Trajectory Card */}
      <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-6 backdrop-blur-xl shadow-xl text-white">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Sun className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Sunrise & Sunset</h3>
            <p className="text-[11px] text-slate-400">Total daylight: {sunMoon.daylightHours}</p>
          </div>
        </div>

        {/* Visual Progress Arc */}
        <div className="mt-5 relative">
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden relative">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-500 transition-all duration-700"
              style={{ width: `${sunMoon.sunProgressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs text-slate-300 mt-2 font-medium">
            <span>{sunMoon.sunProgressPercent}% of daylight elapsed</span>
            <span className="text-amber-400">{sunMoon.isDaytime ? 'Sun is up' : 'Night time'}</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3.5 border border-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <Sunrise className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Sunrise</span>
              <span className="text-base font-bold text-white">{sunMoon.sunrise} IST</span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3.5 border border-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
              <Sunset className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Sunset</span>
              <span className="text-base font-bold text-white">{sunMoon.sunset} IST</span>
            </div>
          </div>
        </div>
      </div>

      {/* UV & Solar Radiation Card */}
      <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-6 backdrop-blur-xl shadow-xl text-white">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Solar UV Index</h3>
            <p className="text-[11px] text-slate-400">Ultraviolet radiation and skin protection guide</p>
          </div>
        </div>

        <div className="mt-5 flex items-baseline gap-3">
          <span className="text-4xl font-extrabold text-white">{uvIndex}</span>
          <span className={`text-base font-bold ${uvRisk.color}`}>{uvRisk.label} Risk</span>
        </div>

        <div className="mt-3">
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500"
              style={{ width: `${Math.min(100, (uvIndex / 11) * 100)}%` }}
            />
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-300 leading-relaxed rounded-2xl bg-white/5 p-3.5 border border-white/10">
          {uvRisk.desc}
        </p>
      </div>
    </div>
  );
};
