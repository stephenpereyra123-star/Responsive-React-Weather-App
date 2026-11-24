import { daysOfTheWeek } from "./utility";

export default function DailyForecast({ dailyForecast }) {
  return (
    <div className="mt-6 overflow-x-auto gap-2 sm:gap-6 flex md:justify-evenly lg:w-[800px]">
      {dailyForecast.map((i, index) => (
        <div key={index} className="bg-[#253750] rounded-lg h-[125px] flex flex-col justify-between p-2">
          <p className="text-center text-xs">{daysOfTheWeek[new Date(i.date_epoch * 1000).getDay()]}</p>
          <img src={`${i.day.condition.icon}`} alt="Weather of the day icon" />
          <p className="flex justify-between text-[10px] font-medium pl-1 pr-1">
            <span>{Math.round(i.day.maxtemp_f)}&deg;</span>
            <span>{Math.round(i.day.mintemp_f)}&deg;</span>
          </p>
        </div>
      ))}
    </div>
  );
}
