import React, { useState } from 'react';
import axios from 'axios';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
};

const formStyle = {
  maxHeight: '400px', // Set a fixed max height
  overflowY: 'auto', // Allow vertical scrolling
  '& > :not(style)': { mb: 2 }, // Margin between form elements
};

const SmallButton = ({ itinerary, setItinerary, setRefreshKey }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ ...itinerary });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "activities"
        ? value.split(',').map(activity => activity.trim())
        : value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwt');
      if (!token) throw new Error("No token found. Please log in.");

      const response = await axios.patch(
        `/cariGo/Event/updateItinerary/${itinerary._id}`,
        { ...formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Itinerary updated successfully:', response.data);
      setItinerary(response.data);
      setRefreshKey(prevKey => prevKey + 1);
      handleClose();
    } catch (error) {
      console.error('Failed to update itinerary:', error.response ? error.response.data : error.message);
      alert(`An error occurred while updating the itinerary. Details: ${error.message}`);
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
            backgroundColor: '#ff8340',
          },
        }}
        startIcon={<EditRoundedIcon />}
      >
        Edit Itinerary
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-itinerary-modal-title"
        aria-describedby="edit-itinerary-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            Edit Itinerary
          </Typography>
          <Box
            component="form"
            sx={formStyle} // Use the new scrollable style
            noValidate
            autoComplete="off"
            onSubmit={handleSave}
          >
            <Stack spacing={2}>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Locations"
                name="locations"
                value={formData.locations}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Transportation"
                name="transportation"
                value={formData.transportation}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Start Date"
                type="datetime-local"
                name="start_date"
                value={formData.start_date ? new Date(formData.start_date).toISOString().slice(0, 16) : ''}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                label="End Date"
                type="datetime-local"
                name="end_date"
                value={formData.end_date ? new Date(formData.end_date).toISOString().slice(0, 16) : ''}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                label="Accommodation"
                name="accommodation"
                value={formData.accommodation}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Accessibility"
                name="accessibility"
                value={formData.accessibility}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Pick Up"
                name="pick_up"
                value={formData.pick_up}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Drop Off"
                name="drop_off"
                value={formData.drop_off}
                onChange={handleChange}
                fullWidth
              />
            </Stack>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: '#ff683c', '&:hover': { backgroundColor: '#ff8340' } }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default SmallButton;
