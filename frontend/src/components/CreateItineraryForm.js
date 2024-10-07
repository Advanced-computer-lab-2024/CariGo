import React, { useState } from "react";
import {
  Box,
  FormControl,
  Input,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import SelectTags from "./SelectTags";
import ItineraryActivityList from "./ItineraryActivityList";
import ItineraryTags from "./ItineraryTags";
export default function CreateItineraryForm({ open, handleClose }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    activities: [],
    start_date: "",
    end_date: "",
    transportation: "",
    accommodation: "",
    language: "",
    price: 0,
    locations: "",
    pick_up: "",
    drop_off: "",
    accessibility: "",
    availability: { dates: [] },
    tags: [],
  });
  const [refreshKey, setRefreshKey] = useState(0);
  const [localActivities, setLocalActivities] = useState(formData.activities);
  const [isEditing, setIsEditing] = useState(false);
  const [tags, setTags] = useState(formData.tags);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createActivity = (newActivity) => {
    setLocalActivities((prevActivities) => {
      const updatedActivities = [...prevActivities, newActivity];
      setFormData((prev) => ({
        ...prev,
        activities: updatedActivities,
      }));
      return updatedActivities;
    });
    setIsEditing(true);
    setRefreshKey((prev) => prev + 1);
  };

  const updateActivity = (updatedActivity) => {
    setLocalActivities((prevActivities) => {
      const updatedActivities = prevActivities.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      );
      setFormData((prev) => ({
        ...prev,
        activities: updatedActivities,
      }));
      return updatedActivities;
    });
    setIsEditing(true);
    setRefreshKey((prev) => prev + 1);
  };

  const deleteActivity = (activityId) => {
    setLocalActivities((prevActivities) => {
      const updatedActivities = prevActivities.filter(
        (activity) => activity.id !== activityId
      );
      setFormData((prev) => ({
        ...prev,
        activities: updatedActivities,
      }));
      return updatedActivities;
    });
    setIsEditing(true);
    setRefreshKey((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
      const response = await fetch("/cariGo/Event/createItinerary", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          author: localStorage.getItem("id"),
          locations: formData.locations.split(",").map((loc) => loc.trim()),
          activities: formData.activities.map((activity) => ({
            ...activity,
            start_date: activity.start_date
              ? new Date(activity.start_date).toISOString()
              : null,
            end_date: activity.end_date
              ? new Date(activity.end_date).toISOString()
              : null,
          })),
          start_date: formData.start_date
            ? new Date(formData.start_date).toISOString()
            : null,
          end_date: formData.end_date
            ? new Date(formData.end_date).toISOString()
            : null,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();
      if (!response.ok) {
        alert(
          `An error occurred while creating the itinerary. Details: ${
            json.error || "Error information unavailable"
          }`
        );
      } else {
        console.log("Itinerary created successfully:", json);
        navigate("/itineraries");
      }
    } catch (error) {
      console.error("Failed to create itinerary:", error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  const handleNavigate = () => {
    navigate(`/tour_guide/itineraries/`);
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f9f9f9",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        padding: 3,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        gap: 2,
      }}
    >
      <Typography variant="h5" sx={{ color: "#007BFF", textAlign: "center" }}>
        CREATE A NEW ITINERARY
      </Typography>

      <FormControl required sx={{ marginTop: 2 }}>
        <Label>TITLE</Label>
        <StyledInput
          placeholder="Write your title here"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl required>
        <Label>LOCATIONS</Label>
        <StyledInput
          placeholder="Enter locations separated by commas"
          name="locations"
          value={formData.locations}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl required>
        <Label>PRICE</Label>
        <StyledInput
          placeholder="Enter price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl required>
        <Label>START DATE</Label>
        <StyledInput
          type="datetime-local"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>

      <FormControl required>
        <Label>END DATE</Label>
        <StyledInput
          type="datetime-local"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>

      <FormControl>
        <Label>TRANSPORTATION</Label>
        <StyledInput
          placeholder="Transportation details"
          name="transportation"
          value={formData.transportation}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <Label>ACCOMMODATION</Label>
        <StyledInput
          placeholder="Accommodation details"
          name="accommodation"
          value={formData.accommodation}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <Label>LANGUAGE</Label>
        <StyledInput
          placeholder="Languages spoken"
          name="language"
          value={formData.language}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <Label>PICK-UP</Label>
        <StyledInput
          placeholder="Pick-up location"
          name="pick_up"
          value={formData.pick_up}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <Label>DROP-OFF</Label>
        <StyledInput
          placeholder="Drop-off location"
          name="drop_off"
          value={formData.drop_off}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <Label>ACCESSIBILITY</Label>
        <StyledInput
          placeholder="Accessibility details"
          name="accessibility"
          value={formData.accessibility}
          onChange={handleChange}
        />
      </FormControl>

      <Label>Tags</Label>
      <ItineraryTags
        selectedTags={formData.tags}
        setSelectedTags={(tags) => setFormData({ ...formData, tags })}
      />

      <ItineraryActivityList
        activities={localActivities}
        createActivity={createActivity}
        updateActivity={updateActivity}
        deleteActivity={deleteActivity}
      />
      <div>
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#007BFF",
          color: "#fff",
          textTransform: "none",
          borderRadius: 3,
          padding: "10px 20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        Submit
      </Button>
      <Button
        variant="contained"
        onClick={handleNavigate}
        sx={{
          backgroundColor: "#007BFF",
          color: "#fff",
          textTransform: "none",
          borderRadius: 3,
          padding: "10px 20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        Cancel
      </Button>
      </div>
      
    </Box>
  );
}

const StyledInput = styled(Input)(() => ({
  width: "100%",
  height: "40px",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  marginBottom: "10px",
  "&:focus": {
    outline: "none",
    border: "1px solid #007BFF",
  },
}));

const Label = styled("label")({
  marginBottom: "5px",
  fontWeight: "bold",
  color: "#007BFF",
  display: "block",
});
