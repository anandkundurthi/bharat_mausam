import React from 'react';
import {
  Wind,
  ShieldCheck,
  AlertOctagon,
  Heart,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { AirQualityData } from '../types/weather';

interface AirQualityCardProps {
  airQuality: AirQualityData;
  cityName: string;
}

export const AirQualityCard: React.FC<AirQualityCardProps> = ({ airQuality, cityName }) => {
  const getMeterPercent = (aqi: number) => {
    return Math.min(100, Math.max(3, (aqi / 500) * 100));
  };

  return (
    <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-xl text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Wind className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              National Air Quality Index (NAQI)
              <span className="text-xs font-normal text-slate-400">CPCB India</span>
            </h2>
            <p className="text-xs text-slate-400">
              Live particulate matter and gaseous pollution in {cityName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${airQuality.aqiBgColor}`}>
            {airQuality.aqiBand}
          </span>
        </div>
      </div>

      {/* Main AQI Gauge */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-5">
          <div className="flex items-baseline gap-3">
            <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
              {airQuality.aqi}
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                AQI Index
              </span>
              <span className={`text-sm font-semibold ${airQuality.aqiColor}`}>
                {airQuality.aqiBand} Category
              </span>
            </div>
          </div>

          {/* AQI Gradient Bar */}
          <div className="mt-4">
            <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden relative">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-yellow-400 via-orange-500 via-rose-500 to-purple-700 transition-all duration-700"
                style={{ width: `${getMeterPercent(airQuality.aqi)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>0 (Good)</span>
              <span>100 (Satisfactory)</span>
              <span>200 (Moderate)</span>
              <span>300 (Poor)</span>
              <span>500 (Severe)</span>
            </div>
          </div>
        </div>

        {/* Health Precautions Overview */}
        <div className="md:col-span-7 bg-white/5 rounded-2xl p-4 border border-white/10">
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {airQuality.healthAdvisory}
          </p>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {/* Mask Recommendation */}
            <div className="flex items-center gap-2 rounded-xl bg-slate-800/60 p-2.5 border border-white/5">
              {airQuality.maskRecommended ? (
                <AlertOctagon className="h-4 w-4 text-orange-400 shrink-0" />
              ) : (
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              )}
              <div>
                <span className="text-slate-400 text-[10px] block">Mask</span>
                <span className="font-semibold text-slate-200">
                  {airQuality.maskRecommended ? 'N95 Recommended' : 'Not Required'}
                </span>
              </div>
            </div>

            {/* Outdoor exercise */}
            <div className="flex items-center gap-2 rounded-xl bg-slate-800/60 p-2.5 border border-white/5">
              {airQuality.outdoorSafe ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
              )}
              <div>
                <span className="text-slate-400 text-[10px] block">Outdoor Workout</span>
                <span className="font-semibold text-slate-200">
                  {airQuality.outdoorSafe ? 'Safe Outdoors' : 'Limit Exertion'}
                </span>
              </div>
            </div>

            {/* Sensitive Groups */}
            <div className="flex items-center gap-2 rounded-xl bg-slate-800/60 p-2.5 border border-white/5 col-span-2 sm:col-span-1">
              <Heart className="h-4 w-4 text-rose-400 shrink-0" />
              <div>
                <span className="text-slate-400 text-[10px] block">Sensitive Groups</span>
                <span className="font-semibold text-slate-200">
                  {airQuality.aqi > 100 ? 'Take Caution' : 'Normal'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Pollutants Breakdown */}
      <div className="mt-6 border-t border-white/10 pt-5">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Pollutant Concentrations (µg/m³) vs Indian National Ambient Air Quality Standards
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* PM2.5 */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200">PM 2.5</span>
              <span className="text-[10px] text-slate-400">Limit: 60</span>
            </div>
            <div className="mt-1 text-lg font-bold text-white">
              {airQuality.pm25} <span className="text-xs font-normal text-slate-400">µg/m³</span>
            </div>
            <span className={`text-[10px] font-medium ${airQuality.pm25 <= 60 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {airQuality.pm25 <= 60 ? 'Within Safe Limit' : `${(airQuality.pm25 / 60).toFixed(1)}x Safe Limit`}
            </span>
          </div>

          {/* PM10 */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200">PM 10</span>
              <span className="text-[10px] text-slate-400">Limit: 100</span>
            </div>
            <div className="mt-1 text-lg font-bold text-white">
              {airQuality.pm10} <span className="text-xs font-normal text-slate-400">µg/m³</span>
            </div>
            <span className={`text-[10px] font-medium ${airQuality.pm10 <= 100 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {airQuality.pm10 <= 100 ? 'Within Safe Limit' : `${(airQuality.pm10 / 100).toFixed(1)}x Safe Limit`}
            </span>
          </div>

          {/* Ozone */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200">Ozone (O₃)</span>
              <span className="text-[10px] text-slate-400">Limit: 100</span>
            </div>
            <div className="mt-1 text-lg font-bold text-white">
              {airQuality.ozone} <span className="text-xs font-normal text-slate-400">µg/m³</span>
            </div>
            <span className="text-[10px] text-slate-400">Ground-level smog</span>
          </div>

          {/* NO2 */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200">NO₂</span>
              <span className="text-[10px] text-slate-400">Limit: 80</span>
            </div>
            <div className="mt-1 text-lg font-bold text-white">
              {airQuality.no2} <span className="text-xs font-normal text-slate-400">µg/m³</span>
            </div>
            <span className="text-[10px] text-slate-400">Vehicular emissions</span>
          </div>

          {/* SO2 */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200">SO₂</span>
              <span className="text-[10px] text-slate-400">Limit: 80</span>
            </div>
            <div className="mt-1 text-lg font-bold text-white">
              {airQuality.so2} <span className="text-xs font-normal text-slate-400">µg/m³</span>
            </div>
            <span className="text-[10px] text-slate-400">Industrial output</span>
          </div>

          {/* CO */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200">CO</span>
              <span className="text-[10px] text-slate-400">Limit: 2000</span>
            </div>
            <div className="mt-1 text-lg font-bold text-white">
              {airQuality.co} <span className="text-xs font-normal text-slate-400">µg/m³</span>
            </div>
            <span className="text-[10px] text-slate-400">Combustion gas</span>
          </div>
        </div>
      </div>
    </div>
  );
};
