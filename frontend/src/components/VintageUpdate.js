import React, { useState } from 'react';
import axios from 'axios';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom'; // Add this line
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

const VintageUpdate = ({ vintage, setVintage, setRefreshKey }) => {
  const [open, setOpen] = useState(false);

  // Initialize form data with vintage properties or fallback to default values
  const [formData, setFormData] = useState({
    name: vintage?.name || '',
    description: vintage?.description || '',
    location: {
      nation: {
        city: vintage?.location?.nation?.city || '',
        country: vintage?.location?.nation?.country || '',
      },
      latitude: vintage?.location?.latitude || '',
      longitude: vintage?.location?.longitude || '',
    },
    ticket_price: {
        foriegner: vintage?.ticket_price?.foriegner || '',
      native: vintage?.ticket_price?.native || '',
      student: vintage?.ticket_price?.student || '',
    },
    opening_hours: {
      opening: vintage?.opening_hours?.opening || '',
      closing: vintage?.opening_hours?.closing || '',
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Function to handle nested field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split('.');

    // Check if it's a deeply nested property
    if (nameParts.length === 3) {
      setFormData((prevData) => ({
        ...prevData,
        [nameParts[0]]: {
          ...prevData[nameParts[0]],
          [nameParts[1]]: {
            ...prevData[nameParts[0]][nameParts[1]],
            [nameParts[2]]: value,
          },
        },
      }));
    } else if (nameParts.length === 2) {
      setFormData((prevData) => ({
        ...prevData,
        [nameParts[0]]: {
          ...prevData[nameParts[0]],
          [nameParts[1]]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const { id } = useParams(); // Get the vintage ID from the URL
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwt');
      if (!token) throw new Error("No token found. Please log in.");
      // Ensure that the vintage and its ID exist
      if (!id) {
        throw new Error("Vintage ID is missing.");
      }

      const response = await axios.patch(
        `/cariGo/Event/updateVintage/${id}`,
        { ...formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Vintage updated successfully:', response.data);
      
      setRefreshKey((prevKey) => prevKey + 1); // Trigger a refresh in the parent component
      handleClose();
    } catch (error) {
      console.error('Error updating vintage:', error);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<EditRoundedIcon />}
        onClick={handleOpen}
        sx={{ mt: 2 }}
      >
        Edit Vintage Details
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" mb={2}>
            Update Vintage Details
          </Typography>
          <form onSubmit={handleSave} style={formStyle}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="City"
              name="location.nation.city"
              value={formData.location.nation.city}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Country"
              name="location.nation.country"
              value={formData.location.nation.country}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Latitude"
              name="location.latitude"
              value={formData.location.latitude}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Longitude"
              name="location.longitude"
              value={formData.location.longitude}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Foreigner Ticket Price"
              name="ticket_price.foriegner"
              value={formData.ticket_price.foriegner}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Native Ticket Price"
              name="ticket_price.native"
              value={formData.ticket_price.native}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Student Ticket Price"
              name="ticket_price.student"
              value={formData.ticket_price.student}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Opening Hour"
              name="opening_hours.opening"
              value={formData.opening_hours.opening}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Closing Hour"
              name="opening_hours.closing"
              value={formData.opening_hours.closing}
              onChange={handleChange}
              fullWidth
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default VintageUpdate;
