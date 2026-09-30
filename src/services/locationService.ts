import { ActiveLocation } from '../types/weather';
import { reverseGeocodeLocation } from './weatherService';

export interface LocationDetectionResult {
  location: ActiveLocation;
  source: 'gps' | 'ip' | 'fallback';
  success: boolean;
  message?: string;
  accuracyKm?: number;
}

// Default Indian Capital location if all location mechanisms are disabled by browser
export const FALLBACK_INDIAN_LOCATION: ActiveLocation = {
  city: 'New Delhi',
  state: 'Delhi',
  country: 'India',
  latitude: 28.6139,
  longitude: 77.2090,
  isUserLocation: false,
  detectionSource: 'directory',
};

// Detect user's current city via IP address
export async function detectLocationViaIP(): Promise<ActiveLocation | null> {
  try {
    const res = await fetch('https://ipwho.is/');
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.success) return null;

    const lat = data.latitude;
    const lon = data.longitude;
    const city = data.city || 'My City';
    const state = data.region || 'India';
    const country = data.country || 'India';

    return {
      city,
      state,
      country,
      latitude: lat,
      longitude: lon,
      isUserLocation: true,
      detectionSource: 'ip',
    };
  } catch (err) {
    console.warn('IP location detection failed:', err);
    return null;
  }
}

// Primary location detection on application start
export async function getInitialUserLocation(): Promise<LocationDetectionResult> {
  // Check if browser supports Geolocation API
  if (typeof window !== 'undefined' && 'geolocation' in navigator) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 9000,
          maximumAge: 300000,
        });
      });

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const accuracyKm = position.coords.accuracy ? Math.round((position.coords.accuracy / 1000) * 10) / 10 : undefined;

      // Reverse geocode to find real Indian city / district / state
      const geoInfo = await reverseGeocodeLocation(lat, lon);

      return {
        location: {
          city: geoInfo.city,
          district: geoInfo.district,
          state: geoInfo.state,
          country: geoInfo.country,
          latitude: lat,
          longitude: lon,
          isUserLocation: true,
          detectionSource: 'gps',
        },
        source: 'gps',
        success: true,
        accuracyKm,
        message: 'Successfully located your device via GPS',
      };
    } catch (gpsError: unknown) {
      const err = gpsError as GeolocationPositionError;
      console.warn('GPS location attempt unsuccessful:', err.message);

      // Attempt IP location fallback
      const ipLoc = await detectLocationViaIP();
      if (ipLoc) {
        return {
          location: ipLoc,
          source: 'ip',
          success: true,
          message: 'Estimated your city via IP network (GPS was blocked or timed out)',
        };
      }

      // If both fail, fallback to nearest Indian metropolitan baseline
      return {
        location: FALLBACK_INDIAN_LOCATION,
        source: 'fallback',
        success: false,
        message:
          err.code === 1
            ? 'Location permission was denied. Tap "Enable Location" to show your local Indian weather.'
            : 'Could not detect GPS location automatically. Showing National Capital Region.',
      };
    }
  }

  // Geolocation not supported in this browser
  const ipLoc = await detectLocationViaIP();
  if (ipLoc) {
    return {
      location: ipLoc,
      source: 'ip',
      success: true,
      message: 'Detected city via network connection',
    };
  }

  return {
    location: FALLBACK_INDIAN_LOCATION,
    source: 'fallback',
    success: false,
    message: 'Location services unavailable. Showing National Capital Region.',
  };
}
