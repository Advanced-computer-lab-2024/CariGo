import * as React from "react";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import axios from "axios";
function Info({ totalPrice = 0, activityDetails, quantity, SetDiscount }) {
  //const [totalPrice, totalPrice] = React.useState(0); // State to store the promo code input
  const conversionRate =
    parseFloat(localStorage.getItem("conversionRate")) || 1;
  const code = localStorage.getItem("currencyCode") || "EGP";

  const [error, setError] = React.useState(false);
  const [promoCode, setPromoCode] = React.useState(""); // State to store the promo code input
  const handleRedeem = async () => {
    
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
      console.log(promoCode);
      const response = await axios.get(
        "http://localhost:4000/cariGo/Event/getDiscount",
        {
          params: { code: promoCode }, // Pass promoCode in params
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Optional if token is needed
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
  return (
    <React.Fragment>
      <Stack spacing={2}>
        <List disablePadding>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={activityDetails?.title || "Activity"}
              secondary={`Quantity: ${quantity}`}
            />
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              ${(totalPrice * conversionRate).toFixed(2)} {` ${code}`}
            </Typography>
          </ListItem>
        </List>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "0",
            width: "60%", // Adjust the width to a reasonable size
          }}
        >
          <Typography gutterBottom>Redeem Promo Code</Typography>
          <Box
            sx={{
              width: "100%", // Adjust to ensure full width
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            <TextField
              error={!error} // Error styling applied when promo code is invalid
              id="outlined-error-helper-text"
              label="Promo Code"
              helperText={
                error ? "Promo code accepted" : "Please enter a valid code"
              }
              variant="outlined"
              onChange={(e) => setPromoCode(e.target.value)} // Update state on input change
              sx={{
                marginBottom: 1,
                textAlign: "center", // Center the default text
                "& .MuiInputLabel-root.Mui-focused": {
                  fontWeight: "bold", // Make label text bold when focused
                  color: "orange", // Change label text color to orange when focused
                },
              }}
              InputProps={{
                style: {
                  width: "165%", // Ensure the text field spans full width
                  textAlign: "center", // Center the text in the input field
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

            <Button
              variant="contained"
              color="primary"
              sx={{
                alignSelf: "flex-start", // Align the button to the left
                marginTop: 1, // Space between the text field and button
                width: "165%", // Make the button span the full width of the container
              }}
              onClick={handleRedeem}
            >
              Redeem
            </Button>
          </Box>
        </Box>
        <Divider />
        <Stack
          direction="column"
          divider={<Divider flexItem />}
          spacing={2}
          sx={{ my: 2 }}
        >
          <div>
            <Typography variant="subtitle2" gutterBottom>
              Details
            </Typography>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="body2">
                  {activityDetails?.title}
                </Typography>
                <Typography variant="body2">
                  {activityDetails?.description}
                </Typography>
                <Typography variant="body2">
                  {activityDetails?.hotelName}
                </Typography>
                <Typography variant="body2">
                  Date:{" "}
                  {activityDetails?.start_date
                    ? new Date(activityDetails.start_date).toLocaleDateString()
                    : ""}
                </Typography>
                <Typography variant="body2">
                  {activityDetails?.date
                    ? new Date(activityDetails?.date).toLocaleDateString()
                    : ""}
                </Typography>
                <Typography variant="body2">
                  {activityDetails?.offer?.checkInDate}
                </Typography>
                <Typography variant="body2">
                  {activityDetails?.offer?.checkOutDate}
                </Typography>
                <Typography variant="body2">
                  {activityDetails?.airline}
                </Typography>
                <Typography variant="body2">
                  {activityDetails?.airlineName}
                </Typography>
                <Typography variant="body2">
                  {activityDetails?.segments?.[0]?.departure?.airport}
                </Typography>
                <Typography variant="body2">
                  {activityDetails?.segments?.[0]?.departure?.time}
                </Typography>
                <Typography variant="body2">
                  {
                    activityDetails?.segments?.[
                      activityDetails.segments.length - 1
                    ]?.arrival?.airport
                  }
                </Typography>
                <Typography variant="body2">
                  {
                    activityDetails?.segments?.[
                      activityDetails.segments.length - 1
                    ]?.arrival?.time
                  }
                </Typography>
                <Typography variant="body2">
                  {activityDetails?.carType}
                </Typography>
                <Typography variant="body2">
                  {activityDetails?.plateNumber}
                </Typography>
                <Typography variant="body2">
                  {activityDetails?.departureLocation?.description}
                </Typography>
                <Typography variant="body2">
                  {activityDetails?.departureTime?.hours &&
                  activityDetails?.departureTime?.minutes
                    ? `${activityDetails?.departureTime?.hours}:${activityDetails?.departureTime?.minutes}${activityDetails?.departureTime?.dayTime}`
                    : ""}
                </Typography>
                <Typography variant="body2">
                  {activityDetails?.arrivalLocation?.description}
                </Typography>
                <Typography variant="body2">
                  {activityDetails?.arrivalTime?.hours &&
                  activityDetails?.arrivalTime?.minutes
                    ? `${activityDetails?.arrivalTime?.hours}:${activityDetails?.arrivalTime?.minutes}${activityDetails?.arrivalTime?.dayTime}`
                    : ""}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Stack>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  activityDetails: PropTypes.object.isRequired,
  type: PropTypes.string,
  paymentMethod: PropTypes.string,
  quantity: PropTypes.number,
};

export default Info;
