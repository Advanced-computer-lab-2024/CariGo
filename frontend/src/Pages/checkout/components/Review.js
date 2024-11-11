import * as React from "react";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Review({ orderData, activityDetails, totalPrice }) {
  const { quantity, paymentMethod, cardDetails } = orderData;
  const conversionRate = localStorage.getItem("conversionRate") || 1;
  return (
    
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
            ${(totalPrice*conversionRate).toFixed(2)}
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
            details
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body2">{activityDetails?.title}</Typography>
              <Typography variant="body2">{activityDetails?.description}</Typography>
              <Typography variant="body2">{activityDetails?.hotelName}</Typography>
              <Typography variant="body2">
                Date: {activityDetails?.start_date ? new Date(activityDetails.start_date).toLocaleDateString() :""}
              </Typography>
              <Typography variant="body2">
             {activityDetails?.date ?new Date(activityDetails?.date).toLocaleDateString() :""}
              </Typography>
              <Typography variant="body2">
                 {activityDetails?.offer?.checkInDate }
              </Typography>
              <Typography variant="body2">
                {activityDetails?.offer?.checkOutDate }
              </Typography>
              <Typography variant="body2">
             {activityDetails?.airlineName }
              </Typography>
              <Typography variant="body2">
             {activityDetails?.airlineName }
              </Typography>
              <Typography variant="body2">
             {activityDetails?.carType }
              </Typography>
              <Typography variant="body2">
             {activityDetails?.plateNumber }
              </Typography>

              <Typography variant="body2">
             {activityDetails?.departureLocation?.description }
              </Typography>
              <Typography variant="body2">
  {activityDetails?.departureTime?.hours && activityDetails?.departureTime?.minutes 
    ? `${activityDetails?.departureTime?.hours} :${activityDetails?.departureTime?.minutes}${activityDetails?.departureTime?.dayTime}`
    : ''}
</Typography>
              <Typography variant="body2">
             {activityDetails?.arrivalLocation?.description }
              </Typography>

              <Typography variant="body2">
  {activityDetails?.arrivalTime?.hours && activityDetails?.arrivalTime?.minutes 
    ? `${activityDetails?.arrivalTime?.hours} :${activityDetails?.arrivalTime?.minutes}${activityDetails?.arrivalTime?.dayTime}`
    : ''}
</Typography>
            </Grid>
          </Grid>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body2">Payment Method:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{paymentMethod}</Typography>
            </Grid>
            {paymentMethod === 'creditCard' && cardDetails && (
              <>
                <Grid item xs={6}>
                  <Typography variant="body2">Card holder:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{cardDetails.name || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Card number:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    {cardDetails.number ? `xxxx-xxxx-xxxx-${cardDetails.number.slice(-4)}` : 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Expiration date:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{cardDetails.expirationDate || 'N/A'}</Typography>
                </Grid>
              </>
            )}
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}