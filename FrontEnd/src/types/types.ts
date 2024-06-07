export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  pod: string;
}

export interface WeatherData {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface FireLocation {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OceanPlasticLocation {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type WeatherIcon =
  | "weather-sunny"
  | "weather-night"
  | "weather-partly-cloudy"
  | "weather-cloudy"
  | "weather-rainy"
  | "weather-lightning"
  | "weather-snowy"
  | "weather-fog";
