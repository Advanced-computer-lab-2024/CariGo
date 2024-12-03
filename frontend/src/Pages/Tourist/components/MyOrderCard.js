import './ActivityCard.css'; // Reuse the same CSS for the order card
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyOrderCard = ({ orderId, userId, products, totalPrice, state, isCancelled, createdAt, deliveryDate, shippingAddress }) => {
  const [isPast, setIsPast] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkDate = () => {
      const today = new Date();
      const delivery = new Date(deliveryDate);
      setIsPast(delivery < today); // Sets isPast to true if deliveryDate is before today
    };

    checkDate();
  }, [deliveryDate]);

  const handleCancel = async () => {
    const cancelOrder = window.confirm("Are you sure you want to cancel this order?");
    if (cancelOrder) {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        await axios.patch(`/cariGo/cart/Cancel`, {
          OrderId: orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        alert("Order canceled successfully");
        
        
        const rate = parseFloat(JSON.parse(localStorage.getItem("conversionRate")))||1;
        console.log(rate);
        await axios.patch(`/cariGo/users/UpdateWallet`, {
          numOfTickets:1,
          price:totalPrice,
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

  const conversionRate = localStorage.getItem("conversionRate") || 1;
  const currencyCode = localStorage.getItem("currencyCode") || "USD";

  return (
    <div className="booking-card">
      <div className="booking-card__details">
        <h2 className="booking-card__name">Order #{orderId}</h2>
        <p className="booking-card__date">Ordered At: {new Date(createdAt).toLocaleDateString()}</p>
        <p className="booking-card__date">Delivery Date: {new Date(deliveryDate).toLocaleDateString()}</p>

        {/* Shipping Address */}
        <div className="booking-card__address">
          <h3>Shipping Address:</h3>
          <p>{shippingAddress.street}</p>
          <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}</p>
          <p>{shippingAddress.country}</p>
        </div>

        {/* Display Products */}
        <div className="booking-card__products">
          <h3>Products:</h3>
          {products.map((product, index) => (
           <div key={index} className="booking-card__product">
           <p>Product Name: {product.productId.name}</p> {/* Display product name */}
           <p>Quantity: {product.quantity}</p>
           <p> Price: {(product.totalPrice * conversionRate).toFixed(2)} {currencyCode}</p>
         </div>
          ))}
        </div>

        {/* Order State */}
        <p className="booking-card__status">
          Status: {isPast && state === 'delivered' ? 'Delivered' : state === 'cancelled' ? 'Cancelled' : 'Processing'}
        </p>

        <p className="booking-card__total">
          Total Price: {(totalPrice * conversionRate).toFixed(2)} {currencyCode}
        </p>
      </div>

      <button
        className="booking-card__cancel-button"
        onClick={handleCancel}
        disabled={isCancelled || state === 'delivered' || isPast} // Disable cancel if the order is delivered or already cancelled
      >
        Cancel Order
      </button>

      {/* Optional button to view more details */}

    </div>
  );
};

export default MyOrderCard;
