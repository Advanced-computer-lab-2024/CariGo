import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  TextField,
  Modal,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Add as AddIcon, LocationOn as LocationOnIcon } from '@mui/icons-material';
const AddressManager = ({ addresses, onAddressSelect, onAddNewAddress }) => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (addresses.length > 0 && selectedAddress === "") {
      setSelectedAddress(0);
      onAddressSelect(addresses[0]);
    }
  }, [addresses, onAddressSelect]);

  const handleAddressChange = (event) => {
    const index = event.target.value;
    setSelectedAddress(index);
    onAddressSelect(addresses[index]);
  };

  const handleAddNewClick = () => {
    setIsAddingNew(true);
  };

  const handleNewAddressChange = (field) => (event) => {
    setNewAddress({ ...newAddress, [field]: event.target.value });
  };

  const handleAddNewAddress = () => {
    onAddNewAddress(newAddress);
    setIsAddingNew(false);
    setNewAddress({
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.addressSelection}>
        <FormControl sx={{ flex: 1 }} variant="outlined">
          <InputLabel sx={styles.inputLabel}>Delivery Address</InputLabel>
          <Select
            value={selectedAddress}
            onChange={handleAddressChange}
            label="Delivery Address"
            sx={styles.select}
          >
            <MenuItem value="" disabled>
          Select an address
        </MenuItem>
            {addresses.map((address, index) => (
              <MenuItem key={index} value={address}>
                <LocationOnIcon sx={styles.locationIcon} />
                {`${address.street}, ${address.city}, ${address.state} ${address.postalCode}, ${address.country}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleAddNewClick}
          sx={styles.addButton}
        >
          <AddIcon /> New Address
        </Button>
      </Box>

      <Modal open={isAddingNew} onClose={() => setIsAddingNew(false)}>
        <Box sx={styles.modal}>
          <Typography variant="h6" sx={styles.modalTitle}>
            Add New Address
          </Typography>
          <TextField
            label="Street"
            value={newAddress.street}
            onChange={handleNewAddressChange("street")}
            fullWidth
            margin="normal"
            sx={styles.textField}
          />
          <TextField
            label="City"
            value={newAddress.city}
            onChange={handleNewAddressChange("city")}
            fullWidth
            margin="normal"
            sx={styles.textField}
          />
          <TextField
            label="State"
            value={newAddress.state}
            onChange={handleNewAddressChange("state")}
            fullWidth
            margin="normal"
            sx={styles.textField}
          />
          <TextField
            label="Postal Code"
            value={newAddress.postalCode}
            onChange={handleNewAddressChange("postalCode")}
            fullWidth
            margin="normal"
            sx={styles.textField}
          />
          <TextField
            label="Country"
            value={newAddress.country}
            onChange={handleNewAddressChange("country")}
            fullWidth
            margin="normal"
            sx={styles.textField}
          />
          <Button onClick={handleAddNewAddress} sx={styles.addButton}>
            Add Address
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

const styles = {
  container: {
    width: '100%',
  },
  addressSelection: {
    display: 'flex',
    gap: 2,
    alignItems: 'center',
  },
  inputLabel: {
    color: '#1a659e',
  },
  select: {
    color: '#004e89',
    backgroundColor: 'white',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1a659e',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#004e89',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ff6b36',
    },
    '& .MuiSvgIcon-root': {
      color: '#1a659e',
    },
  },
  locationIcon: {
    color: '#ff6b36',
    marginRight: 1,
  },
  addButton: {
    backgroundColor: '#ff6b36',
    color: 'white',
    '&:hover': {
      backgroundColor: '#e55a2f',
    },
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#f7e1c6',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  },
  modalTitle: {
    color: '#004e89',
    marginBottom: 2,
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      color: '#004e89',
      backgroundColor: 'white',
      '& fieldset': {
        borderColor: '#1a659e',
      },
      '&:hover fieldset': {
        borderColor: '#004e89',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ff6b36',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#1a659e',
    },
  },
};

export default AddressManager;
