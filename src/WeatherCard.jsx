import { useState, useEffect } from "react";
import CurrentForecast from "./CurrentForecast";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const myWeather = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=33884&days=7&aqi=no&alerts=no`;

export default function WeatherApp() {
  const [weather, setWeather] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getInitialWeather() {
      const res = await fetch(myWeather);
      const data = await res.json();
      setWeather(data);
    }
    getInitialWeather();
  }, []);

  if (!weather) {
    return <p>Loading weather...</p>;
  }
  console.log(weather.forecast.forecastday.length);

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
      const data = await res.json();
      setWeather(data);
    }
    fetchWeather().catch((error) => {
      setError(error.message);
    });
  };

  return (
    <div className="flex flex-col">
      <form
        className="flex justify-between items-center text-sm bg-[#16243A] h-[60px] mt-3 mb-3 rounded-lg pl-2 pr-2"
        onSubmit={handleSubmit}
      >
        <label className="text-[10px] font-bold border border-[#38BDF8] rounded-lg p-1" htmlFor="citySearch">
          Enter City, State or Zipcode
        </label>
        <input
          className="text-[13px] border border-[#38BDF8] rounded-lg"
          type="text"
          name="citySearch"
          id="citySearch"
          required
        />
        <button className="rounded-lg bg-[#38BDF8] text-[10px] w-[50px] h-[50%]">Search</button>
      </form>

      <div className="flex flex-col md:gap-6 lg:justify-center lg:items-center">
        <CurrentForecast weather={weather} />
        <HourlyForecast weather={weather.forecast.forecastday} />
      </div>

      <div className="lg:flex lg:justify-center lg:items-center">
        <DailyForecast dailyForecast={weather.forecast.forecastday} />
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
