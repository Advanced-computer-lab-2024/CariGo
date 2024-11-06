import React from "react";
import styled from "styled-components";
import FlightCard from "./FlightCard";
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/material";
const FlightCardList = ({ flights = [], loading = false }) => {
  const navigate = useNavigate();
  const handleCardClick = (flight) => {
    navigate(`/flight-details/${flight.id}`, { state: { flight } });
  };
  if (loading) {
    return <LoadingMessage>Loading flights...</LoadingMessage>;
  }

  if (!Array.isArray(flights)) {
    return <Message>No flights available.</Message>; // Handle invalid input
  }

  return (
    <Box sx={{
      gap: '10px',
      margin:'30px',
      marginBottom: '0px',
      overflowY: 'auto',
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

    display:'flex',
    flexDirection: 'column',
    }}>
      {flights.length === 0 ? (
        <Message>No flights available.</Message> // Handle empty list case
      ) : (
        flights.map((flight, index) => (
          <FlightCard key={flight.id} flight={flight} onClick={() => handleCardClick(flight)} />
        ))
      )}
    </Box>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; /* Adjust the gap as needed */
`;

const LoadingMessage = styled.p`
  font-size: 16px;
  color: #555;
`;

const Message = styled.p`
  font-size: 16px;
  color: #999;
`;

export default FlightCardList;
