import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function TermsAndConditions() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Terms and Conditions
      </Typography>
      <Typography variant="body1" paragraph>
        1. Acceptance of Terms: By using our trip planner system, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please refrain from using the service.
      </Typography>
      <Typography variant="body1" paragraph>
        2. Eligibility: Only individuals who are at least 18 years of age can register and use this system. Minors must use the system under the supervision of an adult.
      </Typography>
      {/* Add more sections for each point in the terms and conditions */}
      <Button component={Link} to="/signup" variant="contained" color="primary" sx={{ mt: 2 }}>
        Back to Sign Up
      </Button>
    </Container>
  );
}

export default TermsAndConditions;