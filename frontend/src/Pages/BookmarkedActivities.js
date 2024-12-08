import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NavBar from "./Tourist/components/TouristNavBar";
import ActivityList from "../components/ActivityListUser";

export default function UserViewActivities() {
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);

  const fetchSavedActivities = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwt");
      const userId = localStorage.getItem("id");

      if (!userId) {
        console.error("User ID not found in localStorage.");
        return;
      }

      const userResponse = await fetch(
        `http://localhost:4000/cariGo/users/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const userData = await userResponse.json();
      const savedActivityIds = userData.savedEvents || [];

      if (savedActivityIds.length > 0) {
        const savedActivitiesResponse = await fetch(
          `http://localhost:4000/cariGo/activity/readActivitiesByIds/?ids=${savedActivityIds.join(
            ","
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const savedActivities = await savedActivitiesResponse.json();
        setActivities(savedActivities);
      }
    } catch (error) {
      console.error("Error fetching saved activities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedActivities();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <NavBar />
      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "bold",
            color: "#004e89",
            mb: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <BookmarkIcon fontSize="large" />
          My Saved Activities
        </Typography>

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : activities.length === 0 ? (
          <Box textAlign="center" py={5}>
            <img
              src="https://via.placeholder.com/150"
              alt="No activities"
              style={{ width: "150px", marginBottom: "16px" }}
            />
            <Typography variant="h6" color="textSecondary">
              You have no saved activities yet.
            </Typography>
          </Box>
        ) : (
          <ActivityList fetchedActivities={activities} />
        )}
      </Container>
    </Box>
  );
}
