import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Chip, Avatar, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NavBar from "../components/NavBar";
import VintageUpdate from "../components/VintageUpdate"; // Import the edit button component
import axios from 'axios'; // Make sure to import axios
import { useNavigate } from "react-router-dom";




const VintageDetails = () => {
  const { id } = useParams(); // Get the vintage ID from the URL
  const [vintage, setVintage] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger refresh on update
  const [tagInput, setTagInput] = useState(""); // State for the tag input
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog open/close
  const handleNavigate = () => {
    navigate(`/vintage/${id}`);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const fetchVintageDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

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
  }, [refreshKey]); // Add refreshKey as a dependency to refresh when vintage is updated

  if (!vintage) {
    return <Typography>Loading...</Typography>;
  }

  const {
    name = "No name provided",
    description = "No description available",
    pictures = [], // Default as an empty array
    location = {
      longitude: "Not specified",
      latitude: "Not specified",
      nation: { country: "Not specified", city: "Not specified" },
    }, // Handle missing location
    ticket_price = {
      foriegner: "Not specified",
      native: "Not specified",
      student: "Not specified",
    },
    tags = [], // Default as an empty array
    opening_hours = {
      opening: "Not specified",
      closing: "Not specified",
    },
  } = vintage;

  const handleUpdateTags = async () => {
    // Split the input string into an array of tags
    const newTags = tagInput.split(",").map(tag => tag.trim()).filter(tag => tag);
  
    try {
      const token = localStorage.getItem("jwt"); // Get the token
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
  
      // Prepare form data to include tags
      const formData = {
        ...vintage, // Spread the existing vintage data
        tags: newTags, // Update the tags with new values
      };
  
      // Make the PATCH request to update the vintage data including the tags
      const response = await axios.patch(
        `/cariGo/Event/updateVintage/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.status === 201) {
        console.log("testing");
        // Update the local state if the request was successful
        setVintage((prevVintage) => ({
          ...prevVintage,
          tags: newTags,
        }
    ));
        
        setTagInput(""); // Clear the input after updating
        setDialogOpen(false); // Close the dialog

        // Trigger a component re-render to reflect changes
        setRefreshKey(prevKey => prevKey + 1);
        
      }
    } catch (error) {
      console.error("Error updating tags:", error);
    }
  };
  
  const handleOpenDialog = () => {
    // Set the tag input to the current tags when opening the dialog
    setTagInput(tags.join(", "));
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false); // Close the dialog
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
            {name.charAt(0)} {/* Safely handle the vintage name */}
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

        {/* Button to open the dialog */}
        <Button 
          variant="contained" 
          onClick={handleOpenDialog} 
          sx={{ backgroundColor: "#126782", color: "white", marginBottom: "20px" }}
        >
          Update Tags
        </Button>

        {/* Display pictures if available */}
        {pictures.length > 0 && (
          <Box
            component="img"
            src={pictures[0]} // Display the first picture
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
                <strong>Ticket Price:</strong> Foreigner: {ticket_price.foriegner}, Native: {ticket_price.native}, Student: {ticket_price.student}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontSize: "18px", marginBottom: "10px" }}>
              <strong>Opening Hours:</strong> {opening_hours.opening} - {opening_hours.closing}
            </Typography>
          </Box>
        </div>

        {/* Add VintageUpdate component here */}
        <VintageUpdate itinerary={vintage} setItinerary={setVintage} setRefreshKey={setRefreshKey} />
      </Box>

      {/* Dialog for updating tags */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Update Tags</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tags (comma separated)"
            type="text"
            fullWidth
            variant="outlined"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateTags} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VintageDetails;
