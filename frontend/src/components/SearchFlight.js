import React, { useState, useRef } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {Box,Button,FormControl,FormControlLabel,InputAdornment, InputLabel, OutlinedInput,
  TextField,Typography,List,ListItem,ClickAwayListener,Select,Menu,MenuItem} from "@mui/material";
import FlightCardList from "./FlightCardList"; 
import FlightClassIcon from '@mui/icons-material/FlightClass';

const Frame = () => {
  const [fromCity, setFromCity] = useState("");
  const [fromCityCode, setFromCityCode] = useState("");
  const [toCityCode, settoCityCode] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState(dayjs()); // Initialize with current date
  const [adults, setAdults] = useState(1); // Initialize adults count
  const[children, setChildren] = useState(0);
  const[Class, setClass] = useState("");

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);
  const [flights, setFlights] = useState([]); 

const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const inputRef = useRef(null); //refrence class field to deselect on click away

const handleClassSelect = (event) => {
  setClass(event.target.value);

  console.log(event.target.value,Class);
  setIsDropdownOpen(false);
};


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
    setChildren((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
  };

  

  const handleSearchClick = async () => {
    if (!fromCity || !toCity || !date || !Class) {
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
      <Box sx={{display:"flex",marginLeft:"10%"}} >
        {/* VERTICAL BOX */}
      <Box  bgcolor="white" 
      sx={{display:"flex", flexDirection:"column",gap:'30px', marginTop:'5%',padding:'10px',}} >
          {/* choose flight details locatios and time */} 

          {/* HORIZONTAL BOX 1*/}
          <Box sx={{gap: '50px' , display: 'flex' ,  marginTop:'30px',}}>
            <Box>
              <Typography variant="body2" color="#126782">From</Typography>
              <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                  <TextField
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
                    <List sx={{ maxHeight: 150, overflowY: 'auto', border: '1px solid #ccc',position:'absolute',zIndex: 100,backgroundColor:'white',cursor: 'pointer', }}>
                      {fromSuggestions.map((cityObj) => (
                        <ListItem button key={cityObj.iataCode} onClick={() => handleCitySelect(cityObj, 'from')}>
                          {cityObj.city} ({cityObj.iataCode})
                        </ListItem>
                      ))}
                    </List>
                  )}
                </div>
              </ClickAwayListener>
            </Box>

            <Box>
              <Typography variant="body2" color="#126782">To</Typography>
              <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                  <TextField
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
                    <List sx={{ maxHeight: 150, overflowY: 'auto', border: '1px solid #ccc' ,position:'absolute',zIndex: 100,backgroundColor:'white',cursor: 'pointer',}}>
                      {toSuggestions.map((cityObj) => (
                        <ListItem button key={cityObj.iataCode} onClick={() => handleCitySelect(cityObj, 'to')}>
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
            <Box sx={{gap: '50px' , display: 'flex' , marginTop:'30px', }}>
            <Box>
              <Typography variant="body2" color="#126782">Date</Typography>
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
            </Box>
            <Box>
              <Typography variant="body2" color="#126782">Class</Typography>
              <ClickAwayListener onClickAway={handleClickAway}>
              <div>
              <FormControl  variant="outlined" label="select flight class" sx={{width:'250px'}}>
              <Select
                value={Class}
                onChange={handleClassSelect}
                
              >
                <MenuItem value="FIRST" >First Class</MenuItem>
                <MenuItem value="BUSINESS" >Business</MenuItem>
                <MenuItem value="PREMIUM_ECONOMY" >Premium Economy</MenuItem>
                <MenuItem value="ECONOMY" >Economy</MenuItem>
              </Select>
            </FormControl>

            </div>
            </ClickAwayListener>
          </Box>
           
        </Box>
        {/* END OF HORIZONTAL BOX 2*/}

        <Box sx={{gap: '50px' , display: 'flex' , marginTop:'30px', }}>
            <Box sx={{marginTop:'10px'}}>
              <Typography variant="body2" color="#126782">Adults</Typography>
              <Box display="flex" alignItems="center" bgcolor="white">
                <Button variant="outlined"  onClick={decrementAdults} disabled={adults <= 1}>-</Button>
                <Typography variant="h6" color="#126782" sx={{ mx: 2 }}>{adults}</Typography>
                <Button variant="outlined" onClick={incrementAdults}>+</Button>
              </Box>
            </Box>

            <Box sx={{marginTop:'10px', marginLeft:'90px'}}>
              <Typography variant="body2" color="#126782">Children</Typography>
              <Box display="flex" alignItems="center" bgcolor="white">
                <Button variant="outlined"  onClick={decrementChildren} disabled={children <= 0}>-</Button>
                <Typography variant="h6" color="#126782" sx={{ mx: 2 }}>{children}</Typography>
                <Button variant="outlined" onClick={incrementChildren}>+</Button>
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
            marginTop:'30px', 
            backgroundColor:"#126782",
            width:'250px',
          }} onClick={handleSearchClick}
        >
          <Typography variant="h6" color="white">
            Search Flight
          </Typography>
        </Button >
      </Box >

         {/* Render FlightCard if flights are available */}
         <Box sx={{padding:"20px", marginLeft:"10%" , overflow:'auto'}}>
         {flights.length > 0 && (
            <FlightCardList flights={flights} />
          )}
          </Box>
      </Box>
    </LocalizationProvider>
    
  );
};

export default Frame;
