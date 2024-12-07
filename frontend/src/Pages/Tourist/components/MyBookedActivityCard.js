import './ActivityCard.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Chip, Snackbar ,Typography,IconButton,Avatar,Card, CardHeader,CardMedia,CardContent,CardActions, Button} from '@mui/material';
import logoImage from '../../../assets/itinerary.png'; // Correct relative path
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PinDropIcon from '@mui/icons-material/PinDrop';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Height } from '@mui/icons-material';
import ActivityReviewForm from "../../../components/ActivityReviewForm.js"; // Renamed to ActivityReviewForm



const MyBookedActivityCard = ({bookId, id, name, startDate,startTime, endDate,endTime, location, status, img,price,author,NumberOfTickets,TotalPrice }) => {
  const [isPast, setIsPast] = React.useState(false);

  React.useEffect(() => {
    const checkDate = () => {
      const today = new Date();
      const start = new Date(startDate);

      setIsPast(start <= today); // Sets isPast to true if startDate is before today
    };

    checkDate();
  }, [startDate]);

  const handleCancel = async () => {
    const cancelBooking = window.confirm("Are you sure you want to cancel this booking?");
    if (cancelBooking) {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        await axios.patch(`/cariGo/activity/CancelActivityBooking`, {
          bookingId: bookId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });


        alert("activity booking canceled successfully");
        const rate = parseFloat(JSON.parse(localStorage.getItem("conversionRate")))||1;
        console.log(rate);
        await axios.patch(`/cariGo/users/UpdateWallet`, {
          numOfTickets:1,
          price:TotalPrice,
          conversionRate:1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        alert("refunded to your wallet successfully");
        // Add a 5-second delay before reloading the page
      setTimeout(() => {
        window.location.reload();
      }, 1000); // 5000 ms = 5 seconds
      } catch (error) {
        console.error('Failed to cancel Activity booking:', error.response ? error.response.data : error.message);
        alert(`An error occurred while canceling the booking. Details: ${error.message},${error.response.data.message}`);
      }
    }
  };
  const conversionRate = localStorage.getItem("conversionRate")||1;
  const code = localStorage.getItem("currencyCode")||"EGP";

  const [openActivityReviewForm, setOpenActivityReviewForm] = useState(false); // Renamed to openActivityReviewForm
  const [selectedActivityId, setSelectedActivityId] = useState(null); // Changed from selectedItineraryId to selectedActivityId
  const today = new Date();

  const openActivityReviewFormHandler = (id) => {
    // Renamed from openReviewFormHandler
    console.log("Opening review form for activity id:", id);
    setSelectedActivityId(id); // Changed from setSelectedItineraryId to setSelectedActivityId
    setOpenActivityReviewForm(true); // Renamed to setOpenActivityReviewForm
  };

  const closeActivityReviewFormHandler = () => {
    // Renamed from closeReviewFormHandler
    setOpenActivityReviewForm(false); // Renamed to setOpenActivityReviewForm
    setSelectedActivityId(null); // Changed from setSelectedItineraryId to setSelectedActivityId
  };

  const formatDateTime = (dateString) => {
    // Create a new Date object from the input string
    const date = new Date(dateString);
    
    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    // Return the formatted date as DD/MM/YYYY
    return `${day}/${month}/${year}`;
  };
  return (
    //console.log("price: "+price),
    //console.log("author: "+author),
    <Card sx={{width:'90%',height : '35vh', display:'flex', gap:'2%', border:'2px solid lightgray',padding:'2.9% 2%'}}>
      <CardMedia
          component="img"
          image={logoImage}
          alt={`${name}`}
          sx={{width:'35%',height:'80%',borderRadius:'5px'}}
        />
      <Box
            sx={{
              display: 'flex',
              flexFlow: 'column', 
              margin:'0% 2%',
              //marginLeft: '15px',
              color:'#126782'
            }}
          >
        <Typography sx={{fontWeight:'bold', fontSize:'20px', mt:'-2%'}}>
          {name}
        </Typography>
        {/*timings box*/}
        <Box sx={{display:'flex', color:'#ff4d4d',padding:'5px', paddingLeft:'0px', gap:'2%'}}>
          <CalendarMonthIcon/>
          <Typography sx={{marginTop:'2px'}}>{formatDateTime(startDate)}</Typography>
          <Typography sx={{margin:'0.5% 2%', color:'#126782'}}>to</Typography>
          <CalendarMonthIcon sx={{}}/>
          <Typography sx={{marginTop:'2px',}}>{formatDateTime(endDate)}</Typography>
        </Box>
        {/*end of timings box*/}
        <Box sx={{display:'flex', gap:'2%'}}>
          <PinDropIcon/>
          <Typography sx={{fontWeight:"bold"}}>
            Location
          </Typography>
        </Box>
        <Typography sx={{marginLeft:'13%'}}>
          {location || "no specified location"}
        </Typography>
        <Box sx={{display:'flex', gap:'2%'}}>
          <AttachMoneyIcon/>
          <Typography sx={{fontWeight:"bold"}}>
            total price
          </Typography>
        </Box>
        <Typography sx={{marginLeft:'13%'}}>
        {(TotalPrice*conversionRate).toFixed(2)} {`${code}` || "no price specified"}
        </Typography>
        <Box sx={{display:'flex', gap:'2%'}}>
          <Typography className="booking-card__status" sx={{fontWeight:'bold', marginLeft:'2%',paddingBottom:'5%'}}>
            Status 
          </Typography>
          <Typography sx={{}}>
            {isPast&&status ? "Done" : status ? "Booked" : "Canceled Bookings"}
          </Typography>
          </Box>
      </Box>
      {/* buttons box */}
      <Box sx={{display:'flex',gap:'5%',marginTop:'22%',justifyContent:'center', alignItems:'center', ml:'5%'}}>
      <Button
        sx={{
          color:'white', 
          backgroundColor: '#ff4d4d',
          borderRadius:'5px', 
          padding:'2% 15%', 
          //height:'20%',
          marginLeft:'7%',
          "&.Mui-disabled": {
            color: "white", // Change text color for disabled state
            backgroundColor: "gray", // Optional: Change background for disabled state
          },
        }}
        onClick={() =>
           openActivityReviewFormHandler(id)
          }
        disabled={!(status && today > new Date(endDate))}
      >
        Review
      </Button>
          
      <Button
        onClick={handleCancel}
        disabled={!status || isPast} // Disable button if status is false or the date is in the past
        sx={{
          color:'#ff4d4d', 
          backgroundColor: 'white',
          borderRadius:'5px', 
          padding:'5px', 
          //height:'20%',
          marginLeft:'1%',
          "&.Mui-disabled": {
            color: "gray", // Change text color for disabled state
            backgroundColor: "white", // Optional: Change background for disabled state
          },
        }}
      >
        Cancel
      </Button>
      </Box>

      {/* Render the activity review form dialog */}
      {selectedActivityId && (
        <ActivityReviewForm
          open={openActivityReviewForm}
          onClose={closeActivityReviewFormHandler}
          activityId={selectedActivityId}
        />
      )}
    </Card>
  );
};

export default MyBookedActivityCard;
