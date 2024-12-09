import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper,
  Divider
} from '@mui/material';
import { styled } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: '#104C64',
}));

const TourGuideInfo = ({ userName, email, yearsOfExperience, previous_work, mobileNumber }) => {
  return (
    <StyledPaper elevation={1}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0D1D25', fontWeight: 'bold' }}>
        {userName}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ color: '#104C64', marginBottom: 2 }}>
        Tour Guide
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InfoItem>
            <IconWrapper>
              <EmailIcon />
            </IconWrapper>
            <Typography variant="body2">{email}</Typography>
          </InfoItem>
          <InfoItem>
            <IconWrapper>
              <PhoneIcon />
            </IconWrapper>
            <Typography variant="body2">{mobileNumber}</Typography>
          </InfoItem>
          <InfoItem>
            <IconWrapper>
              <WorkIcon />
            </IconWrapper>
            <Typography variant="body2">{yearsOfExperience} years of experience</Typography>
          </InfoItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InfoItem>
            <IconWrapper>
              <PersonIcon />
            </IconWrapper>
            <Typography variant="body2">Tour Guide</Typography>
          </InfoItem>
          <InfoItem>
            <IconWrapper>
              <StarIcon />
            </IconWrapper>
            <Typography variant="body2">Expert Guide</Typography>
          </InfoItem>
          {/* <InfoItem>
            <IconWrapper>
              <HistoryIcon />
            </IconWrapper>
            <Typography variant="body2">Previous Work</Typography>
          </InfoItem> */}
        </Grid>
      </Grid>
      <Box mt={2}>
        <Typography variant="body2" sx={{ color: '#104C64', fontWeight: 'bold', marginBottom: 1 }}>
          Previous Work:
        </Typography>
        {previous_work ? (
          <Typography variant="body2">
            {Array.isArray(previous_work) ? previous_work.join(', ') : previous_work}
          </Typography>
        ) : (
          <Typography variant="body2">No previous work available.</Typography>
        )}
      </Box>
    </StyledPaper>
  );
};

export default TourGuideInfo;

