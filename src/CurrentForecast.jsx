import { daysOfTheWeek, monthsOfTheYear } from "./utility";

export default function CurrentForecast({ weather }) {
  const currentForecastIcon = weather.current.condition.icon;
  const currentDate = weather.location.localtime;

  const [year, month, day] = currentDate.split(" ")[0].split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return (
    <div>
      <section className="h-[300px] flex flex-col items-center justify-center gap-5 bg-[#16243A] rounded-lg md:mb-5 lg:w-[800px] ">
        <div>
          <h2 className="text-xl md:text-3xl font-bold ">
            {weather.location.name}, {weather.location.region}
          </h2>
          <h3 className="text-sm md:text-lg font-medium text-center">
            {daysOfTheWeek[date.getDay()]}, {monthsOfTheYear[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
          </h3>
        </div>
        <div className="flex flex-col items-center gap-4">
          <img className="w-[100px]" src={`${currentForecastIcon}`} alt="" />
          <p className="text-4xl font-medium pb-5">{weather.current.temp_f}&deg;</p>
        </div>
      </section>

      <ul className="flex flex-wrap justify-evenly sm:flex-nowrap lg:w-[800px]">
        <li className="sub-weather-cards">
          <p>Feels Like </p>
          <p>{weather.current.feelslike_f}&deg;</p>
        </li>
        <li className="sub-weather-cards">
          <p>Humidty</p>
          <p>{weather.current.humidity}%</p>
        </li>
        <li className="sub-weather-cards">
          <p>Wind</p>
          <p>{weather.current.wind_kph} km/h</p>
        </li>
        <li className="sub-weather-cards">
          <p>Precipitation</p>
          <p>{weather.current.precip_mm} mm</p>
        </li>
      </ul>
    </div>
  );
}
