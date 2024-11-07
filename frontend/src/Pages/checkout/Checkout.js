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
import SitemarkIcon from "./components/SitemarkIcon";
import AppTheme from "./theme/AppTheme";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import ColorModeIconDropdown from "./theme/ColorModeIconDropdown";
const user = JSON.parse(localStorage.getItem("user"));


const steps = ["Ticket details", "Payment details", "Review your order"];

export default function Checkout(props, { activityId }) {
  const disableCustomTheme = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const [orderData, setOrderData] = React.useState({
    quantity: 1,
    paymentMethod: "creditCard",
    cardDetails: {},
  });
  const [activityDetails, setActivityDetails] = React.useState(null);
  const [userDetails, setUser] = React.useState(null);
  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    fetchActivityDetails();
    fetchUser();
  }, []);

  React.useEffect(() => {
    if (activityDetails && activityDetails.price && activityDetails.price.range) {
      const price = parseFloat(activityDetails.price.range.min);
      setTotalPrice((price * orderData.quantity).toFixed(2));
    }
  }, [activityDetails, orderData.quantity]);

  const fetchUser = async () => {

    try {
      // console.log('Fetching profile for userId:', userId); 
      
      const token = localStorage.getItem("jwt"); // or sessionStorage.getItem('jwt')
      const id = jwtDecode(token).id;
      // console.log("Token:", id); // Add token logging to verify
      
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.get(`http://localhost:4000/cariGo/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // console.log('Profile data received:', response.data); 
    } catch (err) {
      console.error('Error fetching profile:', err); 
    }
  };

  const fetchActivityDetails = async () => {
    try {
      const response = await fetch(`http://localhost:4000/cariGo/activity/getOne/67039d9b118f13afe8a28f6b`);
      const data = await response.json();
      setActivityDetails(data);
    } catch (error) {
      console.error("Error fetching activity details:", error);
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
    setOrderData({ ...orderData, ...paymentDetails });
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
      const response = await fetch('http://localhost:4000/cariGo/activity/BookActivity/67039d9b118f13afe8a28f6b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          activityId: activityDetails.id,
          quantity: orderData.quantity,
          paymentMethod: orderData.paymentMethod,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        handleNext();
      } else {
        console.error('Booking failed:', result.error);
      }
    } catch (error) {
      console.error('Error during booking:', error);
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <QuantityForm quantity={orderData.quantity} onQuantityChange={handleQuantityChange} />;
      case 1:
        return <PaymentForm  userDetails={userDetails} paymentTotal={totalPrice} onPaymentDetailsChange={handlePaymentDetailsChange}/>;
      case 2:
        return <Review orderData={orderData} activityDetails={activityDetails} totalPrice={`${totalPrice}`} />;
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
          <SitemarkIcon />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Info totalPrice={`$${totalPrice}`} activityDetails={activityDetails} />
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
                <Typography variant="body1">
                  ${totalPrice}
                </Typography>
              </div>
              <InfoMobile
                totalPrice={`$${totalPrice}`}
              />
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
                    onClick={activeStep === steps.length - 1 ? handlePlaceOrder : handleNext}
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