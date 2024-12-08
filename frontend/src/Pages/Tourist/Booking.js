import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import NavBar from "./components/TouristNavBar";
import FlightIcon from '@mui/icons-material/Flight';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CommuteIcon from '@mui/icons-material/Commute';
import FlightBooking from "../FlightBooking";
import HotelBooking from "../../components/HotelBooking";
import TransportationBooking from "../../components/TransportationBooking";

export default function BookingPage() {
  const [selectedBooking, setSelectedBooking] = useState(() => {
    return sessionStorage.getItem("selectedBooking") || "flight"; // Default to flight
  });

  // Save selectedBooking immediately to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("selectedBooking", selectedBooking);
  }, [selectedBooking]);

  // Restore input values when component mounts
  useEffect(() => {
    document.querySelectorAll("input").forEach(input => {
      input.value = sessionStorage.getItem(`${selectedBooking}_input_${input.name}`) || "";
    });
  }, [selectedBooking]);

  useEffect(() => {
    // Check if window is defined to prevent SSR issues
    if (typeof window !== "undefined") {
      // Clear session storage on page reload
      const handleBeforeUnload = () => {
        sessionStorage.clear(); // Clears all sessionStorage data
      };

      // Add event listener for beforeunload
      window.addEventListener('beforeunload', handleBeforeUnload);

      // Clean up the event listener when the component is unmounted
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      <NavBar />
      <Box sx={{ 
        display: 'flex', 
        borderBottom: 1,
        borderColor: 'divider',
        marginTop: '50px',
        justifyContent: 'center',
        gap: '20px',
        paddingBottom: '2px'
      }}>
        <Button
          startIcon={<FlightIcon />}
          sx={{
            color: selectedBooking === "flight" ? "#ff6b35" : "inherit",
            borderBottom: selectedBooking === "flight" ? "2px solid #ff6b35" : "none",
            borderRadius: 0,
            padding: '12px 24px',
            '&:hover': {
              color: '#ff6b35',
              backgroundColor: 'transparent',
            }
          }}
          onClick={() => setSelectedBooking("flight")}
        >
          Planes
        </Button>
        <Button
          startIcon={<LocationCityIcon />}
          sx={{
            color: selectedBooking === "hotel" ? "#ff6b35" : "inherit",
            borderBottom: selectedBooking === "hotel" ? "2px solid #ff6b35" : "none",
            borderRadius: 0,
            padding: '12px 24px',
            '&:hover': {
              color: '#ff6b35',
              backgroundColor: 'transparent',
            }
          }}
          onClick={() => setSelectedBooking("hotel")}
        >
          Hotels
        </Button>
        <Button
          startIcon={<CommuteIcon />}
          sx={{
            color: selectedBooking === "transportation" ? "#ff6b35" : "inherit",
            borderBottom: selectedBooking === "transportation" ? "2px solid #ff6b35" : "none",
            borderRadius: 0,
            padding: '12px 24px',
            '&:hover': {
              color: '#ff6b35',
              backgroundColor: 'transparent',
            }
          }}
          onClick={() => setSelectedBooking("transportation")}
        >
          Transportation
        </Button>
      </Box>
      <Box sx={{ padding: '20px' }}>
        {selectedBooking === "flight" && <FlightBooking />}
        {selectedBooking === "hotel" && <HotelBooking />}
        {selectedBooking === "transportation" && <TransportationBooking />}
      </Box>
    </div>
  );
}

