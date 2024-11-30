import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Chip, Avatar } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";
import ResponsiveAppBar from "./Tourist/components/TouristNavBar";
import UserAcList from "../components/UserAcList"; // Import the new MarkerList component
import "../components/styles/CompanyInfo.css";
import logoImage from "../assets/itinerary.png"; // Correct relative path
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { Paper, Grid } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LanguageIcon from "@mui/icons-material/Language";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import HotelIcon from "@mui/icons-material/Hotel";
import AccessibleIcon from "@mui/icons-material/Accessible";
import Divider from "@mui/material/Divider";
const ItineraryDetails = () => {
  const { id } = useParams(); // Get the itinerary ID from the URL
  const [itinerary, setItinerary] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    if (token)
      navigate(`/checkout/itinerary/${id}`); // Update the navigation path
    else navigate(`/login`);
  };

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
    isOpened,
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
  const formattedActivities = activities.map((activity) => ({
    name: activity.name,
    description: activity.description,
    startDate: formatDateTime(activity.start_date),
    endDate: formatDateTime(activity.end_date),
  }));
  const conversionRate = localStorage.getItem("conversionRate") || 1;
  const code = localStorage.getItem("currencyCode") || "EGP";
  const token = localStorage.getItem("jwt");
  return (
    <>
      <ResponsiveAppBar />
      <Box>
        <Paper
          elevation={3}
          sx={{ padding: "30px", maxWidth: "1200px", margin: "20px auto" }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginBottom: "20px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    marginBottom: "10px",
                    fontWeight: "bold",
                    color: "#126782",
                  }}
                >
                  {title || "Anonymous"}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginBottom: "15px",
                  }}
                >
                  {tags?.map((tag) => (
                    <Chip
                      key={tag._id}
                      label={tag.title}
                      sx={{ backgroundColor: "#126782", color: "white" }}
                    />
                  ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <StarIcon sx={{ color: "#FFD700", marginRight: "5px" }} />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {ratingsAverage || "No rating"}
                  </Typography>
                </Box>
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

              <Divider sx={{ margin: "20px 0" }} />

              <Typography
                variant="h5"
                sx={{ marginBottom: "15px", color: "#126782" }}
              >
                Itinerary Details
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <AccessTimeIcon
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Start Date:
                      </Typography>
                      <Typography variant="body2">
                        {formatDateTime(start_date)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <AccessTimeIcon
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        End Date:
                      </Typography>
                      <Typography variant="body2">
                        {formatDateTime(end_date)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <PinDropIcon
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Locations:
                      </Typography>
                      <Typography variant="body2">
                        {locations?.join(", ") || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <AttachMoneyIcon
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Price:
                      </Typography>
                      <Typography variant="body2">
                        {price
                          ? `${(price * conversionRate).toFixed(2)} ${code}`
                          : "Price not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ margin: "20px 0" }} />

              <Typography
                variant="h5"
                sx={{ marginBottom: "15px", color: "#126782" }}
              >
                Additional Information
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <LanguageIcon
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Language of Tour Guide:
                      </Typography>
                      <Typography variant="body2">
                        {language || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <DirectionsBusIcon
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Transportation:
                      </Typography>
                      <Typography variant="body2">
                        {transportation || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <DirectionsBusIcon
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Pick-up:
                      </Typography>
                      <Typography variant="body2">
                        {pick_up || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <DirectionsBusIcon
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Drop-off:
                      </Typography>
                      <Typography variant="body2">
                        {drop_off || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <HotelIcon sx={{ marginRight: "10px", color: "#126782" }} />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Accommodation:
                      </Typography>
                      <Typography variant="body2">
                        {accommodation || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <AccessibleIcon
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Accessibility:
                      </Typography>
                      <Typography variant="body2">
                        {accessibility || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ margin: "20px 0" }} />

              <Typography
                variant="h5"
                sx={{ marginBottom: "15px", color: "#126782" }}
              >
                Activities
              </Typography>
              <UserAcList activities={formattedActivities} />
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={2}
                sx={{
                  padding: "20px",
                  position: "sticky",
                  top: "20px",
                  backgroundColor: isOpened ? "#ffffff" : "#f0f4f8",
                  border: isOpened ? "none" : "2px dashed #126782",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {isOpened ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{ marginBottom: "15px", color: "#126782" }}
                    >
                      Book This Itinerary
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "15px" }}>
                      Experience this amazing journey from{" "}
                      {formatDateTime(start_date)} to {formatDateTime(end_date)}
                      .
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ marginBottom: "15px", fontWeight: "bold" }}
                    >
                      {price
                        ? `${(price * conversionRate).toFixed(2)} ${code}`
                        : "Price not specified"}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleClick}
                      sx={{
                        backgroundColor: "#126782",
                        "&:hover": {
                          backgroundColor: "#0d4e63",
                        },
                      }}
                    >
                      Book Now
                    </Button>
                  </>
                ) : (
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{ marginBottom: "15px", color: "#126782" }}
                    >
                      Booking Coming Soon!
                    </Typography>
                    <AccessTimeIcon
                      sx={{
                        fontSize: 60,
                        color: "#126782",
                        marginBottom: "15px",
                      }}
                    />
                    <Typography variant="body1" sx={{ marginBottom: "15px" }}>
                      This itinerary is not yet open for booking. Check back
                      later for updates!
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      sx={{
                        borderColor: "#126782",
                        color: "#126782",
                        "&:hover": {
                          backgroundColor: "#e6f7ff",
                        },
                      }}
                    >
                      Notify Me When Available
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default ItineraryDetails;
