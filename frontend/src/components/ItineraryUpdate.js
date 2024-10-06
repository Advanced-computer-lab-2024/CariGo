import React, { useState } from 'react';
import axios from 'axios';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { TextField } from '@mui/material';

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

const SmallButton = ({ itinerary, setItinerary, setRefreshKey }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ ...itinerary });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "activities") {
      setFormData({ ...formData, [name]: value.split(',').map(activity => activity.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const id = itinerary._id;

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.patch(
        `/cariGo/Event/updateItinerary/${id}`,
        {
          ...formData,
          activities: formData.activities,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Itinerary updated successfully:', response.data);
      setItinerary(response.data);
      setRefreshKey((prevKey) => prevKey + 1);
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
            backgroundColor: '#577b98',
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
          <h2 id="edit-itinerary-modal-title">Edit Itinerary</h2>
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, display: 'block' } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSave}
          >
            <Input
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Locations"
              name="locations"
              value={formData.locations}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Transportation"
              name="transportation"
              value={formData.transportation}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Language"
              name="language"
              value={formData.language}
              onChange={handleChange}
            />
            <TextField
              type="datetime-local"
              name="start_date"
              label="Start Date"
              value={formData.start_date ? new Date(formData.start_date).toISOString().slice(0, 16) : ''}
              onChange={handleChange}
              sx={{ m: 1 }}
              required
            />
            <TextField
              type="datetime-local"
              name="end_date"
              label="End Date"
              value={formData.end_date ? new Date(formData.end_date).toISOString().slice(0, 16) : ''}
              onChange={handleChange}
              sx={{ m: 1 }}
              required
            />
            <Input
              placeholder="Accommodation"
              name="accommodation"
              value={formData.accommodation}
              onChange={handleChange}
            />
            <Input
              placeholder="Accessibility"
              name="accessibility"
              value={formData.accessibility}
              onChange={handleChange}
            />
            <Input
              placeholder="Pick Up"
              name="pick_up"
              value={formData.pick_up}
              onChange={handleChange}
            />
            <Input
              placeholder="Drop Off"
              name="drop_off"
              value={formData.drop_off}
              onChange={handleChange}
            />
            {/* New input for activities */}
            {/* <Input
              placeholder="Activities (comma separated)"
              name="activities"
              value={formData.activities?.join(", ") || ""}
              onChange={handleChange}
            /> */}
            {/* {formData.activities.map((activity) => {
              return (
                <>
                <Input
                  key={activity}
                  placeholder={`Activity: ${activity}`}
                  name="activities"
                  value={activity.name}
                  onChange={handleChange}
                />
                <Input
                  key={activity}
                  placeholder={`Activity: ${activity}`}
                  name="activities"
                  value={activity.description}
                  onChange={handleChange}
                />
                </>
              );
            })} */}
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default SmallButton;
