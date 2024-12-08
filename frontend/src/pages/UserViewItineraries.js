import React from "react";
// import ReactDOM from "react-dom/client";
import "../styles/index.css";
import NavBar from "../components/NavBarTourGuide";
import { Box } from "@mui/material";
import ItineraryList from "../components/ItirenaryList";
import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();
import { Button } from '@mui/material'; // Using Material-UI for styling
import Table from "../components/Report/Table";
import { PrimeReactProvider } from 'primereact/api';
const UserViewItirenaries = () => {
    const handleNavigate = () => {
  navigate("/tour_guide/itineraries/new");
};
const navigate = useNavigate();
  return (
    <div>
      <NavBar/>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNavigate}
        sx={{ margin: "10px" }} // Optional styling
      >
        Create new Itinerary
    </Button>
    
      {/* <CreateItineraryForm/> */}
      {/* <Box
        sx={{
          width: "1150px",
          overflow: "hidden",
          margin: "0 auto",
          padding: "20px",
          height: "80vh", // Set a fixed height for the scrolling area
          overflow: "auto", // Enable scrolling
          "&::-webkit-scrollbar": {
            display: "none", // Hides the scrollbar for WebKit browsers (Chrome, Safari)
          },
          //backgroundColor : "aquamarine" ,
        }}
      >
        <Box
          sx={{
            height: "100%",
            marginLeft: "100px",
            width: "100%",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {" "} */}
          {/* Enable vertical scrolling only */}
          <ItineraryList />
        {/* </Box>
      </Box> */}
      
    </div>
  );
};

export default UserViewItirenaries;
