import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import DateInput from "../components/DateInput";

const Hero = () => {

  const {navigate, getToken, axios, setSearchedCities, cities} = useAppContext()
  const [destination, setDestination] = useState("")

  const onSearch = async (e) => {
    e.preventDefault();
    const query = (destination || "").trim();
    if (!query) return;
    navigate(`/rooms?destination=${encodeURIComponent(query)}`)
    
    try {
      // call api to save recent searched city
      await axios.post('/api/user/store-recent-search', {recentSearchedCity: query}, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });

      // Replace searchedCities with only the current destination
      setSearchedCities([query]);
      // Persist locally so Home can rehydrate after navigation on mobile
      try { localStorage.setItem('lastSearchedCity', query); } catch {}
    } catch (error) {
      console.error("Error saving recent search:", error);
    }
  }
  
  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage3.png")] bg-no-repeat bg-cover bg-center h-screen'>
      <p className="bg-[#09669e]/70 px-3.5 py-1 rounded-full mt-30">
        Feel like Home, Wherever You Go
      </p>
      <h1 className="font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-5 ">
        Discover Your Perfect Gateway Destination
      </h1>
      <p className="max-w-130 mt-3 text-sm md:text-base text-amber-50">
        Discover world class luxury and comfort in the most prestigious
        destinations. Start your journey today.
      </p>

      <form onSubmit={onSearch} className="bg-white text-gray-500 rounded-lg px-6 py-4 mt-9 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto">
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="" className="h-4" />
            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input
            onChange={e=> setDestination(e.target.value)}
            value={destination}
            list="destinations"
            id="destinationInput"
            type="text"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            required
          />
          <datalist id="destinations">
            {cities && cities.length > 0 && cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>
            
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="" className="h-4" />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <DateInput id="checkIn" placeholder="mm/dd/yyyy" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="" className="h-4" />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <DateInput id="checkOut" placeholder="mm/dd/yyyy" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests">Guests</label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
            placeholder="0"
          />
        </div>

        <button className="flex items-center justify-center gap-1 rounded-md bg-black py-2 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1">
          <img src={assets.searchIcon} alt="serachIcon" className="h-7" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default Hero;
