import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationCityIcon from '@mui/icons-material/LocationCity';

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {Box,Button,Typography,Link,List,ListItem,ClickAwayListener,Menu,MenuItem,TextField,InputAdornment} from "@mui/material";
import HotelsList from "../../components/HotelsList"; 
import HotelCardList from "../../components/HotelsList";



export default function BookHotels(){
        const [City, setCity] = useState("");
        const [CityCode, setCityCode] = useState("");
        const [checkIn, setCheckIn] = useState(dayjs()); // Initialize with current date
        const [checkOut, setCheckOut] = useState(dayjs()); // Initialize with current date
        const [adults, setAdults] = useState(1); // Initialize adults count
        const[children, setChildren] = useState(0);

        const [fromSuggestions, setFromSuggestions] = useState([]);
        const [toSuggestions, setToSuggestions] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
        const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);
        const [hotels, setHotels] = useState([]); 
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
      
        const handleCityInputChange = (event) => {
          const value = event.target.value;
          setCity(value);
          fetchCities(value, 'from');
          setIsFromDropdownOpen(true);
        };
      
        
        const handleCitySelect = (city) => {
            setCity(city.city);
            setCityCode(city.iataCode);
            setFromSuggestions([]);
            setIsFromDropdownOpen(false);
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

        const incrementChildren = () => {
            setChildren((prev) => prev + 1);
          };
        
          const decrementChildren = () => {
            setChildren((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
          };

        const handleSearchClick = async () => {
          if (!City || !checkIn || !checkOut) {
            alert("Please fill in all fields");
            return;
          }
      
          const fromIATA = CityCode; // Assuming the IATA code is part of the selected city object
          const formattedCheckIn = checkIn.format("YYYY-MM-DD");
          const formattedCheckOut = checkOut.format("YYYY-MM-DD");

          try {
              console.log(`http://localhost:4000/cariGo/hotels?keyword=${City}&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&adults=${adults}&children=${children}`);
            const response = await fetch(`http://localhost:4000/cariGo/hotels?keyword=${City}&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&adults=${adults}&children=${children}`);
            const data = await response.json();
            console.log("Hotel data:", data); 
            setHotels(data);// Handle the hotel data as needed
          } catch (error) {
            console.error("Error fetching hotel:", error);
          }
        };
      
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{display:"flex",marginLeft:"10%"}} >
              {/* VERTICAL BOX */}
            <Box  bgcolor="white" 
            sx={{display:"flex", flexDirection:"column",gap:'30px', marginTop:'5%',padding:'10px',}} >
                {/* choose hotel details locatios and time */} 
                {/* HORIZONTAL BOX 1*/}
                <Box sx={{gap: '50px' , display: 'flex' ,  marginTop:'30px',}}>
                  <Box>
                    <Typography variant="body2" color="#126782">City</Typography>
                    <ClickAwayListener onClickAway={handleClickAway}>
                      <div>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder="type to select city.."
                          value={City}
                          onChange={handleCityInputChange}
                          onFocus={() => setIsFromDropdownOpen(true)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationCityIcon />
                              </InputAdornment>
                            ),
                            
                          }}
                        />
                        {isFromDropdownOpen && fromSuggestions.length > 0 && (
                          <List sx={{ maxHeight: 150, overflowY: 'auto', border: '1px solid #ccc',position:'absolute',zIndex: 100,backgroundColor:'white',cursor: 'pointer', }}>
                            {fromSuggestions.map((cityObj) => (
                              <ListItem button key={cityObj.iataCode} onClick={() => handleCitySelect(cityObj)}>
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
                    <Typography variant="body2" color="#126782">Check in Date</Typography>
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
                      value={checkIn}
                      onChange={(newValue) => setCheckIn(newValue)}
                    />
                  </Box>
      
                  <Box>
                    <Typography variant="body2" color="#126782">Check out Date</Typography>
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
                      value={checkOut}
                      onChange={(newValue) => setCheckOut(newValue)}
                    />
                  </Box>
              </Box>
            {/* END OF HORIZONTAL BOX 2*/}

             {/* HORIZONTAL BOX 3*/}
             <Box sx={{gap: '50px' , display: 'flex' , marginTop:'30px', }}>
                  <Box sx={{marginTop:'10px'}}>
                    <Typography variant="body2" color="#126782">Adults</Typography>
                    <Box display="flex" alignItems="center" bgcolor="white">
                      <Button variant="outlined"  onClick={decrementAdults} disabled={adults <= 1}>-</Button>
                      <Typography variant="h6" color="#126782" sx={{ mx: 2 }}>{adults}</Typography>
                      <Button variant="outlined" onClick={incrementAdults}>+</Button>
                    </Box>
                  </Box>

                  <Box sx={{marginTop:'10px',marginLeft:'90px'}}>
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
                  Search Hotels
                </Typography>
              </Button >
            </Box >
      
               {/* Render HotelCard if hotels are available */}
               <Box sx={{padding:"20px", marginLeft:"10%" , overflow:'auto',marginTop:'4%',}}>
               {hotels.length > 0 && (
                  <HotelCardList hotels={hotels} />
                )}
                </Box>
            </Box>
          </LocalizationProvider>
          
        );
      };