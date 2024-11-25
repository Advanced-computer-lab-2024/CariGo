import * as React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import SimCardRoundedIcon from "@mui/icons-material/SimCardRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import WalletIcon from "@mui/icons-material/AccountBalanceWalletRounded";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Card = styled(MuiCard)(({ theme }) => ({
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  width: "100%",
  "&:hover": {
    background:
      "linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)",
    borderColor: "primary.light",
    boxShadow: "0px 2px 8px hsla(0, 0%, 0%, 0.1)",
    ...theme.applyStyles("dark", {
      background:
        "linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)",
      borderColor: "primary.dark",
      boxShadow: "0px 1px 8px hsla(210, 100%, 25%, 0.5) ",
    }),
  },
  [theme.breakpoints.up("md")]: {
    flexGrow: 1,
    maxWidth: `calc(50% - ${theme.spacing(1)})`,
  },
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        borderColor: (theme.vars || theme).palette.primary.light,
        ...theme.applyStyles("dark", {
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));

const PaymentContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  height: 375,
  padding: theme.spacing(3),
  borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
  border: "1px solid ",
  borderColor: (theme.vars || theme).palette.divider,
  background:
    "linear-gradient(to bottom right, hsla(220, 35%, 97%, 0.3) 25%, hsla(220, 20%, 88%, 0.3) 100%)",
  boxShadow: "0px 4px 8px hsla(210, 0%, 0%, 0.05)",
  [theme.breakpoints.up("xs")]: {
    height: 300,
  },
  [theme.breakpoints.up("sm")]: {
    height: 350,
  },
  ...theme.applyStyles("dark", {
    background:
      "linear-gradient(to right bottom, hsla(220, 30%, 6%, 0.2) 25%, hsla(220, 20%, 25%, 0.2) 100%)",
    boxShadow: "0px 4px 8px hsl(220, 35%, 0%)",
  }),
}));

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function Component({
  userDetails,
  paymentTotal,
  onPaymentDetailsChange,
  clientSecret, // Receive clientSecret
  setIsPaymentCompleted
}) {
  const [PaymentCompleted, setPaymentCompleted] = React.useState(false);
  const stripe = useStripe(); // Get the Stripe instance from the context
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Retrieve card information
    const cardElement = elements.getElement(CardElement);

    if (!stripe || !cardElement) {
      console.error("Stripe has not loaded");
      return;
    }
    // Call the confirmPayment function with the necessary details

    // Use the cardElement directly
    const { paymentMethod, error: paymentMethodError } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
    if (paymentMethodError) {
      console.error(
        "Error creating payment method:",
        paymentMethodError.message
      );
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
      setIsPaymentCompleted(true);
      setPaymentCompleted(true);
    }
  };

  const [paymentType, setPaymentType] = React.useState("creditCard");
  const userWallet = userDetails.wallet;
  const bookingPayment = paymentTotal;
  const conversionRate = localStorage.getItem("conversionRate") || 1;
  const code = localStorage.getItem("currencyCode") || "EGP";
  const walletAfterPurchase = (
    userWallet * conversionRate -
    bookingPayment * conversionRate
  ).toFixed(2);

  const handlePaymentTypeChange = (event) => {
    const newPaymentType = event.target.value;
    setPaymentType(newPaymentType);
    onPaymentDetailsChange({ paymentMethod: newPaymentType });
  };

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="Payment options"
          name="paymentType"
          value={paymentType}
          onChange={handlePaymentTypeChange}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Card selected={paymentType === "creditCard"}>
            <CardActionArea
              onClick={() =>
                handlePaymentTypeChange({ target: { value: "creditCard" } })
              }
              sx={{
                ".MuiCardActionArea-focusHighlight": {
                  backgroundColor: "transparent",
                },
                "&:focus-visible": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <CreditCardRoundedIcon
                  fontSize="small"
                  sx={[
                    (theme) => ({
                      color: "grey.400",
                      ...(theme.palette.mode === "dark" && {
                        color: "grey.600",
                      }),
                    }),
                    paymentType === "creditCard" && {
                      color: "primary.main",
                    },
                  ]}
                />
                <Typography sx={{ fontWeight: "medium" }}>Card</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card selected={paymentType === "wallet"}>
            <CardActionArea
              onClick={() =>
                !PaymentCompleted&&handlePaymentTypeChange({ target: { value: "wallet" } })
              }
              sx={{
                ".MuiCardActionArea-focusHighlight": {
                  backgroundColor: "transparent",
                },
                "&:focus-visible": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <WalletIcon
                  fontSize="small"
                  sx={[
                    (theme) => ({
                      color: "grey.400",
                      ...(theme.palette.mode === "dark" && {
                        color: "grey.600",
                      }),
                    }),
                    paymentType === "wallet" && {
                      color: "primary.main",
                    },
                  ]}
                />
                <Typography sx={{ fontWeight: "medium" }}>Wallet</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </RadioGroup>
      </FormControl>
      {paymentType === "creditCard" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <PaymentContainer>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle2">Credit card</Typography>
              <CreditCardRoundedIcon sx={{ color: "text.secondary" }} />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: 2,
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel required htmlFor="card-element">
                  Card details
                </FormLabel>
                <Box
                  id="card-element"
                  sx={{
                    padding: 2,
                    border: "1px solid",
                    borderColor: "grey.400",
                    borderRadius: 1,
                    "&:hover": {
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <CardElement
                    options={{
                      style: {
                        base: {
                          color: "#FFFFFF",
                          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                          fontSize: "16px",
                          "::placeholder": { color: "#aab7c4" },
                        },
                        invalid: { color: "#fa755a" },
                      },
                    }}
                  />
                </Box>
              </FormGrid>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={!stripe || PaymentCompleted}
                style={{
                  padding: "8px 16px",
                  backgroundColor:
                    !stripe || PaymentCompleted ? "#B0BEC5" : "#1976d2", // Gray when disabled
                  color: !stripe || PaymentCompleted ? "#ECEFF1" : "#fff", // Lighter text color when disabled
                  cursor:
                    !stripe || PaymentCompleted ? "not-allowed" : "pointer", // Show 'not-allowed' cursor when disabled
                  border: "none",
                  borderRadius: "4px",
                  transition: "background-color 0.3s ease", // Smooth color transition
                }}
              >
                Pay
              </button>
            </Box>
          </PaymentContainer>
        </Box>
      )}
      {paymentType === "wallet" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Alert severity="warning" icon={<WarningRoundedIcon />}>
            Choosing this payment method will remove the booking price from your
            wallet.
          </Alert>
          <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
            Wallet
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Wallet after purchase:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              {`${walletAfterPurchase} \u00A0\u00A0\u00A0 ${code}`}
            </Typography>
          </Box>
        </Box>
      )}
    </Stack>
  );
}
