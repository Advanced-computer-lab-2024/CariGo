import React, { useState } from 'react';
import axios from 'axios';
import { 
  Box, 
  TextField, 
  Typography, 
  IconButton,
  Grid,
  Button
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

const InfoEdit = ({ profile, setProfile, setRefreshKey, onClose }) => {
  const [formData, setFormData] = useState({
    ...profile,
    previous_work: profile.previous_work ? profile.previous_work.join(", ") : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const updatedData = {
        ...formData,
        previous_work: formData.previous_work.split(",").map((work) => work.trim()),
      };

      const response = await axios.patch(
        `http://localhost:4000/cariGo/users/update/${profile._id}`,
        updatedData,
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
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Tour Guide Information
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSave}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="User Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': {
                  color: '#ff6b35', // Label color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#ff6b35', // Label color when focused
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': {
                  color: '#ff6b35', // Label color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#ff6b35', // Label color when focused
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': {
                  color: '#ff6b35', // Label color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#ff6b35', // Label color when focused
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Years of Experience"
              name="years_of_experience"
              type="number"
              value={formData.years_of_experience}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': {
                  color: '#ff6b35', // Label color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#ff6b35', // Label color when focused
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Previous Work (comma-separated)"
              name="previous_work"
              value={formData.previous_work}
              onChange={handleChange}
              multiline
              rows={3}
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': {
                  color: '#ff6b35', // Label color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#ff6b35', // Label color when focused
                },
              }}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "primary.main",
              color: "background.paper",
              "&:hover": { backgroundColor: "secondary.main" },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoEdit;

