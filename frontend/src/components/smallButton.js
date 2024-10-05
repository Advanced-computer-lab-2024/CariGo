// import * as React from 'react';
// import Button from '@mui/material/Button';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input'; // Reusing Input components


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


const SmallButton = (/*{ onClick }*/) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Input handlers
  const handleMobileInput = (event) => {
    event.target.value = event.target.value.replace(/\D/g, ''); // Only allows digits
  };
  return (
    <div>
    <Button 
      className="small-button" // Add the class name here
      variant="contained" 
      size="small" 
      // onClick={onClick}
      onClick={handleOpen}
      sx={{
        backgroundColor: '#ff683c',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#577b98', // Change to your desired hover color
        },
      }}
      startIcon={<EditRoundedIcon />} // Add the icon here
    >
      Info
    </Button>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="edit-profile-modal-title"
    aria-describedby="edit-profile-modal-description"
  >
    <Box sx={{ ...style, width: 400 }}>
      <h2 id="edit-profile-modal-title">Edit Profile</h2>
      <p id="edit-profile-modal-description">Update your details below:</p>

      {/* Input fields for the form */}
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, display: 'block' } }}
        noValidate
        autoComplete="off"
      >
        <Input
          placeholder="Years of Experience"
          type="number"
          inputProps={{ 'aria-label': 'years of experience' }}
        />
        <Input
          placeholder="Mobile Number"
          inputProps={{
            pattern: '[0-9]{11}',
            title: "Please enter a valid 11-digit mobile number",
            'aria-label': 'mobile number',
          }}
          type="tel"
          required
          onInput={handleMobileInput}
        />
        <Input
          placeholder="Previous Work"
          inputProps={{ 'aria-label': 'previous work' }}
        />

        <Button variant="contained" type="submit" onClick={handleClose}>
          Save
        </Button>
      </Box>
    </Box>
  </Modal>
  </div>
  );
};

export default SmallButton;
