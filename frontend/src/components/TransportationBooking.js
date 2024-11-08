import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {Box,Button,Typography,Link,List,ListItem,ClickAwayListener,Menu,MenuItem,TextField,InputAdornment,CircularProgress} from "@mui/material";
import TransportCardList from "./TransportCardList";
import MyMapComponent from './Map.js';

export default function TransportBooking(){
  const [departureLocation, setDepartureLocation] = useState(() => {
    const storedLat = sessionStorage.getItem("departureLat");
    const storedLng = sessionStorage.getItem("departureLng");
    if (storedLat && storedLng) {
      return { lat: parseFloat(storedLat), lng: parseFloat(storedLng) };
    }
    return { lat: 37.7749, lng: -122.4194 }; // Default location (San Francisco)
  });

    const [arrivalLocation, setArrivalLocation] = useState(() => {
      const storedLat = sessionStorage.getItem("arrivalLat");
      const storedLng = sessionStorage.getItem("arrivalLng");
      if (storedLat && storedLng) {
        return { lat: parseFloat(storedLat), lng: parseFloat(storedLng) };
      }
      return { lat: 37.7749, lng: -122.4194 }; // Default location (San Francisco)
    });

    const [departureDescription, setDepartureDescription] = useState(()=> sessionStorage.getItem('departureDescription')||'m');
    const [arrivalDescription, setArrivalDescription] = useState(()=> sessionStorage.getItem('arrivalDescription')||'m');
    //const [date, setDate] = useState(()=> sessionStorage.getItem('transportDate')||'2024-03-28T00:00:00.000Z');
    const [date, setDate] = useState(() => {
      const storedDate = sessionStorage.getItem('transportDate');
      return storedDate ? dayjs(storedDate) : dayjs(); // Parse as dayjs if value exists
    });
    const [transports, setTransports] = useState(()=> sessionStorage.getItem('transports')||[]); 
      
    // const handleClickAway = () => {
    //   setIsFromDropdownOpen(false);
    //   setIsToDropdownOpen(false);
    //   setFromSuggestions([]);
    //   setToSuggestions([]);
    // };

    const [isLoading, setIsLoading] = useState(false);
  
        
    // Function to handle the search button click
    const handleSearchClick = async () => {
       //to reset scroll bar position on new search
       if (sessionStorage.getItem('scrollPosition')) {
        sessionStorage.setItem('scrollPosition',0)
      }

      const queryParams = new URLSearchParams({
        depLon: departureLocation.lng,
        depLat: departureLocation.lat,
        arrLon: arrivalLocation.lng,
        arrLat: arrivalLocation.lat,
        date: date ? date.format('YYYY-MM-DD') : '', // Format date before passing
        depDesc: departureDescription,
        arrDesc: arrivalDescription,
      });
      console.log(`http://localhost:4000/cariGo/transportation/?${queryParams.toString()}`);
      setIsLoading(true);
      
      try {
        const response = await fetch(`http://localhost:4000/cariGo/transportation/?${queryParams.toString()}`, {
          method: 'GET',  // Use GET request as per the new request format
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        setTransports(data);
        console.log('Search result:', data);
        // Save the flight data to sessionStorage
        sessionStorage.setItem('transports', JSON.stringify(data)); 
      } catch (error) {
          console.error('Error fetching transportation data:', error);
      }
      finally {
        console.log('fetched transports',transports);    
        setIsLoading(false);
      }
    };

        // useEffect(()=>{
        //   console.log('fetched transports',transports);
        // },[transports])

        // Save input values to sessionStorage when they change
        useEffect(() => {
          sessionStorage.setItem("departureLat", departureLocation.lat);
          sessionStorage.setItem("departureLng", departureLocation.lng);
          sessionStorage.setItem("arrivalLat", arrivalLocation.lat);
          sessionStorage.setItem("arrivalLng", arrivalLocation.lng);
          sessionStorage.setItem("departureDescription", departureDescription);
          sessionStorage.setItem("arrivalDescription", arrivalDescription);
          sessionStorage.setItem("transportDate", date.format("YYYY-MM-DD"));
        }, [departureLocation, arrivalLocation, departureDescription, arrivalDescription, date]);

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{display:"flex",marginLeft:"10%"}} >
              {/* VERTICAL BOX */}
            <Box  bgcolor="white" 
            sx={{display:"flex", flexDirection:"column",gap:'30px', marginTop:'5%',padding:'10px',marginBottom:'12%'}} >
                
                {/* Departure*/}
                  <Box sx={{display:'flex',flexDirection:'column', gap:'10px', width:'600px'}}>
                    <Typography variant="body2" color="#126782">Start Location</Typography>
                    {/* <ClickAwayListener onClickAway={handleClickAway}>
                      </ClickAwayListener> */}
                      <MyMapComponent 
                      onLocationChange={(newLocation) => setDepartureLocation(newLocation)} 
                      initialCoordinates={departureLocation}
                    />
                  </Box>
                  
                  {/* Arrival*/}
                  <Box sx={{display:'flex',flexDirection:'column', gap:'10px', width:'600px'}}>
                    <Typography variant="body2" color="#126782">Destination</Typography>
                    {/* <ClickAwayListener onClickAway={handleClickAway}>
                      </ClickAwayListener> */}
                      <MyMapComponent 
                      onLocationChange={(newLocation) => setArrivalLocation(newLocation)} 
                      initialCoordinates={arrivalLocation}
                    />
                    
                  </Box>
                  {/* trip date*/}
                  <Box>
                  <Typography variant="body2" color="#126782">Trip Date</Typography>
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
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                    />
                </Box>
                {/* end of trip date*/}
              <Button
                variant="contained"
                color="white"
                sx={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  textTransform: "none",
                  marginTop:'10px', 
                  backgroundColor:"#126782",
                  width:'250px',
                }} onClick={handleSearchClick}
              >   
                <Typography variant="h6" color="white">
                  Search Transportations
                </Typography>
              </Button >
            </Box >
      
               {/* Render HotelCard if hotels are available */}
               <Box sx={{padding:"20px", marginLeft:"10%" , overflow:'auto',marginTop:'4%',}}>
               {isLoading ? (
            <CircularProgress sx={{ color: '#126782', margin: '70px' }} />
          ) : (
            transports.length > 0 && <TransportCardList transports={transports} />
          )}
                </Box>
            </Box>
          </LocalizationProvider>
          
        );
      };