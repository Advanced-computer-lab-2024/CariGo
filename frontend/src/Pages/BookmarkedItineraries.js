import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Container,
  Paper,
  InputBase,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import NavBar from "./Tourist/components/TouristNavBar";
import GuestNavBar from "../components/NavBarTourist";
import ItineraryList from "../components/UserItineraryList";
import SelectTags from "../components/SelectTags";

export default function TouristItineraries() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [tourist, setTourist] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    price: "",
    language: "",
    tags: [],
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
      const savedItineraryIds = userData.savedItineraries;

      if (!savedItineraryIds || savedItineraryIds.length === 0) {
        console.log("No saved itineraries found.");
        return;
      }

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

      if (!savedItinerariesResponse.ok) {
        console.error(
          `Failed to fetch saved itineraries: ${savedItinerariesResponse.status}`
        );
        return;
      }

      const savedItineraries = await savedItinerariesResponse.json();
      console.log(savedItineraries);

      setItineraries(savedItineraries);

      // setFilteredActivities(savedItineraries); // Initialize filtered activities
    } catch (error) {
      console.error("Error fetching saved itineraries:", error);
    }
  };

  useEffect(() => {
    fetchSavedItineraries();
  }, []);

  const handleSearch = () => {

  };

  const [tagNames, setTagNames] = useState("");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("http://localhost:4000/Admin/getTags");
        const data = await response.json();
        const tagNames = data.map((tag) => tag.title);
        setTagNames(tagNames);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);


  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {!tourist ? <GuestNavBar /> : <NavBar />}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              My Saved Itineraries
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Itineraries"
                  inputProps={{ "aria-label": "search itineraries" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={handleSearch}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
              <IconButton
                aria-label="filter"
                onClick={() => {
                  /* Add filter logic */
                }}
              >
                <FilterAltIcon />
              </IconButton>
            </Box>
          </Box>

          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}

          <Box
            sx={{
              height: "calc(100vh - 250px)",
              overflowY: "auto",
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
            <ItineraryList fetched={itineraries} />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
