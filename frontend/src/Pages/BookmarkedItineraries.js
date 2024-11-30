import React, { useState, useEffect } from "react";
import "../styles/index.css";
import TouristNB from "./Tourist/components/TouristNavBar";
import { Box, Button, TextField, CircularProgress, Typography, Menu, MenuItem } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import UserItineraryPost from "../components/UserItineraryPost";
import { Grid } from '@mui/material'; // Add this import

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const BookmarkedItineraries = () => {
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredActivities, setFilteredActivities] = useState([]);

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
  };

  const handleSortChange = (sortValue) => {
    setSortOption(sortValue);
    handleClose();
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredActivities(itineraries);
    } else {
      const filtered = itineraries.filter(itinerary =>
        itinerary.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredActivities(filtered);
    }
  };
  const fetchAuthor = async (authorId) => {
    const response = await fetch(`http://localhost:4000/cariGo/users/${authorId}`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    const authorData = await response.json();
    return authorData;
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
        `http://localhost:4000/Event/readItinerariesByIds/?ids=${savedItineraryIds.join(",")}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!savedItinerariesResponse.ok) {
        console.error(`Failed to fetch saved itineraries: ${savedItinerariesResponse.status}`);
        return;
      }

      const savedItineraries = await savedItinerariesResponse.json();
      console.log(savedItineraries);

      //setItineraries(savedItineraries);

      setFilteredActivities(savedItineraries); // Initialize filtered activities
    } catch (error) {
      console.error("Error fetching saved itineraries:", error);
    }
  };

  useEffect(() => {
    fetchSavedItineraries();
  }, []);

  useEffect(() => {
    let updatedActivities = [...itineraries];

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
      updatedActivities = updatedActivities.filter(itinerary => new Date(itinerary.start_date) >= new Date(filters.startDate));
    }
    if (searchTerm) {
      updatedActivities = updatedActivities.filter(itinerary => itinerary.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (sortOption) {
      updatedActivities.sort((a, b) => {
        if (sortOption === 'price') {
          return a.price - b.price;
        } else if (sortOption === 'ratingsAverage') {
          return b.ratingsAverage - a.ratingsAverage;
        } else if (sortOption === '-createdAt') {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
      });
    }

    setFilteredActivities(updatedActivities);
  }, [filters, searchTerm, sortOption, itineraries]);

  return (
    <div>
      <TouristNB />

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
          label="Language"
          variant="outlined"
          name="language"
          value={filters.language}
          onChange={handleFilterChange}
          sx={{ mb: 2, mr: 2 }}
        />
        <TextField
          label="Tags"
          variant="outlined"
          name="tags"
          value={filters.tags}
          onChange={handleFilterChange}
          sx={{ mb: 2, mr: 2 }}
        />
        <TextField
          label="Date"
          variant="outlined"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          type="date"
          sx={{ mb: 2, mr: 2 }}
        />
        <Button variant="contained" onClick={resetFilters} sx={{ ml: 2 }}>
          Reset Filters
        </Button>
      </form>

      {/* Search Bar */}
      <Box sx={{ display: 'flex' }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Search>
        <Button variant="contained" onClick={handleSearch} sx={{ ml: 2 }}>
          Search
        </Button>
      </Box>

      {/* Sort Button */}
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ backgroundColor: "#ff4d4d", color: "white", marginLeft: "50px", marginTop: "30px", borderRadius: "5px", padding: "10px", textTransform: "none" }}
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
        >
          <MenuItem onClick={() => handleSortChange('price')}>Price</MenuItem>
          <MenuItem onClick={() => handleSortChange('ratingsAverage')}>Rating</MenuItem>
          <MenuItem onClick={() => handleSortChange('-createdAt')}>Newest</MenuItem>
        </Menu>
      </div>

      {/* Display Filtered Itineraries */}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Error loading itineraries</Typography>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
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
      )}
    </div>
  );
};

export default BookmarkedItineraries;
