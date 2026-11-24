export default function HourlyForecast({ weather }) {
  return (
    <div className="flex h-[120px] overflow-x-auto gap-6 [scrollbar-width:thin] [scrollbar-color:#25364D_transparent] rounded-lg p-3 mt-5 lg:w-[800px]">
      {weather[0].hour.map((i) => {
        return (
          <p className="flex flex-col w-[80px] shrink-0 items-center bg-[#16243A] rounded-lg md:text-lg">
            <span>
              {new Date(i.time).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
            </span>
            <span>{Math.round(i.temp_f)}&deg;</span>
            <img className="w-[40px]" src={`${i.condition.icon}`} alt="" />
          </p>
        );
      })}
    </div>
  );
}
