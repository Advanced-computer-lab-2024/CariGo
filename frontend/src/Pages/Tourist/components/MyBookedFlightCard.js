import './ActivityCard.css';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from '../../../assets/itinerary.png'; // Correct relative path

const MyBookedFlightCard = ({ 
   
  airline, 
  airlinename, 
  segments, 
  way, 
 
  status, 
  img, 
  price, 
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
        await axios.patch(`http://localhost:4000/cariGo/flights//CancelfBooking`, {flightData}, {
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
        }, 5000); // 5000 ms = 5 seconds
      } catch (error) {
        console.error('Failed to cancel Activity booking:', error.response ? error.response.data : error.message);
        alert(`An error occurred while canceling the booking. Details: ${error.message}, ${error.response?.data?.message}`);
      }
    }
  };

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
        <p className="booking-card__time">segemets: {segments}</p>
        <p className="booking-card__status">
          Total Price: {TotalPrice }
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

export default MyBookedFlightCard;
