import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from '@mui/material'; // Importing modal from Material UI
import RateReviewIcon from '@mui/icons-material/RateReview'; // Importing review icon
import ProductReviewForm from './ProductReviewForm'; // Import ProductReviewForm component

const PurchaseCard = ({ id, name, description, price, quantity, ratingsAverage, createdAt,triggerRefresh }) => {
  const totalCost = price * quantity;
  const [userRating, setUserRating] = useState(ratingsAverage);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  const handleRating = async (rating) => {
    setUserRating(rating);
    try {
      const token = localStorage.getItem('jwt');
      if (!token) throw new Error("Please log in to submit a rating.");

      alert("Thank you for rating this product!");
    } catch (error) {
      console.error("Failed to submit rating:", error);
      alert("Could not submit rating. Please try again.");
    }
  };

  // Function to toggle the review form modal
  const toggleReviewForm = () => {
    setIsReviewFormOpen(!isReviewFormOpen);
  };
  const handleAction = () => {
    triggerRefresh();
  };
  return (
    <div style={styles.purchaseCard}>
      <div style={styles.details}>
        <h2 style={styles.name}>{name}</h2>
        <p style={styles.description}>{description}</p>
        <p style={styles.text}>Price per unit: ${price}</p>
        <p style={styles.text}>Quantity: {quantity}</p>
        <p style={styles.text}>Total Cost: ${totalCost}</p>
        <p style={styles.text}>Purchased on: {new Date(createdAt).toLocaleDateString()}</p>

        {/* Review Icon and Rating */}
        <div style={styles.actions}>
          <span style={styles.rating}>Rating: {userRating}</span>
          <RateReviewIcon
            onClick={toggleReviewForm}
            style={{ cursor: 'pointer', marginLeft: '8px' }}
            titleAccess="Leave a Review"
          />
        </div>
      </div>

      {/* ReviewForm Modal */}
      <Modal open={isReviewFormOpen} onClose={toggleReviewForm}>
        <div style={styles.modalContent}>
          <ProductReviewForm
            productId={id} // Pass productId to the review form
            open={isReviewFormOpen} // Control open state of the modal
            onClose={toggleReviewForm} // Close the modal after submission
          />
        </div>
      </Modal>
    </div>
  );
};

const styles = {
  purchaseCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px 0',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
  },
  description: {
    fontSize: '14px',
    margin: '0 0 8px 0',
    color: '#555',
  },
  text: {
    margin: '4px 0',
    fontSize: '14px',
    color: '#333',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '12px',
  },
  rating: {
    fontSize: '14px',
    color: '#333',
  },
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    outline: 'none',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

export default PurchaseCard;
