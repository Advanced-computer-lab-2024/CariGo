import React, { useState } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Typography,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import MyMapComponent from './Map'; // Ensure this component exists and is properly implemented

export default function CreateTransportationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    driverNumber: '',
    carType: '',
    plateNumber: '',
    departureHour: '',
    departureMinutes: '',
    departureDayTime: 'am',
    arrivalHour: '',
    arrivalMinutes: '',
    arrivalDayTime: 'am',
    departureLan: 40.7128,
    departureLon: -74.0060,
    arrivalLan: 34.0522,
    arrivalLon: -118.2437,
    departureLocationDisc: '',
    arrivalLocationDisc: '',
    price: 0,
    discount: 0,
    ac: false,
    bookingOpened: true,
    date: dayjs(),
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [isMapVisible1, setIsMapVisible1] = useState(false);
  const [locationType, setLocationType] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateFields = () => {
    const errors = {};
    if (!formData.driverNumber) errors.driverNumber = "Driver number is required.";
    if (!formData.carType) errors.carType = "Car type is required.";
    if (!formData.plateNumber) errors.plateNumber = "Plate number is required.";
    if (!formData.departureHour || !formData.departureMinutes) errors.departureTime = "Departure time is required.";
    if (!formData.departureLan || !formData.departureLon) errors.departureLocation = "Departure location is required.";
    if (!formData.arrivalLan || !formData.arrivalLon) errors.arrivalLocation = "Arrival location is required.";
    if (formData.price < 0) errors.price = "Price cannot be negative.";
    if (formData.discount < 0) errors.discount = "Discount cannot be negative.";
    return errors;
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    const token = localStorage.getItem('jwt');
    if (!token) {
      setErrorMessages({ general: "No token found. Please log in." });
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/cariGo/transportation/createTransportation", {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setErrorMessages({ general: json.error || "An error occurred while creating the transportation." });
        return;
      }

      // Reset form
      setFormData({
        driverNumber: '',
        carType: '',
        plateNumber: '',
        departureHour: '',
        departureMinutes: '',
        departureDayTime: 'am',
        arrivalHour: '',
        arrivalMinutes: '',
        arrivalDayTime: 'am',
        departureLan: 40.7128,
        departureLon: -74.0060,
        arrivalLan: 34.0522,
        arrivalLon: -118.2437,
        departureLocationDisc: '',
        arrivalLocationDisc: '',
        price: 0,
        discount: 0,
        ac: false,
        bookingOpened: true,
        date: dayjs(),
      });
      setErrorMessages({});

      console.log("Transportation created successfully");
      // Uncomment the following line if you want to navigate after creation
      // navigate('/transportation');
    } catch (err) {
      setErrorMessages({ general: "Failed to create transportation. Please try again." });
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
        Create a New Transportation
      </Typography>
      <form onSubmit={handleCreate}>
        <TextField
          fullWidth
          label="Driver Number (Phone)"
          name="driverNumber"
          value={formData.driverNumber}
          onChange={handleChange}
          margin="normal"
          error={!!errorMessages.driverNumber}
          helperText={errorMessages.driverNumber}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Car Type</InputLabel>
          <Select
            name="carType"
            value={formData.carType}
            onChange={handleChange}
          >
            <MenuItem value="car">Car</MenuItem>
            <MenuItem value="bus">Bus</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Plate Number"
          name="plateNumber"
          value={formData.plateNumber}
          onChange={handleChange}
          margin="normal"
          error={!!errorMessages.plateNumber}
          helperText={errorMessages.plateNumber}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={formData.date}
            onChange={(newValue) => setFormData(prev => ({ ...prev, date: newValue }))}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </LocalizationProvider>
        <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
          <TextField
            label="Departure Hour"
            name="departureHour"
            type="number"
            value={formData.departureHour}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 1, max: 12 } }}
          />
          <TextField
            label="Departure Minutes"
            name="departureMinutes"
            type="number"
            value={formData.departureMinutes}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 0, max: 59 } }}
          />
          <Select
            name="departureDayTime"
            value={formData.departureDayTime}
            onChange={handleChange}
          >
            <MenuItem value="am">AM</MenuItem>
            <MenuItem value="pm">PM</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
          <TextField
            label="Arrival Hour"
            name="arrivalHour"
            type="number"
            value={formData.arrivalHour}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 1, max: 12 } }}
          />
          <TextField
            label="Arrival Minutes"
            name="arrivalMinutes"
            type="number"
            value={formData.arrivalMinutes}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 0, max: 59 } }}
          />
          <Select
            name="arrivalDayTime"
            value={formData.arrivalDayTime}
            onChange={handleChange}
          >
            <MenuItem value="am">AM</MenuItem>
            <MenuItem value="pm">PM</MenuItem>
          </Select>
        </Box>
        <TextField
          fullWidth
          label="Departure Location Description"
          name="departureLocationDisc"
          value={formData.departureLocationDisc}
          onChange={handleChange}
          margin="normal"
        />
        <Button onClick={() => { setIsMapVisible(true); setLocationType('departure'); }}>
          Choose Departure Location on Map
        </Button>
        {isMapVisible && (
          <Box sx={{ my: 2 }}>
            <MyMapComponent
              initialCoordinates={{ lat: formData.departureLan, lng: formData.departureLon }}
              onLocationChange={(location) => {
                setFormData(prev => ({
                  ...prev,
                  departureLan: location.lat,
                  departureLon: location.lng
                }));
              }}
            />
            <Button onClick={() => setIsMapVisible(false)}>Done</Button>
          </Box>
        )}
        <TextField
          fullWidth
          label="Arrival Location Description"
          name="arrivalLocationDisc"
          value={formData.arrivalLocationDisc}
          onChange={handleChange}
          margin="normal"
        />
        <Button onClick={() => { setIsMapVisible1(true); setLocationType('arrival'); }}>
          Choose Arrival Location on Map
        </Button>
        {isMapVisible1 && (
          <Box sx={{ my: 2 }}>
            <MyMapComponent
              initialCoordinates={{ lat: formData.arrivalLan, lng: formData.arrivalLon }}
              onLocationChange={(location) => {
                setFormData(prev => ({
                  ...prev,
                  arrivalLan: location.lat,
                  arrivalLon: location.lng
                }));
              }}
            />
            <Button onClick={() => setIsMapVisible1(false)}>Done</Button>
          </Box>
        )}
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          margin="normal"
          error={!!errorMessages.price}
          helperText={errorMessages.price}
        />
        <TextField
          fullWidth
          label="Discount"
          name="discount"
          type="number"
          value={formData.discount}
          onChange={handleChange}
          margin="normal"
          error={!!errorMessages.discount}
          helperText={errorMessages.discount}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.ac}
              onChange={handleChange}
              name="ac"
            />
          }
          label="Air Conditioning"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.bookingOpened}
              onChange={handleChange}
              name="bookingOpened"
            />
          }
          label="Booking Open"
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
          sx={{ mt: 3 }}
        >
          Create Transportation
        </Button>
      </form>
    </Box>
  );
}

