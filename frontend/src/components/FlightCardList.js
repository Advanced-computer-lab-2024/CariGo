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
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', // Adjusts columns based on available space
      gap: '10px',
      margin:'30px',
      maxHeight: '500px', // Set a max height to enable vertical scrolling
      
      overflowY: 'auto', 
      '&::-webkit-scrollbar': {
      display: 'none', // Hide scrollbar in WebKit browsers (e.g., Chrome, Safari)
    },
    msOverflowStyle: 'none', // Hide scrollbar in IE and Edge
    scrollbarWidth: 'none', // Hide scrollbar in Firefox
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
