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

  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText 
            primary={activityDetails?.title || "Activity"} 
            secondary={`Quantity: ${quantity}`} 
          />
          {/* <Typography variant="body2">
            ${((activityDetails?.price || 0) * quantity).toFixed(2)}
          </Typography> */}
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalPrice}
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
            Activity details
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body2">{activityDetails?.title}</Typography>
              <Typography variant="body2">{activityDetails?.description}</Typography>
              <Typography variant="body2">
                Date: {activityDetails?.start_date ? new Date(activityDetails.start_date).toLocaleDateString() : 'N/A'}
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
                  <Typography variant="body2">{cardDetails.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Card number:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    {cardDetails.number ? `xxxx-xxxx-xxxx-${cardDetails.number.slice(-4)}` : 'N/A'}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}