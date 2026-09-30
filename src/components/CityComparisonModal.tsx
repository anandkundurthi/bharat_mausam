import React, { useState, useEffect } from 'react';
import { X, Scale, Loader2 } from 'lucide-react';
import { INDIAN_CITIES } from '../data/indianCities';
import { fetchLiveWeatherData } from '../services/weatherService';
import { WeatherDataResponse, TempUnit } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface CityComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCity1?: string;
  tempUnit: TempUnit;
}

export const CityComparisonModal: React.FC<CityComparisonModalProps> = ({
  isOpen,
  onClose,
  defaultCity1 = 'New Delhi',
  tempUnit,
}) => {
  const [city1Name, setCity1Name] = useState<string>(defaultCity1);
  const [city2Name, setCity2Name] = useState<string>('Mumbai');

  const [data1, setData1] = useState<WeatherDataResponse | null>(null);
  const [data2, setData2] = useState<WeatherDataResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const city1Obj = INDIAN_CITIES.find(
      (c) => c.name.toLowerCase() === city1Name.toLowerCase()
    ) || INDIAN_CITIES[0];
    const city2Obj = INDIAN_CITIES.find(
      (c) => c.name.toLowerCase() === city2Name.toLowerCase()
    ) || INDIAN_CITIES[1];

    let isMounted = true;
    setLoading(true);

    Promise.all([
      fetchLiveWeatherData({
        city: city1Obj.name,
        state: city1Obj.state,
        country: 'India',
        latitude: city1Obj.latitude,
        longitude: city1Obj.longitude,
        isUserLocation: false,
      }),
      fetchLiveWeatherData({
        city: city2Obj.name,
        state: city2Obj.state,
        country: 'India',
        latitude: city2Obj.latitude,
        longitude: city2Obj.longitude,
        isUserLocation: false,
      }),
    ])
      .then(([res1, res2]) => {
        if (isMounted) {
          setData1(res1);
          setData2(res2);
        }
      })
      .catch((err) => {
        console.error('Comparison fetch error:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, city1Name, city2Name]);

  if (!isOpen) return null;

  const formatTemp = (c: number) => {
    return tempUnit === 'F' ? `${Math.round((c * 9) / 5 + 32)}°F` : `${Math.round(c)}°C`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex flex-col max-h-[90vh] w-full max-w-4xl rounded-3xl bg-slate-900 border border-white/15 shadow-2xl text-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Compare Indian Cities</h2>
              <p className="text-xs text-slate-400">
                Compare temperature, AQI, humidity, and forecast side-by-side
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* City Selectors */}
        <div className="grid grid-cols-2 gap-4 p-6 border-b border-white/10 bg-slate-900/80">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              City 1:
            </label>
            <select
              value={city1Name}
              onChange={(e) => setCity1Name(e.target.value)}
              className="w-full rounded-2xl bg-slate-800 border border-white/15 p-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {INDIAN_CITIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.state})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              City 2:
            </label>
            <select
              value={city2Name}
              onChange={(e) => setCity2Name(e.target.value)}
              className="w-full rounded-2xl bg-slate-800 border border-white/15 p-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {INDIAN_CITIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.state})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/20">
          {loading ? (
            <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
              <p className="text-sm">Fetching live meteorological and AQI data for both cities...</p>
            </div>
          ) : data1 && data2 ? (
            <div className="space-y-6">
              {/* Top Hero Side-by-Side */}
              <div className="grid grid-cols-2 gap-4">
                {/* City 1 Card */}
                <div className="rounded-2xl bg-gradient-to-br from-blue-900/40 to-slate-900/60 border border-blue-500/30 p-5">
                  <div className="text-xs text-blue-300 font-semibold">{data1.location.state}</div>
                  <h3 className="text-2xl font-black text-white mt-0.5">{data1.location.city}</h3>
                  <div className="flex items-center gap-3 mt-3">
                    <WeatherIcon code={data1.current.weatherCode} isDay={data1.current.isDay} className="h-10 w-10" />
                    <div>
                      <div className="text-3xl font-extrabold text-white">{formatTemp(data1.current.temperature)}</div>
                      <div className="text-xs text-slate-300">{data1.current.weatherDesc}</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-slate-400">
                    Feels like {formatTemp(data1.current.feelsLike)} • H: {formatTemp(data1.current.tempMax)} / L: {formatTemp(data1.current.tempMin)}
                  </div>
                </div>

                {/* City 2 Card */}
                <div className="rounded-2xl bg-gradient-to-br from-indigo-900/40 to-slate-900/60 border border-indigo-500/30 p-5">
                  <div className="text-xs text-indigo-300 font-semibold">{data2.location.state}</div>
                  <h3 className="text-2xl font-black text-white mt-0.5">{data2.location.city}</h3>
                  <div className="flex items-center gap-3 mt-3">
                    <WeatherIcon code={data2.current.weatherCode} isDay={data2.current.isDay} className="h-10 w-10" />
                    <div>
                      <div className="text-3xl font-extrabold text-white">{formatTemp(data2.current.temperature)}</div>
                      <div className="text-xs text-slate-300">{data2.current.weatherDesc}</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-slate-400">
                    Feels like {formatTemp(data2.current.feelsLike)} • H: {formatTemp(data2.current.tempMax)} / L: {formatTemp(data2.current.tempMin)}
                  </div>
                </div>
              </div>

              {/* Metrics Table */}
              <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-white/5 text-slate-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3 text-left">Meteorological Metric</th>
                      <th className="p-3 text-center">{data1.location.city}</th>
                      <th className="p-3 text-center">{data2.location.city}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {/* Air Quality */}
                    <tr>
                      <td className="p-3 font-semibold text-slate-300">Air Quality (NAQI)</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded font-bold ${data1.airQuality.aqiBgColor}`}>
                          {data1.airQuality.aqi} ({data1.airQuality.aqiBand})
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded font-bold ${data2.airQuality.aqiBgColor}`}>
                          {data2.airQuality.aqi} ({data2.airQuality.aqiBand})
                        </span>
                      </td>
                    </tr>

                    {/* PM2.5 */}
                    <tr>
                      <td className="p-3 text-slate-300">PM 2.5 Concentration</td>
                      <td className="p-3 text-center font-bold text-white">{data1.airQuality.pm25} µg/m³</td>
                      <td className="p-3 text-center font-bold text-white">{data2.airQuality.pm25} µg/m³</td>
                    </tr>

                    {/* Humidity */}
                    <tr>
                      <td className="p-3 text-slate-300">Humidity</td>
                      <td className="p-3 text-center font-bold text-white">{data1.current.humidity}%</td>
                      <td className="p-3 text-center font-bold text-white">{data2.current.humidity}%</td>
                    </tr>

                    {/* Wind */}
                    <tr>
                      <td className="p-3 text-slate-300">Wind Speed</td>
                      <td className="p-3 text-center font-bold text-white">{data1.current.windSpeed} km/h</td>
                      <td className="p-3 text-center font-bold text-white">{data2.current.windSpeed} km/h</td>
                    </tr>

                    {/* UV Index */}
                    <tr>
                      <td className="p-3 text-slate-300">UV Index</td>
                      <td className="p-3 text-center font-bold text-amber-300">{data1.current.uvIndex}</td>
                      <td className="p-3 text-center font-bold text-amber-300">{data2.current.uvIndex}</td>
                    </tr>

                    {/* Sunrise & Sunset */}
                    <tr>
                      <td className="p-3 text-slate-300">Sunrise / Sunset</td>
                      <td className="p-3 text-center text-slate-300">{data1.sunMoon.sunrise} / {data1.sunMoon.sunset}</td>
                      <td className="p-3 text-center text-slate-300">{data2.sunMoon.sunrise} / {data2.sunMoon.sunset}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-white/10 px-6 py-3.5 bg-slate-950/60">
          <button
            onClick={onClose}
            className="rounded-xl bg-white/10 px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/15"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
