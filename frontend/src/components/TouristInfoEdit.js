import React, { useState, useContext } from 'react';
import axios from 'axios'; 
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input'; 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const TouristInfoEdit = ({ profile, setProfile, setRefreshKey }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const id = localStorage.getItem("id");

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwt'); // Fetch token from localStorage
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.patch(
        `http://localhost:4000/cariGo/users/update/${id}`, // Use the user ID from context
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token in the headers
          },
        }
      );
      
      console.log('Profile updated successfully:', response.data); // Check response
      setProfile(response.data); // Update the profile state with the new data
      setRefreshKey((prevKey) => prevKey + 1); // Trigger refresh by updating refreshKey
      handleClose(); // Close the modal
    } catch (error) {
      console.error('Failed to update profile:', error.response ? error.response.data : error.message);
      alert(`An error occurred while updating your profile. Details: ${error.message}`);
    }
  };

  return (
    <div>
      <Button 
        variant="contained" 
        size="small" 
        onClick={handleOpen}
        sx={{
          backgroundColor: '#ff683c',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#577b98',
          },
        }}
        startIcon={<EditRoundedIcon />}
      >
        Edit Info
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-profile-modal-title"
        aria-describedby="edit-profile-modal-description"
      >
        <Box sx={style}>
          <h2 id="edit-profile-modal-title">Edit Profile</h2>
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, display: 'block' } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSave}
          >
            <Input
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Mobile"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              required
            />
              <Input
              placeholder="Nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Job"
              name="job"
              value={formData.job}
              onChange={handleChange}
              required
            />
              <Input
              placeholder="Wallet"
              name="wallet"
              value={formData.wallet}
              onChange={handleChange}
              required
            />
          
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default TouristInfoEdit;
