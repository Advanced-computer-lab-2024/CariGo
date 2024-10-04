import * as React from 'react';
import Button from '@mui/material/Button';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const SmallButton = ({ onClick }) => {
  return (
    <Button 
      className="small-button" // Add the class name here
      variant="contained" 
      size="small" 
      onClick={onClick}
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
  );
};

export default SmallButton;
