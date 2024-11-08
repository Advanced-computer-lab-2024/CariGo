// PurchaseCard.js
import './PurchaseCard.css';
import React, { useState } from 'react';
import axios from 'axios';

const PurchaseCard = ({ id, name, description, price, quantity, ratingsAverage, createdAt }) => {
  const totalCost = price * quantity;
  const [userRating, setUserRating] = useState(ratingsAverage);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = async (rating) => {
    setUserRating(rating);
    try {
      const token = localStorage.getItem('jwt');
      if (!token) throw new Error("Please log in to submit a rating.");

      await axios.post(
        `/api/purchases/rate/${id}`,
        { rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Thank you for rating this product!");
    } catch (error) {
      console.error("Failed to submit rating:", error);
      alert("Could not submit rating. Please try again.");
    }
  };

  return (
    <div className="purchase-card">
      <div className="purchase-card__details">
        <h2 className="purchase-card__name">{name}</h2>
        <p className="purchase-card__description">{description}</p>
        <p className="purchase-card__price">Price per unit: ${price}</p>
        <p className="purchase-card__quantity">Quantity: {quantity}</p>
        <p className="purchase-card__total-cost">Total Cost: ${totalCost}</p>
        <p className="purchase-card__date">Purchased on: {new Date(createdAt).toLocaleDateString()}</p>
      </div>

     
    </div>
  );
};

export default PurchaseCard;
