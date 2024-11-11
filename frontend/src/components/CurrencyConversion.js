import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Autocomplete,
  Typography,
  Box
} from '@mui/material';
import Currencies from './Currencies';

const CurrencyConversion = ({ open, onClose }) => {
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('');
  const [error, setError] = useState('');

  const handleCurrencyChange = async (code) => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.get(`/cariGo/Event/currencyConversion`, {
        params: { currency: code },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Save conversion rate in localStorage and reload the page
      localStorage.setItem("conversionRate", JSON.stringify(response.data.result));
      localStorage.setItem("currencyCode", JSON.stringify(code));
      console.log(localStorage.getItem("conversionRate"))
      alert("Currency saved successfully");
      //window.location.reload();
    } catch (error) {
      console.error('Failed to retrieve conversion rate:', error.response ? error.response.data : error.message);
      setError('An error occurred while retrieving the currency conversion rate.');
    }
  };

  const handleSubmit = () => {
    if (selectedCurrencyCode) {
      handleCurrencyChange(selectedCurrencyCode);
      onClose();
    } else {
      setError('Please select a currency.');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm" // You can adjust this or remove if you want a specific width
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          height: '500px', // Set custom height here
        },
      }}
    >
      <DialogTitle>Select Your Preferred Currency</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Autocomplete
            disablePortal
            options={Currencies}
            getOptionLabel={(option) => option.label}
            onChange={(event, newValue) => {
              if (newValue) setSelectedCurrencyCode(newValue.code);
            }}
            renderInput={(params) => <TextField {...params} label="Currencies" />}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save Currency
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CurrencyConversion;
