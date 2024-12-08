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
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ItineraryList from "../components/UserItineraryList";
import NavBar from "./Tourist/components/TouristNavBar";

export default function TouristItineraries() {
  const [loading, setLoading] = useState(false);
  const [itineraries, setItineraries] = useState([]);

  const fetchSavedItineraries = async () => {
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
      const savedItineraryIds = userData.savedItineraries || [];

      if (savedItineraryIds.length > 0) {
        const savedItinerariesResponse = await fetch(
          `http://localhost:4000/Event/readItinerariesByIds/?ids=${savedItineraryIds.join(
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

        const savedItineraries = await savedItinerariesResponse.json();
        setItineraries(savedItineraries);
      }
    } catch (error) {
      console.error("Error fetching saved itineraries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedItineraries();
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
          My Saved Items
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress color="secondary" />
          </Box>
        ) : itineraries.length === 0 ? (
          <Box textAlign="center" py={5}>
            <img
              src="https://via.placeholder.com/150"
              alt="No items"
              style={{ width: "150px", marginBottom: "16px" }}
            />
            <Typography variant="h6" color="textSecondary">
              You have no saved itineraries yet.
            </Typography>
          </Box>
        ) : (
          <ItineraryList fetched={itineraries} />
        )}
      </Container>
    </Box>
  );
}
