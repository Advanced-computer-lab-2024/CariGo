import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import TouristNavBar from "./components/TouristNavBar";
import TouristSideBar from "./components/TouristSideBar";
import {Box,Grid,Menu,TextField,Button,IconButton,CircularProgress,Typography,MenuItem,} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import MyBookedActivityCard from "./components/MyBookedActivityCard";
import RateReviewIcon from "@mui/icons-material/RateReview"; // Review icon for activity
import PersonPinIcon from "@mui/icons-material/PersonPin"; // New icon for Tour Guide review
import ActivityReviewForm from "../../components/ActivityReviewForm";
import TourGuideReviewForm from "../../components/TourGuideReviewForm.js";



const MyBookedActivities = () => {
  const [activities, setActivities] = useState([]); // Changed from itineraries to activities
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [filters, setFilters] = useState({
    status: "All",
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
    //setOption(value);
  };

  // status filtering
  useEffect(() => {
    const filtered = activities.filter((activity) => {
      // Filtering based on status
      const activityStartDate = new Date(activity.ActivityId.start_date);
      const today = new Date();
      const matchesStatus =
        filters.status === "All"
          ? true
          : filters.status === "Booked"
          ? activity.Status === true && activityStartDate > today
          : filters.status === "Canceled Bookings"
          ? activity.Status === false
          : filters.status === "Done"
          ? activity.Status === true && activityStartDate <= today
          : false;
      return matchesStatus;
    });

    setFilteredActivities(filtered);
  }, [activities, filters]); // Re-run the filtering logic whenever activities, filters

   // Function to handle search by title
   const handleSearch = () => {
    const filtered = activities.filter((activity) => {
      return activity.ActivityId?.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
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
          });
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

  const formatDateHour = (dateString) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Use 12-hour format with AM/PM
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
    <Box> <TouristSideBar /> </Box>

    <Box sx={{ flexGrow: 1, marginLeft: "80px", marginTop: "64px", padding: "16px",}}>
      <TouristNavBar />

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
          sx={{height: "67vh", width: "80%", overflow: "auto",ml:'10%',
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Box sx={{display:'flex', flexDirection:'column', width: '100%',marginTop:'-1%'}}>
            {filteredActivities.map((activity,index ) => (
                <Box item key={activity._id} sx={{ justifyContent: "left" , width:'70%',margin:'2%'}}>
                  <MyBookedActivityCard
                    bookId={activity._id}
                    id={activity.ActivityId._id}
                    author={activity.ActivityId.author}
                    name={activity.ActivityId.title}
                    img={"frontend/public/assets/images/itirenary.png"}
                    startDate={activity.ActivityId.start_date} // Changed itinerary to activity
                    startTime={formatDateHour(activity.ActivityId.start_date)}
                    endDate={activity.ActivityId.end_date} // Changed itinerary to activity
                    endTime={formatDateHour(activity.ActivityId.end_date)} 
                    status={activity.Status} // Changed itinerary to activity
                    NumberOfTickets={activity.NumberOfTickets} // Changed itinerary to activity
                    TotalPrice={activity.TotalPrice} // Changed itinerary to activity
                    price={activity.ActivityId.price} // Changed itinerary to activity //price.range.min
                  />
                  {/* <IconButton
                    onClick={() =>
                      openActivityReviewFormHandler(activity.ActivityId._id)
                    }
                    disabled={!(activity.Status && today > new Date(activity.ActivityId.start_date))}
                  >
                    <RateReviewIcon />
                  </IconButton> */}
                  {/* Add a separate icon button for the tour guide review */}
                  {/* <IconButton onClick={() => openTourGuideReviewFormHandler(activity.ActivityId.author)}>
                <PersonPinIcon />
              </IconButton> */}
                </Box>
              )
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
  /</Box>  </Box>
  );
};

export default MyBookedActivities;
