import React, { useState } from 'react';
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

const SmallButtonTG = ({ profile, setProfile, setRefreshKey }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    ...profile,
    previous_work: profile.previous_work ? profile.previous_work.join(', ') : ''
  });

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
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      // Convert previous_work back to an array
      const updatedData = {
        ...formData,
        previous_work: formData.previous_work.split(',').map((work) => work.trim())
      };

      const response = await axios.patch(
        `http://localhost:4000/cariGo/users/update/${id}`,
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
      handleClose();
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
              placeholder="User Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Mobile Number"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Years of Experience"
              name="years_of_experience"
              type="number"
              value={formData.years_of_experience}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Previous Work (comma-separated)"
              name="previous_work"
              value={formData.previous_work}
              onChange={handleChange}
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

export default SmallButtonTG;
