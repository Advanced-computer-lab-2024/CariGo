import React, { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  Container,
  Modal,
  Card,
  CardContent,
  Typography,
  CardActions,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Navbar from "./Tourist/components/TouristNavBar";
import AddressManager from "../components/AdressManager.jsx";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import PaymentPopup from './PaymentPopup';
import { Elements } from '@stripe/react-stripe-js';
import axios from "axios";

import PropTypes from "prop-types";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";


const stripePromise = loadStripe('pk_test_51QLoL4AkXvwFjwTIX8acMj27pC8YxdOhmoUzn0wbUhej1xUFgFlfgYtXRGmggbKUI6Yfpxz08i9shcsfszv6y9iP0007q608Ny'); // Publishable key

const API_BASE_URL = "http://localhost:4000/cariGo";

const CartComponent = () => {
  const [error, setError] = React.useState(false);
  const [discount,SetDiscount] = React.useState(100);
  const [promoCode, setPromoCode] = React.useState(""); // State to store the promo code input
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const conversionRate = parseFloat(
    localStorage.getItem("conversionRate") || "1"
  );
  const code = localStorage.getItem("currencyCode") || "EGP";

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, [isPaymentPopupOpen]);

  useEffect(() => {
    calculateTotal();
  }, [cartItems,discount]);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("User is not logged in.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/cart/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart 🌙");
      }

      const data = await response.json();
      setCartItems(data.products || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const [user, setUser] = React.useState();
  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("User is not logged in.");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/users/${localStorage.getItem("id")}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch addresses");
      }
      const data = await response.json();
      setUser(data)
      setAddresses(data.addresses || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );
    let priceAfterDiscount = total *(1-(discount/100));
    if(priceAfterDiscount == 0)
      priceAfterDiscount = total;
    setTotalCost(priceAfterDiscount);
  };

  const updateQuantity = async (id, change) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("User is not logged in.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/cart/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: id,
          quantity: change,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      await fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("User is not logged in.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/cart/remove/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      await fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCkeckoutClick = () => {
    const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("User is not logged in.");
        return;
      }
    if (!selectedAddress) {
      alert("Please select a shipping address");
      return;
    }
    setIsPaymentPopupOpen(true);
  };

  const checkoutCart = async (PaymentMethod) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("User is not logged in.");
        return;
      }

      if (!selectedAddress) {
        alert("Please select a shipping address");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/cart/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingAddress: selectedAddress,
          paymentAmount:totalCost,
          PaymentMethod:PaymentMethod,
        }),
      });

      if (!response.ok) {
        throw new Error("Checkout failed");
      }

      const result = await response.json();
      console.log("Checkout successful:", result);
      alert("Checkout successful!");
      await fetchCart();
      setIsPaymentPopupOpen(false);
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed. Please try again.");
      setIsPaymentPopupOpen(false);
    }
  };

  const toggleReviewForm = (id) => {
    setSelectedItemId(id);
    setIsReviewFormOpen(!isReviewFormOpen);
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleAddNewAddress = async (newAddress) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("User is not logged in.");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/users/update/${localStorage.getItem("id")}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            addresses: [...addresses, newAddress],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add new address");
      }

      await fetchAddresses();
      setSelectedAddress(newAddress);
    } catch (error) {
      console.error("Error adding new address:", error);
    }
  };

  const handleRedeem = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
      console.log(token);
      const response = await axios.post(
        "http://localhost:4000/cariGo/Event/redeemPromoCode",
        { code: promoCode },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Make sure token is passed in the correct format
          },
        }
      );

      if (response.status === 200) {
        SetDiscount(response.data.discount); // Set discount when promo code is valid
        setError(true); // Clear error state
      }
    } catch (err) {
      console.error("Error redeeming promo code:", err);
      setError(false); // Show error if promo code is invalid
      alert("Invalid promo code");
      SetDiscount(100);
    }
  };
  const handleCancel = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
      console.log(promoCode);
      const response = await axios.post(
        "http://localhost:4000/cariGo/Event/cancelPromoCode",
        { code: promoCode },
        {
          
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Make sure token is passed in the correct format
          },
        }
      );

      if (response.status === 200) {
        SetDiscount(100); // Set discount when promo code is valid
        setError(false); // Clear error state
        setPromoCode(''); // Reset the text field value
      }
    } catch (err) {
      console.error("Error redeeming promo code:", err);
      setError(true); // Show error if promo code is invalid
      alert("Invalid promo code");
      SetDiscount(100);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f7f7f7", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="md" sx={styles.cartContainer}>
        <Typography variant="h4" sx={styles.cartTitle}>
          <ShoppingCartIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Your Shopping Cart
        </Typography>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Card key={item.productId._id} sx={styles.productCard}>
              <CardContent sx={styles.cardContent}>
                <Typography variant="h6" sx={styles.productName}>
                  {item.productId.name}
                </Typography>
                <Typography variant="body2" sx={styles.productDescription}>
                  {item.productId.description}
                </Typography>
                <Typography variant="body1" sx={styles.productPrice}>
                  ${(item.productId.price * conversionRate).toFixed(2)} {code}
                </Typography>
                <Typography variant="body2" sx={styles.productQuantity}>
                  Quantity: {item.quantity}
                </Typography>
              </CardContent>
              <CardActions sx={styles.cardActions}>
                <Box sx={styles.quantityControl}>
                  <IconButton
                    onClick={() => {
                      if (item.quantity === 1) {
                        removeItem(item.productId._id);
                      } else {
                        updateQuantity(item.productId._id, -1);
                      }
                    }}
                    size="small"
                  >
                    {item.quantity === 1 ? <DeleteIcon /> : <RemoveIcon />}
                  </IconButton>
                  <Typography sx={styles.quantity}>{item.quantity}</Typography>
                  <IconButton
                    onClick={() => updateQuantity(item.productId._id, 1)}
                    size="small"
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <IconButton
                  onClick={() => removeItem(item.productId._id)}
                  size="small"
                  sx={styles.removeButton}
                >
                  <DeleteIcon />
                </IconButton>
                {/* <IconButton onClick={() => toggleReviewForm(item.productId._id)} size="small" sx={styles.reviewButton}>
                  <RateReviewIcon />
                </IconButton> */}
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography sx={styles.emptyCart}>Your cart is empty.</Typography>
        )}
        <Box sx={styles.totalCost}>
          <Typography variant="h5">
            Total Cost: ${(totalCost * conversionRate).toFixed(2)} {code}
          </Typography>
          <Typography gutterBottom>Redeem Promo Code</Typography>
          <Box
            sx={{
              width: "100%", // Ensure the container spans full width
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            <TextField
              error={!error} // Error styling applied when promo code is invalid
              id="outlined-error-helper-text"
              label="Promo Code"
              disabled={error}
              helperText={
                error ? "Promo code accepted" : "Please enter a valid code"
              }
              variant="outlined"
              onChange={(e) => setPromoCode(e.target.value)} // Update state on input change
              value={promoCode} // Bind the input value to the state
              sx={{
                marginBottom: 2, // More spacing after the text field
                textAlign: "center", // Center the default text
                "& .MuiInputLabel-root.Mui-focused": {
                  fontWeight: "bold", // Make label text bold when focused
                  color: "orange", // Change label text color to orange when focused
                },
                "& .MuiInputBase-input": {
                  textAlign: "center", // Center the text in the input field
                },
              }}
              InputProps={{
                style: {
                  width: "100%", // Make sure the input spans full width
                },
              }}
              FormHelperTextProps={{
                sx: {
                  color: error ? "green" : "red", // Green for accepted, red for invalid
                  marginLeft: -1, // Align the helper text with the input
                  marginTop: 0, // Optional: reduces spacing between helper text and input
                  textAlign: "center", // Center-align the text
                  fontWeight: "bold", // Optional: Make the helper text bold
                },
              }}
            />

            {/* Buttons Container */}
            <Box
              sx={{
                width: "100%", // Ensure the container spans full width
                display: "flex", // Enable flexbox
                justifyContent: "space-between", // Add space between the buttons
                marginTop: 2, // Add some space from the text field
              }}
            >
              <Button
                disabled={!error} // Disable the button when promo code is invalid
                variant="contained"
                sx={{
                  backgroundColor: "#fb9017", // Set the color to #fb9017
                  width: "40%", // Make the buttons take about half the container's width
                  padding: "12px", // Increase the padding for bigger buttons
                  fontSize: "1rem", // Adjust the font size for better readability
                  fontWeight: "bold", // Make the text bold
                }}
                onClick={handleCancel} // Assuming you have a `handleCancel` function
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                disabled={error} // Disable the button when promo code is invalid
                sx={{
                  
                  backgroundColor: "#fb9017", // Set the color to #fb9017
                  width: "40%", // Same width as the Cancel button
                  padding: "12px", // Increase the padding for bigger buttons
                  fontSize: "1rem", // Adjust the font size for better readability
                  fontWeight: "bold", // Make the text bold
                }}
                onClick={handleRedeem} // Assuming you have a `handleRedeem` function
              >
                Redeem
              </Button>
            </Box>
          </Box>
        </Box>
        <AddressManager
          addresses={addresses}
          onAddressSelect={handleAddressSelect}
          onAddNewAddress={handleAddNewAddress}
        />
        <Button
          variant="contained"
          color="primary"
          sx={styles.checkoutButton}
          onClick={handleCkeckoutClick}
        >
          Proceed to Checkout
        </Button>
        <Elements stripe={stripePromise}>
       {isPaymentPopupOpen&& <PaymentPopup
          open={handleCkeckoutClick}
          onClose={() => setIsPaymentPopupOpen(false)}
          checkoutCart={checkoutCart}
          amount={totalCost}
          user={user}
        />}
         </Elements>
      </Container>

      <Modal open={isReviewFormOpen} onClose={() => setIsReviewFormOpen(false)}>
        <Box sx={styles.modalContent}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Leave a Review
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Product ID: {selectedItemId}
          </Typography>
          <Button
            variant="contained"
            onClick={() => setIsReviewFormOpen(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

const styles = {
  cartContainer: {
    padding: "40px 20px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    marginTop: "40px",
    marginBottom: "40px",
  },
  cartTitle: {
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#FF683C",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  productCard: {
    marginBottom: "20px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
    borderRadius: "8px",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
    },
  },
  cardContent: {
    padding: "20px",
  },
  productName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  productDescription: {
    fontSize: "14px",
    color: "#666",
    margin: "10px 0",
  },
  productPrice: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#004c74",
    marginTop: "10px",
  },
  productQuantity: {
    fontSize: "14px",
    color: "#666",
    marginTop: "5px",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#f9f9f9",
    borderTop: "1px solid #eee",
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
  },
  quantity: {
    margin: "0 10px",
    fontSize: "16px",
  },
  removeButton: {
    color: "#d32f2f",
  },
  reviewButton: {
    color: "#1976d2",
  },
  emptyCart: {
    textAlign: "center",
    fontSize: "18px",
    color: "#666",
    padding: "40px 0",
  },
  totalCost: {
    textAlign: "right",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "2px solid #eee",
  },
  checkoutButton: {
    width: "100%",
    padding: "15px",
    fontSize: "18px",
    marginTop: "20px",
    backgroundColor: "#FF683C",
    "&:hover": {
      backgroundColor: "#e55a2f",
    },
  },
  modalContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
  },
};

export default CartComponent;
