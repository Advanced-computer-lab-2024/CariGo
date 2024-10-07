import * as React from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/material/Typography";
import { Modal, Box, Button, TextField } from "@mui/material";
import axios from "axios";

export default function ItineraryActivityList({ activities, updateActivity, deleteActivity, createActivity }) {
  // Ensure activities is an array
  const safeActivities = Array.isArray(activities) ? activities : [];

  // State for modal visibility and selected activity
  const [open, setOpen] = React.useState(false);
  const [selectedActivity, setSelectedActivity] = React.useState(null);
  const [isNewActivity, setIsNewActivity] = React.useState(false);

  // Handle modal open for editing
  const handleOpen = (activity) => {
    const formattedActivity = {
      ...activity,
      start_date: activity.start_date
        ? new Date(activity.start_date).toISOString().slice(0, 16)
        : "",
      end_date: activity.end_date
        ? new Date(activity.end_date).toISOString().slice(0, 16)
        : "",
    };
    setSelectedActivity(formattedActivity);
    setIsNewActivity(false);
    setOpen(true);
  };

  // Handle modal open for creating a new activity
  const handleNewActivity = () => {
    setSelectedActivity({
      name: "",
      description: "",
      start_date: "",
      end_date: "",
    });
    setIsNewActivity(true);
    setOpen(true);
  };

  // Handle modal close
  const handleClose = () => {
    setOpen(false);
    setSelectedActivity(null);
    setIsNewActivity(false);
  };

  // Handle form submission to update or create activity
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedActivity) {
      if (isNewActivity) {
        // Create a new activity
        createActivity({
          ...selectedActivity,
          start_date: selectedActivity.start_date
            ? new Date(selectedActivity.start_date).toISOString()
            : null,
          end_date: selectedActivity.end_date
            ? new Date(selectedActivity.end_date).toISOString()
            : null,
        });
      } else {
        // Update an existing activity
        updateActivity({
          ...selectedActivity,
          start_date: selectedActivity.start_date
            ? new Date(selectedActivity.start_date).toISOString()
            : null,
          end_date: selectedActivity.end_date
            ? new Date(selectedActivity.end_date).toISOString()
            : null,
        });
      }
      handleClose();
    }
  };

  // Handle change for form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle deleting an activity
  const handleDelete = (activityId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this activity?");
    if (isConfirmed) {
      const updatedActivities = safeActivities.filter(
        (activity) => activity._id !== activityId
      );
      deleteActivity(updatedActivities);
    }
  };

  return (
    <Stack spacing={2} sx={{ padding: 2 }}>
      <List>
        {safeActivities.length > 0 ? (
          safeActivities.map((activity, index) => (
            <ListItem
              key={index}
              sx={{
                flexDirection: "column",
                alignItems: "flex-start",
                backgroundColor: "#f9f9f9",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                padding: 2,
                marginBottom: 2,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                {activity.name || "Unnamed Activity"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#555", marginTop: 1 }}>
                {activity.description || "No description available."}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#777", marginTop: 1 }}
              >
                <strong>Start Date:</strong>{" "}
                {activity.start_date
                  ? new Date(activity.start_date).toLocaleString()
                  : "N/A"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#777", marginTop: 1 }}
              >
                <strong>End Date:</strong>{" "}
                {activity.end_date
                  ? new Date(activity.end_date).toLocaleString()
                  : "N/A"}
              </Typography>
              <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpen(activity)}
                  sx={{ textTransform: "none" }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(activity._id)}
                  sx={{ textTransform: "none" }}
                >
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))
        ) : (
          <ListItem sx={{ backgroundColor: "#f9f9f9", borderRadius: 2, padding: 2 }}>
            No activities available for this itinerary
          </ListItem>
        )}
      </List>

      {/* Create New Activity Button */}
      <Button
        variant="contained"
        onClick={handleNewActivity}
        sx={{ backgroundColor: "#007BFF", color: "#fff", textTransform: "none", padding: "10px 20px", borderRadius: 3 }}
      >
        Add Activity
      </Button>

      {/* Edit/Create Activity Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
            maxWidth: 400,
            width: "100%",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "20px", textAlign: "center", color: "#007BFF" }}>
            {isNewActivity ? "Create New Activity" : "Edit Activity"}
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={selectedActivity?.name || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={selectedActivity?.description || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Start Date"
            name="start_date"
            type="datetime-local"
            value={selectedActivity?.start_date || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="End Date"
            name="end_date"
            type="datetime-local"
            value={selectedActivity?.end_date || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: "20px", padding: "10px", backgroundColor: "#007BFF", color: "#fff", textTransform: "none" }}
          >
            {isNewActivity ? "Create" : "Save"}
          </Button>
        </Box>
      </Modal>
    </Stack>
  );
}
