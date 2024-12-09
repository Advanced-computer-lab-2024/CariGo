import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from '@mui/material';

const SmallButtonS = ({ open, onClose, profile, setProfile, setRefreshKey }) => {
  const [formData, setFormData] = useState({ ...profile });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const id = localStorage.getItem("id");

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.patch(
        `http://localhost:4000/cariGo/users/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log('Profile updated successfully:', response.data);
      setProfile(response.data);
      setRefreshKey((prevKey) => prevKey + 1);
      onClose();
    } catch (error) {
      console.error('Failed to update profile:', error.response ? error.response.data : error.message);
      alert(`An error occurred while updating your profile. Details: ${error.message}`);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="edit-profile-dialog-title"
    >
      <DialogTitle id="edit-profile-dialog-title">Edit Profile</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSave}
        >
          <TextField
            label="User Name"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mobile Number"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SmallButtonS;

