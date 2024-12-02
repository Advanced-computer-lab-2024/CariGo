import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  TextField,
  Modal,
} from "@mui/material";

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
  }, [addresses]);

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
      <Typography variant="h6" sx={styles.title}>
        Shipping Address
      </Typography>
      <Select
        value={selectedAddress}
        onChange={handleAddressChange}
        displayEmpty
        fullWidth
        sx={styles.select}
      >
        <MenuItem value="" disabled>
          Select an address
        </MenuItem>
        {addresses.map((address, index) => (
          <MenuItem key={index} value={index}>
            {`${address.street}, ${address.city}, ${address.state} ${address.postalCode}, ${address.country}`}
          </MenuItem>
        ))}
      </Select>
      <Button onClick={handleAddNewClick} sx={styles.addButton}>
        Add New Address
      </Button>

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
          />
          <TextField
            label="City"
            value={newAddress.city}
            onChange={handleNewAddressChange("city")}
            fullWidth
            margin="normal"
          />
          <TextField
            label="State"
            value={newAddress.state}
            onChange={handleNewAddressChange("state")}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Postal Code"
            value={newAddress.postalCode}
            onChange={handleNewAddressChange("postalCode")}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Country"
            value={newAddress.country}
            onChange={handleNewAddressChange("country")}
            fullWidth
            margin="normal"
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
    marginBottom: 3,
  },
  title: {
    marginBottom: 2,
  },
  select: {
    marginBottom: 2,
  },
  addButton: {
    marginTop: 2,
    backgroundColor: "#FF683C",
    color: "white",
    "&:hover": {
      backgroundColor: "#e55a2f",
    },
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  },
  modalTitle: {
    marginBottom: 2,
  },
};

export default AddressManager;
