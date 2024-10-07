import React from "react";
// import ReactDOM from "react-dom/client";
import "../styles/index.css";
import NavBar from "../components/NavBarTourist";
import { Box } from "@mui/material";
import ViewAllVintages from "../components/ViewAllVintages";

const TouristViewVintage = () => {
  return (
    <div>
      <NavBar />

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
            marginLeft: "100px",
            width: "100%",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {" "}
          {/* Enable vertical scrolling only */}
          <ViewAllVintages />
        </Box>
      </Box>
    </div>
  );
};

export default TouristViewVintage;
