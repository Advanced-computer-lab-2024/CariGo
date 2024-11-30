import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import TouristNB from "./components/TouristNavBar";
import {
  Box,
  Grid,
  Menu,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Typography,
  MenuItem,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import BookingCard from "./components/BookingCard";
import RateReviewIcon from "@mui/icons-material/RateReview"; // Review icon for itinerary
import PersonPinIcon from "@mui/icons-material/PersonPin"; // New icon for Tour Guide review
import ItineraryReviewForm from "frontend/src/components/itineraryReviewForm.js"; // Import the itinerary review form
import TourGuideReviewForm from "frontend/src/components/TourGuideReviewForm.js"; // Import the new Tour Guide review form

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
    status: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [openReviewForm, setOpenReviewForm] = useState(false); // State to control form visibility for itinerary review
  const [openTourGuideReviewForm, setOpenTourGuideReviewForm] = useState(false); // State for Tour Guide review form
  const [selectedItineraryId, setSelectedItineraryId] = useState(null); // For itinerary review
  const [selectedTourGuideId, setSelectedTourGuideId] = useState(null); // For Tour Guide review
  const [option, setOption] = useState("");
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    // setOption(value);
  };

  const resetFilters = () => {
    setFilters({
      status: "",
    });
    setFilteredActivities(itineraries);
    setSearchTerm("");
    setOption("");
  };

  const handleSearch = () => {
    const today = new Date();
    const filtered = itineraries.filter((itinerary) => {
      const itineraryStartDate = new Date(itinerary.ItineraryId.start_date);
      const matchesStatus =
        filters.status === ""
          ? true
          : filters.status === "Booked"
          ? itinerary.Status === true && itineraryStartDate >= today
          : filters.status === "Canceled Bookings"
          ? itinerary.Status === false
          : filters.status === "Done"
          ? itinerary.Status === true && itineraryStartDate < today
          : false;
      const matchesSearchTerm =
        itinerary.ItineraryId.title &&
        itinerary.ItineraryId.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearchTerm;
    });
    setFilteredActivities(filtered);
    setOption(filters.status);
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
        setFilteredActivities(json);
      } catch (error) {
        console.log("Error fetching itineraries:", error);
      }
    };

    fetchItineraries();
  }, []);

  const openReviewFormHandler = (id) => {
    console.log("Opening review form for itinerary id:", id);
    setSelectedItineraryId(id); // Set the ID of the itinerary being reviewed
    setOpenReviewForm(true); // Open the review form for itinerary
  };

  const openTourGuideReviewFormHandler = (tourGuideId) => {
    console.log("Opening review form for tour guide id:", tourGuideId); // Debugging log
    setSelectedTourGuideId(tourGuideId); // Set the tour guide ID (author's ID)
    setOpenTourGuideReviewForm(true); // Open the review form for the tour guide
  };

  const closeReviewFormHandler = () => {
    setOpenReviewForm(false); // Close the review form
    setSelectedItineraryId(null); // Clear the selected itinerary ID
  };

  const closeTourGuideReviewFormHandler = () => {
    setOpenTourGuideReviewForm(false); // Close the tour guide review form
    setSelectedTourGuideId(null); // Clear the selected tour guide ID
  };

  return (
    <div>
      <TouristNB />
      <form>
        <TextField
          select
          label="Status"
          variant="outlined"
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          sx={{ mb: 2, mr: 2, width: "200px" }}
        >
          <MenuItem value="Done">Done</MenuItem>
          <MenuItem value="Booked">Booked</MenuItem>
          <MenuItem value="Canceled Bookings">Canceled Bookings</MenuItem>
        </TextField>
        <Button variant="contained" onClick={resetFilters} sx={{ ml: 2 }}>
          Reset Filters
        </Button>
      </form>

      <Box sx={{ display: "flex" }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          <Grid
            container
            spacing={0}
            sx={{ flexDirection: "column", width: "100vw" }}
          >
            {filteredActivities.map((itinerary, index) => (
              <Grid item key={index} sx={{ justifyContent: "left" }}>
                <BookingCard
                  bookId={itinerary._id}
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
                <IconButton
                  onClick={() =>
                    openReviewFormHandler(itinerary.ItineraryId._id)
                  }
                  disabled={option !== "Done"}
                >
                  <RateReviewIcon />
                </IconButton>
                {/* Add a separate icon button for the tour guide review */}
                <IconButton
                  onClick={() =>
                    openTourGuideReviewFormHandler(itinerary.ItineraryId.author)
                  }
                  disabled={option !== "Done"}
                >
                  <PersonPinIcon />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Render the itinerary review form dialog */}
      {selectedItineraryId && (
        <ItineraryReviewForm
          itineraryId={selectedItineraryId}
          open={openReviewForm}
          onClose={closeReviewFormHandler}
        />
      )}

      {/* Render the tour guide review form dialog */}
      {selectedTourGuideId && openTourGuideReviewForm && (
        <TourGuideReviewForm
          tourGuideId={selectedTourGuideId}
          open={openTourGuideReviewForm}
          onClose={closeTourGuideReviewFormHandler}
        />
      )}
    </div>
  );
};

export default MyBookings;
