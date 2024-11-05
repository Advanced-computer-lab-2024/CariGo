import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationCityIcon from '@mui/icons-material/LocationCity';

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {Box,Button,Typography,Link,List,ListItem,ClickAwayListener,Menu,MenuItem,TextField,InputAdornment} from "@mui/material";

import HotelCardList from "./HotelsList";
import PinDropIcon from '@mui/icons-material/PinDrop';
import TransportCard from"./TransportCard";


export default function TransportBooking(){
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
      
        const handleClickAway = () => {
          setIsFromDropdownOpen(false);
          setIsToDropdownOpen(false);
          setFromSuggestions([]);
          setToSuggestions([]);
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
            sx={{display:"flex", flexDirection:"column",gap:'30px', marginTop:'5%',padding:'10px',marginBottom:'12%'}} >
                {/* choose hotel details locatios and time */} 
                {/* HORIZONTAL BOX 1*/}
                <Box sx={{gap: '50px' , display: 'flex' ,  marginTop:'30px',}}>
                  <Box>
                    <Typography variant="body2" color="#126782">Start Location</Typography>
                    <ClickAwayListener onClickAway={handleClickAway}>
                      <div>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder="start location"
                          value={City}
                          //onChange={handleCityInputChange}
                          onFocus={() => setIsFromDropdownOpen(true)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PinDropIcon />
                              </InputAdornment>
                            ),
                            
                          }}
                        />
                        {isFromDropdownOpen && fromSuggestions.length > 0 && (
                          <List sx={{ maxHeight: 150, overflowY: 'auto', border: '1px solid #ccc',position:'absolute',zIndex: 100,backgroundColor:'white',cursor: 'pointer', }}>
                            {/* {fromSuggestions.map((cityObj) => (
                              <ListItem button key={cityObj.iataCode} onClick={() => handleCitySelect(cityObj)}>
                                {cityObj.city} ({cityObj.iataCode})
                              </ListItem>
                            ))} */}
                            {/* TO BE CHANGED TO AUTO COMPLETE LIST */}
                          </List>
                        )}
                      </div>
                    </ClickAwayListener>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="#126782">Destination</Typography>
                    <ClickAwayListener onClickAway={handleClickAway}>
                      <div>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder="Destination"
                          value={City}
                          //onChange={handleCityInputChange}
                          onFocus={() => setIsFromDropdownOpen(true)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PinDropIcon />
                              </InputAdornment>
                            ),
                            
                          }}
                        />
                        {isFromDropdownOpen && fromSuggestions.length > 0 && (
                          <List sx={{ maxHeight: 150, overflowY: 'auto', border: '1px solid #ccc',position:'absolute',zIndex: 100,backgroundColor:'white',cursor: 'pointer', }}>
                            {/* {fromSuggestions.map((cityObj) => (
                              <ListItem button key={cityObj.iataCode} onClick={() => handleCitySelect(cityObj)}>
                                {cityObj.city} ({cityObj.iataCode})
                              </ListItem>
                            ))} */}
                            {/* TO BE CHANGED TO AUTO COMPLETE LIST */}
                          </List>
                        )}
                      </div>
                    </ClickAwayListener>
                  </Box>
                    
                  </Box>
                  {/* END OF HORIZONTAL BOX 1*/}
      
                  {/* HORIZONTAL BOX 2*/}
                  <Box sx={{gap: '50px' , display: 'flex' , marginTop:'30px', }}>
                  
                </Box>
                {/* END OF HORIZONTAL BOX 2*/}

             

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
               {/* <Box sx={{padding:"20px", marginLeft:"10%" , overflow:'auto',marginTop:'4%',}}>
               {hotels.length > 0 && (
                  <HotelCardList hotels={hotels} />
                )}
                </Box> */}
                <TransportCard/>
            </Box>
          </LocalizationProvider>
          
        );
      };