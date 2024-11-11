import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import TouristNB from "./components/TouristNavBar";
import { Box, Grid, MenuItem, TextField, Button, IconButton, CircularProgress, Typography, Menu } from '@mui/material';
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import MyBookedHotelCard from "./components/MyBookedHotelCard.js";
import RateReviewIcon from '@mui/icons-material/RateReview'; // Review icon for activity
import PersonPinIcon from '@mui/icons-material/PersonPin'; // New icon for Tour Guide review
import ActivityReviewForm from "frontend/src/components/ActivityReviewForm.js"; // Renamed to ActivityReviewForm
import TourGuideReviewForm from "frontend/src/components/TourGuideReviewForm.js"; // Renamed to TourGuideReviewForm

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

const MyBookedHotels = () => {
  const [activities, setActivities] = useState([]); // Changed from itineraries to activities
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
  });
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
  };

  const resetFilters = () => {
    setFilters({
      status: "",
    });
    setFilteredActivities(activities);
    setSearchTerm("");
  };

  const handleSearch = () => {
    const today = new Date();
    const filtered = activities.filter((activity) => { // Changed from itineraries.filter to activities.filter
      const transportationStartDate = new Date(activity.hotelData.offer.checkInDate ); // Changed itineraryStartDate to activityStartDate
      const matchesStatus =
        filters.status === ""
          ? true
          : filters.status === "Booked"
          ? activity.Status === true && transportationStartDate >= today
          : filters.status === "Canceled Bookings"
          ? activity.Status === false
          : filters.status === "Done"
          ? activity.Status === true && transportationStartDate < today
          : false;
    //   const matchesSearchTerm =
    //     activity.TransportationId.departureLocation.description &&
    //     activity.TransportationId.arrivalLocation.description
    //       .toLowerCase()
    //       .includes(searchTerm.toLowerCase());
      return matchesStatus ;
    });
    setFilteredActivities(filtered);
  };

  useEffect(() => {
    const fetchActivities = async () => { // Renamed from fetchItineraries to fetchActivities
      try {
        console.log(`http://localhost:4000/cariGo/transportation/MyBookings`);
        const token = localStorage.getItem("jwt");
        const response = await fetch(`http://localhost:4000/cariGo/flights//MyhBookings`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setActivities(json); // Changed from setItineraries to setActivities
        setFilteredActivities(json);
        console.log(json)
      } catch (error) {
        console.log("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const openActivityReviewFormHandler = (id) => { // Renamed from openReviewFormHandler
    console.log("Opening review form for activity id:", id);
    setSelectedActivityId(id); // Changed from setSelectedItineraryId to setSelectedActivityId
    setOpenActivityReviewForm(true); // Renamed to setOpenActivityReviewForm
  };

  const closeActivityReviewFormHandler = () => { // Renamed from closeReviewFormHandler
    setOpenActivityReviewForm(false); // Renamed to setOpenActivityReviewForm
    setSelectedActivityId(null); // Changed from setSelectedItineraryId to setSelectedActivityId
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
          <Grid container spacing={0} sx={{ flexDirection: "column", width: "100vw" }}>
          {filteredActivities.length > 0 ? (
  filteredActivities.map((activity, index) => {


    return (
      <Grid item key={index} sx={{ justifyContent: "left" }}>
        <MyBookedHotelCard
         
          hotelname={activity.hotelData.hotelName|| " "}
          img={"frontend/public/assets/images/itinerary.png"}
          checkInDate={activity.hotelData.offer.checkInDate || " "}
          checkOutDate={activity.hotelData.offer.checkOutDate || " "}
          offer ={activity.hotelData.offer}
          status={activity.Status}
          NumberOfTickets={activity.NumberOfTickets ||1}
          TotalPrice={activity.TotalPrice|| 0}
          price={activity.hotelData.offer.price.total ||0}
          hotelData={activity.hotelData}
        />
        {/* <IconButton onClick={() => openActivityReviewFormHandler(activity.TransportationId._id)}>
          <RateReviewIcon />
        </IconButton> */}
      </Grid>
    );
  })
) : (
  <Typography variant="h6" sx={{ textAlign: 'center' }}>
    No activities found.
  </Typography>
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

export default MyBookedHotels;
