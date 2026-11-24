import { useState, useEffect } from "react";
import CurrentForecast from "./CurrentForecast";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
const myWeather =
  "http://api.weatherapi.com/v1/forecast.json?key=0d11215929e14d228ce25950262111&q=33884&days=7&aqi=no&alerts=no";

export default function WeatherApp() {
  const [weather, setWeather] = useState();

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

  // async function fetchWeather() {
  //   const res = await fetch(myWeather);
  //   const data = await res.json();
  //   setWeather(data);
  //   console.log(weather);
  // }

  return (
    <div className="flex flex-col">
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
