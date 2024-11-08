import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Rating,
  Box,
} from "@mui/material";

const ProductReviews = ({ id }) => {
  const [reviews, setReviews] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch(
          `http://localhost:4000/cariGo/review/product/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setReviews(data.data.reviews);
        console.log("Fetched reviews:", data.data.reviews);
      } catch (error) {
        console.error("Error fetching product reviews:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <Box style={{ padding: "20px" }}>
      <Typography variant="h5" style={{ fontWeight: "bold" }} gutterBottom>
        Product Reviews
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          padding: "16px 0",
          gap: 2,
          scrollSnapType: "x mandatory", // Optional for snapping scroll
        }}
      >
        {reviews.map((review) => (
          <Card
            key={review._id}
            variant="outlined"
            sx={{
              minWidth: 275,
              flex: "0 0 auto", // Prevents cards from shrinking in the row
              scrollSnapAlign: "center", // Aligns cards in the center as they scroll
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                {review.user?.username || "Anonymous"}
              </Typography>
              <Rating
                name="read-only"
                value={review.rating}
                readOnly
                precision={0.5}
                sx={{ marginBottom: "8px" }}
              />
              <Typography variant="body2" color="text.secondary">
                {review.review}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ marginTop: "8px" }}
              >
                {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ProductReviews;
