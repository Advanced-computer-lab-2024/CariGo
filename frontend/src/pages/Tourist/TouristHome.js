import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";


import ResponsiveAppBar from "./components/TouristNavBar";
import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  Toolbar,
} from "@mui/material";
import UserItineraryList from "../../components/UserItineraryList";
import ActivityList from "../../components/ActivityListUser";
import TouristNavBar from "./components/TouristNavBar";
import TouristSideBar from "./components/TouristSideBar";

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

  const navigate = useNavigate();

  const navigateToHowToUse = () => {
    navigate("/how-to-use");
  };  

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Top Bar */}
      <div
        style={{ position: "sticky", top: 0, zIndex: 10, background: "#fff" }}
      >
        <TouristNavBar />
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <div
          style={{
            width: "250px",
            height: "100%",
            position: "sticky",
            top: 0,
            backgroundColor: "#f4f4f4",
          }}
        >
          <TouristSideBar />
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            backgroundColor: "#f5f5f5",
          }}
        >
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
          )}
        </div>
      </div>
      <motion.button
        onClick={navigateToHowToUse}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#ff6b35] text-white rounded-full shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -10, 0],
          boxShadow: [
            "0px 0px 8px rgba(255, 107, 53, 0.5)",
            "0px 0px 16px rgba(255, 107, 53, 0.7)",
            "0px 0px 8px rgba(255, 107, 53, 0.5)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <HelpCircle size={24} />
      </motion.button>
    </div>
  );
};

export default TouristHome;
