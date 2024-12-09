import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Chip, Avatar,Grid,Paper  } from "@mui/material";
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
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
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
        setLocalCategory(data.category);
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

  // const handleDialogOpen = () => setOpenDialog(true);
  // const handleDialogClose = () => setOpenDialog(false);

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

  const openBookings = async () => {
    try {
      const token = localStorage.getItem("jwt");
    await axios.post(
      `http://localhost:4000/cariGo/Event/openBookings/${id}`,
      {
        isOpened: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error updating itinerary status:", error);
    }
  };
  return (
    <Box sx={{ backgroundColor: "#F2F0EF", minHeight: "100vh" }}>
      <NavBar />
      <Box sx={{ padding: "40px", maxWidth: "1400px", margin: "auto" }}>
        <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
          {/* <Avatar sx={{ bgcolor: "#004e89", width: 100, height: 100, margin: 'auto', fontSize: '3rem' }}>
            {title?.charAt(0) || "A"}
          </Avatar> */}
          <Typography variant="h3" sx={{ margin: "20px 0", fontWeight: "bold", color: "#004e89" }}>
            {title || "Anonymous"}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Left side: Tags, Category, and Selection */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: '30px', borderRadius: '15px', backgroundColor: '#fff', marginBottom: '30px' }}>
              <Typography variant="h6" sx={{ marginBottom: '20px', color: '#004e89' }}>Tags</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                {tags?.map((tag) => (
                  <Chip
                    key={tag._id}
                    label={tag.title}
                    sx={{ backgroundColor: "#ff6b35", color: "white", borderRadius: '20px' }}
                  />
                ))}
              </Box>
              <Typography variant="h6" sx={{ marginBottom: '20px', marginTop: '30px', color: '#004e89' }}>Category</Typography>
              <Chip
                label={category?.title || "No Category"}
                sx={{ backgroundColor: "#004e89", color: "white", borderRadius: '20px' }}
              />
            </Paper>

            <Paper elevation={3} sx={{ padding: '30px', borderRadius: '15px', backgroundColor: '#fff', marginBottom: '30px' }}>
              <Typography variant="h6" sx={{ marginBottom: '20px', color: '#004e89' }}>Select Tags</Typography>
              <ItineraryTags
                selectedTags={selectedTags}
                setSelectedTags={handleTagChange}
              />
            </Paper>

            <Paper elevation={3} sx={{ padding: '30px', borderRadius: '15px', backgroundColor: '#fff' ,height: '200px', width: '100%'}}>
              <Typography variant="h6" sx={{ marginBottom: '20px', color: '#004e89' }}>Select Category</Typography>
              <SelectCategory
                tag={localCategory}
                setTags={handleCategoryChange}
              />
            </Paper>
          </Grid>

          {/* Right side: Itinerary Details */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: '68px', borderRadius: '15px', backgroundColor: '#fff', marginBottom: '30px' }}>
              <Box
                component="img"
                src={logoImage || ""}
                alt="Itinerary Image"
                sx={{
                  width: "100%",
                  maxHeight: "300px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  marginBottom: "30px",
                }}
              />

              

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                    <StarIcon sx={{ color: "#ff6b35", marginRight: "10px" }} />
                    <Typography variant="h6" sx={{ color: '#004e89' }}>
                      {ratingsAverage || "No rating"}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ marginBottom: "15px" }}>
                    <strong>Start Date:</strong> {formatDateTime(start_date)}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: "15px" }}>
                    <strong>End Date:</strong> {formatDateTime(end_date)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                    <PinDropIcon sx={{ marginRight: "10px", color: '#ff6b35' }} />
                    <Typography variant="body1">
                      <strong>Locations:</strong> {locations?.join(", ") || "Not specified"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                    <AttachMoneyIcon sx={{ marginRight: "10px", color: '#ff6b35' }} />
                    <Typography variant="body1">
                      <strong>Price:</strong> {price ? `$${price}` : "Price not specified"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ marginBottom: "15px" }}>
                    <strong>Language of Tour Guide:</strong> {language || "Not specified"}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: "15px" }}>
                    <strong>Transportation:</strong> {transportation || "Not specified"}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: "15px" }}>
                    <strong>Pick-up:</strong> {pick_up || "Not specified"}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: "15px" }}>
                    <strong>Drop-off:</strong> {drop_off || "Not specified"}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: "15px" }}>
                    <strong>Accommodation:</strong> {accommodation || "Not specified"}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: "15px" }}>
                    <strong>Accessibility:</strong> {accessibility || "Not specified"}
                  </Typography>
                </Grid>
              </Grid>
              <ItineraryUpdate
                itinerary={itinerary}
                setItinerary={setItinerary}
                setRefreshKey={setRefreshKey}
              />
            </Paper>
            

            
          </Grid>
        </Grid>
        <Paper elevation={3} sx={{ padding: '30px', borderRadius: '15px', backgroundColor: '#fff', marginBottom: '30px',width:'1320px' }}>
              <Typography variant="h5" sx={{ marginBottom: '20px', color: '#004e89' }}>Activities</Typography>
              <ItineraryActivityList
                activities={activities}
                updateActivity={updateActivity}
                deleteActivity={deleteActivity}
                createActivity={createActivity}
              />
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
              <Button
                variant="contained"
                color={itinerary.isActive ? "error" : "primary"}
                onClick={handleDialogOpen}
                sx={{ 
                  backgroundColor: itinerary.isActive ? '#ff6b35' : '#004e89', 
                  '&:hover': { backgroundColor: itinerary.isActive ? '#e55a2b' : '#003d6f' },
                  // borderRadius: '20px'
                }}
              >
                {itinerary.isActive ? "Deactivate Itinerary" : "Activate Itinerary"}
              </Button>
              {!itinerary.isOpened && 
                <Button
                  variant="contained"
                  onClick={openBookings}
                  sx={{ 
                    backgroundColor: '#004e89', 
                    '&:hover': { backgroundColor: '#003d6f' },
                    borderRadius: '20px'
                  }}
                >
                  Open Bookings
                </Button>
              }
            </Box>

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
            <Button onClick={handleDialogClose} sx={{ color: '#a70000' }}>
              Cancel
            </Button>
            <Button
              onClick={() => toggleIsActive(!itinerary.isActive)}
              sx={{ color: '#004e89' }}
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ItineraryDetails;