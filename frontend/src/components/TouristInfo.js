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
import PublicIcon from '@mui/icons-material/Public';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
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

const TouristInfo = ({ userName, email, role, mobile, nationality, job, wallet }) => {
  return (
    <StyledPaper elevation={1}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0D1D25', fontWeight: 'bold' }}>
        {userName}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ color: '#104C64', marginBottom: 2 }}>
        {role}
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
            <Typography variant="body2">{mobile}</Typography>
          </InfoItem>
          <InfoItem>
            <IconWrapper>
              <PublicIcon />
            </IconWrapper>
            <Typography variant="body2">{nationality}</Typography>
          </InfoItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InfoItem>
            <IconWrapper>
              <WorkIcon />
            </IconWrapper>
            <Typography variant="body2">{job}</Typography>
          </InfoItem>
          <InfoItem>
            <IconWrapper>
              <PersonIcon />
            </IconWrapper>
            <Typography variant="body2">{role}</Typography>
          </InfoItem>
          <InfoItem>
            <IconWrapper>
              <AccountBalanceWalletIcon />
            </IconWrapper>
            <Typography variant="body2">Wallet: {wallet}</Typography>
          </InfoItem>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default TouristInfo;

