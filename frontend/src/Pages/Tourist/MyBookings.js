import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import TouristNB from "./components/TouristNavBar";
import { Box, Grid, Menu, TextField, Button, CircularProgress, Typography, MenuItem } from '@mui/material';
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import BookingCard from "./components/BookingCard";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const MyBookings = () => {
  const [itineraries, setItineraries] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [filters, setFilters] = useState({
    status: "", // Use status filter for "Booked" or "Not Booked"
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      status: "",
    });
    setFilteredActivities(itineraries); // Reset to all activities
    setSearchTerm(""); // Reset search term as well
  };
  const today = new Date();
  const handleSearch = () => {
    const today = new Date();
  
    const filtered = itineraries.filter((itinerary) => {
      // Adjust startDate parsing if necessary
      const itineraryStartDate = new Date(itinerary.ItineraryId.start_date);
  
      // Determine the status based on filters and start date
      const matchesStatus =
        filters.status === ""
          ? true
          : filters.status === "Booked"
          ? itinerary.Status === true && itineraryStartDate >= today // Booked and future start date
          : filters.status === "Canceled Bookings"
          ? itinerary.Status === false // Canceled bookings
          : filters.status === "Done"
          ? itinerary.Status === true && itineraryStartDate < today // Done if start date is in the past
          : false;
  
      // Check if the itinerary title matches the search term
      const matchesSearchTerm =
        itinerary.ItineraryId.title &&
        itinerary.ItineraryId.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
  
      return matchesStatus && matchesSearchTerm;
    });
  
    setFilteredActivities(filtered); // Update filtered activities
  };

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await fetch(
          `http://localhost:4000/Event/MyItineraryBookings`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setItineraries(json);
        setFilteredActivities(json); // Set initial filtered activities
      } catch (error) {
        console.log("Error fetching itineraries:", error);
      }
    };

    fetchItineraries();
  }, []);

  return (
    <div>
      <TouristNB />
      {/* Filter Form */}
      <form>
        <TextField
          select
          label="Status"
          variant="outlined"
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          sx={{ mb: 2, mr: 2,width:"200px" }}
        >
          <MenuItem value="Done">Done</MenuItem>
          <MenuItem value="Booked">Booked</MenuItem>
          <MenuItem value="Canceled Bookings">Canceled Bookings</MenuItem>
        </TextField>
        <Button variant="contained" onClick={resetFilters} sx={{ ml: 2 }}>
          Reset Filters
        </Button>
      </form>

      {/* Search bar */}
      <Box sx={{ display: "flex" }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setSearchTerm(e.target.value)} // Capture search input
          />
        </Search>
        <Button variant="contained" onClick={handleSearch} sx={{ ml: 2 }}>
          Search
        </Button>
      </Box>

      <Box
        sx={{
          width: "1150px",
          overflow: "hidden",
          margin: "0 auto",
          padding: "20px",
          height: "80vh",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Grid container spacing={0} sx={{ flexDirection: "column", width: "100vw" }}>
            {filteredActivities.map((itinerary, index) => (
              <Grid item key={index} sx={{ justifyContent: "left" }}>
                <BookingCard
                  id={itinerary.ItineraryId._id}
                  author={itinerary.ItineraryId.author}
                  name={itinerary.ItineraryId.title}
                  img={"frontend/public/assets/images/itirenary.png"}
                  startDate={itinerary.ItineraryId.start_date}
                  endDate={itinerary.ItineraryId.end_date}
                  location={itinerary.ItineraryId.locations}
                  status={itinerary.Status}
                  NumberOfTickets={itinerary.NumberOfTickets}
                  TotalPrice={itinerary.TotalPrice}
                  price={itinerary.ItineraryId.price}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default MyBookings;
