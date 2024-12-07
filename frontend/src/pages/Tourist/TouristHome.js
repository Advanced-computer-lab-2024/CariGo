import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "./components/TouristNavBar";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import UserItineraryList from "../../components/UserItineraryList";
import ActivityList from "../../components/ActivityListUser";

const TouristHome = () => {
  const [itineraries, setItineraries] = useState([]);
  const [activities, setActivities] = useState([]);
  const [view, setView] = useState("itineraries");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const userId = localStorage.getItem("id");
        if (!token || !userId) throw new Error("No token or user ID found");

        const userResponse = await fetch(`/cariGo/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!userResponse.ok) throw new Error(`Failed to fetch user data`);

        const user = await userResponse.json();
        const tags = user.selectedTags || [];
        const queryString = tags
          .map((tag) => `tags=${encodeURIComponent(tag)}`)
          .join("&");

        // Fetch itineraries
        const itinerariesResponse = await fetch(
          `/cariGo/Event/suggested?${queryString}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const fetchedItineraries = await itinerariesResponse.json();
        setItineraries(fetchedItineraries);

        // Fetch activities
        const activitiesResponse = await fetch(
          `/cariGo/Event/suggestedActivities?${queryString}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const fetchedActivities = await activitiesResponse.json();
        setActivities(fetchedActivities);
      } catch (error) {
        console.error("Error fetching itineraries or activities:", error);
      }
    };

    fetchData();
  }, []);

  const handleViewChange = (newView) => setView(newView);

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <ResponsiveAppBar />
      <h3 className="text-3xl font-bold text-[#004e89] mb-4 text-center">
        Welcome to CariGo 🦌🦌!!
      </h3>

      <div className="flex justify-center gap-4 mb-6">
        {["itineraries", "activities"].map((item) => (
          <button
            key={item}
            onClick={() => handleViewChange(item)}
            className={`
          px-5 py-2 rounded-full font-semibold text-md transition-all duration-300
          ${
            view === item
              ? "bg-[#ff6b35] text-white shadow-lg transform scale-105"
              : "bg-[#1a659e] text-white hover:bg-[#004e89]"
          }
        `}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      {view === "itineraries" ? (
        itineraries.length > 0 ? (
          <UserItineraryList fetched={itineraries} />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <CircularProgress
              size={40}
              color="primary"
              sx={{ marginTop: "50px" }}
            />
          </Box>
        )
      ) : activities.length > 0 ? (
        <ActivityList fetchedActivities={activities} />
      ) : (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <CircularProgress
            size={40}
            color="primary"
            sx={{ marginTop: "50px" }}
          />
        </Box>
      )}
    </div>
  );
};

export default TouristHome;
