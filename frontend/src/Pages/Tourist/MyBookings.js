import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import TouristNB from "./components/TouristNavBar";
import { Box,Grid,Menu,TextField,Button,IconButton,CircularProgress,Typography,MenuItem,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import BookingCard from "./components/BookingCard";
import RateReviewIcon from "@mui/icons-material/RateReview"; // Review icon for itinerary
import PersonPinIcon from "@mui/icons-material/PersonPin"; // New icon for Tour Guide review
import ItineraryReviewForm from "../../components/itineraryReviewForm.js"; // Import the itinerary review form
import TourGuideReviewForm from "../../components/TourGuideReviewForm.js"; // Import the new Tour Guide review form


const MyBookings = () => {
  const [itineraries, setItineraries] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [filters, setFilters] = useState({
    status: "All",
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

    // status filtering
    useEffect(() => {
      const filtered = itineraries.filter((itinerary) => {
        // Filtering based on status
        const itineraryStartDate = new Date(itinerary.ItineraryId.start_date);
        const today = new Date();
        const matchesStatus =
          filters.status === "All"
            ? true
            : filters.status === "Booked"
            ? itinerary.Status === true && itineraryStartDate >= today
            : filters.status === "Canceled Bookings"
            ? itinerary.Status === false
            : filters.status === "Done"
            ? itinerary.Status === true && itineraryStartDate < today
            : false;
        return matchesStatus;
      });
  
      setFilteredActivities(filtered);
    }, [itineraries, filters]); // Re-run the filtering logic whenever activities, filters
  
     // Function to handle search by title
     const handleSearch = () => {
      const filtered = itineraries.filter((itinerary) => {
        return itinerary.ItineraryId?.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setFilteredActivities(filtered);
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
          sx={{height: "80vh", width: "80%", overflow: "auto",ml:'10%',
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Box sx={{display:'flex', flexDirection:'column', width: '100%',marginTop:'-1%'}}>
            {filteredActivities.map((itinerary, index) => (
               <Box item key={itinerary._id} sx={{ justifyContent: "left" , width:'70%',margin:'2%'}}>
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
                {/* <IconButton
                  onClick={() =>
                    openReviewFormHandler(itinerary.ItineraryId._id)
                  }
                  disabled={option !== "Done"}
                >
                  <RateReviewIcon />
                </IconButton> */}
                {/* Add a separate icon button for the tour guide review */}
                <Box sx={{display: "flex",gap:'0%', alignItems:'center'}}>
                <IconButton
                  onClick={() =>
                    openTourGuideReviewFormHandler(itinerary.ItineraryId.author)
                  }
                  disabled={option !== "Done"}
                >
                  <PersonPinIcon />
                </IconButton>
                <Typography sx={{fontSize:'14px', color:'gray'}}>rate Tour Guide</Typography>
              </Box>
              </Box>
            ))}
          </Box>
        </Box>
      {/* Render the itinerary review form dialog */}
      {/* {selectedItineraryId && (
        <ItineraryReviewForm
          itineraryId={selectedItineraryId}
          open={openReviewForm}
          onClose={closeReviewFormHandler}
        />
      )} */}

      {/* Render the tour guide review form dialog */}
      {selectedTourGuideId && openTourGuideReviewForm && (
        <TourGuideReviewForm
          tourGuideId={selectedTourGuideId}
          open={openTourGuideReviewForm}
          onClose={closeTourGuideReviewFormHandler}
        />
      )}
    </Box>
  );
};

export default MyBookings;
