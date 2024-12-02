import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
  Container,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import NavBar from "./Tourist/components/TouristNavBar";
import ActivityList from "../components/ActivityListUser";

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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
    <NavBar />
   <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
  
     <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
     <Grid item xs={5}>
        <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
                fontWeight: "bold", 
                fontFamily: "Roboto, sans-serif", 
                color: "#004c74", 
                textAlign: "center" 
            }}
            >
            My Saved Activities
        </Typography>
         </Grid>
  
         <Box
     sx={{
       height: "calc(100vh - 50px)", // Reduced subtraction to increase the height
       overflowY: "auto",
       mt: 3,
       ml: -15,
       "&::-webkit-scrollbar": {
         width: "8px",
       },
       "&::-webkit-scrollbar-thumb": {
         backgroundColor: "#ff4d4d",
         borderRadius: "4px",
       },
       "&::-webkit-scrollbar-track": {
         backgroundColor: "#f1f1f1",
         borderRadius: "4px",
       },
     }}
   >
          <ActivityList fetchedActivities={activities} />
          
  </Box>
       
        </Paper>
      </Container>
    </Box>
    );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
