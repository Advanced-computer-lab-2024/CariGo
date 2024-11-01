import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Chip, Avatar } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";
import ItineraryActivityList from "../components/ItineraryActivityList";
import NavBar from "../components/NavBarTourGuide";
import ItineraryUpdate from "../components/ItineraryUpdate"; // Import the edit button
import ItineraryTags from "../components/ItineraryTags"; // Import the tags component
import "../components/styles/CompanyInfo.css";
import logoImage from "../assets/itinerary.png"; // Correct relative path
import SelectCategory from "../components/ItineraryCategory";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from "axios";

const ItineraryDetails = () => {
  const { id } = useParams(); // Get the itinerary ID from the URL
  const [itinerary, setItinerary] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger refresh on update
  const [localActivities, setLocalActivities] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activityTrigger, setActivityTrigger] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]); // State for selected tags
  const [localCategory, setLocalCategory] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility

  // Function to handle dialog open and close
  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);
  const navigate = useNavigate();
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
        setSelectedTags(data.tags || []); // Initialize selected tags
        console.log("gayez", localActivities);
        if (isEditing) {
          setIsEditing(false); // Set editing mode to false after update
          await updateItinerary(localActivities, data.tags, localCategory); // Update activities and tags
        }
      } catch (error) {
        console.error("Error fetching itinerary details:", error);
      }
    };
    fetchItineraryDetails();
  }, [refreshKey, activityTrigger]); // Include `id` in dependencies

  const toggleIsActive = async (newStatus) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) throw new Error("No token found. Please log in.");

      await axios.patch(
        `http://localhost:4000/cariGo/Event/updateItinerary/${id}`,
        { isActive: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setItinerary((prev) => ({ ...prev, isActive: newStatus }));
      handleDialogClose(); // Close dialog after action

      if (!newStatus) navigate(-1); // Redirect to the previous page on deactivation
    } catch (error) {
      console.error("Error updating itinerary status:", error);
    }
  };
  
  // Function to update itinerary activities and tags
  const updateItinerary = async (activities, tags, category) => {
    const token = localStorage.getItem("jwt");
    await axios.patch(
      `http://localhost:4000/cariGo/Event/updateItinerary/${id}`,
      {
        activities: activities,
        tags: tags,
        category: category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setActivityTrigger((prev) => prev + 1);
  };

  const updateActivity = (updatedActivity) => {
    setLocalActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity._id === updatedActivity._id ? updatedActivity : activity
      )
    );
    setIsEditing(true); // Set editing mode to true
    setIsEditing(true);
    // updateItinerary(localActivities, selectedTags);
    setRefreshKey((prev) => prev + 1); // Optionally trigger a refresh if needed
  };

  const createActivity = async (newActivity) => {
    setLocalActivities((prevActivities) => [...prevActivities, newActivity]);
    console.log("3baki", localActivities);
    await updateItinerary(
      [...localActivities, newActivity],
      selectedTags,
      localCategory
    ); // Update itinerary with new activity
    setIsEditing(true);
    setRefreshKey((prev) => prev + 1); // Optionally trigger a refresh if needed
  };

  const deleteActivity = async (updatedActivities) => {
    await updateItinerary(updatedActivities, selectedTags, localCategory); // Update itinerary with deleted activities
    setRefreshKey((prev) => prev + 1);
  };

  const handleTagChange = (newTags) => {
    setSelectedTags(newTags); // Update selected tags
    setIsEditing(true); // Set editing mode to true
    updateItinerary(localActivities, newTags, localCategory); // Update itinerary with new tags
  };
  const handleCategoryChange = (newCategory) => {
    setLocalCategory(newCategory); // Update selected tags
    setIsEditing(true); // Set editing mode to true
    updateItinerary(localActivities, selectedTags, newCategory); // Update itinerary with new tags
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
    category,
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
          {/* Tags component for selecting tags */}
          <div>
            <Typography
              variant="body1"
              sx={{ fontSize: "18px", marginBottom: "5px" }}
            >
              <strong>Select Tags:</strong>
            </Typography>
            <ItineraryTags
              selectedTags={selectedTags}
              setSelectedTags={handleTagChange}
            />
            <Typography
              variant="body1"
              sx={{ fontSize: "18px", marginBottom: "5px", marginTop: "10px" }}
            >
              <strong>Category:</strong>{" "}
            </Typography>
            <SelectCategory
              tag={category}
              setTags={handleCategoryChange} // Pass handler to update category
            />
          </div>
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
            </Typography>
          </Box>
          <Button
        variant="contained"
        color={itinerary.isActive ? "error" : "primary"} // Red button for deactivation
        onClick={handleDialogOpen}
        sx={{ marginTop: "20px" }}
      >
        {itinerary.isActive ? "Deactivate Itinerary" : "Activate Itinerary"}
      </Button>

      {/* Confirmation dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {itinerary.isActive ? "Confirm Deactivation" : "Confirm Activation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {itinerary.isActive
              ? "Are you sure you want to deactivate this itinerary?"
              : "Are you sure you want to activate this itinerary?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => toggleIsActive(!itinerary.isActive)}
            color="error"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
        </div>
      </Box>
    </div>
  );
};

export default ItineraryDetails;
