import * as React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const products = [
  {
    name: 'Professional plan',
    desc: 'Monthly subscription',
    price: '$15.00',
  },
  {
    name: 'Dedicated support',
    desc: 'Included in the Professional plan',
    price: 'Free',
  },
  {
    name: 'Hardware',
    desc: 'Devices needed for development',
    price: '$69.99',
  },
  {
    name: 'Landing page template',
    desc: 'License',
    price: '$49.99',
  },
];


function Info({ totalPrice = 0, activityDetails, type }) {
  const conversionRate = parseFloat(localStorage.getItem("conversionRate")) || 1;
  const code = localStorage.getItem("currencyCode")||"EGP";

  // Clean totalPrice by removing non-numeric characters
  const cleanedTotalPrice = parseFloat(totalPrice.toString().replace(/[^0-9.]/g, ''));

  const newTotal = !isNaN(cleanedTotalPrice) && !isNaN(conversionRate)
    ? (cleanedTotalPrice * conversionRate).toFixed(2)
    : "0.00"; // Default display if `NaN`
    
  console.log("Cleaned Total Price:", cleanedTotalPrice);
  console.log("Conversion Rate:", conversionRate);
  console.log("New Total:", newTotal);

  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {newTotal}{"\u00A0\u00A0\u00A0"}{code}
      </Typography>
      <List disablePadding>
        <ListItem key={activityDetails?.title} sx={{ py: 1, px: 0 }}>
          <ListItemText
            sx={{ mr: 2 }}
            primary={activityDetails?.title}
            secondary={activityDetails?.description}
          />
          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
            {type === 'activity'
              ? (parseFloat(activityDetails?.price?.range?.min) * conversionRate || 0).toFixed(2)
              :type=="flight" ?(parseFloat(activityDetails?.price?.total) * conversionRate || 0).toFixed(2): 
              type=="hotel" ?(parseFloat(activityDetails?.offer?.price?.total) * conversionRate || 0).toFixed(2)  
               : (parseFloat(activityDetails?.price) * conversionRate || 0).toFixed(2)}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}



Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;