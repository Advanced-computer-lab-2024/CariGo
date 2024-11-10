import React from "react";
import NavBar from "../components/NavBarTourist";
import {Box, Typography} from "@mui/material"
export default function Home() {
  //localStorage.removeItem('jwt');
  localStorage.removeItem("role");
  console.log(localStorage.getItem("jwt") + "         d");
  return (
    <div>
      <NavBar />
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "white", // Set background color to ensure visibility
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "inherit", // Adjust if necessary
            color: "#004c74",
            marginBottom: "10px",
          }}
        >
          WELCOME TO CariGo
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "inherit", // Adjust if necessary
            color: "#ff683c",
          }}
        >
          hat shantetak w el ba2y 3aleena
        </Typography>
      </Box>
    </div>
  );
}
