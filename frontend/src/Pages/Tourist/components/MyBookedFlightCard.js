import './ActivityCard.css';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from '../../../assets/itinerary.png'; // Correct relative path
import styled from "styled-components";
import FlightInfo from '../../../components/FlightInfo';
import FlightDate from '../../../components/FlightDate';
import FlightDuration from '../../../components/FlightDuration';
import { Box ,Typography,Button,} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FlightIcon from '@mui/icons-material/Flight';
import LuggageIcon from '@mui/icons-material/Luggage';

const MyBookedFlightCard = ({  
  bookId,
  airline, 
  airlinename, 
  segments, 
  way, 
  status, 
  img, 
  price, 
  currency,
  flightData,
  NumberOfTickets, 
  TotalPrice 
}) => {
  const [isPast, setIsPast] = React.useState(false);
  const formatTime = (hours, minutes, dayTime) => {
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${dayTime}`;
  };


  console.log(status);
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
        await axios.patch(`http://localhost:4000/cariGo/flights//CancelfBooking`, {bookingId: bookId,}, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        

        alert("Activity booking canceled successfully");
        const rate = parseFloat(JSON.parse(localStorage.getItem("conversionRate"))) || 1;
        console.log(rate);

        await axios.patch('/cariGo/users/UpdateWallet', {
          numOfTickets: NumberOfTickets,
          price: price,
          conversionRate: rate,
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

  const formatDuration = (duration) => {
    if (!duration) return ""; // Handle cases where duration might be undefined

    // Ignore the first two characters
    const durationString = duration.substring(2);
    
    // Replace 'h' with ' hours' and 'm' with ' minutes'
    return durationString.replace(/H/g, ' hours ').replace(/M/g, ' minutes ').trim();
  };

  const rate = parseFloat(JSON.parse(localStorage.getItem("conversionRate")))||1;
  return (
    <div className="booking-card">
      <img
        src={logoImage}
        alt={`${airlinename}1`}
        className="booking-card__image"
      />
      <div className="booking-card__details">
        <h2 className="booking-card__name">{airlinename}</h2>
   
        <p className="booking-card__location">airline: {airline}</p>
        <p className="booking-card__location">airlineName: {airlinename}</p>
        <p className="booking-card__time">oneWay: { way ? "yes" : "no"}</p>
        <p className="booking-card__time">segemets: </p>
        <Box sx={{display:'flex',flexDirection:'row', height:"120px", margin:'10px',marginTop:'-20px', gap:'30px'}}>
        <FlightDetails>
          {segments.length > 0  && segments.map((segment, index) => (
            <Box>
            <FlightInfo
              key={index}
              time1={new Date(segment.departure.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              time2={new Date(segment.arrival.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              code={segment.flightNumber}
              city={`${segment.departure.airport} to ${segment.arrival.airport}`} // Displaying the route 
            />
            <Typography color = "#126782">{formatDuration(segment.duration)}</Typography>
            </Box>
          ))}
        </FlightDetails>
        </Box>
        <p className="booking-card__status">
          
          Total Price: {(TotalPrice *rate).toFixed(2)}
        </p>
        <p className="booking-card__status">
          Status: {isPast && status ? "Done" : status ? "Booked" : "Canceled Bookings"}
        </p>
        <p className="booking-card__tickets">
  Number of Tickets: {NumberOfTickets}
</p>
      </div>
      <button
        className="booking-card__cancel-button"
        onClick={handleCancel}
        disabled={!status || isPast} // Disable button if status is false or the date is in the past
      >
        Cancel
      </button>
    </div>
  );
};

const Divider = styled.hr`
  align-self: stretch;
  margin: 21px 0 17px;
  border: none;
  //width: 80%;
  border-top: 3px solid #dcdcdc;
`;

const FlightDetails = styled.section`
  display: flex;
  width: 100%;
  max-width: 299px;
  gap: 40px 77px;
  margin-left: 10px;
  height:200px;
`;
const Price = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #126782;
  margin-top:0px;
  margin-bottom: 10px;
  right:0;
`;

export default MyBookedFlightCard;
