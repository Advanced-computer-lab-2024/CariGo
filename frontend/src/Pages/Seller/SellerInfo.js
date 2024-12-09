import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import DescriptionIcon from '@mui/icons-material/Description';

const SellerInfo = ({ userName, email, description, mobileNumber }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3, backgroundColor: 'background.paper' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom color="primary.main">
            {userName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display="flex" alignItems="center" mb={2}>
            <EmailIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1">{email}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <PhoneIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1">{mobileNumber}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display="flex" alignItems="flex-start">
            <DescriptionIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
            <Typography variant="body1">{description}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SellerInfo;

