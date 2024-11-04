import React from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from "@mui/material";
import HotelCard from "./HotelCard";

const HotelCardList = ({ hotels = [], loading = false }) => {
  const navigate = useNavigate();

  const handleCardClick = (hotel) => {
    navigate(`/flight-details/${hotel.id}`, { state: { hotel } });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading hotels...</Typography>
      </Box>
    );
  }

  if (!Array.isArray(hotels) ) {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
        No hotel available.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        gap: '10px',
        margin: '30px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar in WebKit browsers
        msOverflowStyle: 'none', // Hide scrollbar in IE and Edge
        scrollbarWidth: 'none', // Hide scrollbar in Firefox
      }}
    >
      {hotels.map((hotel) => (
        <Box key={hotel.id} sx={{ marginBottom: '10px' }}>
          <HotelCard hotel={hotel} onClick={() => handleCardClick(hotel)} />
        </Box>
      ))}
    </Box>
  );
};

export default HotelCardList;
