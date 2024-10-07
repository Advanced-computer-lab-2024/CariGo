import React, { useState, useEffect } from 'react';
import ActivityPost from "../../components/ActivityPost.js";
import { Grid, Box, Menu, TextField, Button, CircularProgress, Typography, MenuItem } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import TouristNB from "./components/TouristNavBar.js"


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
  
  
  
  export default function ActivityList() {
      const [activities, setActivities] = useState([]);
      const [filters, setFilters] = useState({
          minPrice: "",
          category: "",
          rating: "",
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
              category: "",
              rating: "",
              startDate: "",
          });
          setFilteredActivities(activities); // Reset to all activities
      };
      
      const handleSortChange = (sortValue) => {
        setSortOption(sortValue);  // Set the selected sort option
        handleClose();  // Close the menu
      };
  
      
  
     
      const StringDate = (date) => {
          const d = new Date(date);
          const day = String(d.getDate()).padStart(2, '0');
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const year = d.getFullYear();
          return `${day}/${month}/${year}`;
      };
  
      const calculateDuration=(date1,date2)=>{
          const start = new Date(date1);
          const end = new Date(date2);
          
          // Calculate differences
          const years = end.getFullYear() - start.getFullYear();
          const months = end.getMonth() - start.getMonth() + (years * 12);
          const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
          const weeks = Math.floor(days / 7);
        
          // Determine the largest unit
          if (years > 0) {
            return `${years} year${years > 1 ? 's' : ''}`;
          } else if (months > 0) {
            return `${months} month${months > 1 ? 's' : ''}`;
          } else if (weeks > 0) {
            return `${weeks} week${weeks > 1 ? 's' : ''}`;
          } else {
            return `${days} day${days > 1 ? 's' : ''}`;
          }
      }
  
     
  
  
      
      const [filteredActivities, setFilteredActivities] = useState(activities); // Store filtered results separately
  
      const handleSearch = () => {
          if (!searchTerm.trim()) {
              // If searchTerm is empty, show all activities
              setFilteredActivities(activities);
          } else {
              const filtered = activities.filter((activity) => {
                  return (activity.title && activity.title.toLowerCase().includes(searchTerm.toLowerCase()))
                      || (activity.tag && activity.tag.toLowerCase().includes(searchTerm.toLowerCase()))
                      || (activity.Category && activity.Category.toLowerCase().includes(searchTerm.toLowerCase()));
              });
              setFilteredActivities(filtered); // Update the filtered activities
          }
      };
  
  
  
       // Combined useEffect for Fetching Activities with Filters and Sort
       useEffect(() => {
          const fetchActivities = async () => {
              setLoading(true);
              setError(null);
              try {
                  const queryParams = new URLSearchParams();
                  if (filters.price) queryParams.append('price', filters.price);
                  if (filters.category) queryParams.append('Category', filters.category);
                  if (filters.rating) queryParams.append('ratingsAverage', filters.rating);
                  if (filters.startDate) {
                      const startDateISO = new Date(filters.startDate).toISOString();
                      queryParams.append('start_date', startDateISO);
                  }
                  if (sortOption) queryParams.append('sort', sortOption);
  
                  const response = await fetch(`http://localhost:4000/Carigo/Activity/?${queryParams.toString()}`);
                  if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  const json = await response.json();
                  console.log("Fetched activities:", json);
                  setActivities(json);
                  setFilteredActivities(json); // Initialize filteredActivities with all activities
              } catch (error) {
                  console.log('Error fetching activities:', error);
                  setError('Failed to fetch activities. Please try again later.');
              } finally {
                  setLoading(false);
              }
              console.log("fetched activities:",filteredActivities)
          };
  
          fetchActivities();
      }, [filters, sortOption]); // Re-fetch activities when filters or sort option change
  
  
   
      return (
        <Box sx={{ width: '100vw' }}>
            {/* Navigation Bar */}
            <TouristNB />  {/* Ensure you import NavBar at the top of your file */}
    
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
                    label="Category"
                    variant="outlined"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    sx={{ mb: 2, mr: 2 }}
                />
                <TextField
                    label="Rating"
                    variant="outlined"
                    name="rating"
                    value={filters.rating}
                    onChange={handleFilterChange}
                    type="number"
                    sx={{ mb: 2, mr: 2 }}
                />
                <TextField
                    label="Start Date"
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
    
            {/* END OF FILTER FORM */}
    
            {/* Search bar */}
            <Box sx={{ display: 'flex' }}>
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
    
            {/* Sort Button */}
            <div>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{ backgroundColor: "#ff4d4d", color: "white", marginLeft: "50px", marginTop: "30px", }}
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
                    sx={{ width: "200px", }}
                >
                    <MenuItem onClick={() => handleSortChange('price')}>Price</MenuItem>
                    <MenuItem onClick={() => handleSortChange('ratingsAverage')}>Review</MenuItem>
                    <MenuItem onClick={() => handleSortChange('-createdAt')}>Creation Date</MenuItem>
                </Menu>
            </div>
    
            {/* Loading State */}
            {loading && <CircularProgress />}
    
            {/* Error Message */}
            {error && <Typography color="error">{error}</Typography>}
    
            {/* Activity List */}
            {filteredActivities.length > 0 ? (
                <Grid container spacing={2}>
                    {filteredActivities.map((activity) => (
                        <Grid item key={activity._id}>
                            <ActivityPost
                                id={activity._id}
                                start_date={StringDate(activity.start_date)}
                                end_date={StringDate(activity.end_date)}
                                location={activity.locations}
                                duration={calculateDuration(activity.start_date, activity.end_date)}
                                price={activity.price}
                                category={activity.Category}
                                rating={activity.ratingsAverage}
                                discount={activity.discount}
                                isOpened={activity.isOpened ? 'open' : 'closed'}
                                title={activity.title}
                                tag={activity.tag}
                                description={activity.description}
                                img={activity.img}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography>No activities found.</Typography>
            )}
        </Box>
    );
    
  }
  