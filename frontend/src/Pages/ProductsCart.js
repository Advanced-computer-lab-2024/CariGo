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
  Collapse,
  Paper,
  Alert,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import TouristNavBar from "./Tourist/components/TouristNavBar";
import TouristSideBar from "./Tourist/components/TouristSideBar";

import AddressManager from "../components/AdressManager.jsx";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentPopup from "./PaymentPopup";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

import PropTypes from "prop-types";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
  LocationOn as LocationOnIcon,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import productImage2 from "./image/product.png";

const stripePromise = loadStripe(
  "pk_test_51QLoL4AkXvwFjwTIX8acMj27pC8YxdOhmoUzn0wbUhej1xUFgFlfgYtXRGmggbKUI6Yfpxz08i9shcsfszv6y9iP0007q608Ny"
); // Publishable key
const folderPics = `http://localhost:4000/public/img/products/`;
const API_BASE_URL = "http://localhost:4000/cariGo";

const CartComponent = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [promoCodeError, setPromoCodeError] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const [error, setError] = React.useState(false);
  const [discount, SetDiscount] = React.useState(100);
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
  }, [cartItems, discount]);

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
      setUser(data);
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
    let priceAfterDiscount = total * (1 - discount / 100);
    if (priceAfterDiscount == 0) priceAfterDiscount = total;
    setBasePrice(total);
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
          paymentAmount: totalCost,
          PaymentMethod: PaymentMethod,
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
      navigate("/Tourist/orders");
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
        setPromoCodeError(""); // Clear any previous error
      }
    } catch (err) {
      console.error("Error redeeming promo code:", err);
      setError(false); // Show error if promo code is invalid
      setPromoCodeError("Invalid promo code. Please try again.");
      SetDiscount(100);
    }
  };
  const handleCancel = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
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
        setPromoCode(""); // Reset the text field value
      }
    } catch (err) {
      console.error("Error redeeming promo code:", err);
      setError(true); // Show error if promo code is invalid
      alert("Invalid promo code");
      SetDiscount(100);
    }
  };

  return (
    <Box
      sx={{ display: "flex", backgroundColor: "#f9f9f9", minHeight: "100vh" }}
    >
      <Box>
        {" "}
        <TouristSideBar />{" "}
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: "80px",
          marginTop: "64px",
          padding: "16px",
        }}
      >
        <TouristNavBar />

        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" sx={styles.pageTitle}>
            Shopping Cart
          </Typography>

          {/* Main Content Grid */}
          <Grid container spacing={3}>
            {/* Cart Items Section */}
            <Grid item xs={12} md={8}>
              {/* Address Selection */}
              <Box sx={styles.addressSelection}>
                <AddressManager
                  addresses={addresses}
                  onAddressSelect={handleAddressSelect}
                  onAddNewAddress={handleAddNewAddress}
                />
              </Box>

              {/* Cart Items */}
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <Card key={item.productId._id} sx={styles.productCard}>
                    <CardContent>
                      <Grid container spacing={2}>
                        {/* Product Image */}
                        <Grid item xs={3}>
                          <Box
                            component="img"
                            src={
                              item.productId.mainImage
                                ? folderPics + item.productId.mainImage
                                : productImage2
                            }
                            alt={item.productId.name}
                            sx={styles.productImage}
                          />
                        </Grid>

                        {/* Product Details */}
                        <Grid item xs={9}>
                          <Box sx={styles.productDetails}>
                            <Typography variant="h6" sx={styles.productName}>
                              {item.productId.name}
                            </Typography>
                            <Typography sx={styles.productDescription}>
                              {item.productId.description}
                            </Typography>

                            {/* Price and Quantity Controls */}
                            <Box sx={styles.priceQuantityContainer}>
                              <Box sx={styles.quantityControl}>
                                <IconButton
                                  onClick={() =>
                                    updateQuantity(item.productId._id, -1)
                                  }
                                  sx={styles.quantityButton}
                                >
                                  {item.quantity === 1 ? (
                                    <DeleteIcon />
                                  ) : (
                                    <RemoveIcon />
                                  )}
                                </IconButton>
                                <Typography sx={styles.quantity}>
                                  {item.quantity}
                                </Typography>
                                <IconButton
                                  onClick={() =>
                                    updateQuantity(item.productId._id, 1)
                                  }
                                  sx={styles.quantityButton}
                                >
                                  <AddIcon />
                                </IconButton>
                              </Box>
                              <Typography sx={styles.productPrice}>
                                $
                                {(
                                  item.productId.price * conversionRate
                                ).toFixed(2)}{" "}
                                {code}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography sx={styles.emptyCart}>
                  Your cart is empty.
                </Typography>
              )}
            </Grid>

            {/* Order Summary Section */}
            <Grid item xs={12} md={4}>
              <Card sx={styles.summaryCard}>
                <CardContent>
                  <Typography variant="h6" sx={styles.summaryTitle}>
                    Order Summary
                  </Typography>

                  <Box sx={styles.summaryRow}>
                    <Typography>Original Price</Typography>
                    <Typography>
                      ${(basePrice * conversionRate).toFixed(2)}
                    </Typography>
                  </Box>

                  {error && (
                    <Box sx={styles.summaryRow}>
                      <Typography color="success.main">Savings</Typography>
                      <Typography color="success.main">
                        -$
                        {(
                          basePrice *
                          conversionRate *
                          (discount / 100)
                        ).toFixed(2)}
                      </Typography>
                    </Box>
                  )}

                  <Box sx={styles.divider} />

                  <Box sx={styles.summaryRow}>
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6">
                      ${(totalCost * conversionRate).toFixed(2)}
                    </Typography>
                  </Box>

                  {/* Promo Code Section */}
                  <Box sx={styles.promoSection}>
                    <Button
                      onClick={() => setIsExpanded(!isExpanded)}
                      sx={styles.promoButton}
                    >
                      {isExpanded ? "Hide" : "Add"} promo code
                      {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </Button>

                    <Collapse in={isExpanded}>
                      <Box sx={styles.promoContent}>
                        {!error ? (
                          <Box sx={styles.promoInputContainer}>
                            <TextField
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              placeholder="Enter promo code"
                              variant="outlined"
                              fullWidth
                              error={!!promoCodeError}
                              helperText={promoCodeError}
                              sx={styles.promoInput}
                            />
                            <Button
                              variant="contained"
                              onClick={handleRedeem}
                              sx={styles.applyButton}
                            >
                              Apply
                            </Button>
                          </Box>
                        ) : (
                          <Paper sx={styles.appliedPromo}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <CheckCircleIcon color="success" />
                              <Box>
                                <Typography variant="subtitle2">
                                  {promoCode} applied
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {((discount / 100) * 100).toFixed(0)}% off
                                </Typography>
                              </Box>
                            </Box>
                            <IconButton
                              onClick={handleCancel}
                              size="small"
                              sx={styles.removePromoButton}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Paper>
                        )}
                      </Box>
                    </Collapse>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleCkeckoutClick}
                    sx={styles.checkoutButton}
                  >
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Payment Popup */}
        <Elements stripe={stripePromise}>
          {isPaymentPopupOpen && (
            <PaymentPopup
              open={handleCkeckoutClick}
              onClose={() => setIsPaymentPopupOpen(false)}
              checkoutCart={checkoutCart}
              amount={totalCost}
              user={user}
            />
          )}
        </Elements>
      </Box>{" "}
    </Box>
  );
};

const styles = {
  pageTitle: {
    color: "#004e89",
    mb: 4,
    fontWeight: 500,
  },
  addressSelection: {
    mb: 3,
    p: 2,
    backgroundColor: "#f7e1c6",
    borderRadius: 1,
    display: "flex",
    gap: 2,
    alignItems: "center",
  },
  addressSelect: {
    color: "#004e89",
    backgroundColor: "white",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1a659e",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#004e89",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ff6b36",
    },
    "& .MuiSvgIcon-root": {
      color: "#1a659e",
    },
  },
  newAddressButton: {
    backgroundColor: "#ff6b36",
    color: "white",
    "&:hover": {
      backgroundColor: "#e55a2f",
    },
  },
  productCard: {
    mb: 2,
    backgroundColor: "#f7e1c6",
    color: "#004e89",
    border: "1px solid rgba(26, 101, 158, 0.12)",
  },
  productImage: {
    width: "100%",
    height: "auto",
    borderRadius: 1,
    backgroundColor: "white",
  },
  productDetails: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  productName: {
    color: "#004e89",
    mb: 1,
  },
  productDescription: {
    color: "#1a659e",
    mb: 2,
  },
  priceQuantityContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mt: "auto",
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  quantityButton: {
    color: "#1a659e",
    "&:hover": {
      backgroundColor: "rgba(26, 101, 158, 0.08)",
    },
  },
  quantity: {
    color: "#004e89",
    mx: 2,
  },
  productPrice: {
    color: "#ff6b36",
    fontWeight: "bold",
  },
  summaryCard: {
    backgroundColor: "#f7e1c6",
    color: "#004e89",
    position: "sticky",
    top: 24,
  },
  summaryTitle: {
    mb: 3,
    color: "#004e89",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    mb: 2,
  },
  divider: {
    my: 2,
    height: "1px",
    backgroundColor: "rgba(26, 101, 158, 0.12)",
  },
  promoSection: {
    mt: 3,
    mb: 3,
  },
  promoButton: {
    color: "#ff6b36",
    textTransform: "none",
    p: 0,
    "&:hover": {
      backgroundColor: "transparent",
      opacity: 0.8,
    },
  },
  promoContent: {
    mt: 2,
  },
  promoInputContainer: {
    display: "flex",
    gap: 1,
  },
  promoInput: {
    flex: 1,
    "& .MuiOutlinedInput-root": {
      color: "#004e89",
      backgroundColor: "white",
      "& fieldset": {
        borderColor: "#1a659e",
      },
      "&:hover fieldset": {
        borderColor: "#004e89",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ff6b36",
      },
    },
    "& .MuiFormHelperText-root": {
      color: "#ff1744",
    },
  },
  applyButton: {
    backgroundColor: "#ff6b36",
    color: "white",
    "&:hover": {
      backgroundColor: "#e55a2f",
    },
  },
  appliedPromo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: 1,
    backgroundColor: "rgba(76, 175, 80, 0.08)",
    border: "1px solid #4caf50",
  },
  removePromoButton: {
    color: "#ff1744",
    "&:hover": {
      backgroundColor: "rgba(255, 23, 68, 0.08)",
    },
  },
  checkoutButton: {
    mt: 3,
    backgroundColor: "#ff6b36",
    color: "white",
    "&:hover": {
      backgroundColor: "#e55a2f",
    },
  },
  dialogPaper: {
    backgroundColor: "#f7e1c6",
    color: "#004e89",
  },
  dialogInput: {
    "& .MuiOutlinedInput-root": {
      color: "#004e89",
      backgroundColor: "white",
      "& fieldset": {
        borderColor: "#1a659e",
      },
      "&:hover fieldset": {
        borderColor: "#004e89",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ff6b36",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#1a659e",
    },
  },
  dialogButton: {
    color: "#004e89",
  },
};

export default CartComponent;
