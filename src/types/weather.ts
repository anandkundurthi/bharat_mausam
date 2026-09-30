export type Region = 'North' | 'South' | 'East' | 'West' | 'Central' | 'North-East' | 'UT';

export type CityCategory = 'metro' | 'tier2' | 'tier3' | 'hill_station' | 'spiritual' | 'coastal';

export interface IndianCity {
  id: string;
  name: string;
  state: string;
  region: Region;
  latitude: number;
  longitude: number;
  category: CityCategory;
  isCapital?: boolean;
  famousFor?: string;
  hindiName?: string;
  populationTier?: 1 | 2 | 3;
}

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  weatherCode: number;
  weatherDesc: string;
  hindiDesc: string;
  isDay: boolean;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  precipitation: number;
  uvIndex: number;
  visibility: number;
  dewPoint: number;
  cloudCover: number;
  time: string;
}

export interface HourlyForecastItem {
  time: string;
  hour: string;
  temperature: number;
  feelsLike: number;
  weatherCode: number;
  weatherDesc: string;
  precipitationProbability: number;
  windSpeed: number;
  isDay: boolean;
}

export interface DailyForecastItem {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
  weatherDesc: string;
  precipitationProbability: number;
  precipitationSum: number;
  windSpeedMax: number;
  uvIndexMax: number;
  sunrise: string;
  sunset: string;
}

export interface AirQualityData {
  aqi: number;
  aqiBand: 'Good' | 'Satisfactory' | 'Moderate' | 'Poor' | 'Very Poor' | 'Severe';
  aqiColor: string;
  aqiBgColor: string;
  dominantPollutant: string;
  healthAdvisory: string;
  maskRecommended: boolean;
  purifierRecommended: boolean;
  outdoorSafe: boolean;
  pm25: number;
  pm10: number;
  ozone: number;
  no2: number;
  so2: number;
  co: number;
}

export interface SunMoonData {
  sunrise: string;
  sunset: string;
  daylightHours: string;
  sunProgressPercent: number;
  isDaytime: boolean;
}

export interface IMDWeatherAlert {
  level: 'green' | 'yellow' | 'orange' | 'red';
  title: string;
  message: string;
  action: string;
}

export interface ActiveLocation {
  city: string;
  district?: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  isUserLocation: boolean;
  detectionSource?: 'gps' | 'ip' | 'search' | 'directory' | 'fallback';
}

export interface WeatherDataResponse {
  location: ActiveLocation;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  airQuality: AirQualityData;
  sunMoon: SunMoonData;
  imdAlert: IMDWeatherAlert;
  updatedAt: string;
}

export type TempUnit = 'C' | 'F';
export type WindUnit = 'kmh' | 'mph';
