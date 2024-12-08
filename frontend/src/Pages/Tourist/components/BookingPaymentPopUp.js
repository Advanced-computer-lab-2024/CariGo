import React, { useState,useEffect } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import axios from "axios";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  TextField,
  Box,
  styled,
  IconButton,
  Collapse,
  FormGroup,
  Checkbox,
  Paper,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  AccountBalanceWallet as WalletIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  KeyboardArrowDown,
  KeyboardArrowUp,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { CardElement } from '@stripe/react-stripe-js';

  
  const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      backgroundColor: '#f7e1c6',
      borderRadius: '12px',
      maxWidth: '500px',
      width: '100%',
    },
  }));
  
  const PaymentMethodToggle = styled(Box)({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1px',
    backgroundColor: '#f7c59f',
    borderRadius: '8px',
    padding: '4px',
    marginBottom: '24px',
  });
  
  const ToggleButton = styled(Button)(({ active }) => ({
    backgroundColor: active ? '#ff6b36' : 'transparent',
    color: active ? 'white' : '#1a659e',
    '&:hover': {
      backgroundColor: active ? '#e55a2f' : 'rgba(26, 101, 158, 0.08)',
    },
  }));
  

const BookingPaymentPopUp = ({ open, onClose, amount,checkoutCart,user, itineraryName ,startDate ,endDate }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [ticketCount, setTicketCount] = useState(1);
  const [isPromoExpanded, setIsPromoExpanded] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeError, setPromoCodeError] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  // const [totalCost, setTotalCost] = useState(0);

  const basePrice = amount;
  const totalPrice = (basePrice * ticketCount) * (1 - discount/100);


  const handleTicketChange = (change) => {
    const newCount = ticketCount + change;
    if (newCount >= 1) {
      setTicketCount(newCount);
    }
  };

  const handleRedeem = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        "http://localhost:4000/cariGo/Event/redeemPromoCode",
        { code: promoCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setDiscount(response.data.discount);
        setIsPromoApplied(true);
        setPromoCodeError('');
      }
    } catch (err) {
      setPromoCodeError("Invalid promo code");
      setDiscount(0);
      setIsPromoApplied(false);
    }
  };

  const handleCancelPromo = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) throw new Error("No token found");

      await axios.post(
        "http://localhost:4000/cariGo/Event/cancelPromoCode",
        { code: promoCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDiscount(0);
      setPromoCode('');
      setIsPromoApplied(false);
    } catch (err) {
      console.error("Error canceling promo code:", err);
    }
  };

  const handlePayment = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("User is not logged in.");
      return;
    }
    if (paymentMethod === 'card') {
      if (!stripe || !elements) {
        console.error("Stripe has not loaded");
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        console.error("Card Element not found");
        return;
      }

      const form = await axios.post(
        'http://localhost:4000/cariGo/Event/create_payment_form',
        {
          amount: amount, // Request body
          currency: 'usd',
        },
        {
          headers: {
            "Content-Type": "application/json", // Correct headers
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(!form.data){
        throw new Error("got no response");
      }
      const clientSecret = (form.data.clientSecret); // Update state

      try {
        const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (paymentMethodError) {
          console.error("Error creating payment method:", paymentMethodError.message);
          return;
        }

        const { paymentIntent, error } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: paymentMethod.id,
          }
        );
          
        if (error) {
          console.error("Payment failed:", error.message);
        } else if (paymentIntent) {
          console.log("Payment successful:", paymentIntent);
          alert("Payment successful!");
        }

        checkoutCart("Card",totalPrice,ticketCount);//TotalPrice,NumberOfTickets
      } catch (error) {
        console.error("Payment failed:", error);
      }
    }
    
    else if (paymentMethod === 'wallet') {
      // Placeholder for wallet payment logic
      if (user.wallet >= amount) {
        // Simulating API call to process wallet payment
        setTimeout(() => {
          checkoutCart("Wallet",totalPrice,ticketCount);//TotalPrice,NumberOfTickets
        }, 1000);
      } else {
        console.error("Insufficient wallet balance");
      }
    }
    
    onClose();
  };
  const conversionRate = localStorage.getItem("conversionRate") || 1;
  const code = localStorage.getItem("currencyCode") || "EGP";
  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ borderBottom: '1px solid rgba(26, 101, 158, 0.12)' }}>
        <PaymentMethodToggle>
          <ToggleButton
            active={paymentMethod === 'card'}
            onClick={() => setPaymentMethod('card')}
          >
            <CreditCardIcon sx={{ mr: 1 }} /> Card
          </ToggleButton>
          <ToggleButton
            active={paymentMethod === 'wallet'}
            onClick={() => setPaymentMethod('wallet')}
          >
            <WalletIcon sx={{ mr: 1 }} /> Wallet
          </ToggleButton>
        </PaymentMethodToggle>
      </DialogTitle>

      <DialogContent>
        {/* Itinerary Details */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#004e89', mb: 1 }}>
            {itineraryName}
          </Typography>
          <Typography variant="body2" sx={{ color: '#1a659e' }}>
            {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
          </Typography>
        </Box>

        {/* Ticket Quantity */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3,
          p: 2,
          backgroundColor: 'white',
          borderRadius: '8px'
        }}>
          <Typography sx={{ color: '#004e89' }}>
            Price per ticket: ${basePrice}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              onClick={() => handleTicketChange(-1)}
              disabled={ticketCount <= 1}
              sx={{ color: '#1a659e' }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ color: '#004e89', mx: 2 }}>
              {ticketCount}
            </Typography>
            <IconButton 
              onClick={() => handleTicketChange(1)}
              sx={{ color: '#1a659e' }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Promo Code Section */}
        <Box sx={{ mb: 3 }}>
          <Button
            onClick={() => setIsPromoExpanded(!isPromoExpanded)}
            sx={{
              color: '#ff6b36',
              textTransform: 'none',
              p: 0,
              mb: 1,
              '&:hover': {
                backgroundColor: 'transparent',
                opacity: 0.8,
              },
            }}
          >
            {isPromoExpanded ? 'Hide' : 'Add'} promo code
            {isPromoExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </Button>
          
          <Collapse in={isPromoExpanded}>
            {!isPromoApplied ? (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  variant="outlined"
                  fullWidth
                  error={!!promoCodeError}
                  helperText={promoCodeError}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      '& fieldset': {
                        borderColor: '#1a659e',
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleRedeem}
                  sx={{
                    backgroundColor: '#ff6b36',
                    '&:hover': {
                      backgroundColor: '#e55a2f',
                    },
                    maxHeight: '55px',
                  }}
                >
                  Apply
                </Button>
              </Box>
            ) : (
              <Paper sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                backgroundColor: 'rgba(76, 175, 80, 0.08)',
                border: '1px solid #4caf50',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon color="success" />
                  <Box>
                    <Typography variant="subtitle2">
                      {promoCode} applied
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {discount}% off
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={handleCancelPromo}
                  size="small"
                  sx={{ color: '#ff1744' }}
                >
                  <CloseIcon />
                </IconButton>
              </Paper>
            )}
          </Collapse>
        </Box>

        {/* Payment Details */}
        {paymentMethod === 'card' ? (
          <Box sx={{
            backgroundColor: 'white',
            p: 2,
            borderRadius: '8px',
            mb: 3,
          }}>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </Box>
        ) : (
          <Box sx={{
            backgroundColor: 'white',
            p: 2,
            borderRadius: '8px',
            mb: 3,
          }}>
            <Typography variant="body2" sx={{ color: '#1a659e' }}>
              Current Balance: ${user.wallet.toFixed(2)}
            </Typography>
            <Typography variant="body2" sx={{ color: '#1a659e', mt: 1 }}>
              Balance after purchase: ${(user.wallet - totalPrice).toFixed(2)}
            </Typography>
            {user.wallet < totalPrice && (
              <Typography variant="body2" sx={{ color: '#ff6b36', mt: 1 }}>
                Insufficient balance. Please top up your wallet.
              </Typography>
            )}
          </Box>
        )}

        {/* Total Price */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 3,
          p: 2,
          backgroundColor: 'white',
          borderRadius: '8px'
        }}>
          <Typography variant="h6" sx={{ color: '#004e89' }}>
            Total Price
          </Typography>
          <Typography variant="h6" sx={{ color: '#ff6b36' }}>
            ${(totalPrice* conversionRate).toFixed(2)} {code}
          </Typography>
        </Box>

        {/* Terms Checkbox */}
        <FormGroup sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                sx={{
                  color: '#1a659e',
                  '&.Mui-checked': {
                    color: '#ff6b36',
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: '#1a659e' }}>
                Please note you won't be able to cancel booking before
                the booking start by 48 hours and in case of
                cancelation money is refunded to the wallet
              </Typography>
            }
          />
        </FormGroup>

        {/* Pay Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handlePayment}
          disabled={!agreedToTerms || (paymentMethod === 'wallet' && user.wallet < totalPrice)}
          sx={{
            backgroundColor: '#ff6b36',
            color: 'white',
            '&:hover': {
              backgroundColor: '#e55a2f',
            },
            '&:disabled': {
              backgroundColor: '#f7c59f',
              color: '#1a659e',
            },
          }}
        >
          Pay Now
        </Button>
      </DialogContent>
    </StyledDialog>
  );
};

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#004e89',
      '::placeholder': {
        color: '#1a659e',
      },
    },
    invalid: {
      color: '#ff6b36',
    },
  },
};


export default BookingPaymentPopUp;
