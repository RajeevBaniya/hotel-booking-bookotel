import axios from "axios";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";


// In development, use relative paths so Vite proxy can forward to backend.
// In production (Vercel), use the absolute backend URL from env.
axios.defaults.baseURL = import.meta.env.DEV ? "" : import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [roleIntent, setRoleIntent] = useState(undefined);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [showIntentPrompt, setShowIntentPrompt] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [searchedCities, setSearchedCities] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [cities, setCities] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      setRoomsLoading(true);
      const { data } = await axios.get('/api/rooms')
      if (data.success) {
        setRooms(data.rooms)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setRoomsLoading(false);
    }
  }

  const fetchCities = async () => {
    try {
      const { data } = await axios.get('/api/cities')
      if (data.success) {
        setCities(data.cities)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error("Error fetching cities:", error.message)
    }
  }

  const fetchUser = useCallback(async () => {
    try {
      setAuthLoading(true);
      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setIsOwner(data.role === "hotelOwner");
        setRoleIntent(data.roleIntent);
        if (data.role !== "hotelOwner") {
          const key = `intentPromptShown:${(user && user.id) ? user.id : "unknown"}`;
          const shouldShow = !data.roleIntent || !sessionStorage.getItem(key);
          setShowIntentPrompt(shouldShow);
        } else {
          setShowIntentPrompt(false);
        }
        setSearchedCities(data.recentSearchedCities);
      } else {
        // Retry fetching user details after 5 seconds
        setTimeout(() => {
          fetchUser();
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAuthLoading(false);
    }
  }, [getToken, setIsOwner, setSearchedCities, user]);

  const saveRoleIntent = useCallback(async (intent) => {
    try {
      const { data } = await axios.post(
        "/api/user/intent",
        { roleIntent: intent },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        setRoleIntent(data.roleIntent);
        setShowIntentPrompt(false);
        const key = `intentPromptShown:${(user && user.id) ? user.id : "unknown"}`;
        sessionStorage.setItem(key, "1");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [getToken, user]);

  useEffect(() => {
    if (!isLoaded) {
      setAuthLoading(true);
      return;
    }
    if (isSignedIn && user) {
      fetchUser();
    } else {
      // If logged out, reset flags and stop loading
      setIsOwner(false);
      setRoleIntent(undefined);
      setShowIntentPrompt(false);
      // Clear any intent prompt flags on logout
      const toRemove = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const k = sessionStorage.key(i);
        if (k && k.startsWith("intentPromptShown:")) toRemove.push(k);
      }
      toRemove.forEach((k) => sessionStorage.removeItem(k));
      setAuthLoading(false);
    }
  }, [isLoaded, isSignedIn, user, fetchUser]);

  useEffect(() => {
    // Fetch rooms and cities in parallel for faster loading
    Promise.all([fetchRooms(), fetchCities()]);
    // Rehydrate last searched city for mobile back/forward navigation
    try {
      const last = localStorage.getItem('lastSearchedCity');
      if (last) setSearchedCities([last]);
    } catch {
      // ignore errors
    }
  }, [])

  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    roleIntent,
    setRoleIntent,
    saveRoleIntent,
    axios,
    showHotelReg,
    setShowHotelReg,
    showIntentPrompt,
    setShowIntentPrompt,
    authLoading,
    searchedCities,
    setSearchedCities,
    rooms,
    setRooms,
    cities,
    fetchCities,
    roomsLoading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
