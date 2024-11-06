import React from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from "@mui/material";
import TransportCard from "./TransportCard";

const TransportCardList = ({ hotels = [], loading = false }) => {
  const navigate = useNavigate();

  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading hotels...</Typography>
      </Box>
    );
  }

  if (!Array.isArray(transports) ) {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
        No hotel available.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        gap: '10px',
        margin: '30px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden', 
        maxHeight:'600px',
        '&::-webkit-scrollbar': {
          width: '8px', // Width of the scrollbar
        
          },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#126782', // Color of the scrollbar thumb
          borderRadius: '10px', // Rounded corners for the scrollbar thumb
          },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1', // Color of the scrollbar track
          borderRadius: '10px', // Rounded corners for the scrollbar track
        },
      }}
    >
      
       {transports.map((transport) => 
                transport.map(() => (
                    <TransportCard  transport={transport} />
                ))
            )}
    </Box>
  );
};

export default TransportCardList;
