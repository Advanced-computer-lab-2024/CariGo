import React, { useEffect, useState } from 'react';
import { Tooltip, Avatar, Dialog, DialogContent, DialogTitle, Typography, Box, TextField, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import bronzeBadge from '../assets/bronze.png';
import silverBadge from '../assets/silver.png';
import goldBadge from '../assets/gold.png';
import axios from 'axios';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: '#F2F0EF',
    borderRadius: '16px',
    padding: theme.spacing(2),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#004e89',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#003666',
  },
  '&.Mui-disabled': {
    backgroundColor: '#cccccc',
    color: '#666666',
  },
}));

const UserBadge = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [badgeImage, setBadgeImage] = useState(bronzeBadge);
  const [open, setOpen] = useState(false);
  const [points, setPoints] = useState('');
  const [cash, setCash] = useState('');
  const token = localStorage.getItem("jwt");
  const conversionRate = localStorage.getItem("conversionRate") || 1;
  const code = localStorage.getItem("currencyCode") || "EGP";

  const handlePointsChange = (event) => {
    const pointsValue = event.target.value;
    setPoints(pointsValue);
    const calculatedCash = pointsValue ? (parseFloat(pointsValue) / 10).toFixed(2) : '';
    setCash(calculatedCash);
  };

  const handleRedeem = async () => {
    try {
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      await axios.patch(`http://localhost:4000/cariGo/users/RedeemPoints`, {
        numOfPoints: points,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Points redeemed successfully");
      setOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Failed to redeem points:', error.response ? error.response.data : error.message);
      alert(`An error occurred while redeeming points. Details: ${error.message},${error.response ? error.response.data.message : ''}`);
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/cariGo/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);

        if (data.level === 2) setBadgeImage(silverBadge);
        else if (data.level === 3) setBadgeImage(goldBadge);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userId, token]);

  if (!userData) return null;

  return (
    <>
      <Tooltip title={`Points: ${userData.loyaltyPoints}, Level: ${userData.level}`}>
        <Avatar
          alt="User Badge"
          src={badgeImage}
          sx={{ width: 40, height: 40, cursor: 'pointer' }}
          onClick={() => setOpen(true)}
        />
      </Tooltip>

      {/* <StyledDialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', color: '#004e89' }}>
          User Rewards
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar
              alt="Enlarged User Badge"
              src={badgeImage}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Typography variant="h6" sx={{ color: '#004e89' }}>
              Loyalty Points: {userData.loyaltyPoints}
            </Typography>
            <Typography variant="h6" sx={{ color: '#004e89' }}>
              Level: {userData.level}
            </Typography>
            <Typography variant="h6" sx={{ color: '#004e89' }}>
              Available Points: {userData.pointsAvailable}
            </Typography>
          </Box>
          
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              error
              id="points"
              label="Points to Redeem"
              value={points}
              onChange={handlePointsChange}
              type="number"
              fullWidth
            />
            <TextField
              error
              id="cash"
              label="Cash Equivalent"
              value={`${(cash * conversionRate).toFixed(2)} ${code}`}
              helperText={`10 points = ${conversionRate} ${code}`}
              disabled
              fullWidth
            />
          </Box>
          
          <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
            <StyledButton
              variant="contained"
              onClick={handleRedeem}
              disabled={points > userData.pointsAvailable}
            >
              $ Redeem
            </StyledButton>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Stack>
        </DialogContent>
      </StyledDialog> */}
      <StyledDialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
  <DialogTitle
    sx={{
      textAlign: 'center',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#004e89',
    }}
  >
    Redeem Points
  </DialogTitle>
  <DialogContent
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      fontSize: '1.1rem',
    }}
  >
    <Box display="flex" flexDirection="column" alignItems="center" mb={0}>
      <Avatar
        alt="Enlarged User Badge"
        src={badgeImage}
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#004e89' }}>
        Loyalty Points: {userData.loyaltyPoints}
      </Typography>
      {/* <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#004e89' }}>
        Level: {userData.level}
      </Typography> */}
      
    </Box>

    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
      mt={0}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#004e89'}}>
        Available Points: {userData.pointsAvailable}
      </Typography>

      <TextField
        error
        id="points"
        label="Points to Redeem"
        value={points}
        onChange={handlePointsChange}
        type="number"
        fullWidth
        InputLabelProps={{ style: { fontSize: '1rem', fontWeight: 'bold' } }}
        InputProps={{ style: { fontSize: '1rem' } }}
      />
      <TextField
        error
        id="cash"
        label="Cash Equivalent"
        value={`${(cash * conversionRate).toFixed(2)} ${code}`}
        helperText={`10 points = ${conversionRate} ${code}`}
        disabled
        fullWidth
        InputLabelProps={{ style: { fontSize: '1rem', fontWeight: 'bold' } }}
        InputProps={{ style: { fontSize: '1rem' } }}
        FormHelperTextProps={{ style: { fontSize: '0.9rem', fontWeight: 'bold', color: '#666' } }}
      />
    </Box>

    <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
    <Button
        variant="outlined"
        color="error"
        onClick={() => setOpen(false)}
        sx={{
          padding: '0.75rem 2rem',
          fontSize: '1rem',
          fontWeight: 'bold',
        }}
      >
        Cancel
      </Button>
      <StyledButton
        variant="contained"
        onClick={handleRedeem}
        disabled={points > userData.pointsAvailable}
        sx={{
          padding: '0.75rem 2rem',
          fontSize: '1rem',
          fontWeight: 'bold',
        }}
      >
        $ Redeem
      </StyledButton>
      
    </Stack>
  </DialogContent>
</StyledDialog>

    </>
  );
};

export default UserBadge;

