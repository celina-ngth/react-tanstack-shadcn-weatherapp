export interface Coordinates {
  lat: number
  lon: number
}

export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

export interface WeatherData {
  coord: Coordinates,
  weather: WeatherCondition[],
  base: string,
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  },
  visibility: string
  wind: {
    speed: number
    deg: number
    gust: number
  },
  sys: {
    country: number
    sunrise: number
    sunset: number
  },
  dt: number,
  name: string
}

export interface ForecastData {
  list: Array<{
    dt: number
    main: WeatherData["main"]
    weather: WeatherData["weather"]
    wind: WeatherData["wind"]
    dt_txt: string
  }>
  city: {
    name: string
    country: string
    sunrise: number
    sunset: number
  }
}

export interface GeocodingResponse {
  name: string
  local_names?: Record<string, string>
  lat: number
  lon: number
  country: string
  state?: string
}