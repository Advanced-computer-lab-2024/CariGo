import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationCityIcon from '@mui/icons-material/LocationCity';

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {Box,Button,Typography,Link,List,ListItem,ClickAwayListener,Menu,MenuItem,TextField,InputAdornment,CircularProgress} from "@mui/material";
import PinDropIcon from '@mui/icons-material/PinDrop';
import TransportCard from"./TransportCard";
import TransportCardList from "./TransportCardList";
import MyMapComponent from './Map.js';

export default function TransportBooking(){
    const [departureLocation, setDepartureLocation] = useState({ lat: 37.7749, lng: -122.4194 });
    const [arrivalLocation, setArrivalLocation] = useState({ lat: 37.7749, lng: -122.4194 });
    const [departureDescription, setDepartureDescription] = useState('m');
    const [arrivalDescription, setArrivalDescription] = useState('m');
    const [date, setDate] = useState('2024-03-28T00:00:00.000Z');
    const [transports, setTransports] = useState([]); 
      
    // const handleClickAway = () => {
    //   setIsFromDropdownOpen(false);
    //   setIsToDropdownOpen(false);
    //   setFromSuggestions([]);
    //   setToSuggestions([]);
    // };

    const [isLoading, setIsLoading] = useState(false);
  
        
    // Function to handle the search button click
    const handleSearchClick = async () => {
      const queryParams = new URLSearchParams({
        depLon: departureLocation.lng,
        depLat: departureLocation.lat,
        arrLon: arrivalLocation.lng,
        arrLat: arrivalLocation.lat,
        date: date,
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
        console.log(queryParams.toString());
        //console.log(transports);
        console.log('Search result:', data);
        // Handle the data, such as displaying it to the user
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
                    
                  {/* </Box> */}

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
               {isLoading ? <CircularProgress sx={{color:'#126782', margin:'70px'}} /> :
               transports.length > 0 && (
                  <TransportCardList transports={transports} />
                )
              }
                </Box>
                {/* <TransportCard/> */}
            </Box>
          </LocalizationProvider>
          
        );
      };