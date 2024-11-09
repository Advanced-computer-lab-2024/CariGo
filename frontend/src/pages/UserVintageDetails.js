import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Chip, Avatar } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NavBar from "../components/NavBar";

const UserVintageDetails = () => {
  const { id } = useParams(); // Get the vintage ID from the URL
  const [vintage, setVintage] = useState(null);

  useEffect(() => {
    const fetchVintageDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");
        // if (!token) {
        //   throw new Error("No token found. Please log in.");
        // }

        const response = await fetch(`/cariGo/Event/readSingleVintage/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setVintage(data);
      } catch (error) {
        console.error("Error fetching vintage details:", error);
      }
    };

    fetchVintageDetails();
  }, [id]);

  if (!vintage) {
    return <Typography>Loading...</Typography>;
  }

  const {
    name = "No name provided",
    description = "No description available",
    pictures = [],
    location = {
      longitude: "Not specified",
      latitude: "Not specified",
      nation: { country: "Not specified", city: "Not specified" },
    },
    ticket_price = {
      foriegner: "Not specified",
      native: "Not specified",
      student: "Not specified",
    },
    tags = [],
    opening_hours = {
      opening: "Not specified",
      closing: "Not specified",
    },
  } = vintage;
  const conversionRate = localStorage.getItem("conversionRate")||1;
  return (
    <div>
      <NavBar />
      <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Avatar sx={{ bgcolor: "#126782", width: 56, height: 56 }}>
            {name.charAt(0)}
          </Avatar>
          <Typography variant="h4" sx={{ margin: "10px 0", fontWeight: "bold" }}>
            {name || "No name provided"}
          </Typography>
          {tags?.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              sx={{ backgroundColor: "#126782", color: "white", margin: "5px" }}
            />
          ))}
        </Box>

        {pictures.length > 0 && (
          <Box
            component="img"
            src={pictures[0]}
            alt="Vintage Image"
            sx={{
              width: "100%",
              maxHeight: "400px",
              borderRadius: "10px",
              objectFit: "cover",
              marginBottom: "20px",
            }}
          />
        )}

        <div className="vintage-info">
          <Box sx={{ marginBottom: "20px" }}>
            <Typography variant="body1" sx={{ fontSize: "18px", marginBottom: "10px" }}>
              <strong>Description:</strong> {description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <PinDropIcon sx={{ marginRight: "5px" }} />
              <Typography variant="body1">
                <strong>Location:</strong> {`${location.nation.city}, ${location.nation.country}`} (Lat: {location.latitude}, Long: {location.longitude})
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <AttachMoneyIcon sx={{ marginRight: "5px" }} />
              <Typography variant="body1">
              Ticket Prices :<br/> Foreigner: {(ticket_price.foriegner*conversionRate).toFixed(2)}<br/> Native: {(ticket_price.native*conversionRate).toFixed(2)}<br/> Student: {(ticket_price.student*conversionRate).toFixed(2)}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontSize: "18px", marginBottom: "10px" }}>
              <strong>Opening Hours:</strong> {opening_hours.opening} - {opening_hours.closing}
            </Typography>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default UserVintageDetails;
