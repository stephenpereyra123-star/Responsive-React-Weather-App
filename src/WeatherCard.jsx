import { useState, useEffect } from "react";
import CurrentForecast from "./CurrentForecast";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import SearchBar from "./SearchBar";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const myWeather = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=33884&days=7&aqi=no&alerts=no`;

export default function WeatherApp() {
  const [weather, setWeather] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getInitialWeather() {
      const res = await fetch(myWeather);
      if (!res.ok) {
        throw new Error("Currently Unable to retrieve weather.");
      }
      const data = await res.json();
      setWeather(data);
    }
    getInitialWeather().catch((error) => {
      setError(error.message);
    });
  }, []);

  if (!weather) {
    return <p>Loading weather...</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const form = e.target;
    const formData = new FormData(form);
    const citySearch = formData.get("citySearch");

    async function fetchWeather() {
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${citySearch}&days=7&aqi=no&alerts=no`,
      );
      if (!res.ok) {
        throw new Error("Unable to Retrieve weather. Check your location.");
      }

      const data = await res.json();
      setWeather(data);
    }
    fetchWeather().catch((error) => {
      setError(error.message);
    });

    form.reset();
  };

  return (
    <div className="flex flex-col">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-center">
        <SearchBar handleSubmit={handleSubmit} />
      </div>

      <div className="flex flex-col md:gap-6 lg:justify-center lg:items-center">
        <CurrentForecast weather={weather} />
        <HourlyForecast weather={weather.forecast.forecastday} />
      </div>

      <div className="lg:flex lg:justify-center lg:items-center">
        <DailyForecast dailyForecast={weather.forecast.forecastday} />
      </div>
    </div>
  );
}
