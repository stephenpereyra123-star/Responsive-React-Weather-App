export default function SearchBar({ handleSubmit }) {
  return (
    <form
      className="flex justify-evenly items-center  text-sm bg-[#16243A] h-[60px] mt-3 mb-3 rounded-lg pl-2 pr-2 lg:w-[800px]"
      onSubmit={handleSubmit}
    >
      <label
        className="text-[10px] sm:text-[18px] font-bold border border-[#38BDF8] rounded-lg p-1 "
        htmlFor="citySearch"
      >
        Enter City, State or Zipcode
      </label>
      <input
        className="text-[13px] sm:w-[200px] sm:h-[30px] border border-[#38BDF8] rounded-lg"
        type="text"
        name="citySearch"
        id="citySearch"
        required
      />
      <button className="rounded-lg bg-[#38BDF8] text-[10px] w-[50px] sm:w-[100px] h-[50%]">Search</button>
    </form>
  );
}
