import React from 'react';
import { ActiveLocation } from '../types/weather';
import { INDIAN_CITIES } from '../data/indianCities';
import { ArrowRight } from 'lucide-react';

interface IndiaRegionalWeatherGridProps {
  onSelectCity: (loc: ActiveLocation) => void;
  currentCityName: string;
}

// Representative cities per region
const KEY_REGIONAL_CITIES: { region: string; icon: string; cities: string[] }[] = [
  {
    region: 'North India',
    icon: '🏔️',
    cities: ['New Delhi', 'Jaipur', 'Shimla', 'Srinagar', 'Lucknow', 'Chandigarh'],
  },
  {
    region: 'South India',
    icon: '🌴',
    cities: ['Bengaluru', 'Chennai', 'Hyderabad', 'Kochi (Cochin)', 'Visakhapatnam (Vizag)', 'Madurai'],
  },
  {
    region: 'West India',
    icon: '🌊',
    cities: ['Mumbai', 'Pune', 'Ahmedabad', 'Panaji', 'Surat', 'Nashik'],
  },
  {
    region: 'East India',
    icon: '🌾',
    cities: ['Kolkata', 'Patna', 'Bhubaneswar', 'Ranchi', 'Siliguri', 'Puri'],
  },
  {
    region: 'Central India',
    icon: '🏛️',
    cities: ['Indore', 'Bhopal', 'Raipur', 'Gwalior', 'Jabalpur', 'Ujjain'],
  },
  {
    region: 'North-East',
    icon: '🌿',
    cities: ['Guwahati', 'Shillong', 'Gangtok', 'Agartala', 'Imphal', 'Kohima'],
  },
];

export const IndiaRegionalWeatherGrid: React.FC<IndiaRegionalWeatherGridProps> = ({
  onSelectCity,
  currentCityName,
}) => {
  const handleCityClick = (name: string) => {
    const found = INDIAN_CITIES.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    if (found) {
      onSelectCity({
        city: found.name,
        district: found.famousFor,
        state: found.state,
        country: 'India',
        latitude: found.latitude,
        longitude: found.longitude,
        isUserLocation: false,
        detectionSource: 'directory',
      });
    }
  };

  return (
    <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-xl text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <span className="text-base">🇮🇳</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">India Regional Weather Zones</h2>
            <p className="text-xs text-slate-400">
              Quickly switch across North, South, East, West, Central & North-East hubs
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {KEY_REGIONAL_CITIES.map((group) => (
          <div
            key={group.region}
            className="rounded-2xl bg-white/5 border border-white/10 p-4 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span>{group.icon}</span>
                  {group.region}
                </span>
                <span className="text-[10px] text-slate-400">
                  {group.cities.length} Major Hubs
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.cities.map((cName) => {
                  const isCurrent =
                    currentCityName.toLowerCase() === cName.toLowerCase();
                  return (
                    <button
                      key={cName}
                      onClick={() => handleCityClick(cName)}
                      className={`text-xs px-2.5 py-1 rounded-xl transition-all ${
                        isCurrent
                          ? 'bg-blue-600 text-white font-bold ring-1 ring-blue-400'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-white/5'
                      }`}
                    >
                      {cName}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span>View full zone</span>
              <button
                onClick={() => handleCityClick(group.cities[0])}
                className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
              >
                <span>Jump to {group.cities[0]}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
