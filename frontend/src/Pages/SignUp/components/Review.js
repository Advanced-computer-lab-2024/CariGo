import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//import {Image, ScrollView, Text} from 'react-native';
function TermsAndConditions() {
  
  
  return (
    <div style={{
      height: '300px',      // Set a fixed height
      overflowY: 'scroll',  // Enable vertical scrolling
      border: '1px solid #ccc',
      padding: '10px'
    }}>
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
      <Typography variant="body1" paragraph>
        3. User Responsibilities:
        <ul>
          <li>Users must provide accurate and up-to-date information during registration and while planning trips.</li>
          <li>Users agree not to share their login credentials and are responsible for activities under their account.</li>
          <li>Misuse of the system, such as submitting false information, harassment of other users, or misuse of resources, is prohibited.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        4. Booking and Payment:
        <ul>
          <li>Our system provides information on trips, and where applicable, allows for the booking of accommodations, tours, or guides.</li>
          <li>Prices displayed are subject to change based on availability and seasonal variations.</li>
          <li>Full payment may be required to confirm bookings. Cancellation and refund policies may vary by booking and should be reviewed before payment.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        5. Cancellation and Refund Policy:
        <ul>
          <li>Users can cancel bookings in accordance with the provider's policy. Refunds are subject to provider terms and may include fees.</li>
          <li>The platform reserves the right to modify or cancel trips in case of unforeseen circumstances, including weather conditions, health risks, or other emergencies.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        6. User-Generated Content:
        <ul>
          <li>Users may post reviews, ratings, and feedback regarding their trips. This content must be respectful, truthful, and free from inappropriate or offensive language.</li>
          <li>The platform reserves the right to remove or modify user-generated content that violates guidelines or is deemed inappropriate.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        7. Personal Data and Privacy:
        <ul>
          <li>User information is collected and managed according to our Privacy Policy. By using the system, users consent to the collection and use of their data as described in the policy.</li>
          <li>Data will not be shared with third parties without user consent, except where legally required.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        8. System Reliability and Support:
        <ul>
          <li>While we strive to maintain continuous availability of the system, we do not guarantee uninterrupted access. Scheduled maintenance, system upgrades, or unforeseen technical issues may temporarily disrupt service.</li>
          <li>Users experiencing issues may contact customer support for assistance.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        9. Limitation of Liability:
        <ul>
          <li>The platform is not liable for any loss, injury, or inconvenience resulting from the use of the trip planner system or from any trip organized through it.</li>
          <li>We are not responsible for acts of third-party service providers or any direct or indirect damages arising from trip arrangements.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        10. Intellectual Property:
        <ul>
          <li>All content, including text, images, and system features, is the property of the trip planner system and protected by intellectual property laws.</li>
          <li>Users are not permitted to duplicate, distribute, or modify content without prior permission.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        11. Modification of Terms:
        <ul>
          <li>The platform reserves the right to update these terms at any time. Users will be notified of significant changes, and continued use of the system constitutes acceptance of revised terms.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        12. Governing Law:
        <ul>
          <li>These terms are governed by the laws of [Your Jurisdiction]. Any disputes arising from the use of the system will be settled in the courts of [Your Jurisdiction].</li>
        </ul>
      </Typography>
      
    </Container>
    </div>
  );
}

export default TermsAndConditions;