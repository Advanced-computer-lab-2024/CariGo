import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "./components/TouristNavBar";
import { Grid, Typography, Box, Select, MenuItem, CircularProgress } from "@mui/material";
import UserItineraryPost from "../../components/UserItineraryPost";
import ActivityList from "../../components/ActivityListUser";

const TouristHome = () => {
  const [itineraries, setItineraries] = useState([]);
  const [activities, setActivities] = useState([]);
  const [view, setView] = useState("itineraries"); // State to manage selected view

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const userId = localStorage.getItem("id");
        if (!token || !userId) throw new Error("No token or user ID found");

        const userResponse = await fetch(`/cariGo/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        if (!userResponse.ok) throw new Error(`Failed to fetch user data`);

        const user = await userResponse.json();
        const tags = user.selectedTags || [];

        const queryString = tags.map((tag) => `tags=${encodeURIComponent(tag)}`).join("&");

        // Fetch itineraries
        const itinerariesResponse = await fetch(`/cariGo/Event/suggested?${queryString}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        const fetchedItineraries = await itinerariesResponse.json();
        setItineraries(fetchedItineraries);

        // Fetch activities
        const activitiesResponse = await fetch(`/cariGo/Event/suggestedActivities?${queryString}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        const fetchedActivities = await activitiesResponse.json();
        setActivities(fetchedActivities);

      } catch (error) {
        console.error("Error fetching itineraries or activities:", error);
      }
    };

    fetchData();
  }, []);

  const handleViewChange = (event) => setView(event.target.value);

  return (
    <div>
      <ResponsiveAppBar />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Select
          value={view}
          onChange={handleViewChange}
          displayEmpty
          inputProps={{ "aria-label": "Select view" }}
          sx={{ marginBottom: "20px" }}
        >
          <MenuItem value="itineraries">Itineraries</MenuItem>
          <MenuItem value="activities">Activities</MenuItem>
        </Select>
      </Box>

      {view === "itineraries" ? (
        itineraries.length > 0 ? (
          <Grid container spacing={0} sx={{ display: "flex", flexDirection: "column", width: "100vw" }}>
            {itineraries.map((itinerary, index) => (
              <Grid item key={index} sx={{ display: "flex", justifyContent: "left" }}>
                <UserItineraryPost
                  id={itinerary._id}
                  author={itinerary.author}
                  title={itinerary.title}
                  img={"frontend/public/assets/images/itirenary.png"}
                  start_date={itinerary.start_date}
                  end_date={itinerary.end_date}
                  locations={itinerary.locations}
                  price={itinerary.price}
                  tags={itinerary.tags}
                  transportation={itinerary.transportation}
                  accommodation={itinerary.accommodation}
                  rating={itinerary.ratingsAverage}
                  isBooked={itinerary.isBooked}
                  accessibility={itinerary.accessibility}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <CircularProgress size={40} color="primary" sx={{ marginTop: "50px" }} />
          </Box>
        )
      ) : (
        activities.length > 0 ? (
          <ActivityList fetchedActivities={activities} />
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <CircularProgress size={40} color="primary" sx={{ marginTop: "50px" }} />
          </Box>
        )
      )}
    </div>
  );
};

export default TouristHome;
