import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import TransportCard from "./TransportCard";

const TransportCardList = ({transports}) => {
  const navigate = useNavigate();

  

  if (!Array.isArray(transports)  ) {
    console.log(transports);
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
        No transportations available.
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
        maxHeight:'950px',
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
                    <TransportCard  Transportation={transport} />
                    
            )
            
            }
    </Box>
  );
};

export default TransportCardList;
