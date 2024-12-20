import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import QuantityForm from "./components/QuantityForm";
import Info from "./components/Info";
import InfoMobile from "./components/InfoMobile";
import PaymentForm from "./components/PaymentForm";
import Review from "./components/Review";
import AppTheme from "./theme/AppTheme";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo-no-background.png"; // Correct relative path
import Avatar from "@mui/material/Avatar";
import { useLocation } from 'react-router-dom';

import ColorModeIconDropdown from "./theme/ColorModeIconDropdown";
// import { STATES } from "mongoose";
const user = JSON.parse(localStorage.getItem("user"));

const steps = ["Ticket details", "Payment details", "Review your order"];

export default function ExtraServicesCheckout(props,) {
  const disableCustomTheme = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const [orderData, setOrderData] = React.useState({
    quantity: 1,
    paymentMethod: "creditCard",
    cardDetails: {},
  });
  const [activityDetails, setItemDetails] = React.useState(null);
  const [userDetails, setUser] = React.useState(null);
  const [totalPrice, setTotalPrice] = React.useState(0);

   // === Step 1: Add state for checkbox tracking ===
   const [isTermsChecked, setIsTermsChecked] = React.useState(false);
   const [discount,SetDiscount] = React.useState(100);
   const { state } = useLocation();
   const { type, id } = useParams();
   console.log(type);
  const hotel = type==="hotel"? state.hotel :"";
  const offer = type==="hotel" ? state.offer :"";
  const flight =type==="flight" ?state.flightData :"";
   // === Step 2: Checkbox change handler ===
   console.log(flight);
   console.log(totalPrice);
   const handleCheckboxChange = (event) => {
     setIsTermsChecked(event.target.checked);
   };


  const navigate = useNavigate();

  // React.useEffect(() => {
  //   fetchActivityDetails();
  //   fetchUser();
  // }, []);

  React.useEffect(() => {
    if (activityDetails ) {
      let price;
      if (type === "hotel") {
        price = offer.price.total
      } else {
        price = flight.price.total
      }
      let priceAfterDiscount = price *(1-(discount/100));
      if(priceAfterDiscount == 0)
        priceAfterDiscount = price;
      setTotalPrice((priceAfterDiscount * orderData.quantity).toFixed(2));
    }
  }, [orderData.quantity,discount]);

  React.useEffect(() => {
    // const fetchDetails = async () => {
    //   try {
    //     const endpoint =
    //       type === "activity"
    //         ? `http://localhost:4000/cariGo/activity/getOne/${id}`
    //         : `http://localhost:4000/cariGo/Event/readSingleItinerary/${id}`;

    //     // console.log(type);
 //       const response = await axios.get(endpoint);
        const details = type==="hotel" ?{hotelName :hotel.hotel.name ,offer :offer}: flight
        setItemDetails(details);

        // Calculate initial total price
        const basePrice = type === "hotel"
          ? offer.price.total
          : flight.price.total;
        setTotalPrice((basePrice * orderData.quantity).toFixed(2));
    //   } catch (err) {
    //     console.error("Error fetching details:", err);
    //   }
    // };

    fetchUser();
 //   fetchDetails();
  }, [type, id]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const id = jwtDecode(token).id;

      const response = await axios.get(
        `http://localhost:4000/cariGo/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const navigateToOrders = () => {
    navigate(
      type === "hotel"
        ? "/tourist/MyBookedHotels"
        : "/tourist/MyBookedFlights"
    );
  };
  const handlePlaceOrder = async () => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      let price;
      if (type === "hotel") {
        price = parseFloat(offer.price.total);
      } else {
        price = parseFloat(flight.price.total);
      }

      const endpoint =
        type === "hotel"
          ? `http://localhost:4000/cariGo/flights//BookHotel`
          : `http://localhost:4000/cariGo/flights//BookFlight`;

      const payload = type==="hotel" ? {
        PaymentMethod:
          orderData.paymentMethod === "creditCard" ? "Card" : "Wallet",
        TotalPrice: orderData.quantity * price,
        NumberOfTickets: orderData.quantity,
        hotelData : {
            hotelName: hotel.hotel.name,  // Replace with actual property you need
            offer: offer  // Assuming offer is a variable in your scope
          }
      } : {
        PaymentMethod:
          orderData.paymentMethod === "creditCard" ? "Card" : "Wallet",
        TotalPrice: orderData.quantity * price,
        NumberOfTickets: orderData.quantity,
        flightData : flight
      };

      const response = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        handleNext(); // Show success step
      }
    } catch (error) {
      console.error("Error during booking:", error);
      // setError(error.response?.data?.error || 'Booking failed');
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleQuantityChange = (quantity) => {
    setOrderData({ ...orderData, quantity });
  };

  const handlePaymentDetailsChange = (paymentDetails) => {
    setOrderData({
      ...orderData,
      ...paymentDetails,
      cardDetails: {
        ...orderData.cardDetails,
        ...paymentDetails.cardDetails,
      },
    });
  };

  const handlePaymentTypeChange = (paymentType) => {
    setOrderData({ ...orderData, paymentMethod: paymentType });
  };

  // === Step 3: Pass `isTermsChecked` and `handleCheckboxChange` to `QuantityForm` ===
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <QuantityForm
            quantity={orderData.quantity}
            onQuantityChange={handleQuantityChange}
            isTermsChecked={isTermsChecked}          // <--- Pass checkbox state
            onCheckboxChange={handleCheckboxChange}  // <--- Pass checkbox handler
          />
        );
      case 1:
        return (
          <PaymentForm
            userDetails={userDetails}
            paymentTotal={totalPrice}
            onPaymentDetailsChange={handlePaymentDetailsChange}
          />
        );
      case 2:
        return (
          <Review
            orderData={orderData}
            activityDetails={activityDetails}
            totalPrice={`${totalPrice}`}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
 
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Grid
        container
        sx={{
          height: {
            xs: "100%",
            sm: "calc(100dvh - var(--template-frame-height, 0px))",
          },
          mt: {
            xs: 4,
            sm: 0,
          },
        }}
      >
        
        <Grid
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 16,
            px: 10,
            gap: 4,
          }}
        >
          <Avatar
            alt="Logo"
            src={logoImage}
            sx={{ width: 80, height: 80, mr: 4 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Info
              SetDiscount={SetDiscount}
              totalPrice={`${totalPrice}`}
              activityDetails={activityDetails}
              type={type}
              quantity={orderData.quantity}
            />
          </Box>
        </Grid>
        <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "start",
            pt: { xs: 0, sm: 16 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { sm: "space-between", md: "flex-end" },
              alignItems: "center",
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexGrow: 1,
              }}
            >
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{ width: "100%", height: 40 }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{ ":first-child": { pl: 0 }, ":last-child": { pr: 0 } }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <Card sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">${totalPrice}</Typography>
              </div>
              <InfoMobile totalPrice={`$${totalPrice}`} />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
              maxHeight: "720px",
              gap: { xs: 5, md: "none" },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: "flex", md: "none" } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ":first-child": { pl: 0 },
                    ":last-child": { pr: 0 },
                    "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{
                      ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">🧳✈</Typography>
                <Typography variant="h5">Thank you for your order!</Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Your order number is
                  <strong>&nbsp;#140396</strong>. We have emailed your order
                  confirmation and cancelation is not available 48 hours after
                  booking .
                </Typography>
                <Button
                  variant="contained"
                  sx={{ alignSelf: "start", width: { xs: "100%", sm: "auto" } }}
                  onClick={navigateToOrders}
                >
                  Go to my orders
                </Button>
              </Stack>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box
                  sx={[
                    {
                      display: "flex",
                      flexDirection: { xs: "column-reverse", sm: "row" },
                      alignItems: "end",
                      flexGrow: 1,
                      gap: 1,
                      pb: { xs: 12, sm: 0 },
                      mt: { xs: 2, sm: 0 },
                      mb: "60px",
                    },
                    activeStep !== 0
                      ? { justifyContent: "space-between" }
                      : { justifyContent: "flex-end" },
                  ]}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{ display: { xs: "none", sm: "flex" } }}
                    >
                      Previous
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{ display: { xs: "flex", sm: "none" } }}
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    disabled={
                      (!isTermsChecked)||
                      activeStep === 1 &&
                      userDetails.wallet - totalPrice < 0 &&
                      orderData.paymentMethod === "wallet"
                    }
                    onClick={
                      activeStep === steps.length - 1
                        ? handlePlaceOrder
                        : handleNext
                    }
                    sx={{ width: { xs: "100%", sm: "fit-content" } }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
    </AppTheme>
  );
}
