import * as React from "react";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

function Info({ totalPrice = 0, activityDetails, quantity }) {
  const conversionRate = parseFloat(localStorage.getItem("conversionRate")) || 1;
  const code = localStorage.getItem("currencyCode") || "EGP";

  const cleanedTotalPrice = parseFloat(totalPrice.toString().replace(/[^0-9.]/g, ""));
  const newTotal = !isNaN(cleanedTotalPrice) && !isNaN(conversionRate)
    ? (cleanedTotalPrice * conversionRate).toFixed(2)
    : "0.00";

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
              ${(cleanedTotalPrice * conversionRate).toFixed(2)} {` ${code}`}
            </Typography>
          </ListItem>
        </List>
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
                <Typography variant="body2">{activityDetails?.title}</Typography>
                <Typography variant="body2">{activityDetails?.description}</Typography>
                <Typography variant="body2">{activityDetails?.hotelName}</Typography>
                <Typography variant="body2">
                  Date: {activityDetails?.start_date ? new Date(activityDetails.start_date).toLocaleDateString() : ""}
                </Typography>
                <Typography variant="body2">
                  {activityDetails?.date ? new Date(activityDetails?.date).toLocaleDateString() : ""}
                </Typography>
                <Typography variant="body2">{activityDetails?.offer?.checkInDate}</Typography>
                <Typography variant="body2">{activityDetails?.offer?.checkOutDate}</Typography>
                <Typography variant="body2">{activityDetails?.airline}</Typography>
                <Typography variant="body2">{activityDetails?.airlineName}</Typography>
                <Typography variant="body2">{activityDetails?.segments?.[0]?.departure?.airport}</Typography>
                <Typography variant="body2">{activityDetails?.segments?.[0]?.departure?.time}</Typography>
                <Typography variant="body2">{activityDetails?.segments?.[activityDetails.segments.length - 1]?.arrival?.airport}</Typography>
                <Typography variant="body2">{activityDetails?.segments?.[activityDetails.segments.length - 1]?.arrival?.time}</Typography>
                <Typography variant="body2">{activityDetails?.carType}</Typography>
                <Typography variant="body2">{activityDetails?.plateNumber}</Typography>
                <Typography variant="body2">{activityDetails?.departureLocation?.description}</Typography>
                <Typography variant="body2">
                  {activityDetails?.departureTime?.hours && activityDetails?.departureTime?.minutes 
                    ? `${activityDetails?.departureTime?.hours}:${activityDetails?.departureTime?.minutes}${activityDetails?.departureTime?.dayTime}`
                    : ""}
                </Typography>
                <Typography variant="body2">{activityDetails?.arrivalLocation?.description}</Typography>
                <Typography variant="body2">
                  {activityDetails?.arrivalTime?.hours && activityDetails?.arrivalTime?.minutes 
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
  totalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  activityDetails: PropTypes.object.isRequired,
  type: PropTypes.string,
  paymentMethod: PropTypes.string,
  quantity: PropTypes.number,
};

export default Info;
