import React, { useState } from "react";
import { FormControl } from '@mui/base/FormControl';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Button as BaseButton } from '@mui/base/Button';
import { useNavigate } from 'react-router-dom';
import MyMapComponent from './Map'; // Import your Map Component
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function CreateTransportationForm() {
  const navigate = useNavigate();

  // State to manage form data
  const [driverNumber, setDriverNumber] = useState('');
  const [carType, setCarType] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [departureHour, setDepartureHour] = useState('');
  const [departureMinutes, setDepartureMinutes] = useState('');
  const [departureDayTime, setDepartureDayTime] = useState('am');

  // Departure and arrival locations stored as lat/lng coordinates
  const [departureLan, setDepartureLan] = useState(40.7128);
  const [departureLon, setDepartureLon] = useState(-74.0060);
  const [arrivalLan, setArrivalLan] = useState(34.0522);
  const [arrivalLon, setArrivalLon] = useState(-118.2437);

  // Location descriptions
  const [departureLocationDisc, setDepartureLocationDisc] = useState('');
  const [arrivalLocationDisc, setArrivalLocationDisc] = useState('');

  // Other fields
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [ac, setAc] = useState(false);
  const [bookingOpened, setBookingOpened] = useState(true);

  // Error handling
  const [errorMessages, setErrorMessages] = useState({});
  const [isMapVisible, setIsMapVisible] = useState(false); // State to toggle map visibility
  const [isMapVisible1, setIsMapVisible1] = useState(false);
  const [locationType, setLocationType] = useState('');
  const [date, setStartDate] = useState(dayjs()); // Default to current date

  // Validate form fields
  const validateFields = () => {
    const errors = {};
    if (!driverNumber) errors.driverNumber = "Driver number is required.";
    if (!carType) errors.carType = "Car type is required.";
    if (!plateNumber) errors.plateNumber = "Plate number is required.";
    if (!departureHour || !departureMinutes || !departureDayTime) errors.departureTime = "Departure time is required.";
    if (!departureLan || !departureLon) errors.departureLocation = "Departure location is required.";
    if (!arrivalLan || !arrivalLon) errors.arrivalLocation = "Arrival location is required.";
    if (price < 0) errors.price = "Price cannot be negative.";
    if (discount < 0) errors.discount = "Discount cannot be negative.";

    return errors;
  };

  // Handle form submission
  const handleCreate = async (e) => {
    e.preventDefault();

    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    } else {
      setErrorMessages({});
    }

    const transportation = {
      driverNumber,
      carType,
      plateNumber,
      departureHour,
      departureMinutes,
      departureDayTime,
      departureLan,
      departureLon,
      arrivalLan,
      arrivalLon,
      price: parseFloat(price),
      discount: parseFloat(discount),
      ac,
      bookingOpened,
      date: date.format('YYYY-MM-DD'), // Format the start date
    };

    // Mock token and API request
    const token = localStorage.getItem('jwt');
    if (!token) {
      setErrorMessages({ general: "No token found. Please log in." });
      return;
    }

    console.log(transportation);
    try {
      const response = await fetch("http://localhost:4000/cariGo/transportation/createTransportation", {
        method: 'POST',
        body: JSON.stringify(transportation),
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

      // Reset form fields after successful submission
      setDriverNumber('');
      setCarType('');
      setPlateNumber('');
      setDepartureHour('');
      setDepartureMinutes('');
      setDepartureDayTime('am');
      setDepartureLan(40.7128);  // Reset to default coordinates
      setDepartureLon(-74.0060);
      setArrivalLan(34.0522);    // Reset to default coordinates
      setArrivalLon(-118.2437);
      setPrice(0);
      setDiscount(0);
      setAc(false);
      setBookingOpened(true);
      setErrorMessages({});

      console.log("Transportation created successfully");
 //     navigate('/transportation');
    } catch (err) {
      setErrorMessages({ general: "Failed to create transportation. Please try again." });
      console.error(err);
    }
  };

  // Function to hide the map and save the selected location
  const handleDone = () => {
    setIsMapVisible(false); // Hide the map
  };

  const handleDone1 = () => {
    setIsMapVisible1(false); // Hide the map
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '560px', padding: '10px', color: '#ff4d4d', borderRadius: '15px', boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)', gap: '5px', margin: '20px', border: '2px solid #126782', paddingLeft: '30px' }}>
      <Box sx={{ marginLeft: '50px' }}>
        <h3 style={{ color: '#ff4d4d' }}>CREATE A NEW TRANSPORTATION</h3>
        <Box sx={{ width: '100%', padding: '5px', paddingBottom: '20px' }}>

          {/* Driver Number */}
          <FormControl required>
            <Label>Driver Number (Phone)</Label>
            <StyledInput
              placeholder="Enter driver's phone number"
              onChange={(e) => setDriverNumber(e.target.value)}
              value={driverNumber}
            />
            {errorMessages.driverNumber && <HelperText>{errorMessages.driverNumber}</HelperText>}
          </FormControl>

          {/* Car Type */}
          <FormControl required>
            <Label>Car Type</Label>
            <StyledSelect onChange={(e) => setCarType(e.target.value)} value={carType}>
              <option value="">Select Car Type</option>
              <option value="car">Car</option>
              <option value="bus">Bus</option>
            </StyledSelect>
            {errorMessages.carType && <HelperText>{errorMessages.carType}</HelperText>}
          </FormControl>

          {/* Plate Number */}
          <FormControl required>
            <Label>Plate Number</Label>
            <StyledInput
              placeholder="Enter vehicle plate number"
              onChange={(e) => setPlateNumber(e.target.value)}
              value={plateNumber}
            />
            {errorMessages.plateNumber && <HelperText>{errorMessages.plateNumber}</HelperText>}
          </FormControl>

          {/* Start Date */}
          <FormControl required>
            <Label>Start Date</Label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={date}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <StyledInput {...params} />}
              />
            </LocalizationProvider>
            {errorMessages.startDate && <HelperText>{errorMessages.startDate}</HelperText>}
          </FormControl>

          {/* Departure Time */}
          <FormControl required>
            <Label>Departure Time</Label>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <StyledSelect onChange={(e) => setDepartureHour(e.target.value)} value={departureHour}>
                <option value="">Hour</option>
                {[...Array(12).keys()].map(i => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </StyledSelect>
              <StyledSelect onChange={(e) => setDepartureMinutes(e.target.value)} value={departureMinutes}>
                <option value="">Minute</option>
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
              </StyledSelect>
              <StyledSelect onChange={(e) => setDepartureDayTime(e.target.value)} value={departureDayTime}>
                <option value="am">AM</option>
                <option value="pm">PM</option>
              </StyledSelect>
            </Box>
            {errorMessages.departureTime && <HelperText>{errorMessages.departureTime}</HelperText>}
          </FormControl>

          {/* Departure Location */}
          <FormControl required>
            <Label>Departure Location Description</Label>
            <StyledInput
              placeholder="Enter departure location description"
              onChange={(e) => setDepartureLocationDisc(e.target.value)}
              value={departureLocationDisc}
            />
            <Button onClick={() => { setIsMapVisible(true); setLocationType('departure'); }}>Choose Location on Map</Button>
            {errorMessages.departureLocation && <HelperText>{errorMessages.departureLocation}</HelperText>}
            {isMapVisible && (
              <Box sx={{ marginTop: '20px' }}>
                <MyMapComponent
                  initialCoordinates={{ lat: departureLan, lng: departureLon }}
                  onLocationChange={(location) => {
                    setDepartureLan(location.lat);
                    setDepartureLon(location.lng);
                  }}
                />
                <Button onClick={handleDone}>Done</Button>
              </Box>
            )}
          </FormControl>

          {/* Arrival Location */}
          <FormControl required>
            <Label>Arrival Location Description</Label>
            <StyledInput
              placeholder="Enter arrival location description"
              onChange={(e) => setArrivalLocationDisc(e.target.value)}
              value={arrivalLocationDisc}
            />
            <Button onClick={() => { setIsMapVisible1(true); setLocationType('arrival'); }}>Choose Location on Map</Button>
            {errorMessages.arrivalLocation && <HelperText>{errorMessages.arrivalLocation}</HelperText>}
            {isMapVisible1 && (
              <Box sx={{ marginTop: '20px' }}>
                <MyMapComponent
                  initialCoordinates={{ lat: arrivalLan, lng: arrivalLon }}
                  onLocationChange={(location) => {
                    setArrivalLan(location.lat);
                    setArrivalLon(location.lng);
                  }}
                />
                <Button onClick={handleDone1}>Done</Button>
              </Box>
            )}
          </FormControl>

          {/* Price */}
          <FormControl required>
            <Label>Price</Label>
            <StyledInput
              placeholder="Enter price for transportation"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
            {errorMessages.price && <HelperText>{errorMessages.price}</HelperText>}
          </FormControl>

          {/* Discount */}
          <FormControl required>
            <Label>Discount</Label>
            <StyledInput
              placeholder="Enter discount for transportation"
              type="number"
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
            />
            {errorMessages.discount && <HelperText>{errorMessages.discount}</HelperText>}
          </FormControl>

          {/* AC (Air Conditioning) */}
          <FormControl>
            <Label>Air Conditioning</Label>
            <StyledInput
              type="checkbox"
              onChange={(e) => setAc(e.target.checked)}
              checked={ac}
            />
          </FormControl>

          {/* Booking Open */}
          <FormControl>
            <Label>Booking Open</Label>
            <StyledInput
              type="checkbox"
              onChange={(e) => setBookingOpened(e.target.checked)}
              checked={bookingOpened}
            />
          </FormControl>

        </Box>

        {errorMessages.general && <HelperText>{errorMessages.general}</HelperText>}

        {/* Submit Button */}
        <Button onClick={handleCreate}>CREATE TRANSPORTATION</Button>
      </Box>
    </Box>
  );
}

// Styled components
const StyledInput = styled('input')(({ theme }) => ({
  width: '400px',
  padding: '8px 12px',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.mode === 'dark' ? '#6B7A90' : '#B0B8C4'}`,
  background: theme.palette.mode === 'dark' ? '#303740' : '#fff',
  color: theme.palette.mode === 'dark' ? '#C7D0DD' : '#1C2025',
  '&:focus': {
    outline: 0,
    borderColor: '#3399FF',
  },
}));

const StyledSelect = styled('select')(({ theme }) => ({
  width: '120px',
  padding: '8px 12px',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.mode === 'dark' ? '#6B7A90' : '#B0B8C4'}`,
  background: theme.palette.mode === 'dark' ? '#303740' : '#fff',
  color: theme.palette.mode === 'dark' ? '#C7D0DD' : '#1C2025',
}));

const Button = styled(BaseButton)(({ theme }) => ({
  backgroundColor: '#ff4d4d',
  color: 'white',
  padding: '6px 8px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 150ms ease',
  '&:hover': {
    backgroundColor: '#ff3333',
  },
}));

const Label = styled('label')({
  fontSize: '0.875rem',
  marginBottom: '4px',
  display: 'block',
});

const HelperText = styled('p')({
  fontSize: '0.75rem',
  color: 'red',
});
