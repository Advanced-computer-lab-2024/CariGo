import React ,{useEffect}from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import HotelCard from "./HotelCard";

  const HotelCardList = ({ hotels = [], loading = false }) => {
  const navigate = useNavigate();

  const handleCardClick = (hotel) => {
    navigate(`/flight-details/${hotel.id}`, { state: { hotel } });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = document.querySelector('.scrollableList').scrollTop;
      sessionStorage.setItem('scrollPosition', scrollPosition);
    };

    const listElement = document.querySelector('.scrollableList');
    listElement.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      listElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const listElement = document.querySelector('.scrollableList');
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    
    if (savedScrollPosition) {
      listElement.scrollTop = savedScrollPosition;
    }
  }, []);

  if (!Array.isArray(hotels) ) {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
        No hotel available.
      </Typography>
    );
  }

  return (
    <Box className="scrollableList"
      sx={{
        gap: '10px',
        margin: '30px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden', 
        maxHeight:'600px',
        '&::-webkit-scrollbar': {
          width: '8px', // Width of the scrollbar
        
          },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#126782', // Color of the scrollbar thumb
          borderRadius: '10px', // Rounded corners for the scrollbar thumb
          },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1', // Color of the scrollbar track
          borderRadius: '10px', // Rounded corners for the scrollbar track
        },
      }}
    >
      {/* {hotels.map((hotel) => (
        <Box key={hotel.id} sx={{ marginBottom: '10px' }}>
          <HotelCard hotel={hotel} onClick={() => handleCardClick(hotel)} />
        </Box>
      ))} */}
       {hotels.map((hotel) => 
                hotel.offers.map((offer) => (
                    <HotelCard  hotel={hotel} offer={offer} />
                ))
            )}
    </Box>
  );
};

export default HotelCardList;
