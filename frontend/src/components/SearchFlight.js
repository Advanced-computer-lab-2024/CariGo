import React, { useState, useRef, useEffect } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  List,
  ListItem,
  ClickAwayListener,
  Select,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import FlightCardList from "./FlightCardList";
import FlightClassIcon from "@mui/icons-material/FlightClass";
import gif from "../Pages/image/deerWalkinggif.gif";

const Frame = () => {
  const [fromCity, setFromCity] = useState(
    () => sessionStorage.getItem("flight_fromCity") || ""
  );
  const [fromCityCode, setFromCityCode] = useState(
    sessionStorage.getItem("flight_fromCityCode") || ""
  );
  const [toCityCode, setToCityCode] = useState(
    sessionStorage.getItem("flight_toCityCode") || ""
  );
  const [toCity, setToCity] = useState(
    () => sessionStorage.getItem("flight_toCity") || ""
  );

  const [date, setDate] = useState(() => {
    const storedDate = sessionStorage.getItem("flight_date");
    return storedDate ? dayjs(storedDate) : dayjs(); // Fallback to current date if no stored date
  });

  const [adults, setAdults] = useState(() =>
    parseInt(sessionStorage.getItem("flight_adults") || "1")
  );
  const [children, setChildren] = useState(() =>
    parseInt(sessionStorage.getItem("flight_children") || "0")
  );
  const [Class, setClass] = useState(
    () => sessionStorage.getItem("flight_Class") || "ECONOMY"
  );

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);
  const [flights, setFlights] = useState([]);

  const [showLoadingGif, setShowLoadingGif] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [error, setError] = useState("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null); //refrence class field to deselect on click away

  const handleClassSelect = (event) => {
    setClass(event.target.value);

    console.log(event.target.value, Class);
    setIsDropdownOpen(false);
  };

  const fetchCities = async (keyword, type) => {
    if (keyword.length < 2) {
      if (type === "from") setFromSuggestions([]);
      else setToSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/cariGo/flights/cities?keyword=${keyword}`
      );
      const data = await response.json();
      if (type === "from") setFromSuggestions(data);
      else setToSuggestions(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleFromInputChange = (event) => {
    const value = event.target.value;
    setFromCity(value);
    fetchCities(value, "from");
    setIsFromDropdownOpen(true);
  };

  const handleToInputChange = (event) => {
    const value = event.target.value;
    setToCity(value);
    fetchCities(value, "to");
    setIsToDropdownOpen(true);
  };

  const handleCitySelect = (city, type) => {
    if (type === "from") {
      setFromCity(city.city);
      setFromCityCode(city.iataCode);
      setFromSuggestions([]);
      setIsFromDropdownOpen(false);
    } else {
      setToCity(city.city);
      setToCityCode(city.iataCode);
      setToSuggestions([]);
      setIsToDropdownOpen(false);
    }
  };

  const handleClickAway = () => {
    setIsFromDropdownOpen(false);
    setIsToDropdownOpen(false);
    setFromSuggestions([]);
    setToSuggestions([]);

    //inputRef.current?.blur();
  };

  const incrementAdults = () => {
    setAdults((prev) => prev + 1);
  };

  const decrementAdults = () => {
    setAdults((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
  };

  const incrementChildren = () => {
    setChildren((prev) => prev + 1);
  };

  const decrementChildren = () => {
    setChildren((prev) => (prev > 0 ? prev - 1 : 0)); // Prevent going below 0
  };

  // Check if there are any flights in sessionStorage & Load from sessionStorage if available
  useEffect(() => {
    // Check if there are any flights in sessionStorage
    const savedFlights = sessionStorage.getItem("flights");
    if (savedFlights) {
      setFlights(JSON.parse(savedFlights)); // Load from sessionStorage if available
    }
  }, []);

  const handleSearchClick = async () => {
    if (!fromCity || !toCity || !date || !Class) {
      alert("Please fill in all fields");
      return;
    }
    //to reset scroll bar position on new search
    if (sessionStorage.getItem("scrollPosition")) {
      sessionStorage.setItem("scrollPosition", 0);
    }

    setIsSearching(false);
    setIsLoading(true);
    try {
      const fromIATA = fromCityCode;
      const toIATA = toCityCode;
      const formattedDate = date.format("YYYY-MM-DD");
      console.log(
        `http://localhost:4000/cariGo/flights//getFlights?origin=${fromIATA}&destination=${toIATA}&departureDate=${formattedDate}&adults=${adults}&children=${children}&travelClass=${Class}`
      );
      const response = await fetch(
        `http://localhost:4000/cariGo/flights//getFlights?origin=${fromIATA}&destination=${toIATA}&departureDate=${formattedDate}&adults=${adults}&children=${children}&travelClass=${Class}`
      );
      const data = await response.json();
      console.log("Flight data:", data);
      setFlights(data);
      if (data.length === 0) {
        setError("No Flights available");
      } else {
        setError("");
      }
      sessionStorage.setItem("flights", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching flights:", error);
      setError("No Flights available");
    } finally {
      setIsLoading(false);
      setIsSearching(true);
    }
  };

  // Save input values to sessionStorage when they change
  useEffect(() => {
    sessionStorage.setItem("flight_fromCity", fromCity);
    sessionStorage.setItem("flight_fromCityCode", fromCityCode);
    sessionStorage.setItem("flight_toCity", toCity);
    sessionStorage.setItem("flight_toCityCode", toCityCode);
    sessionStorage.setItem("flight_date", date.format("YYYY-MM-DD"));
    sessionStorage.setItem("flight_adults", adults);
    sessionStorage.setItem("flight_children", children);
    sessionStorage.setItem("flight_Class", Class);
  }, [
    fromCity,
    fromCityCode,
    toCity,
    toCityCode,
    date,
    adults,
    children,
    Class,
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", marginLeft: "10%" }}>
        {/* VERTICAL BOX */}
        <Box
          bgcolor="white"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            marginTop: "5%",
            padding: "10px",
            marginBottom: "12%",
          }}
        >
          {/* choose flight details locatios and time */}

          {/* HORIZONTAL BOX 1*/}
          <Box sx={{ gap: "50px", display: "flex", marginTop: "30px" }}>
            <Box>
              <Typography variant="body2" color="#126782">
                From
              </Typography>
              <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                  <TextField
                    className="input"
                    fullWidth
                    variant="outlined"
                    placeholder="type to select airport.."
                    value={fromCity}
                    onChange={handleFromInputChange}
                    onFocus={() => setIsFromDropdownOpen(true)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FlightTakeoffIcon />
                        </InputAdornment>
                      ),
                      //endAdornment: (
                      // <InputAdornment position="end">
                      //   <ArrowDropDownIcon />
                      // </InputAdornment>
                      //),
                    }}
                  />
                  {isFromDropdownOpen && fromSuggestions.length > 0 && (
                    <List
                      sx={{
                        maxHeight: 150,
                        overflowY: "auto",
                        border: "1px solid #ccc",
                        position: "absolute",
                        zIndex: 100,
                        backgroundColor: "white",
                        cursor: "pointer",
                      }}
                    >
                      {fromSuggestions.map((cityObj) => (
                        <ListItem
                          button
                          key={cityObj.iataCode}
                          onClick={() => handleCitySelect(cityObj, "from")}
                        >
                          {cityObj.city} ({cityObj.iataCode})
                        </ListItem>
                      ))}
                    </List>
                  )}
                </div>
              </ClickAwayListener>
            </Box>

            <Box>
              <Typography variant="body2" color="#126782">
                To
              </Typography>
              <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                  <TextField
                    className="input"
                    fullWidth
                    variant="outlined"
                    placeholder="type to select airport.."
                    value={toCity}
                    onChange={handleToInputChange}
                    onFocus={() => setIsToDropdownOpen(true)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FlightLandIcon />
                        </InputAdornment>
                      ),
                      //endAdornment: (
                      // <InputAdornment position="end">
                      //   <ArrowDropDownIcon />
                      // </InputAdornment>
                      //),
                    }}
                  />
                  {isToDropdownOpen && toSuggestions.length > 0 && (
                    <List
                      sx={{
                        maxHeight: 150,
                        overflowY: "auto",
                        border: "1px solid #ccc",
                        position: "absolute",
                        zIndex: 100,
                        backgroundColor: "white",
                        cursor: "pointer",
                      }}
                    >
                      {toSuggestions.map((cityObj) => (
                        <ListItem
                          button
                          key={cityObj.iataCode}
                          onClick={() => handleCitySelect(cityObj, "to")}
                        >
                          {cityObj.city} ({cityObj.iataCode})
                        </ListItem>
                      ))}
                    </List>
                  )}
                </div>
              </ClickAwayListener>
            </Box>
          </Box>
          {/* END OF HORIZONTAL BOX 1*/}

          {/* HORIZONTAL BOX 2*/}
          <Box sx={{ gap: "50px", display: "flex", marginTop: "30px" }}>
            <Box>
              <Typography variant="body2" color="#126782">
                Date
              </Typography>
              <DatePicker
                renderInput={(params) => (
                  <TextField
                    className="input"
                    {...params}
                    fullWidth
                    variant="outlined"
                    placeholder="Select Date"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <ArrowDropDownIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </Box>
            <Box>
              <Typography variant="body2" color="#126782">
                Class
              </Typography>
              <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                  <FormControl
                    className="input"
                    variant="outlined"
                    label="select flight class"
                    sx={{ width: "250px" }}
                  >
                    <Select value={Class} onChange={handleClassSelect}>
                      <MenuItem value="FIRST">First Class</MenuItem>
                      <MenuItem value="BUSINESS">Business</MenuItem>
                      <MenuItem value="PREMIUM_ECONOMY">
                        Premium Economy
                      </MenuItem>
                      <MenuItem value="ECONOMY">Economy</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </ClickAwayListener>
            </Box>
          </Box>
          {/* END OF HORIZONTAL BOX 2*/}

          <Box sx={{ gap: "50px", display: "flex", marginTop: "30px" }}>
            <Box sx={{ marginTop: "10px" }}>
              <Typography variant="body2" color="#126782">
                Adults
              </Typography>
              <Box display="flex" alignItems="center" bgcolor="white">
                <Button
                  variant="outlined"
                  onClick={decrementAdults}
                  disabled={adults <= 1}
                >
                  -
                </Button>
                <Typography variant="h6" color="#126782" sx={{ mx: 2 }}>
                  {adults}
                </Typography>
                <Button variant="outlined" onClick={incrementAdults}>
                  +
                </Button>
              </Box>
            </Box>

            <Box sx={{ marginTop: "10px", marginLeft: "90px" }}>
              <Typography variant="body2" color="#126782">
                Children
              </Typography>
              <Box display="flex" alignItems="center" bgcolor="white">
                <Button
                  variant="outlined"
                  onClick={decrementChildren}
                  disabled={children <= 0}
                >
                  -
                </Button>
                <Typography variant="h6" color="#126782" sx={{ mx: 2 }}>
                  {children}
                </Typography>
                <Button variant="outlined" onClick={incrementChildren}>
                  +
                </Button>
              </Box>
            </Box>
          </Box>
          {/* END OF HORIZONTAL BOX 3*/}

          <Button
            variant="contained"
            color="white"
            sx={{
              padding: "8px 16px",
              borderRadius: "4px",
              textTransform: "none",
              marginTop: "30px",
              backgroundColor: "#126782",
              width: "250px",
            }}
            onClick={handleSearchClick}
          >
            <Typography variant="h6" color="white">
              Search Flight
            </Typography>
          </Button>
        </Box>

        {/* Render FlightCard if flights are available */}
        <Box
          sx={{
            padding: "20px",
            marginLeft: "10%",
            overflow: "auto",
            marginTop: "4%",
          }}
        >
          {!isSearching && !isLoading && flights.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
                width: "100%",
              }}
            >
              <div
                className="absolute inset-0 flex flex-col items-start justify-center"
                style={{ transform: "translateY(80px) translateX(905px)" }}
              >
                <img
                  src={gif}
                  alt="Loading"
                  width="130"
                  height="130"
                  style={{
                    transform: "translateX(70px)",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
                <h2 className="bg-gradient-to-r from-[#004e89] via-[#004e89] to-[#004e89] bg-clip-text text-2xl font-semibold text-transparent">
                  ____________________________
                </h2>
              </div>
            </Box>
          ) : isLoading ? (
            <CircularProgress sx={{ color: "#126782", margin: "70px" }} />
          ) : flights.length > 0 ? (
            <FlightCardList flights={flights} />
          ) : (
            <Typography
              color="#126782"
              variant="h6"
              sx={{ textAlign: "center", mt: 4, marginTop: "60px" }}
            >
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Frame;
