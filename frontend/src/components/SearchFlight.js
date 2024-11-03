import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  List,
  ListItem,
  ClickAwayListener,
  Menu,
  MenuItem
} from "@mui/material";
import FlightCardList from "./FlightCardList"; 

const Frame = () => {
  const [fromCity, setFromCity] = useState("");
  const [fromCityCode, setFromCityCode] = useState("");
  const [toCityCode, settoCityCode] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState(dayjs()); // Initialize with current date
  const [adults, setAdults] = useState(1); // Initialize adults count
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);
  const [flights, setFlights] = useState([]); 
  const fetchCities = async (keyword, type) => {
    if (keyword.length < 2) {
      if (type === 'from') setFromSuggestions([]);
      else setToSuggestions([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/cariGo/flights/cities?keyword=${keyword}`);
      const data = await response.json();
      if (type === 'from') setFromSuggestions(data);
      else setToSuggestions(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFromInputChange = (event) => {
    const value = event.target.value;
    setFromCity(value);
    fetchCities(value, 'from');
    setIsFromDropdownOpen(true);
  };

  const handleToInputChange = (event) => {
    const value = event.target.value;
    setToCity(value);
    fetchCities(value, 'to');
    setIsToDropdownOpen(true);
  };

  const handleCitySelect = (city, type) => {
    if (type === 'from') {
      setFromCity(city.city);
      setFromCityCode(city.iataCode);
      setFromSuggestions([]);
      setIsFromDropdownOpen(false);
    } else {
      setToCity(city.city);
      settoCityCode(city.iataCode);
      setToSuggestions([]);
      setIsToDropdownOpen(false);
    }
  };

  const handleClickAway = () => {
    setIsFromDropdownOpen(false);
    setIsToDropdownOpen(false);
    setFromSuggestions([]);
    setToSuggestions([]);
  };

  const incrementAdults = () => {
    setAdults((prev) => prev + 1);
  };

  const decrementAdults = () => {
    setAdults((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
  };
  const handleSearchClick = async () => {
    if (!fromCity || !toCity || !date) {
      alert("Please fill in all fields");
      return;
    }

    const fromIATA = fromCityCode; // Assuming the IATA code is part of the selected city object
    const toIATA = toCityCode; // Assuming the IATA code is part of the selected city object
    const formattedDate = date.format("YYYY-MM-DD");

    try {
        console.log(`http://localhost:4000/cariGo/flights//getFlights?origin=${fromIATA}&destination=${toIATA}&departureDate=${formattedDate}&adults=${adults}`);
      const response = await fetch(`http://localhost:4000/cariGo/flights//getFlights?origin=${fromIATA}&destination=${toIATA}&departureDate=${formattedDate}&adults=${adults}`);
      const data = await response.json();
      console.log("Flight data:", data); 
      setFlights(data);// Handle the flight data as needed
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column"  alignItems="center" gap={2} pt={0} pb={3} px={0} bgcolor="white"  >
        {/* select flight type */}
        <Box width={1197} display="flex" flexDirection="column" alignItems="center">
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={2} px={45} py={1.5} bgcolor="white" >
            <FormControl component="fieldset">
              <RadioGroup row aria-label="trip-type" name="trip-type" defaultValue="round-trip">
                <FormControlLabel value="one-way" control={<Radio />} label={<Typography variant="body1">One way</Typography>} />
                <FormControlLabel value="round-trip" control={<Radio />} label={<Typography variant="body1">Round Trip</Typography>} />
                <FormControlLabel value="multicity" control={<Radio />} label={<Typography variant="body1">Multicity</Typography>} />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* choose flight details locatios and time */}
          <Box sx={{gap: '30px' , display: 'flex' , position:"relative", justifyContent:"center", marginTop:'30px',}}>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">From</Typography>
              <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Shahjalal International Airport, Bangladesh"
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
                    <List sx={{ maxHeight: 150, overflowY: 'auto', border: '1px solid #ccc',position:'absolute',zIndex: 100,backgroundColor:'white', }}>
                      {fromSuggestions.map((cityObj) => (
                        <ListItem button key={cityObj.iataCode} onClick={() => handleCitySelect(cityObj, 'from')}>
                          {cityObj.city} ({cityObj.iataCode})
                        </ListItem>
                      ))}
                    </List>
                  )}
                </div>
              </ClickAwayListener>
            </Grid>

            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">To</Typography>
              <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Qatar International Airport, Qatar"
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
                    <List sx={{ maxHeight: 150, overflowY: 'auto', border: '1px solid #ccc' ,position:'absolute',zIndex: 100,backgroundColor:'white',}}>
                      {toSuggestions.map((cityObj) => (
                        <ListItem button key={cityObj.iataCode} onClick={() => handleCitySelect(cityObj, 'to')}>
                          {cityObj.city} ({cityObj.iataCode})
                        </ListItem>
                      ))}
                    </List>
                  )}
                </div>
              </ClickAwayListener>
            </Grid>

            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">Date</Typography>
              <DatePicker
                renderInput={(params) => (
                  <TextField
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
            </Grid>

            <Grid item xs={3} sx={{marginTop:'10px'}}>
              <Typography variant="body2" color="textSecondary">Adults</Typography>
              <Box display="flex" alignItems="center" bgcolor="white">
                <Button variant="outlined" onClick={decrementAdults} disabled={adults <= 1}>-</Button>
                <Typography variant="h6" sx={{ mx: 2 }}>{adults}</Typography>
                <Button variant="outlined" onClick={incrementAdults}>+</Button>
              </Box>
            </Grid>
          </Box>
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{
            padding: "8px 16px",
            borderRadius: "4px",
            textTransform: "none",
            marginTop:'30px', 
          }} onClick={handleSearchClick}
        >
          <Typography variant="h6" color="white">
            Search Flight
          </Typography>
        </Button >
      </Box>
         {/* Render FlightCard if flights are available */}
         {flights.length > 0 && (
            <FlightCardList flights={flights} />
          )}
    </LocalizationProvider>
    
  );
};

export default Frame;
