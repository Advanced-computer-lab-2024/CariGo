import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom"; // To get Product ID if needed

const PurchaseForm = ({ productId }) => {
  const [quantity, setQuantity] = useState(1); // Initial quantity set to 1
  const [message, setMessage] = useState(""); // Feedback message for user

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handlePurchase = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await fetch("http://localhost:4000/cariGo/purchase/makePurchase", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProductId: productId,
          Quantity: quantity,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Purchase failed");
      }

      const purchaseData = await response.json();
      setMessage(`Purchase successful! Order ID: ${purchaseData._id}`);
    } catch (error) {
      console.error("Purchase error:", error);
      setMessage(`Purchase failed: ${error.message}`);
    }
  };

  return (
    <Box sx={{ padding: "16px", maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Purchase Product
      </Typography>
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        InputProps={{ inputProps: { min: 1 } }} // Minimum quantity is 1
        sx={{ marginBottom: "16px", width: "100%" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handlePurchase}
        fullWidth
        sx={{ padding: "10px" }}
      >
        Make Purchase
      </Button>
      {message && (
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: "16px" }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default PurchaseForm;
