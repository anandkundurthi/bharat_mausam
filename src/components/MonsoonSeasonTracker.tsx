import React from 'react';
import { CloudRainWind, ThermometerSun, Snowflake, Compass, Info } from 'lucide-react';

export const MonsoonSeasonTracker: React.FC = () => {
  const currentMonth = new Date().getMonth(); // 0-indexed (0 = Jan, 11 = Dec)

  // Determine current Indian Meteorological Season
  let currentSeasonInfo = {
    title: 'Winter Season (शीत ऋतु)',
    period: 'January - February',
    icon: Snowflake,
    iconColor: 'text-sky-400',
    description:
      'Characterized by pleasant days, cool nights, and morning fog in Northern plains driven by Western Disturbances from the Mediterranean.',
    tips: 'Watch for early morning radiation fog and lower night temperatures. Peninsular India remains mild and pleasant.',
  };

  if (currentMonth >= 2 && currentMonth <= 4) {
    // March to May
    currentSeasonInfo = {
      title: 'Pre-Monsoon & Summer (ग्रीष्म ऋतु)',
      period: 'March - May',
      icon: ThermometerSun,
      iconColor: 'text-amber-400',
      description:
        'Rapidly rising temperatures across Central, Northern and Peninsular India. Dry winds (Loo) prevalent across northwest plains with localized thunderstorms (Kalbaisakhi in Bengal).',
      tips: 'Stay well-hydrated during peak sunshine hours (12 PM - 4 PM). Wear light cotton clothes and carry sun protection.',
    };
  } else if (currentMonth >= 5 && currentMonth <= 8) {
    // June to September
    currentSeasonInfo = {
      title: 'Southwest Monsoon Season (वर्षा ऋतु)',
      period: 'June - September',
      icon: CloudRainWind,
      iconColor: 'text-blue-400',
      description:
        'The Southwest Monsoon brings over 70% of India’s annual precipitation, arriving via the Arabian Sea branch (Kerala coast) and Bay of Bengal branch.',
      tips: 'Monitor IMD heavy rainfall alerts for flood-prone regions and ghat sections. High relative humidity across coastal belts.',
    };
  } else if (currentMonth >= 9 && currentMonth <= 11) {
    // October to December
    currentSeasonInfo = {
      title: 'Post-Monsoon & Northeast Monsoon (शरद ऋतु)',
      period: 'October - December',
      icon: Compass,
      iconColor: 'text-teal-400',
      description:
        'Retreating monsoon with transition to cooler conditions. Northeast Monsoon brings vital rainfall to Tamil Nadu, Coastal Andhra Pradesh, and Kerala.',
      tips: 'Air quality in Indo-Gangetic plains begins to drop due to temperature inversion and crop residue burning.',
    };
  }

  const SeasonIcon = currentSeasonInfo.icon;

  return (
    <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-xl text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <SeasonIcon className={`h-4 w-4 ${currentSeasonInfo.iconColor}`} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Indian Seasonal Climate Tracker
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {currentSeasonInfo.period}
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              India Meteorological Department (IMD) seasonal calendar
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7 space-y-2">
          <h3 className="text-base font-bold text-amber-300">
            Current Phase: {currentSeasonInfo.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {currentSeasonInfo.description}
          </p>
          <div className="mt-3 flex items-start gap-2 rounded-2xl bg-white/5 p-3 border border-white/10 text-xs text-slate-300">
            <Info className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
            <span>{currentSeasonInfo.tips}</span>
          </div>
        </div>

        {/* 4 Seasons Micro Overview */}
        <div className="md:col-span-5 grid grid-cols-2 gap-2 text-xs">
          <div className={`p-2.5 rounded-xl border ${currentMonth <= 1 ? 'bg-white/10 border-blue-400/50' : 'bg-white/5 border-white/5'}`}>
            <span className="text-[10px] text-slate-400 block">Jan - Feb</span>
            <span className="font-semibold text-slate-200">Winter (शीत)</span>
          </div>
          <div className={`p-2.5 rounded-xl border ${currentMonth >= 2 && currentMonth <= 4 ? 'bg-white/10 border-amber-400/50' : 'bg-white/5 border-white/5'}`}>
            <span className="text-[10px] text-slate-400 block">Mar - May</span>
            <span className="font-semibold text-slate-200">Summer (ग्रीष्म)</span>
          </div>
          <div className={`p-2.5 rounded-xl border ${currentMonth >= 5 && currentMonth <= 8 ? 'bg-white/10 border-teal-400/50' : 'bg-white/5 border-white/5'}`}>
            <span className="text-[10px] text-slate-400 block">Jun - Sep</span>
            <span className="font-semibold text-slate-200">Monsoon (वर्षा)</span>
          </div>
          <div className={`p-2.5 rounded-xl border ${currentMonth >= 9 && currentMonth <= 11 ? 'bg-white/10 border-purple-400/50' : 'bg-white/5 border-white/5'}`}>
            <span className="text-[10px] text-slate-400 block">Oct - Dec</span>
            <span className="font-semibold text-slate-200">Post-Monsoon (शरद)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
