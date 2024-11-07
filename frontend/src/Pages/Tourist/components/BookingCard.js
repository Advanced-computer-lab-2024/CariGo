import './BookingCard.css';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from '../../../assets/itinerary.png'; // Correct relative path

const BookingCard = ({ id, name, startDate, endDate, location, status, img,price,author }) => {
  const [isPast, setIsPast] = React.useState(false);

  React.useEffect(() => {
    const checkDate = () => {
      const today = new Date();
      const start = new Date(endDate);
      setIsPast(start < today); // Sets isPast to true if startDate is before today
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

        await axios.patch(`/cariGo/Event/CancelItineraryBooking`, {
          ItineraryId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        alert("Itinerary booking canceled successfully");
        window.location.reload();
      } catch (error) {
        console.error('Failed to cancel itinerary booking:', error.response ? error.response.data : error.message);
        alert(`An error occurred while canceling the booking. Details: ${error.message},${error.response.data.message}`);
      }
    }
  };

  return (
    //console.log("price: "+price),
    //console.log("author: "+author),
    <div className="booking-card">
      <img
        src={logoImage}
        alt={`${name}`}
        className="booking-card__image"
      />
      <div className="booking-card__details">
        <h2 className="booking-card__name"> {name}</h2>
        <p className="booking-card__date">
          Start date: {startDate} - End date: {endDate}
        </p>
        <p className="booking-card__location">Location: {location}</p>
        <p className="booking-card__status">
          Status: {isPast&&status ? "Done" : status ? "Booked" : "Canceled Bookings"}
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

export default BookingCard;