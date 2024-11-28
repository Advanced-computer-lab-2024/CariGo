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
              width: "170%", // Ensure the container spans full width
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
                  width: "48%", // Make the buttons take about half the container's width
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
                  width: "48%", // Same width as the Cancel button
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
