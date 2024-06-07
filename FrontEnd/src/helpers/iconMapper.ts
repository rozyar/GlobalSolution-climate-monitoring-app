import { WeatherIcon } from "../types/types";

type IconMapping = {
  icon: WeatherIcon;
  color: string;
};

const iconMapper = (icon: string): IconMapping => {
  switch (icon) {
    case "01d":
      return { icon: "weather-sunny", color: "#FFD700" };
    case "01n":
      return { icon: "weather-night", color: "#1E90FF" };
    case "02d":
      return { icon: "weather-partly-cloudy", color: "#FFD700" };
    case "02n":
      return { icon: "weather-partly-cloudy", color: "#1E90FF" };
    case "03d":
    case "03n":
      return { icon: "weather-cloudy", color: "#A9A9A9" };
    case "04d":
    case "04n":
      return { icon: "weather-cloudy", color: "#A9A9A9" };
    case "09d":
    case "09n":
      return { icon: "weather-rainy", color: "#4682B4" };
    case "10d":
    case "10n":
      return { icon: "weather-rainy", color: "#4682B4" };
    case "11d":
    case "11n":
      return { icon: "weather-lightning", color: "#FFA500" };
    case "13d":
    case "13n":
      return { icon: "weather-snowy", color: "#FFFFFF" };
    case "50d":
    case "50n":
      return { icon: "weather-fog", color: "#696969" };
    default:
      return { icon: "weather-sunny", color: "#FFD700" };
  }
};

export default iconMapper;
