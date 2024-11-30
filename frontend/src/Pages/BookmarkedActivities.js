import ReactDOM from "react-dom/client";
import "../styles/index.css";
import App from "../App";
import NavBar from "./Tourist/components/TouristNavBar";
import ActivityList from "../components/ActivityListUser";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function UserViewActivities() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [activities, setActivities] = useState([]);

  //to show user typed in values
  const [filterInputValues, setFilterInputValues] = useState({
    minPrice: "",
    category: "",
    rating: "",
    startDate: "",
  });
  //for actual filtering
  const [filters, setFilters] = useState({
    minPrice: "",
    category: "",
    rating: "",
    startDate: "",
  });

  //handles filter menu opening and closing
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterClick = (event) => {
    if (isFilterOpen) {
      handleFilterClose();
    } else {
      setAnchorEl(event.currentTarget);
      setIsFilterOpen(true);
    }
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setIsFilterOpen(false);
  };

  // handles if filter value changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterInputValues((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  //handling sort
  const [anchorE2, setAnchorE2] = useState(null);
  const [sortOption, setSortOption] = useState("");

  const handleSortClick = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorE2(null);
  };

  const handleSortChange = (sortValue) => {
    setSortOption(sortValue); // Set the selected sort option
    handleSortClose(); // Close the menu
  };

  const [filteredActivities, setFilteredActivities] = useState(activities); // Store filtered results separately

  // Combined useEffect for Fetching Activities with Filters and Sort
  const fetchActivitiesByIds = async (activityIds) => {
    try {
      const token = localStorage.getItem("jwt");

      if (!token) {
        throw new Error("User is not logged in.");
      }

      // Prepare the query string with the activity IDs
      const queryParams = new URLSearchParams();
      queryParams.append("ids", activityIds.join(","));

      const response = await fetch(
        `http://localhost:4000/cariGo/activity/readActivitiesByIds?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch activities: ${response.status}`);
      }

      const activities = await response.json();
      console.log("Fetched Activities:  ", activities);
      return activities;
    } catch (error) {
      console.error("Error fetching activities:", error.message || error);
    }
  }; // Re-fetch activities when filters or sort option change

  const fetchSavedItineraries = async () => {
    try {
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

      if (!userResponse.ok) {
        console.error(`Failed to fetch user data: ${userResponse.status}`);
        return;
      }

      const userData = await userResponse.json();
      const savedItineraryIds = userData.savedEvents;

      if (!savedItineraryIds || savedItineraryIds.length === 0) {
        console.log("No saved itineraries found.");
        return;
      }

      const savedItinerariesResponse = await fetch(
        `http://localhost:4000/cariGo/activity/readActivitiesByIds/?ids=${savedItineraryIds.join(
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

      if (!savedItinerariesResponse.ok) {
        console.error(
          `Failed to fetch saved itineraries: ${savedItinerariesResponse.status}`
        );
        return;
      }

      const savedItineraries = await savedItinerariesResponse.json();
      console.log("gjhv hjvjv hvhjv hjvjh" + savedItineraries);

      setActivities(savedItineraries);

      // setFilteredActivities(savedItineraries); // Initialize filtered activities
    } catch (error) {
      console.error("Error fetching saved itineraries:", error);
    }
  };

  useEffect(() => {
    fetchSavedItineraries();
  }, []);

  return (
    <div>
      <NavBar />

      <Box
        sx={{
          width: "1150px",
          overflow: "hidden",
          margin: "0 auto",
          padding: "20px",
          height: "80vh", // Set a fixed height for the scrolling area

          "&::-webkit-scrollbar": {
            display: "none", // Hides the scrollbar for WebKit browsers (Chrome, Safari)
          },
        }}
      >
        {Boolean(anchorEl) && ( // Conditional rendering based on anchorEl
          <Box
            sx={{
              //padding: '20px',
              paddingTop: "10px",
              display: "flex",
              flexDirection: "column",
              borderRadius: "20px",
              backgroundColor: "white",
              borderColor: "1px solid #ff4d4d",
              width: "900px",
            }}
          ></Box>
        )}
      </Box>
      <Box
        sx={{
          height: "100%",
          marginLeft: "100px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          overflowX: "hidden",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {" "}
        {/* Enable vertical scrolling only */}
        <ActivityList fetchedActivities={activities} />
      </Box>
    </div>
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
