import { useState, useRef, useEffect } from "react";
import {
  Box,
  InputBase,
  Divider,
  ClickAwayListener,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import SearchPopover from "./SearchPopover";
import { useEventStore } from "../store/useEventStore";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const TM_API_KEY = process.env.REACT_APP_PUBLIC_TM_API_KEY;

function SearchBox({
  handleSearchToggle,
  isMobile = false,
}: {
  isMobile?: boolean;
  handleSearchToggle?: (open: boolean) => void;
}) {
  const {
    eventQuery,
    cityQuery,
    setEventQuery,
    setCityQuery,
    setEvents,
    setFilteredEvents,
    clearFilteredEvents,
  } = useEventStore();

  const [active, setActive] = useState<"event" | "city" | null>(null);
  const [eventSuggestions, setEventSuggestions] = useState<string[]>([]);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);

  const eventInputRef = useRef<HTMLInputElement | null>(null);
  const cityInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch event suggestions for autocomplete
  useEffect(() => {
    if (!eventQuery) {
      setEventSuggestions([]);
      clearFilteredEvents(); // clear filter if input empty
      return;
    }

    const fetchEventSuggestions = async () => {
      try {
        let  params = cityQuery ? { apikey: TM_API_KEY, keyword: eventQuery, size: 5, city : cityQuery } : { apikey: TM_API_KEY, keyword: eventQuery, size: 5 };
        const response = await axios.get(
          "https://app.ticketmaster.com/discovery/v2/events.json",
          {
            params: params
          }
        );
        const events = response.data._embedded?.events || [];
        setEventSuggestions(events.map((e: any) => e.name));
      } catch (error) {
        console.error("Event fetch error:", error);
      }
    };

    const debounce = setTimeout(fetchEventSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [eventQuery, clearFilteredEvents]);

  // Fetch city suggestions for autocomplete
  useEffect(() => {
    if (!cityQuery) {
      setCitySuggestions([]);
      return;
    }

    const fetchCitySuggestions = async () => {
      try {
        const response = await axios.get(
          "https://app.ticketmaster.com/discovery/v2/events.json",
          {
            params: {
              apikey: TM_API_KEY,
              keyword: cityQuery,
              size: 10,
            },
          }
        );

        const events = response.data._embedded?.events || [];

        const rawCities = events
          .map((e: any) => e._embedded?.venues?.[0]?.city?.name)
          .filter((name: string | undefined): name is string => Boolean(name));

        // Normalize and filter cities based on input match
        const filteredCities = Array.from(
          new Set(
            rawCities.filter((city: string) =>
              city.toLowerCase().startsWith(cityQuery.toLowerCase())
            )
          )
        );

        setCitySuggestions(filteredCities as string[]);
      } catch (error) {
        console.error("City fetch error:", error);
      }
    };

    const debounce = setTimeout(fetchCitySuggestions, 300);
    return () => clearTimeout(debounce);
  }, [cityQuery]);

  // Handle event suggestion selection: filter events
  const handleEventSelect = async (selectedName: string) => {
    setEventQuery(selectedName);
    setActive(null);
    isMobile && handleSearchToggle && handleSearchToggle(false);

    try {
      // Fetch full events matching selected name
      let  params = cityQuery ? { apikey: TM_API_KEY, keyword: selectedName, size: 10, city : cityQuery } : { apikey: TM_API_KEY, keyword: selectedName, size: 10 };
      const response = await axios.get(
        "https://app.ticketmaster.com/discovery/v2/events.json",
        {
          params: params,
        }
      );
      const events = response.data._embedded?.events || [];
      setEvents(events);
      setFilteredEvents(events);
    } catch (error) {
      console.error("Error fetching filtered events:", error);
    }
  };

  // Handle city suggestion selection: fetch events for city and clear filters
  const handleCitySelect = async (selectedCity: string) => {
    setEventQuery('');
    setCityQuery(selectedCity);
    setActive(null);

    try {
      const response = await axios.get(
        "https://app.ticketmaster.com/discovery/v2/events.json",
        {
          params: { apikey: TM_API_KEY, city: selectedCity, size: 20 },
        }
      );
      const events = response.data._embedded?.events || [];
      setEvents(events);
      clearFilteredEvents();
    } catch (error) {
      console.error("Error fetching city events:", error);
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setActive(null)}>
      <Box
        sx={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "20px",
          overflow: "hidden",
          flexGrow: 1,
          maxWidth: 600,
          backgroundColor: "#fff",
          height: "42px",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          },
        }}
      >
        <Box sx={{ flex: 1, position: "relative", height: "inherit" }}>
          <InputBase
            placeholder="Search events"
            value={eventQuery}
            onChange={(e) => {
              setEventQuery(e.target.value);
              setActive("event");
              if (!e.target.value) clearFilteredEvents();
            }}
            inputRef={eventInputRef}
            onFocus={() => setActive("event")}
            sx={{
              px: 2,
              py: 1,
              width: "100%",
              height: "inherit",
              fontSize: "0.75rem",
            }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
              </InputAdornment>
            }
          />
          <SearchPopover
            open={active === "event" && !!eventSuggestions.length}
            anchorEl={eventInputRef.current}
            results={eventSuggestions}
            onClose={() => setActive(null)}
            onSelect={handleEventSelect}
          />
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box sx={{ flex: 1, position: "relative", height: "inherit" }}>
          <InputBase
            placeholder="Search city"
            value={cityQuery}
            onChange={(e) => {
              setCityQuery(e.target.value);
              setActive("city");
            }}
            inputRef={cityInputRef}
            onFocus={() => setActive("city")}
            sx={{
              px: 2,
              py: 1,
              width: "100%",
              height: "inherit",
              fontSize: "0.75rem",
            }}
            startAdornment={
              <InputAdornment position="start">
                <LocationOnIcon
                  fontSize="small"
                  sx={{ color: "text.secondary" }}
                />
              </InputAdornment>
            }
          />
          <SearchPopover
            open={active === "city" && !!citySuggestions.length}
            anchorEl={cityInputRef.current}
            results={citySuggestions}
            onClose={() => setActive(null)}
            onSelect={handleCitySelect}
          />
        </Box>
      </Box>
    </ClickAwayListener>
  );
}

export default SearchBox;
