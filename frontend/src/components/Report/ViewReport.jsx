import React from "react";
// import ReactDOM from "react-dom/client";
//import "../styles/index.css";
import NavBar from "../../components/NavBarTourGuide";

import { Box } from "@mui/material";
//import ItineraryList from "../components/ItirenaryList";
import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();
import { Button } from '@mui/material'; // Using Material-UI for styling
import Table from "../../components/Report/Table";
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';
//import { PrimeReactProvider } from 'primereact/api';
//import 'primeflex/primeflex.css';
//import NavBar from "../../components/NavBarTourGuide";
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import Repo from "./dashboard/Dashboard";
const ViewReport = () => {
    const handleNavigate = () => {
  navigate("/tour_guide/report");
};
const navigate = useNavigate();
  return (
   
      <div>
        
        <NavBar/>
        <Box
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
            marginLeft: "0px",
            width: "100%",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
     <Repo/>
     </Box>
     </Box>
     </div>
   
  );
};

export default ViewReport;
