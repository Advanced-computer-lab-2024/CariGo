import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Chip, Avatar } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";
import NavBar from "../components/NavBar";
import UserAcList from "../components/UserAcList"; // Import the new MarkerList component
import "../components/styles/CompanyInfo.css";
import logoImage from "../assets/itinerary.png"; // Correct relative path
import axios from "axios";

const ItineraryDetails = () => {
  const { id } = useParams(); // Get the itinerary ID from the URL
  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    const fetchItineraryDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await fetch(
          `/cariGo/Event/readSingleItinerary/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setItinerary(data);
      } catch (error) {
        console.error("Error fetching itinerary details:", error);
      }
    };
    fetchItineraryDetails();
  }, [id]); // Include `id` in dependencies

  if (!itinerary) {
    return <Typography>Loading...</Typography>;
  }

  const {
    start_date,
    end_date,
    locations,
    price,
    tags,
    activities,
    transportation,
    accommodation,
    ratingsAverage,
    language,
    pick_up,
    drop_off,
    accessibility,
    title,
  } = itinerary;

  // Function to format the date and time
  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  // Format activities to include start and end dates in the correct format
  const formattedActivities = activities.map(activity => ({
    name: activity.name,
    description: activity.description,
    startDate: formatDateTime(activity.start_date),
    endDate: formatDateTime(activity.end_date),
  }));

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
            {title?.charAt(0) || "A"} {/* Safely handle author name */}
          </Avatar>
          <Typography
            variant="h4"
            sx={{ margin: "10px 0", fontWeight: "bold" }}
          >
            {title || "Anonymous"} {/* Safely handle author name */}
          </Typography>
          {tags?.map((tag) => (
            <Chip
              key={tag._id}
              label={tag.title}
              sx={{ backgroundColor: "#126782", color: "white", margin: "5px" }}
            />
          ))}
        </Box>

        <Box
          component="img"
          src={logoImage || ""}
          alt="Itinerary Image"
          sx={{
            width: "100%",
            maxHeight: "400px",
            borderRadius: "10px",
            objectFit: "cover",
            marginBottom: "20px",
          }}
        />
        
        <div className="company-info">
          <Box sx={{ marginBottom: "20px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <StarIcon sx={{ color: "#FFD700", marginRight: "5px" }} />
              <Typography variant="body1" sx={{ fontSize: "18px" }}>
                {ratingsAverage || "No rating"}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{ fontSize: "18px", marginBottom: "5px" }}
            >
              <strong>Start Date:</strong> {formatDateTime(start_date)}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "18px", marginBottom: "5px" }}
            >
              <strong>End Date:</strong> {formatDateTime(end_date)}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <PinDropIcon sx={{ marginRight: "5px" }} />
              <Typography variant="body1">
                <strong>Locations:</strong>{" "}
                {locations?.join(", ") || "Not specified"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <AttachMoneyIcon sx={{ marginRight: "5px" }} />
              <Typography variant="body1">
                <strong>Price:</strong>{" "}
                {price ? `$${price}` : "Price not specified"}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontSize: "18px" }}>
              <strong>Language of Tour Guide:</strong>{" "}
              {language || "No transportation info"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "18px" }}>
              <strong>Transportation:</strong>{" "}
              {transportation || "No transportation info"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "18px" }}>
              <strong>Pick-up:</strong> {pick_up || "No transportation info"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "18px" }}>
              <strong>Drop-off:</strong> {drop_off || "No transportation info"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "18px" }}>
              <strong>Accommodation:</strong>{" "}
              {accommodation || "No accommodation info"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "18px" }}>
              <strong>Accessibility:</strong>{" "}
              {accessibility || "No accessibility info"}
            </Typography>
            
            {/* Using MarkerList to display activities */}
            <Typography variant="body1" sx={{ fontSize: "18px" }}>
              <strong>Activities:</strong>
            </Typography>
            <UserAcList activities={formattedActivities} />
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default ItineraryDetails;
