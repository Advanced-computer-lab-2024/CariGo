import React from 'react';
import { Box, Typography } from '@mui/material';

const LoadingIndicator = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '200px', height: '200px' }}
      >
        <source src="/path/to/your/loading-animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Typography sx={{ mt: 2, color: '#666' }}>Loading results...</Typography>
    </Box>
  );
};

export default LoadingIndicator;

