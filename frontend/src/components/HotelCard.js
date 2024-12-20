import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, Button, Divider, Link } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BedIcon from '@mui/icons-material/Bed';
import PinDropIcon from '@mui/icons-material/PinDrop';

const HotelCard = ({ hotel,offer }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt');


  function calculateStayDuration(checkInDate, checkOutDate) {
    // Convert the input dates to Date objects
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    // Calculate the difference in time (in milliseconds)
    const timeDifference = checkOut - checkIn;
    // Calculate the number of days
    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return days;
  }

  const handleClick = () => {
    navigate(`/hotel-details/${hotel.id}`, { state: { hotel,offer } });
    window.scrollTo(0, 0);
  };

  return (
    <Card variant="outlined"  sx={{
      border: '2px solid #126782', 
      borderColor:'#126782',
      borderRadius:'10px', 
      height:'400px',
      maxHeight:'600px',
      display: 'flex', 
      flexDirection:'column', 
      flexShrink: '0',
      maxWidth: '450px',
      margin:'20px',
      marginTop:'20px',
      marginRight:'60px',
      }}>
        <Box sx={{width:'90%',margin:'20px'}}>
 
        <Typography 
          sx={{ color: '#126782', fontSize: '26px', fontWeight: 'bold', padding: '10px' }}
        >
          {hotel.hotel.name}
        </Typography>
        <Divider sx={{ borderBottomWidth: 3 }} />

        {/*INFO BOX*/}
        <Box sx={{ margin: "10px", marginLeft: '10px' }}>
          <Typography sx={{ color: '#126782', padding: '1px', fontWeight: 'bold' }}>
            {calculateStayDuration(offer.checkInDate,offer.checkOutDate)} days
            </Typography>
          <Box sx={{ display: 'flex', gap: '50px', marginLeft: '20px', padding: '5px' }}>
            <Box>
              <Typography sx={{ color: '#126782', padding: '1px' }}>from</Typography>
              <Box sx={{ display: 'flex', padding: '5px', gap: '10px' }}>
                <CalendarMonthIcon fontSize="medium" sx={{ fill: "#126782" }} />
                <Typography type="date" sx={{ color: '#126782', padding: '1px' }}>
                  {offer.checkInDate}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography sx={{ color: '#126782', padding: '1px' }}>to</Typography>
              <Box sx={{ display: 'flex', padding: '5px', gap: '10px' }}>
                <CalendarMonthIcon fontSize="medium" sx={{ fill: "#126782" }} />
                <Typography type="date" sx={{ color: '#126782', padding: '1px' }}>
                  {offer.checkOutDate}
                </Typography>
              </Box>
            </Box>
          </Box>
          {/*END OF DATES BOX*/}
          {/*number of beds*/}
          <Box sx={{ display: 'flex', gap: '10px', padding: '5px', marginLeft: '-10px' }}>
            <BedIcon fontSize="medium" sx={{ fill: "#126782" }} />
            <Typography sx={{ color: '#126782', padding: '1px' }}>
              {offer.room.typeEstimated.beds} {offer.room.typeEstimated.bedType} bed{offer.room.beds > 1 ? 's' : ''}
            </Typography>
          </Box>
          {/*location link*/}
          <Box sx={{ display: 'flex', gap: '10px', padding: '5px', marginLeft: '-10px' }}>
            <PinDropIcon fontSize="medium" sx={{ fill: "#126782" }} />
            <Link
               href={hotel.googleMapsLink}
              sx={{
                color: '#126782',
                padding: '1px',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              clickHereToChecKTheLocation
            </Link>
          </Box>
        </Box>
        {/*for price and booking button*/}
        <Box sx={{ position: 'relative', padding: '10px' }}>
          <Box sx={{ display: 'flex', marginLeft: '-10px', padding: '5px', marginBottom: '10px', bottom: '10px' }}>
            <AttachMoneyIcon sx={{ marginTop: '0px', color: '#126782' }} />
            <Typography sx={{ color: '#126782', fontSize: '16px', marginLeft: '5px' }}>
              {offer.price.total} {offer.price.currency}
            </Typography>
          </Box>
          <Button onClick={handleClick}
            sx={{
              color: 'white',
              backgroundColor: '#ff4d4d',
              borderRadius: '5px',
              position: 'absolute',
              right: '0px',
              bottom: '10px',
            }}
          >
            View Details
          </Button>
        </Box>
      </Box>
    </Card>
  );
};




export default HotelCard;
