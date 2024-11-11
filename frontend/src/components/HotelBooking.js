import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {Box,Button,Typography,Link,List,ListItem,ClickAwayListener,Menu,MenuItem,TextField,InputAdornment,CircularProgress} from "@mui/material";
import HotelsList from "./HotelsList"; 

export default function BookHotels(){
        const [City, setCity] = useState(()=> sessionStorage.getItem('hotelCity')||"");
        const [CityCode, setCityCode] = useState(()=> sessionStorage.getItem('hotelCityCode')||"");

        const [checkIn, setCheckIn] = useState(() => {
          const storedCheckIn = sessionStorage.getItem('hotelCheckIn');
          return storedCheckIn ? dayjs(storedCheckIn) : dayjs(); // Parse as dayjs if value exists
        });

        const [checkOut, setCheckOut] = useState(() => {
          const storedCheckOut = sessionStorage.getItem('hotelCheckOut');
          return storedCheckOut ? dayjs(storedCheckOut) : checkIn.add(1, 'day'); // Parse as dayjs and add 1 day if not found
        });

        const [adults, setAdults] = useState(()=> sessionStorage.getItem('hotelAdults')||1); // Initialize adults count
        const[children, setChildren] = useState(()=> sessionStorage.getItem('hotelChildren')||0);

        const [fromSuggestions, setFromSuggestions] = useState([]);
        const [toSuggestions, setToSuggestions] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
        const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);
        const [hotels, setHotels] = useState([]); 

        const[error, setError] = useState("");

        const fetchCities = async (keyword, type) => {
          if (keyword.length < 2) {
            if (type === 'from') setFromSuggestions([]);
            else setToSuggestions([]);
            return;
          }
          try {
            const response = await fetch(`http://localhost:4000/cariGo/flights/cities?keyword=${keyword}`);
            const data = await response.json();
            if (type === 'from') setFromSuggestions(data);
            else setToSuggestions(data);
          } catch (error) {
            console.error("Error fetching cities:", error);
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
            setChildren((prev) => (prev > 0 ? prev - 1 : 0)); // Prevent going below 0
          };

           // Check if there are any hotels in sessionStorage & Load from sessionStorage if available
          useEffect(() => {
            // Check if there are any hotels in sessionStorage
            const savedHotels = sessionStorage.getItem('hotels');
            if (savedHotels) {
              setHotels(JSON.parse(savedHotels)); // Load from sessionStorage if available
            }
          }, []);

        const handleSearchClick = async () => {
          if (!City || !checkIn || !checkOut ) {
            alert("Please fill in all fields");
            return;
          }
           //to reset scroll bar position on new search
          if (sessionStorage.getItem('scrollPosition')) {
            sessionStorage.setItem('scrollPosition',0)
          }
          const fromIATA = CityCode; // Assuming the IATA code is part of the selected city object
          const formattedCheckIn = checkIn.format("YYYY-MM-DD");
          const formattedCheckOut = checkOut.format("YYYY-MM-DD");
          setIsLoading(true);
          try {
              console.log(`http://localhost:4000/cariGo/flights/hotels?keyword=${City}&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&adults=${adults}&children=${children}`);
            const response = await fetch(`http://localhost:4000/cariGo/flights/hotels?keyword=${City}&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&adults=${adults}&children=${children}`);
            const data = await response.json();
            console.log("Hotel data:", data); 
            setHotels(data.data);// Handle the hotel data as needed
            if(hotels.length == 0) {
              setError("no Hotels available");
            }
            sessionStorage.setItem('hotels', JSON.stringify(data.data)); 
          } catch (error) {
            console.error("Error fetching hotel:", error);
            setError("no Hotels available");
          }finally {
            setIsLoading(false);
          }
        };

        useEffect (() => {
          if(checkOut <= checkIn)
            setCheckOut(checkIn.add(1,'day'))
        },[checkIn])

        // Save input values to sessionStorage when they change
        useEffect(() => {
          sessionStorage.setItem("hotelCity", City);
          sessionStorage.setItem("hotelCityCode", CityCode);
          sessionStorage.setItem("hotelCheckIn", checkIn.format("YYYY-MM-DD"));
          sessionStorage.setItem("hotelCheckOut", checkOut.format("YYYY-MM-DD"));
          sessionStorage.setItem("hotelAdults", adults);
          sessionStorage.setItem("hotelChildren", children);
        }, [City, CityCode, checkIn, checkOut, adults, children]);

      
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
                              <ListItem button key={cityObj.city} onClick={() => handleCitySelect(cityObj)}>
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
                            )
                          }}
                        />
                      )}
                      value={checkIn}
                      onChange={(newValue) => {
                        setCheckIn(newValue);
                        
                        }}
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
                {isLoading ? (
                  <CircularProgress sx={{ color: '#126782', margin: '70px' }} />
                ) : (
                  hotels ? (
                    hotels.length > 0 ? (
                      <HotelsList hotels={hotels} />
                    ) : (
                      <Typography color="#126782" variant="h6" sx={{ textAlign: 'center', mt: 4 , marginTop:'60px'}}>{error}</Typography>
                    )
                  ) : (
                    <Typography color="#126782" variant="h6" sx={{ textAlign: 'center', mt: 4 , marginTop:'60px'}}>{error}</Typography>
                  )
                )}
                </Box>
            </Box>
          </LocalizationProvider>
          
        );
      };