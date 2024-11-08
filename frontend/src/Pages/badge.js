// UserBadge.js
import React, { useEffect, useState } from 'react';
import { Tooltip, Avatar, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import bronzeBadge from '../assets/bronze.png';
import silverBadge from '../assets/silver.png';
import goldBadge from '../assets/gold.png';

const UserBadge = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [badgeImage, setBadgeImage] = useState(bronzeBadge); // Default to bronze
  const [open, setOpen] = useState(false); // State to control modal
  const token = localStorage.getItem("jwt");

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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserBadge;
