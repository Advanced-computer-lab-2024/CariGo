// UserBadge.js
import React, { useEffect, useState } from 'react';
import { Tooltip, Avatar, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import bronzeBadge from '../assets/bronze.png';
import silverBadge from '../assets/silver.png';
import goldBadge from '../assets/gold.png';


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';

const UserBadge = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [badgeImage, setBadgeImage] = useState(bronzeBadge); // Default to bronze
  const [open, setOpen] = useState(false); // State to control modal
  const token = localStorage.getItem("jwt");

  const [points, setPoints] = useState('');
  const [cash, setCash] = useState('');

  // Handle changes in the points field
  const handlePointsChange = (event) => {
    const pointsValue = event.target.value;
    setPoints(pointsValue);

    // Calculate cash as points / 1000 and update cash state
    const calculatedCash = pointsValue ? (parseFloat(pointsValue) / 10).toFixed(2) : '';
    setCash(calculatedCash);
  };

  const handleRedeem = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      await axios.patch(`http://localhost:4000/cariGo/users/RedeemPoints`, {
        numOfPoints: points,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });


      alert("points redeemed successfully");
      setOpen(false);
      // Add a 5-second delay before reloading the page
    setTimeout(() => {
      window.location.reload();
    }, 1000); // 5000 ms = 5 seconds
    } catch (error) {
      console.error('Failed to redeem points:', error.response ? error.response.data : error.message);
      alert(`An error occurred while redeeming points. Details: ${error.message},${error.response.data.message}`);
    }
  }
  const conversionRate = localStorage.getItem("conversionRate")||1;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/cariGo/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);

        // Update badge based on user's level
        if (data.level === 2) setBadgeImage(silverBadge);
        else if (data.level === 3) setBadgeImage(goldBadge);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) return null;

  // Function to handle modal open
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };
  const code = localStorage.getItem("currencyCode")||"EGP";
  return (
    <>
      {/* Avatar with Tooltip */}
      <Tooltip title={`Points: ${userData.loyaltyPoints}, Level: ${userData.level}`}>
        <Avatar
          alt="User Badge"
          src={badgeImage}
          sx={{ width: 40, height: 40, cursor: 'pointer' }}
          onClick={handleClickOpen} // Open modal on click
        />
      </Tooltip>

      {/* Modal for enlarged badge and user info */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>User Badge Details</DialogTitle>
        <DialogContent>
          <Avatar
            alt="Enlarged User Badge"
            src={badgeImage}
            sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
          />
          
          <Typography variant="h6" align="center">
            Loyalty Points: {userData.loyaltyPoints}
          </Typography>
          <Typography variant="h6" align="center">
            Level: {userData.level}
          </Typography>
          <Typography variant="h6" align="center">
            available points: {userData.pointsAvailable}
          </Typography>
          <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>
      <Stack direction="row" spacing={2}> {/* Add this Stack */}
  <TextField
    error
    id="points"
    label="points"
    value={points}
    defaultValue="enter points to redeem"
    onChange={handlePointsChange}
    type="number"
  />
  <TextField
    error
    id="cash"
    label="cash"
    value={(cash*conversionRate).toFixed(2)}
    helperText={`10 points = ${conversionRate} ${code}`}
    disabled
  />
</Stack> {/* Close Stack */}
      </div>
    </Box>
    <Stack direction="row" spacing={2} justifyContent="flex-end">
    <Button variant="contained" color="success" onClick={handleRedeem} disabled={points>userData.pointsAvailable}>
      redeem
    </Button>
    <Button variant="outlined" color="error" onClick={() => setOpen(false)}>
      cancel
    </Button>
  </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserBadge;
