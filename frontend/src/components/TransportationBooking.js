import React, { useState } from "react";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button, Typography, CircularProgress, TextField, FormControl, InputLabel, FormHelperText } from "@mui/material"; 
import MyMapComponent from './Map.js'; // assuming MyMapComponent exists for location selection
import TransportCardList from "./TransportCardList"; // assuming TransportCardList exists

export default function TransportBooking() {
  const [departureLocation, setDepartureLocation] = useState({ lat: 37.7749, lng: -122.4194 });
  const [arrivalLocation, setArrivalLocation] = useState({ lat: 37.7749, lng: -122.4194 });
  const [departureDescription, setDepartureDescription] = useState('m');
  const [arrivalDescription, setArrivalDescription] = useState('m');
  const [date, setDate] = useState(null); // Date state is null initially
  const [transports, setTransports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchClick = async () => {
    const queryParams = new URLSearchParams({
      depLon: departureLocation.lng,
      depLat: departureLocation.lat,
      arrLon: arrivalLocation.lng,
      arrLat: arrivalLocation.lat,
      date: date ? date.format('YYYY-MM-DD') : '', // Format date before passing
      depDesc: departureDescription,
      arrDesc: arrivalDescription,
    });
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/cariGo/transportation/?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setTransports(data);
    } catch (error) {
      console.error('Error fetching transportation data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", marginLeft: "10%" }}>
        <Box
          bgcolor="white"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: '30px',
            marginTop: '5%',
            padding: '10px',
            marginBottom: '12%',
          }}
        >
          {/* Departure Location */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '600px' }}>
            <Typography variant="body2" color="#126782">Start Location</Typography>
            <MyMapComponent
              onLocationChange={(newLocation) => setDepartureLocation(newLocation)}
              initialCoordinates={departureLocation}
            />
          </Box>

          {/* Arrival Location */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '600px' }}>
            <Typography variant="body2" color="#126782">Destination</Typography>
            <MyMapComponent
              onLocationChange={(newLocation) => setArrivalLocation(newLocation)}
              initialCoordinates={arrivalLocation}
            />
          </Box>

          {/* Date Picker */}
          <FormControl required sx={{ width: '600px' }}>
            <InputLabel>Date</InputLabel>
            <DatePicker
              value={date}
              onChange={(newDate) => setDate(newDate)}
              renderInput={(params) => <TextField {...params} />}
            />
            {!date && <FormHelperText error> date is required</FormHelperText>} {/* Show error if no date is selected */}
          </FormControl>

          {/* Search Button */}
          <Button
            variant="contained"
            sx={{
              padding: "8px 16px",
              borderRadius: "4px",
              textTransform: "none",
              marginTop: '10px',
              backgroundColor: "#126782",
              width: '250px',
            }}
            onClick={handleSearchClick}
          >
            <Typography variant="h6" color="white">
              Search Transportations
            </Typography>
          </Button>
        </Box>

        {/* Render Transport Cards */}
        <Box sx={{ padding: "20px", marginLeft: "10%", overflow: 'auto', marginTop: '4%' }}>
          {isLoading ? (
            <CircularProgress sx={{ color: '#126782', margin: '70px' }} />
          ) : (
            transports.length > 0 && <TransportCardList transports={transports} />
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
