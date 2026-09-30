import {
  AirQualityData,
  CurrentWeather,
  DailyForecastItem,
  HourlyForecastItem,
  IMDWeatherAlert,
  SunMoonData,
  WeatherDataResponse,
  ActiveLocation
} from '../types/weather';
import { findNearestIndianCity } from '../data/indianCities';

// Weather code mapping
export function getWeatherInterpretation(code: number): { desc: string; hindi: string; icon: string } {
  switch (code) {
    case 0:
      return { desc: 'Clear Sky', hindi: 'साफ़ आसमान', icon: 'Sun' };
    case 1:
      return { desc: 'Mainly Clear', hindi: 'मुख्यतः साफ़', icon: 'SunMedium' };
    case 2:
      return { desc: 'Partly Cloudy', hindi: 'आंशिक बादल', icon: 'CloudSun' };
    case 3:
      return { desc: 'Overcast', hindi: 'घने बादल', icon: 'Cloud' };
    case 45:
    case 48:
      return { desc: 'Fog & Mist', hindi: 'कोहरा और धुंध', icon: 'CloudFog' };
    case 51:
      return { desc: 'Light Drizzle', hindi: 'हल्की बूंदाबांदी', icon: 'CloudDrizzle' };
    case 53:
      return { desc: 'Moderate Drizzle', hindi: 'मध्यम बूंदाबांदी', icon: 'CloudDrizzle' };
    case 55:
      return { desc: 'Dense Drizzle', hindi: 'घनी बूंदाबांदी', icon: 'CloudDrizzle' };
    case 61:
      return { desc: 'Slight Rain', hindi: 'हल्की बारिश', icon: 'CloudRain' };
    case 63:
      return { desc: 'Moderate Rain', hindi: 'मध्यम वर्षा', icon: 'CloudRain' };
    case 65:
      return { desc: 'Heavy Monsoon Rain', hindi: 'भारी मानसूनी वर्षा', icon: 'CloudRainWind' };
    case 71:
    case 73:
    case 75:
      return { desc: 'Snowfall', hindi: 'बर्फबारी', icon: 'Snowflake' };
    case 80:
      return { desc: 'Light Showers', hindi: 'हल्की फुहारें', icon: 'CloudSunRain' };
    case 81:
      return { desc: 'Moderate Showers', hindi: 'मध्यम फुहारें', icon: 'CloudRain' };
    case 82:
      return { desc: 'Violent Showers', hindi: 'तेज मानसूनी फुहारें', icon: 'CloudRainWind' };
    case 95:
      return { desc: 'Thunderstorm', hindi: 'गरज के साथ बौछारें', icon: 'CloudLightning' };
    case 96:
    case 99:
      return { desc: 'Severe Thunderstorm & Hail', hindi: 'आंधी तूफान व ओलावृष्टि', icon: 'CloudAlert' };
    default:
      return { desc: 'Clear', hindi: 'साफ़', icon: 'Sun' };
  }
}

// Indian Central Pollution Control Board (CPCB) NAQI calculation
export function calculateIndianAQI(pm25: number, pm10: number): {
  aqi: number;
  band: 'Good' | 'Satisfactory' | 'Moderate' | 'Poor' | 'Very Poor' | 'Severe';
  color: string;
  bgColor: string;
  healthAdvisory: string;
  maskRecommended: boolean;
  purifierRecommended: boolean;
  outdoorSafe: boolean;
} {
  // PM2.5 sub-index calculation based on CPCB breakpoints
  let aqiPm25 = 0;
  if (pm25 <= 30) {
    aqiPm25 = (50 / 30) * pm25;
  } else if (pm25 <= 60) {
    aqiPm25 = 50 + ((100 - 50) / (60 - 30)) * (pm25 - 30);
  } else if (pm25 <= 90) {
    aqiPm25 = 100 + ((200 - 100) / (90 - 60)) * (pm25 - 60);
  } else if (pm25 <= 120) {
    aqiPm25 = 200 + ((300 - 200) / (120 - 90)) * (pm25 - 90);
  } else if (pm25 <= 250) {
    aqiPm25 = 300 + ((400 - 300) / (250 - 120)) * (pm25 - 120);
  } else {
    aqiPm25 = 400 + ((500 - 400) / (380 - 250)) * Math.min(pm25 - 250, 130);
  }

  // PM10 sub-index calculation based on CPCB breakpoints
  let aqiPm10 = 0;
  if (pm10 <= 50) {
    aqiPm10 = pm10;
  } else if (pm10 <= 100) {
    aqiPm10 = 50 + ((100 - 50) / (100 - 50)) * (pm10 - 50);
  } else if (pm10 <= 250) {
    aqiPm10 = 100 + ((200 - 100) / (250 - 100)) * (pm10 - 100);
  } else if (pm10 <= 350) {
    aqiPm10 = 200 + ((300 - 200) / (350 - 250)) * (pm10 - 250);
  } else if (pm10 <= 430) {
    aqiPm10 = 300 + ((400 - 300) / (430 - 350)) * (pm10 - 350);
  } else {
    aqiPm10 = 400 + ((500 - 400) / (550 - 430)) * Math.min(pm10 - 430, 120);
  }

  const calculatedAQI = Math.min(500, Math.round(Math.max(aqiPm25, aqiPm10, 12)));

  if (calculatedAQI <= 50) {
    return {
      aqi: calculatedAQI,
      band: 'Good',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-800 dark:text-emerald-300',
      healthAdvisory: 'Air quality is considered satisfactory, and air pollution poses little or no risk.',
      maskRecommended: false,
      purifierRecommended: false,
      outdoorSafe: true,
    };
  } else if (calculatedAQI <= 100) {
    return {
      aqi: calculatedAQI,
      band: 'Satisfactory',
      color: 'text-lime-600',
      bgColor: 'bg-lime-500/15 border-lime-500/30 text-lime-800 dark:text-lime-300',
      healthAdvisory: 'Minor breathing discomfort to sensitive people with respiratory conditions.',
      maskRecommended: false,
      purifierRecommended: false,
      outdoorSafe: true,
    };
  } else if (calculatedAQI <= 200) {
    return {
      aqi: calculatedAQI,
      band: 'Moderate',
      color: 'text-amber-600',
      bgColor: 'bg-amber-500/15 border-amber-500/30 text-amber-800 dark:text-amber-300',
      healthAdvisory: 'Breathing discomfort to people with asthma and heart disease. Children and elderly should limit prolonged exertion.',
      maskRecommended: false,
      purifierRecommended: true,
      outdoorSafe: true,
    };
  } else if (calculatedAQI <= 300) {
    return {
      aqi: calculatedAQI,
      band: 'Poor',
      color: 'text-orange-600',
      bgColor: 'bg-orange-500/15 border-orange-500/30 text-orange-800 dark:text-orange-300',
      healthAdvisory: 'Breathing discomfort to most people on prolonged exposure. Wear N95 mask when outdoors.',
      maskRecommended: true,
      purifierRecommended: true,
      outdoorSafe: false,
    };
  } else if (calculatedAQI <= 400) {
    return {
      aqi: calculatedAQI,
      band: 'Very Poor',
      color: 'text-rose-600',
      bgColor: 'bg-rose-500/15 border-rose-500/30 text-rose-800 dark:text-rose-300',
      healthAdvisory: 'Respiratory illness on prolonged exposure. Avoid morning/evening jogs. Keep windows closed.',
      maskRecommended: true,
      purifierRecommended: true,
      outdoorSafe: false,
    };
  } else {
    return {
      aqi: calculatedAQI,
      band: 'Severe',
      color: 'text-purple-700 dark:text-purple-400',
      bgColor: 'bg-purple-500/20 border-purple-500/40 text-purple-900 dark:text-purple-200',
      healthAdvisory: 'Severe emergency health impact on healthy people. Serious impact on those with existing diseases. Stay indoors.',
      maskRecommended: true,
      purifierRecommended: true,
      outdoorSafe: false,
    };
  }
}

// Generate IMD-style weather alert based on conditions
export function getIMDAlert(
  temperature: number,
  precipitation: number,
  windSpeed: number,
  weatherCode: number,
  aqi: number
): IMDWeatherAlert {
  if (weatherCode === 96 || weatherCode === 99 || windSpeed > 60 || temperature >= 44) {
    return {
      level: 'red',
      title: 'IMD Red Alert (Take Action)',
      message:
        temperature >= 44
          ? `Severe Heatwave Warning! Temperatures soaring past ${temperature.toFixed(1)}°C. Stay hydrated and avoid direct sunlight.`
          : `Severe convective storm alert with intense gusty winds (${windSpeed} km/h) and severe precipitation.`,
      action: 'Remain indoors, seek shelter, avoid open fields and non-essential travel.'
    };
  }

  if (precipitation > 15 || weatherCode === 95 || temperature >= 40 || windSpeed > 45 || aqi > 350) {
    return {
      level: 'orange',
      title: 'IMD Orange Alert (Be Prepared)',
      message:
        temperature >= 40
          ? `Heatwave conditions prevailing across the region. Peak heat expected between 12 PM - 4 PM.`
          : weatherCode === 95
          ? `Thunderstorm and lightning activity forecasted. Heavy localized rain showers likely.`
          : `High pollution and smog conditions. Severe air quality recorded.`,
      action: 'Plan outdoor travel cautiously. Keep emergency contact and rain/heat gear handy.'
    };
  }

  if (precipitation > 3 || weatherCode >= 51 || temperature >= 36 || windSpeed > 25 || aqi > 200) {
    return {
      level: 'yellow',
      title: 'IMD Yellow Alert (Be Updated)',
      message:
        temperature >= 36
          ? `Warm and humid conditions. High discomfort index during afternoon hours.`
          : `Light to moderate rainfall and overcast skies anticipated. Keep updated with local forecasts.`,
      action: 'Stay updated with changing weather conditions through the day.'
    };
  }

  return {
    level: 'green',
    title: 'IMD Green: Normal Weather Conditions',
    message: 'No significant adverse weather warnings issued by India Meteorological Department.',
    action: 'Enjoy pleasant outdoor conditions.'
  };
}

// Reverse geocode coordinates to find city, district, state
export async function reverseGeocodeLocation(lat: number, lon: number): Promise<{
  city: string;
  district?: string;
  state: string;
  country: string;
}> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    if (res.ok) {
      const data = await res.json();
      const city = data.city || data.locality || data.principalSubdivision || 'Unknown City';
      const state = data.principalSubdivision || '';
      const country = data.countryName || 'India';
      const district = data.locality && data.locality !== data.city ? data.locality : undefined;

      return {
        city: city || 'Local Area',
        district,
        state: state || 'India',
        country: country || 'India',
      };
    }
  } catch (err) {
    console.warn('BigDataCloud reverse geocode failed, attempting nearest Indian city fallback:', err);
  }

  // Fallback to closest curated Indian city
  const nearest = findNearestIndianCity(lat, lon);
  return {
    city: nearest.city.name,
    district: nearest.city.state,
    state: nearest.city.state,
    country: 'India',
  };
}

// Fetch complete live weather from Open-Meteo
export async function fetchLiveWeatherData(
  location: ActiveLocation
): Promise<WeatherDataResponse> {
  const { latitude: lat, longitude: lon } = location;

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max,sunrise,sunset&timezone=auto&forecast_days=8`;

  const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,european_aqi,us_aqi&timezone=auto`;

  const [weatherRes, aqiRes] = await Promise.allSettled([
    fetch(weatherUrl).then((r) => r.json()),
    fetch(aqiUrl).then((r) => r.json()),
  ]);

  if (weatherRes.status !== 'fulfilled') {
    throw new Error('Failed to retrieve weather data from Open-Meteo.');
  }

  const wData = weatherRes.value;
  const currentRaw = wData.current;
  const dailyRaw = wData.daily;
  const hourlyRaw = wData.hourly;

  const weatherInfo = getWeatherInterpretation(currentRaw.weather_code);

  const current: CurrentWeather = {
    temperature: Math.round(currentRaw.temperature_2m * 10) / 10,
    feelsLike: Math.round(currentRaw.apparent_temperature * 10) / 10,
    tempMin: Math.round(dailyRaw.temperature_2m_min[0] * 10) / 10,
    tempMax: Math.round(dailyRaw.temperature_2m_max[0] * 10) / 10,
    weatherCode: currentRaw.weather_code,
    weatherDesc: weatherInfo.desc,
    hindiDesc: weatherInfo.hindi,
    isDay: Boolean(currentRaw.is_day),
    humidity: currentRaw.relative_humidity_2m,
    windSpeed: Math.round(currentRaw.wind_speed_10m * 10) / 10,
    windDirection: currentRaw.wind_direction_10m,
    pressure: Math.round(currentRaw.pressure_msl || currentRaw.surface_pressure || 1013),
    precipitation: currentRaw.precipitation || 0,
    uvIndex: dailyRaw.uv_index_max ? Math.round(dailyRaw.uv_index_max[0] * 10) / 10 : 5,
    visibility: 10, // Standard Open-Meteo visibility baseline
    dewPoint: Math.round(
      (currentRaw.temperature_2m - (100 - currentRaw.relative_humidity_2m) / 5) * 10
    ) / 10,
    cloudCover: currentRaw.cloud_cover || 0,
    time: currentRaw.time,
  };

  // Build Hourly forecast (next 24 hours starting from current hour)
  const currentHourIso = new Date().toISOString().substring(0, 13);
  let startIndex = 0;
  if (hourlyRaw && hourlyRaw.time) {
    const foundIdx = hourlyRaw.time.findIndex((t: string) => t.startsWith(currentHourIso));
    if (foundIdx >= 0) startIndex = foundIdx;
  }

  const hourly: HourlyForecastItem[] = [];
  if (hourlyRaw && hourlyRaw.time) {
    for (let i = startIndex; i < Math.min(startIndex + 24, hourlyRaw.time.length); i++) {
      const timeStr = hourlyRaw.time[i];
      const hourDate = new Date(timeStr);
      const hourFormatted = hourDate.toLocaleTimeString('en-IN', {
        hour: 'numeric',
        hour12: true,
      });

      const hCode = hourlyRaw.weather_code[i];
      const interp = getWeatherInterpretation(hCode);

      hourly.push({
        time: timeStr,
        hour: i === startIndex ? 'Now' : hourFormatted,
        temperature: Math.round(hourlyRaw.temperature_2m[i]),
        feelsLike: Math.round(hourlyRaw.apparent_temperature[i]),
        weatherCode: hCode,
        weatherDesc: interp.desc,
        precipitationProbability: hourlyRaw.precipitation_probability ? hourlyRaw.precipitation_probability[i] || 0 : 0,
        windSpeed: Math.round(hourlyRaw.wind_speed_10m[i]),
        isDay: Boolean(hourlyRaw.is_day[i]),
      });
    }
  }

  // Build 7-day daily forecast
  const daily: DailyForecastItem[] = [];
  if (dailyRaw && dailyRaw.time) {
    for (let i = 0; i < Math.min(7, dailyRaw.time.length); i++) {
      const dTime = dailyRaw.time[i];
      const dDate = new Date(dTime);
      const isToday = i === 0;
      const dayName = isToday
        ? 'Today'
        : dDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

      const dCode = dailyRaw.weather_code[i];
      const interp = getWeatherInterpretation(dCode);

      daily.push({
        date: dTime,
        dayName,
        tempMax: Math.round(dailyRaw.temperature_2m_max[i]),
        tempMin: Math.round(dailyRaw.temperature_2m_min[i]),
        weatherCode: dCode,
        weatherDesc: interp.desc,
        precipitationProbability: dailyRaw.precipitation_probability_max ? dailyRaw.precipitation_probability_max[i] || 0 : 0,
        precipitationSum: Math.round((dailyRaw.precipitation_sum[i] || 0) * 10) / 10,
        windSpeedMax: Math.round(dailyRaw.wind_speed_10m_max[i]),
        uvIndexMax: Math.round(dailyRaw.uv_index_max[i] || 0),
        sunrise: dailyRaw.sunrise[i] ? dailyRaw.sunrise[i].split('T')[1] : '06:00',
        sunset: dailyRaw.sunset[i] ? dailyRaw.sunset[i].split('T')[1] : '18:30',
      });
    }
  }

  // Parse Air Quality Data
  let pm25 = 35;
  let pm10 = 65;
  let ozone = 45;
  let no2 = 25;
  let so2 = 12;
  let co = 450;

  if (aqiRes.status === 'fulfilled' && aqiRes.value?.current) {
    const aqCurr = aqiRes.value.current;
    if (aqCurr.pm2_5 !== undefined && aqCurr.pm2_5 !== null) pm25 = Math.round(aqCurr.pm2_5);
    if (aqCurr.pm10 !== undefined && aqCurr.pm10 !== null) pm10 = Math.round(aqCurr.pm10);
    if (aqCurr.ozone !== undefined && aqCurr.ozone !== null) ozone = Math.round(aqCurr.ozone);
    if (aqCurr.nitrogen_dioxide !== undefined && aqCurr.nitrogen_dioxide !== null) no2 = Math.round(aqCurr.nitrogen_dioxide);
    if (aqCurr.sulphur_dioxide !== undefined && aqCurr.sulphur_dioxide !== null) so2 = Math.round(aqCurr.sulphur_dioxide);
    if (aqCurr.carbon_monoxide !== undefined && aqCurr.carbon_monoxide !== null) co = Math.round(aqCurr.carbon_monoxide);
  }

  const calculatedNAQI = calculateIndianAQI(pm25, pm10);

  const airQuality: AirQualityData = {
    aqi: calculatedNAQI.aqi,
    aqiBand: calculatedNAQI.band,
    aqiColor: calculatedNAQI.color,
    aqiBgColor: calculatedNAQI.bgColor,
    dominantPollutant: pm25 > pm10 ? 'PM 2.5' : 'PM 10',
    healthAdvisory: calculatedNAQI.healthAdvisory,
    maskRecommended: calculatedNAQI.maskRecommended,
    purifierRecommended: calculatedNAQI.purifierRecommended,
    outdoorSafe: calculatedNAQI.outdoorSafe,
    pm25,
    pm10,
    ozone,
    no2,
    so2,
    co,
  };

  // Sun and daylight calculations
  const sunriseStr = dailyRaw.sunrise ? dailyRaw.sunrise[0].split('T')[1] : '06:00';
  const sunsetStr = dailyRaw.sunset ? dailyRaw.sunset[0].split('T')[1] : '18:30';

  // Calculate sun progress percent for today
  const now = new Date();
  const todaySunrise = new Date(dailyRaw.sunrise ? dailyRaw.sunrise[0] : `${now.toISOString().substring(0, 10)}T06:00:00`);
  const todaySunset = new Date(dailyRaw.sunset ? dailyRaw.sunset[0] : `${now.toISOString().substring(0, 10)}T18:30:00`);

  let sunProgress = 0;
  const isDaytime = now >= todaySunrise && now <= todaySunset;
  if (now > todaySunset) {
    sunProgress = 100;
  } else if (now < todaySunrise) {
    sunProgress = 0;
  } else {
    const totalDaylightMs = todaySunset.getTime() - todaySunrise.getTime();
    const elapsedMs = now.getTime() - todaySunrise.getTime();
    sunProgress = Math.min(100, Math.max(0, Math.round((elapsedMs / totalDaylightMs) * 100)));
  }

  const daylightDurationHours = Math.floor(
    (todaySunset.getTime() - todaySunrise.getTime()) / (1000 * 60 * 60)
  );
  const daylightDurationMinutes = Math.floor(
    ((todaySunset.getTime() - todaySunrise.getTime()) % (1000 * 60 * 60)) / (1000 * 60)
  );

  const sunMoon: SunMoonData = {
    sunrise: sunriseStr,
    sunset: sunsetStr,
    daylightHours: `${daylightDurationHours}h ${daylightDurationMinutes}m`,
    sunProgressPercent: sunProgress,
    isDaytime,
  };

  // Generate IMD Weather alert
  const imdAlert = getIMDAlert(
    current.temperature,
    current.precipitation,
    current.windSpeed,
    current.weatherCode,
    airQuality.aqi
  );

  return {
    location,
    current,
    hourly,
    daily,
    airQuality,
    sunMoon,
    imdAlert,
    updatedAt: new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
  };
}

// Live geocoding for Indian cities, towns, taluks, villages
export async function searchAllIndianCities(query: string): Promise<
  Array<{
    id: string;
    name: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
    population?: number;
  }>
> {
  const cleanQ = query.trim();
  if (!cleanQ || cleanQ.length < 2) return [];

  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        cleanQ
      )}&count=10&language=en&format=json`
    );
    if (!res.ok) return [];

    const data = await res.json();
    if (!data.results || !Array.isArray(data.results)) return [];

    // Filter to India
    const indianResults = data.results.filter(
      (item: { country_code?: string; country?: string }) =>
        item.country_code === 'IN' || item.country === 'India'
    );

    return indianResults.map((item: {
      id: number;
      name: string;
      admin1?: string;
      country?: string;
      latitude: number;
      longitude: number;
      population?: number;
    }) => ({
      id: `geo-${item.id}`,
      name: item.name,
      state: item.admin1 || 'India',
      country: 'India',
      latitude: item.latitude,
      longitude: item.longitude,
      population: item.population,
    }));
  } catch (err) {
    console.warn('Geocoding search error:', err);
    return [];
  }
}
