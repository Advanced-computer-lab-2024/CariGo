import './ActivityCard.css';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from '../../../assets/itinerary.png'; // Correct relative path

const MyBookedTransCard = ({ 
  id, 
  name, 
  Date, 
  location1, 
  location2, 
  hours1, 
  minutes1, 
  dayTime1, 
  hours2, 
  minutes2, 
  dayTime2, 
  status, 
  img, 
  price, 
  author, 
  NumberOfTickets, 
  TotalPrice 
}) => {
  const [isPast, setIsPast] = React.useState(false);
  const formatTime = (hours, minutes, dayTime) => {
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${dayTime}`;
  };

  const startTime = formatTime(hours1, minutes1, dayTime1);
  const endTime = formatTime(hours2, minutes2, dayTime2);
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
        await axios.patch(`http://localhost:4000/cariGo/transportation/CancelBooking/${id}`, {}, {
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
  const rate = parseFloat(JSON.parse(localStorage.getItem("conversionRate")))||1;
  return (
    <div className="booking-card">
      <img
        src={logoImage}
        alt={`${name}1`}
        className="booking-card__image"
      />
      <div className="booking-card__details">
        <h2 className="booking-card__name">{name}</h2>
        <p className="booking-card__date">
          Date: {Date}
        </p>
        <p className="booking-card__location">Location: {location1}</p>
        <p className="booking-card__location">Location: {location2}</p>
        <p className="booking-card__time">Start Time: {startTime}</p>
        <p className="booking-card__time">End Time: {endTime}</p>
        <p className="booking-card__status">
          Total Price: {(TotalPrice*rate).toFixed(2)}
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

export default MyBookedTransCard;
