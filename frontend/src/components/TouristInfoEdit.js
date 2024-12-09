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

const TouristInfoEdit = ({ profile, setProfile, setRefreshKey, onClose }) => {
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
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Your Profile
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
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': {
                  color: 'text.secondary', // Apply theme-based or custom color
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': {
                  color: 'text.secondary', // Apply theme-based or custom color
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': {
                  color: 'text.secondary', // Apply theme-based or custom color
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': {
                  color: 'text.secondary', // Apply theme-based or custom color
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job"
              name="job"
              value={formData.job}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': {
                  color: 'text.secondary', // Apply theme-based or custom color
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
              backgroundColor: "primary.dark",
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

export default TouristInfoEdit;

