import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Chip, Avatar } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";
import ItineraryActivityList from "../components/ItineraryActivityList";
import NavBar from "../components/NavBar";
import ItineraryUpdate from "../components/ItineraryUpdate"; // Import the edit button
import "../components/styles/CompanyInfo.css";
import logoImage from "../assets/itinerary.png"; // Correct relative path
import axios from "axios";
// import ActivitiesForm from "../components/ActivitiesForm";

const ItineraryDetails = () => {
  const { id } = useParams(); // Get the itinerary ID from the URL
  const [itinerary, setItinerary] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger refresh on update
  const [localActivities, setLocalActivities] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activityTrigger, setActivityTrigger] = useState(0);

  useEffect(() => {
    const fetchItineraryDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

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
        setLocalActivities(data.activities);
        console.log("gayez", localActivities);
        if (isEditing) {
          setIsEditing(false); // Set editing mode to false after update
          const activitiesSent = await axios.patch(
            `/cariGo/Event/updateItinerary/${id}`,
            {
              activities: localActivities,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setActivityTrigger(activityTrigger + 1);
        }
      } catch (error) {
        console.error("Error fetching itinerary details:", error);
      }
    };
    fetchItineraryDetails();
  }, [refreshKey, activityTrigger]);
  const updateActivity = (updatedActivity) => {
    setLocalActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity._id === updatedActivity._id ? updatedActivity : activity
      )
    );
    // console.log("3baki",localActivities)
    setIsEditing(true); // Set editing mode to false after update
    setRefreshKey((prev) => prev + 1); // Optionally trigger a refresh if needed
  };

  const createActivity = async (newAvtivity) => {
    setLocalActivities((prevActivities) => prevActivities.push(newAvtivity));
    console.log("3baki", localActivities);
    // console.log("3baki",localActivities)
    const token = localStorage.getItem("jwt");
    const activitiesSent = await axios.patch(
      `/cariGo/Event/updateItinerary/${id}`,
      {
        activities: localActivities,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setIsEditing(true); // Set editing mode to false after update

    setRefreshKey((prev) => prev + 1); // Optionally trigger a refresh if needed
  };

  const deleteActivity = async (updatedActivities) => {
    const token = localStorage.getItem("jwt");
    const activitiesSent = await axios.patch(
      `/cariGo/Event/updateItinerary/${id}`,
      {
        activities: updatedActivities,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setRefreshKey((prev) => prev + 1);
  };

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
          {/* Edit Itinerary Button */}
          {/* <EditItineraryButton itinerary={itinerary} setItinerary={setItinerary} setRefreshKey={setRefreshKey} /> */}
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
          <ItineraryUpdate
                itinerary={itinerary}
                setItinerary={setItinerary}
                setRefreshKey={setRefreshKey}
              />
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
            <Typography variant="body1" sx={{ fontSize: "18px" }}>
              <strong>Activities:</strong>
              <ItineraryActivityList
                activities={activities}
                updateActivity={updateActivity}
                deleteActivity={deleteActivity}
                createActivity={createActivity}
              />
              {/* {localActivities.map(() => {})} */}
            </Typography>
          </Box>
        </div>

        {/* <ActivitiesForm activities={itinerary.activities}/> */}
      </Box>
    </div>
  );
};

export default ItineraryDetails;
