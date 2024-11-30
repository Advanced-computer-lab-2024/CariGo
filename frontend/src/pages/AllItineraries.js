import React from "react";
import  { useState, useEffect } from 'react';
// import ReactDOM from "react-dom/client";
import "../styles/index.css";
import NavBar from "../components/NavBarTourist";
import { Box } from "@mui/material";
import ItineraryList from "../components/ItirenaryList";
import CreateActivityForm from "../components/CreateActivityForm";
import CreateItineraryForm from "../components/CreateItineraryForm";
import ListOfItineraries from "../components/ListOfItineraries";

import { Grid,Menu, TextField, Button, CircularProgress, Typography, MenuItem } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import UserItineraryPost from '../components/UserItineraryPost';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
//   borderWidth: "2px",
//   borderColor:"#126782",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const AllItineraries = () => {

    const [itineraries, setItineraries] = useState([]);
    const [filters, setFilters] = useState({
        price: "",
        language: "",
        tags: "",
        startDate: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [searchTerm, setSearchTerm] = useState('');
   
    
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const resetFilters = () => {
        setFilters({
            price: "",
            language: "",
            tags: "",
            startDate: "",
        });
        setFilteredActivities(itineraries); // Reset to all activities
    };
    
    const handleSortChange = (sortValue) => {
      setSortOption(sortValue);  // Set the selected sort option
      handleClose();  // Close the menu
    };

    
    const [filteredActivities, setFilteredActivities] = useState(itineraries); // Store filtered results separately

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            // If searchTerm is empty, show all activities
            setFilteredActivities(itineraries);
        } else {
            const filtered = itineraries.filter((itinerary) => {
                return (itinerary.title && itinerary.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    || (itinerary.tags && itinerary.tags.includes(searchTerm))
                    
            });
            setFilteredActivities(filtered); // Update the filtered activities
        }
    };



     // Combined useEffect for Fetching Activities with Filters and Sort



     useEffect(() => {
      const fetchItineraries = async () => {
        try {
          const token = localStorage.getItem("jwt"); // Retrieve the token
          const queryParams = new URLSearchParams();
          if (filters.price) queryParams.append("price", filters.price);
          if (filters.language) queryParams.append("language", filters.language);
          if (filters.tags) queryParams.append("tags", filters.tags);
          if (filters.startDate) queryParams.append("start_date", filters.startDate);
          
          if (sortOption) queryParams.append("sort", sortOption);
  
          const response = await fetch(
            `http://localhost:4000/Event/readAllItineraries/?${queryParams.toString()}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`, // Add token to headers
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
    }, [filters, sortOption]); // Run effect when filters or sort option changes



useEffect(() => {
  let updatedActivities = [...itineraries];

  // Apply filters
  if (filters.price) {
      updatedActivities = updatedActivities.filter(itinerary => itinerary.price <= filters.price);
  }

  if (filters.language) {
      updatedActivities = updatedActivities.filter(itinerary => itinerary.language === filters.language);
  }

  if (filters.tags) {
    updatedActivities = updatedActivities.filter(itinerary => itinerary.tags === filters.tags);
    
    
  }

  if (filters.startDate) {
      updatedActivities = updatedActivities.filter(itinerary => 
          new Date(itinerary.start_date) >= new Date(filters.startDate)
      );
  }

  // Apply search
  if (searchTerm) {
      updatedActivities = updatedActivities.filter(itinerary => 
          itinerary.title && itinerary.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }

  // Apply sorting
  if (sortOption) {
      updatedActivities.sort((a, b) => {
          if (sortOption === 'price') {
              return a.price - b.price;
          } else if (sortOption === 'ratingsAverage') {
              return b.ratingsAverage - a.ratingsAverage;
          } else if (sortOption === '-createdAt') {
              return new Date(b.createdAt) - new Date(a.createdAt);
          }
          return 0; // No sorting applied
      });
  }

  setFilteredActivities(updatedActivities); // Update filtered activities
}, [filters, searchTerm, sortOption]); // Run this effect when any of these change
  


      //   useEffect(() => {
      //     const fetchItenararies = async () => {
      //         setLoading(true);
      //         setError(null);
      //         try {
      //             const queryParams = new URLSearchParams();
                  // if (filters.price) queryParams.append('price', filters.price); // Correct to 'price'
                  // if (filters.language) queryParams.append('language', filters.category); // Correct to 'category'
                  // if (filters.tag) queryParams.append('tags', filters.rating); // Correct to 'rating'
                  // if (filters.startDate) {
                  //     const startDateISO = new Date(filters.startDate).toISOString();
                  //     queryParams.append('start_date', startDateISO); // No change needed
                  // }
                  // if (sortOption) queryParams.append('sort', sortOption);
      
      //             const response = await fetch(`http://localhost:4000/Event/readAllItineraries/?${queryParams.toString()}`,
      //             {
      //                method: 'GET',
      //               //                 headers: {
      //               //                     'Authorization': `Bearer ${token}`,
      //               //                     'Content-Type': 'application/json'
      //               //                 }

      //             }
           
      //           );
      //             if (!response.ok) {
      //                 throw new Error(`HTTP error! status: ${response.status}`);
      //             }
      //             const json = await response.json();
      //             console.log("Fetched activities:", json);
      //             setItineraries(json);
      //             setFilteredActivities(json); // Initialize filteredActivities with all activities
      //         } catch (error) {
      //             console.log('Error fetching activities:', error);
      //             setError('Failed to fetch activities. Please try again later.');
      //         } finally {
      //             setLoading(false);
      //         }
      //     };
      
      //     fetchItenararies();
      // }, [filters, sortOption]); // Re-fetch activities when filters or sort option change
      





  return (
    
    <div>
      <NavBar />
       {/* Filter Form */}
       <form>
                <TextField
                    label="Price"
                    variant="outlined"
                    name="price"
                    value={filters.price}
                    onChange={handleFilterChange}
                    type="number"
                    sx={{ mb: 2, mr: 2 }}
                />
                <TextField
                    label="language"
                    variant="outlined"
                    name="language"
                    value={filters.language}
                    onChange={handleFilterChange}
                    sx={{ mb: 2, mr: 2 }}
                />
                 <TextField
                    label="tags"
                    variant="outlined"
                    name="tags"
                    value={filters.tags}
                    onChange={handleFilterChange}
                    sx={{ mb: 2, mr: 2 }}
                />

                <TextField
                    label="date"
                    variant="outlined"
                    name="date"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    type="date"
                    sx={{ mb: 2, mr: 2 }}
                />
                <Button variant="contained" onClick={resetFilters} sx={{ ml: 2 }}>
                    Reset Filters
                </Button>
            </form>


            {/* END OF FILTER FORM */}
            {/*Search bar*/}
            <Box sx={{display:'flex',}}>
            <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => setSearchTerm(e.target.value)} // Capture search input
            />
          </Search>
          <Button variant="contained" label="search" onClick={handleSearch} sx={{ ml: 2 }}>search</Button>
          </Box>

            {/*Sort Button*/}

            <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{backgroundColor:"#ff4d4d" , color: "white", marginLeft: "50px",marginTop: "30px",}}
            >
                Sort By
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                sx={{width: "200px", }}
                onChange={handleSortChange}
            >
                <MenuItem onClick={() => handleSortChange('price')}>Price</MenuItem>
                <MenuItem onClick={() => handleSortChange('ratingsAverage')}>Review</MenuItem>
                <MenuItem onClick={() => handleSortChange('-createdAt')}>creation date</MenuItem>
              
            </Menu>
            </div>

      
      <Box
        sx={{
          width: "1150px",
          overflow: "hidden",
          margin: "0 auto",
          padding: "20px",
          height: "80vh", // Set a fixed height for the scrolling area
          overflow: "auto", // Enable scrolling
          "&::-webkit-scrollbar": {
            display: "none", // Hides the scrollbar for WebKit browsers (Chrome, Safari)
          },
          //backgroundColor : "aquamarine" ,
        }}
      >
        <Box
          sx={{
            height: "100%",
            marginLeft: "100px",
            width: "100%",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {" "}
          {/* Enable vertical scrolling only */}
          <Grid container spacing={0} sx={{ display: 'flex', flexDirection: 'column', width: '100vw' }}>
            {filteredActivities.map((itinerary, index) => (
                <Grid item key={index} sx={{ display: 'flex', justifyContent: 'left' }}>
                    <UserItineraryPost
                        id={itinerary._id}
                        author={itinerary.author?.username}
                        img={"frontend/public/assets/images/itirenary.png"}
                        start_date={itinerary.start_date}
                        end_date={itinerary.end_date}
                        locations={itinerary.locations}
                        price={itinerary.price}
                        tags={itinerary.tags}
                        transportation={itinerary.transportation}
                        accommodation={itinerary.accommodation}
                        rating={itinerary.ratingsAverage}
                        isBooked={itinerary.isBooked}
                        accessibility={itinerary.accessibility}
                    />
                </Grid>
            ))}
        </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default AllItineraries;
