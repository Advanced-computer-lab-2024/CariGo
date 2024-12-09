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
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import BusinessIcon from '@mui/icons-material/Business';
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

const CompanyInfo = ({ companyName, email, role, hotline, website, about, description }) => {
  return (
    <StyledPaper elevation={1}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0D1D25', fontWeight: 'bold' }}>
        {companyName}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ color: '#104C64', marginBottom: 2 }}>
        {role || "No role assigned"}
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
            <Typography variant="body2">{hotline}</Typography>
          </InfoItem>
          <InfoItem>
            <IconWrapper>
              <LanguageIcon />
            </IconWrapper>
            <Typography variant="body2">
              <a href={website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                {website}
              </a>
            </Typography>
          </InfoItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InfoItem>
            <IconWrapper>
              <PersonIcon />
            </IconWrapper>
            <Typography variant="body2">{role || "No role assigned"}</Typography>
          </InfoItem>
          <InfoItem>
            <IconWrapper>
              <BusinessIcon />
            </IconWrapper>
            <Typography variant="body2">{about}</Typography>
          </InfoItem>
        </Grid>
      </Grid>
      <Box mt={3}>
        <Typography variant="h6" gutterBottom sx={{ color: '#0D1D25', fontWeight: 'bold' }}>
          About Us
        </Typography>
        <Typography variant="body2" paragraph>{description}</Typography>
      </Box>
    </StyledPaper>
  );
};

export default CompanyInfo;
