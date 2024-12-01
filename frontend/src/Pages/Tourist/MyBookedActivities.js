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
import MyBookedActivityCard from "./components/MyBookedActivityCard";
import RateReviewIcon from "@mui/icons-material/RateReview"; // Review icon for activity
import PersonPinIcon from "@mui/icons-material/PersonPin"; // New icon for Tour Guide review
import ActivityReviewForm from "frontend/src/components/ActivityReviewForm.js"; // Renamed to ActivityReviewForm
import TourGuideReviewForm from "frontend/src/components/TourGuideReviewForm.js";

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

const MyBookedActivities = () => {
  const [activities, setActivities] = useState([]); // Changed from itineraries to activities
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
  });
  const [option, setOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [openActivityReviewForm, setOpenActivityReviewForm] = useState(false); // Renamed to openActivityReviewForm
  const [openTourGuideReviewForm, setOpenTourGuideReviewForm] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState(null); // Changed from selectedItineraryId to selectedActivityId
  const [selectedTourGuideId, setSelectedTourGuideId] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setOption(value);
  };

  const resetFilters = () => {
    setFilters({
      status: "",
    });
    setFilteredActivities(activities);
    setSearchTerm("");
    setOption("");
  };
  const today = new Date();
  const handleSearch = () => {
    
    const filtered = activities.filter((activity) => {
      // Changed from itineraries.filter to activities.filter
      const activityStartDate = new Date(activity.ActivityId.start_date); // Changed itineraryStartDate to activityStartDate
      const matchesStatus =
        filters.status === ""
          ? true
          : filters.status === "Booked"
          ? activity.Status === true && activityStartDate > today
          : filters.status === "Canceled Bookings"
          ? activity.Status === false
          : filters.status === "Done"
          ? activity.Status === true && activityStartDate <= today
          : false;
      const matchesSearchTerm =
        activity.ActivityId.title &&
        activity.ActivityId.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearchTerm;
    });
    setFilteredActivities(filtered);
  };

  useEffect(() => {
    const fetchActivities = async () => {
      // Renamed from fetchItineraries to fetchActivities
      try {
        const token = localStorage.getItem("jwt");
        const response = await fetch(
          `http://localhost:4000/cariGo/activity/MyActivityBookings`,
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
        setActivities(json); // Changed from setItineraries to setActivities
        setFilteredActivities(json);
      } catch (error) {
        console.log("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const openActivityReviewFormHandler = (id) => {
    // Renamed from openReviewFormHandler
    console.log("Opening review form for activity id:", id);
    setSelectedActivityId(id); // Changed from setSelectedItineraryId to setSelectedActivityId
    setOpenActivityReviewForm(true); // Renamed to setOpenActivityReviewForm
  };

  // const openTourGuideReviewFormHandler = (tourGuideId) => {
  //   console.log("Opening review form for tour guide id:", tourGuideId);
  //   setSelectedTourGuideId(tourGuideId);
  //   setOpenTourGuideReviewForm(true);
  // };

  const closeActivityReviewFormHandler = () => {
    // Renamed from closeReviewFormHandler
    setOpenActivityReviewForm(false); // Renamed to setOpenActivityReviewForm
    setSelectedActivityId(null); // Changed from setSelectedItineraryId to setSelectedActivityId
  };

  // const closeTourGuideReviewFormHandler = () => {
  //   setOpenTourGuideReviewForm(false);
  //   setSelectedTourGuideId(null);
  // };

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
            {filteredActivities.map(
              (
                activity,
                index // Changed itinerary to activity
              ) => (
                <Grid item key={index} sx={{ justifyContent: "left" }}>
                  <MyBookedActivityCard
                    bookId={activity._id}
                    id={activity.ActivityId._id}
                    author={activity.ActivityId.author}
                    name={activity.ActivityId.title}
                    img={"frontend/public/assets/images/itirenary.png"}
                    startDate={activity.ActivityId.start_date} // Changed itinerary to activity
                    endDate={activity.ActivityId.end_date} // Changed itinerary to activity
                    status={activity.Status} // Changed itinerary to activity
                    NumberOfTickets={activity.NumberOfTickets} // Changed itinerary to activity
                    TotalPrice={activity.TotalPrice} // Changed itinerary to activity
                    price={activity.ActivityId.price} // Changed itinerary to activity //price.range.min
                  />
                  <IconButton
                    onClick={() =>
                      openActivityReviewFormHandler(activity.ActivityId._id)
                    }
                    disabled={!(activity.Status && today > new Date(activity.ActivityId.start_date))}
                  >
                    <RateReviewIcon />
                  </IconButton>
                  {/* Add a separate icon button for the tour guide review */}
                  {/* <IconButton onClick={() => openTourGuideReviewFormHandler(activity.ActivityId.author)}>
                <PersonPinIcon />
              </IconButton> */}
                </Grid>
              )
            )}
          </Grid>
        </Box>
      </Box>

      {/* Render the activity review form dialog */}
      {selectedActivityId && (
        <ActivityReviewForm
          open={openActivityReviewForm}
          onClose={closeActivityReviewFormHandler}
          activityId={selectedActivityId}
        />
      )}

      {/* Render the tour guide review form dialog */}
      {/* {selectedTourGuideId && (
        <TourGuideReviewForm
          open={openTourGuideReviewForm}
          onClose={closeTourGuideReviewFormHandler}
          tourGuideId={selectedTourGuideId}
        />
      )} */}
    </div>
  );
};

export default MyBookedActivities;
