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
    status: "All",
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
    // status filtering
    useEffect(() => {
      const filtered = activities.filter((activity) => {
        // Filtering based on status
        const activityStartDate = new Date(activity.hotelData.offer.checkInDate);
        const today = new Date();
        const matchesStatus =
          filters.status === "All"
            ? true
            : filters.status === "Booked"
            ? activity.Status === true && activityStartDate >= today
            : filters.status === "Canceled Bookings"
            ? activity.Status === false
            : filters.status === "Done"
            ? activity.Status === true && activityStartDate < today
            : false;
        return matchesStatus;
      });
  
      setFilteredActivities(filtered);
    }, [activities, filters]); // Re-run the filtering logic whenever activities, filters
  
    // Function to handle search by title
    const handleSearch = () => {
      const filtered = activities.filter((activity) => {
        return activity.ActivityId?.hotelData.hotelName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
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
    <Box>
      <TouristNB />
      <Box sx={{display:'flex', flexDirection:'column', gap:"2vh",margin:'5% 12%', mb:'0%', mt:'3%'}}>
      {/*Search bar*/}
        <Box sx={{ display: "flex" }}>
         <Box sx={{}}>
          <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
              setSearchTerm(e.target.value);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#ff4d4daa",
                },
              },  
              justifyContent:'center',        
            }}
            variant="outlined"
            placeholder="Search..."
            size="small"
            />
          <IconButton type="submit" aria-label="search" 
            sx={{ width:"40px", height:"40px",
                //marginBottom:"-5px",
                //marginLeft:"-3px",
                backgroundColor: "#ff4d4d", 
                color: "white", 
                borderRadius: "3px",
                "&:hover": {
                  backgroundColor: "#e63939"
                } 
              }}>
            <SearchIcon  onClick={handleSearch} sx={{ }}/>
          </IconButton>
          </Box>
      </Box>
       {/*End of Search bar*/}
      {/* <form> */}
        <TextField
          select
          //label="Status"
          variant="outlined"
          name="status"
          size="small"
          value={filters.status}
          onChange={handleFilterChange}
          sx={{ mb: 1, mr: 1, width: "10%", height: "5%",
            "& .MuiOutlinedInput-root": {
              //color:'#473d3f',
              "&.Mui-focused fieldset": {
                  borderColor: "#ff4d4daa",
                },
            },
           }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
          <MenuItem value="Booked">Booked</MenuItem>
          <MenuItem value="Canceled Bookings">Canceled Bookings</MenuItem>
        </TextField>
      {/* </form> */}
    </Box>
      <Box
          sx={{height:'60vh',maxHeight: "70vh", width: "80%", overflow: "auto",ml:'10%',
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Box sx={{display:'flex', flexDirection:'column', width: '100%',marginTop:'-1%'}}>
          {filteredActivities.length > 0 ? (
              filteredActivities.map((activity, index) => {return (
                <Box item key={activity._id} sx={{ justifyContent: "left", width:'70%',margin:'2%', }}>
                  <MyBookedHotelCard
                    bookId={activity._id}
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
                </Box>
              );
              })
            ) : (
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                No activities found.
              </Typography>
            )}

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
    </Box>
  );
};

export default MyBookedHotels;
