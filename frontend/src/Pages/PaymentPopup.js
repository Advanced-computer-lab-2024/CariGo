import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
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
  Box
} from '@mui/material';

const PaymentPopup = ({user, open, onClose, checkoutCart, amount }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const stripe = useStripe();
  const elements = useElements();
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

        checkoutCart("card");//paymentMethod//card
      } catch (error) {
        console.error("Payment failed:", error);
      }
    }
    
    else if (paymentMethod === 'wallet') {
      // Placeholder for wallet payment logic
      if (user.wallet >= amount) {
        // Simulating API call to process wallet payment
        setTimeout(() => {
          checkoutCart("wallet");//paymentMethod//wallet
        }, 1000);
      } else {
        console.error("Insufficient wallet balance");
      }
    }
    
    else if (paymentMethod === 'cash') {
      // Placeholder for cash payment logic
      console.log("Processing cash on delivery payment...");
      // Simulating API call to process cash payment
      setTimeout(() => {
        console.log("Cash on delivery payment registered");
        checkoutCart("cash");//paymentMethod//cash
      }, 1000);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Select Payment Method</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <FormControlLabel value="card" control={<Radio />} label="Credit Card" />
            <FormControlLabel value="wallet" control={<Radio />} label="Wallet" />
            <FormControlLabel value="cash" control={<Radio />} label="Cash on Delivery" />
          </RadioGroup>
          
          {paymentMethod === 'card' && (
            <Box sx={{ mt: 2 }}>
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </Box>
          )}
          
          {paymentMethod === 'wallet' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                Wallet after purchase: ${(user.wallet - amount).toFixed(2)}
              </Typography>
              {user.wallet < amount && (
                <Typography variant="body2" color="error">
                  Insufficient balance. Please top up your wallet.
                </Typography>
              )}
            </Box>
          )}
          
          {paymentMethod === 'cash' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Cash will be collected upon delivery.
              </Typography>
            </Box>
          )}
          
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total Amount: ${amount.toFixed(2)}
          </Typography>
        </Box>
        <Button
          disabled={user.wallet < amount && paymentMethod === 'wallet'}
          variant="contained"
          color="primary"
          onClick={handlePayment}
          fullWidth
          sx={{ mt: 2 }}
        >
          {paymentMethod === 'cash' ? 'Place Order' : 'Pay Now'}
        </Button>
        <p style={{ color: "red" }} >please note any refunds done will be added to your wallet</p>
      </DialogContent>
    </Dialog>
  );
};

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

export default PaymentPopup;
