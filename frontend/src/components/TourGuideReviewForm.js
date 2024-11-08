import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Rating,
  Typography,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const TourGuideReviewForm = ({ tourGuideId, open, onClose }) => {
  const [reviewData, setReviewData] = useState({
    tourGuide: tourGuideId,
    review: '',
    rating: 0,
    user: localStorage.getItem('id')
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (event, newValue) => {
    setReviewData({ ...reviewData, rating: newValue || 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
  
    if (!reviewData.rating || !reviewData.review.trim()) {
      setError('Please provide both a rating and a review.');
      return;
    }
  
    console.log("Review Data: ", reviewData); // Add this to see the data sent
  
    try {
      const response = await axios.post('http://localhost:4000/cariGo/review/tourGuide', reviewData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Review submitted:', response.data);
      onClose();
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again.');
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      onClick={(e) => e.stopPropagation()} // Stop propagation here
    >
      <DialogTitle>Leave a Review for the Tour Guide</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Box sx={{ mb: 2 }}>
            <Typography component="legend">Rating</Typography>
            <StyledRating
              name="rating"
              value={reviewData.rating}
              onChange={handleRatingChange}
              precision={0.5}
              size="large"
            />
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            id="review"
            label="Your Review"
            name="review"
            multiline
            rows={4}
            value={reviewData.review}
            onChange={handleChange}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit Review
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TourGuideReviewForm;
