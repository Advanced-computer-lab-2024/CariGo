import React, { useState } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Typography 
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import SelectTags from "./SelectTags";
import SelectCategory from "./SelectCategory";

export default function CreateActivityForm({ onActivityCreated }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tag, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [lon, setLon] = useState('');
  const [lan, setLan] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [errorMessages, setErrorMessages] = useState({});

  const validateFields = () => {
    const errors = {};
    if (!title) errors.title = "Title is required.";
    if (!description) errors.description = "Description is required.";
    if (!startDate) errors.startDate = "Start date is required.";
    if (!endDate) errors.endDate = "End date is required.";
    if (!lon) errors.lon = "Longitude is required.";
    if (!lan) errors.lan = "Latitude is required.";
    if (!tag) errors.tag = "Tag is required.";
    if (!category) errors.category = "Category is required.";
    if (price < 0) errors.price = "Price cannot be negative.";
    if (discount < 0) errors.discount = "Discount cannot be negative.";
    
    return errors;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    
    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    } else {
      setErrorMessages({});
    }

    const activity = {
      title,
      description,
      start_date: startDate.format('YYYY-MM-DD'),
      end_date: endDate.format('YYYY-MM-DD'),
      tag,
      lon,
      lan,
      price: parseFloat(price),
      discount: parseFloat(discount),
      category,
    };

    const token = localStorage.getItem('jwt');

    if (!token) {
      setErrorMessages({ general: "No token found. Please log in." });
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/Carigo/Activity/createActivity", {
        method: 'POST',
        body: JSON.stringify(activity),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setErrorMessages({ general: json.error || "An error occurred while creating the activity." });
        return;
      }

      // Reset fields
      setTitle('');
      setDescription('');
      setStartDate(null);
      setEndDate(null);
      setTags('');
      setLon('');
      setLan('');
      setPrice(0);
      setDiscount(0);
      setErrorMessages({});
      console.log("Activity created");
      
      // Navigate to the Activity List tab
      if (onActivityCreated) {
        onActivityCreated();
      }
    } catch (err) {
      setErrorMessages({ general: "Failed to create activity. Please try again." });
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.main' }}>
        Create a New Activity
      </Typography>
      <form onSubmit={handleCreate}>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!errorMessages.title}
          helperText={errorMessages.title}
          sx={{
            '& .MuiInputLabel-root': {
              color: '#ff6b35', // Label color
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#ff6b35', // Label color when focused
            },
          }}
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!errorMessages.description}
          helperText={errorMessages.description}
          sx={{
            '& .MuiInputLabel-root': {
              color: '#ff6b35', // Label color
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#ff6b35', // Label color when focused
            },
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            sx={{
              '& .MuiInputLabel-root': {
                color: '#ff6b35', // Label color
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#ff6b35', // Label color when focused
              },
            }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            sx={{
              '& .MuiInputLabel-root': {
                color: '#ff6b35', // Label color
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#ff6b35', // Label color when focused
              },
            }}
          />
        </LocalizationProvider>
        <TextField
          fullWidth
          label="Longitude"
          variant="outlined"
          margin="normal"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          error={!!errorMessages.lon}
          helperText={errorMessages.lon}
          sx={{
            '& .MuiInputLabel-root': {
              color: '#ff6b35', // Label color
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#ff6b35', // Label color when focused
            },
          }}
        />
        <TextField
          fullWidth
          label="Latitude"
          variant="outlined"
          margin="normal"
          value={lan}
          onChange={(e) => setLan(e.target.value)}
          error={!!errorMessages.lan}
          helperText={errorMessages.lan}
          sx={{
            '& .MuiInputLabel-root': {
              color: '#ff6b35', // Label color
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#ff6b35', // Label color when focused
            },
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Tags</InputLabel>
          <SelectTags tags={tag} setTags={setTags} />
          {errorMessages.tag && <Typography color="error">{errorMessages.tag}</Typography>}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <SelectCategory tags={category} setTags={setCategory} />
          {errorMessages.category && <Typography color="error">{errorMessages.category}</Typography>}
        </FormControl>
        <TextField
          fullWidth
          label="Price"
          variant="outlined"
          margin="normal"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          error={!!errorMessages.price}
          helperText={errorMessages.price}
          sx={{
            '& .MuiInputLabel-root': {
              color: '#ff6b35', // Label color
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#ff6b35', // Label color when focused
            },
          }}
        />
        <TextField
          fullWidth
          label="Discount"
          variant="outlined"
          margin="normal"
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          error={!!errorMessages.discount}
          helperText={errorMessages.discount}
          sx={{
            '& .MuiInputLabel-root': {
              color: '#ff6b35', // Label color
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#ff6b35', // Label color when focused
            },
          }}
        />
        {errorMessages.general && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errorMessages.general}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            backgroundColor: 'primary', // Initial background color
            '&:hover': {
              backgroundColor: '#ff6b35', // Hover background color
            },
          }}
        >
          Create Activity
        </Button>
      </form>
    </Box>
  );
}

