import React, { useState, useEffect } from 'react';
import { 
  Modal, Box, Typography, Button, IconButton, Grid, TextField, 
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import SelectCategory from './SelectCategory';
import SelectTags from './SelectTags';

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  outline: 'none',
  borderRadius: theme.shape.borderRadius,
  maxWidth: 600,
  width: '90%',
  maxHeight: '90vh',
  overflowY: 'auto',
}));

const EditModal = ({ open, onClose, activity, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: null,
    endDate: null,
    tag: '',
    category: '',
    lon: '',
    lan: '',
    price: 0,
    discount: 0,
  });

  useEffect(() => {
    if (activity) {
      setFormData({
        title: activity.title || '',
        description: activity.description || '',
        startDate: activity.start_date ? dayjs(activity.start_date) : null,
        endDate: activity.end_date ? dayjs(activity.end_date) : null,
        tag: activity.tag || '',
        category: activity.category || '',
        lon: activity.location ? activity.location.lon : '',
        lan: activity.location ? activity.location.lat : '',
        price: activity.price || 0,
        discount: activity.discount || 0,
      });
    }
  }, [activity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (name) => (date) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedActivity = {
      ...formData,
      start_date: formData.startDate ? formData.startDate.format('YYYY-MM-DD') : null,
      end_date: formData.endDate ? formData.endDate.format('YYYY-MM-DD') : null,
    };
    await onUpdate(updatedActivity);
    onClose();
  };

  return (
    <StyledModal open={open} onClose={onClose}>
      <ModalContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2" sx={{ color: 'primary.main', fontWeight: 700 }}>
            Edit Activity
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  value={formData.startDate}
                  onChange={handleDateChange('startDate')}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End Date"
                  value={formData.endDate}
                  onChange={handleDateChange('endDate')}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Longitude"
                name="lon"
                value={formData.lon}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Latitude"
                name="lan"
                value={formData.lan}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectTags
                tag={formData.tag}
                setTags={(value) => setFormData(prev => ({ ...prev, tag: value }))}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectCategory
                tag={formData.category}
                setTags={(value) => setFormData(prev => ({ ...prev, category: value }))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ 
                fontWeight: 700,
                '&:hover': { backgroundColor: 'primary.dark' } 
              }}
            >
              Update Activity
            </Button>
          </Box>
        </form>
      </ModalContent>
    </StyledModal>
  );
};

export default EditModal;

