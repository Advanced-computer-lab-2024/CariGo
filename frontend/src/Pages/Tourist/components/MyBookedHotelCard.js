import './ActivityCard.css';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from '../../../assets/itinerary.png'; // Correct relative path
import { Box, Typography, Card, Button, Divider, Link } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BedIcon from '@mui/icons-material/Bed';
import PinDropIcon from '@mui/icons-material/PinDrop';

const MyBookedHotelCard = ({ 
  bookId,
  hotelname, 
  checkInDate, 
  checkOutDate, 
  status, 
  img, 
  offer,
  price, 
  hotelData,
  NumberOfTickets, 
  TotalPrice 
}) => {
  const [isPast, setIsPast] = React.useState(false);
  const formatTime = (hours, minutes, dayTime) => {
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${dayTime}`;
  };

  const code = localStorage.getItem("currencyCode")||"EGP";

  console.log(hotelData);
  React.useEffect(() => {
    // const checkDate = () => {
    //   const today = new Date();
    //   const start = new Date(Date);  // Assuming 'Date' is a valid date string or object
    //   setIsPast(start < today); // Sets isPast to true if the Date is before today
    // };

    // checkDate();
  }, [Date]);  // Using 'Date' prop instead of undefined 'startDate'

  const handleCancel = async () => {
    const cancelBooking = window.confirm("Are you sure you want to cancel this booking?");
    if (cancelBooking) {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        // Corrected the syntax for axios request
        await axios.patch(`http://localhost:4000/cariGo/flights//CancelhBooking`, {bookingId: bookId,}, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        

        alert("Activity booking canceled successfully");
        const rate =  1;
        console.log(rate);

        await axios.patch('/cariGo/users/UpdateWallet', {
          numOfTickets: 1,
          price: TotalPrice,
          conversionRate: 1,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        alert("Refunded to your wallet successfully");

        // Add a 5-second delay before reloading the page
        setTimeout(() => {
          window.location.reload();
        }, 1000); // 5000 ms = 5 seconds
      } catch (error) {
        console.error('Failed to cancel Activity booking:', error.response ? error.response.data : error.message);
        alert(`An error occurred while canceling the booking. Details: ${error.message}, ${error.response?.data?.message}`);
      }
    }
  };

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

  const rate = parseFloat(JSON.parse(localStorage.getItem("conversionRate")))||1;
  return (
    <Box className="booking-card" sx={{width:'70%'}}>
      {/* <img
        src={logoImage}
        alt={`${hotelname}1`}
        className="booking-card__image"
      /> */}
      <div className="booking-card__details">
        <Typography 
          sx={{ color: '#126782', fontSize: '20px', fontWeight: 'bold', padding: '10px', width:'80%', overflow: 'auto' }}
        >
          {hotelname}
        </Typography>
        <Divider sx={{ borderBottomWidth: 2 , width:'90%',ml:'2%'}} />
        {/* <p className="booking-card__location">checkindate: {checkInDate}</p>
       
        <p className="booking-card__time">checkoutdate: {checkOutDate}</p> */}
        {/*INFO BOX*/}
        <Box sx={{ margin: "10px", marginLeft: '10px' }}>
          <Typography sx={{ color: '#126782', padding: '1px', fontWeight: 'bold' }}>
            {calculateStayDuration(checkInDate,checkOutDate)} days
            </Typography>
          <Box sx={{ display: 'flex', gap: '50px', marginLeft: '20px', padding: '5px' }}>
            <Box>
              <Typography sx={{ color: '#126782', padding: '1px' }}>from</Typography>
              <Box sx={{ display: 'flex', padding: '5px', gap: '10px', color:'#ff4d4d',}}>
                <CalendarMonthIcon fontSize="medium" sx={{ }} />
                <Typography type="date" sx={{ padding: '1px' }}>
                  {checkInDate}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography sx={{ color: '#126782', padding: '1px' }}>to</Typography>
              <Box sx={{ display: 'flex', padding: '5px', gap: '10px',color:'#ff4d4d', }}>
                <CalendarMonthIcon fontSize="medium" sx={{ }} />
                <Typography type="date" sx={{ padding: '1px' }}>
                  {checkOutDate}
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
          {/* <Box sx={{ display: 'flex', gap: '10px', padding: '5px', marginLeft: '-10px' }}>
            <PinDropIcon fontSize="medium" sx={{ fill: "#126782" }} />
            <Link
               href={hotelData.googleMapsLink}
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
          </Box> */}
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column',gap:'10px', color:'#126782'}}>
          <Box sx={{display:'flex', gap:'2%'}}>
            <Typography className="booking-card__tickets" sx={{fontWeight:'bold', marginLeft:'2%',}}>
            Number of Tickets 
            </Typography>
            <Typography sx={{}}>
            {NumberOfTickets}
            </Typography>
          </Box>
          <Box sx={{gap:'2px'}}>
            <Box sx={{ display: 'flex',color: '#126782'  }}>
              <AttachMoneyIcon sx={{ marginTop: '0px', }} />
              <Typography className="booking-card__status" sx={{fontWeight:'bold'}}>
                Total Price 
              </Typography>
            </Box>
            <Typography sx={{ color: '#ff4d4d', fontSize: '16px', ml: "7%" }}>
            {(TotalPrice*rate).toFixed(2)} {`${code}` || "no price specified"}
            </Typography>
          </Box>
        <Box sx={{display:'flex', gap:'2%'}}>
          <Typography className="booking-card__status" sx={{fontWeight:'bold', marginLeft:'2%',mb:'2%'}}>
            Status 
          </Typography>
          <Typography sx={{}}>
            {isPast&&status ? "Done" : status ? "Booked" : "Canceled Bookings"}
          </Typography>
          </Box>
          </Box>
      </div>
      <button
        className="booking-card__cancel-button"
        onClick={handleCancel}
        disabled={!status || isPast} // Disable button if status is false or the date is in the past
      >
        Cancel
      </button>
    </Box>
  );
};

export default MyBookedHotelCard;
