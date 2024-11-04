import React, { useState, useEffect } from 'react';
import ActivityList from '../../components/ActivityListUser.js';
import {  Box, Menu, TextField, Button, CircularProgress, Typography, MenuItem ,IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import NavBar from './components/TouristNavBar.js';

export default function TouristViewActivities (){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const [activities, setActivities] = useState([]);
  
  //to show user typed in values
    const [filterInputValues, setFilterInputValues] = useState({
        minPrice: "",
        category: "",
        rating: "",
        startDate: "",
    });
    //for actual filtering
    const [filters, setFilters] = useState({
        minPrice: "",
        category: "",
        rating: "",
        startDate: "",
       
    });
    
    //handles filter menu opening and closing
    const [anchorEl, setAnchorEl] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
  
    const handleFilterClick = (event) => {
      if (isFilterOpen) {
        handleFilterClose();
      } else {
        setAnchorEl(event.currentTarget);
        setIsFilterOpen(true);
      }
    };
  
    const handleFilterClose = () => {
      setAnchorEl(null);
      setIsFilterOpen(false);
    };
  
  
    // handles if filter value changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        //console.log(`Changing ${name} to ${value}`);
        setFilterInputValues(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };
  
    const handleFilter = () => {
      // Perform filter action using the `filters` object
      setFilters(filterInputValues);
      console.log('Filters applied:', filters);
      handleFilterClose();
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
  
  //handling sort
    const [anchorE2, setAnchorE2] = useState(null);
    const [sortOption, setSortOption] = useState('');
    
    const handleSortClick = (event) => {
        setAnchorE2(event.currentTarget);
       
    };
  
    const handleSortClose = () => {
      setAnchorE2(null);
      
    };
  
    const handleSortChange = (sortValue) => {
      setSortOption(sortValue);  // Set the selected sort option
      handleSortClose();  // Close the menu
    };
  
    
    const [filteredActivities, setFilteredActivities] = useState(activities); // Store filtered results separately
  
     // Combined useEffect for Fetching Activities with Filters and Sort
     useEffect(() => {
        const fetchActivities = async () => {
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
                //setError('Failed to fetch activities. Please try again later.');
            } finally {
                setLoading(false);
            }
            console.log("fetched activities:",filteredActivities)
        };
  
        fetchActivities();
    }, [filters, sortOption ]); // Re-fetch activities when filters or sort option change
  
    //handlign searching
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleSearch = () => {
      console.log("search term "+searchTerm);
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
  
    return(
      <div>
      <NavBar/>
  
      <Box sx={{
        width:'1150px' ,
        overflow: 'hidden',
        margin: '0 auto', 
        padding:'20px',
        height: '80vh', // Set a fixed height for the scrolling area
         
        '&::-webkit-scrollbar': {
        display: 'none', // Hides the scrollbar for WebKit browsers (Chrome, Safari)
      },
        }}>
  
              {/*Search bar*/}
              <Box sx={{marginLeft:"120px",}}>
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
                    
                  }}
                  variant="outlined"
                  placeholder="Search..."
                  size="small"
                />
                <IconButton type="submit" aria-label="search" 
                sx={{ width:"40px", height:"40px",
                 marginBottom:"-5px",
                 marginLeft:"-3px",
                 backgroundColor: "#ff4d4d", 
                    color: "white", 
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#e63939"
                    } 
                 }}>
                  <SearchIcon  onClick={handleSearch} 
                  sx={{ 
                    
                  }}
                  />
                </IconButton>
              </Box>
              {/*End of Search bar*/}
  
                <Box sx={{display:'flex',
                 flexDirection: anchorEl ? 'column' : 'row' ,
                  marginTop: '30px',marginLeft :'120px',}}> {/* for filter and sort next to each other*/}
                  
                {/*Filter menu*/}
                <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  
                  }}
                  
                >
                <FilterAltIcon
                onClick={handleFilterClick}
                sx={{
                  color : "gray",
                }}
              >
              </FilterAltIcon>
              {Boolean(anchorEl) && ( // Conditional rendering based on anchorEl
                <Box
                  sx={{
                    //padding: '20px',
                    paddingTop:'10px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '20px',
                    backgroundColor: 'white', 
                    borderColor: '1px solid #ff4d4d', 
                    width: '900px',
                  }}
                >
                <Box sx={{display:'flex'}}>
                  <TextField
                      label="Price"
                      variant="outlined"
                      name="price"
                      value={filterInputValues.price}
                      onChange={handleFilterChange}
                      type="number"
                      sx={{ mb: 2, mr: 2 , marginLeft :'10px',}}
                  />
                  <TextField
                      label="Category"
                      variant="outlined"
                      name="category"
                      value={filterInputValues.category}
                      onChange={handleFilterChange}
                      type="text"
                      sx={{ mb: 2, mr: 2 }}
                  />
                  <TextField
                      label="Rating"
                      variant="outlined"
                      name="rating"
                      value={filterInputValues.rating}
                      onChange={handleFilterChange}
                      type="number"
                      sx={{ mb: 2, mr: 2 }}
                  />
  
                  <TextField
                      //label="Start Date"
                      variant="outlined"
                      name="startDate"
                      value={filterInputValues.startDate}
                      onChange={handleFilterChange}
                      type="date"
                      sx={{ mb: 2, mr: 2 }}
                  />
                  </Box>
                  <Box sx={{display:'flex',}}>
                  <Button variant="contained" onClick={handleFilter} sx={{ ml: 2 , backgroundColor: '#ff4d4d' , width : '50px',}}>
                      Filter
                  </Button>
                  <Button variant="contained" onClick={resetFilters} sx={{ ml: 2 ,backgroundColor: '#ff4d4d',width : '50px'}}>
                      Reset 
                  </Button>
                  </Box>
                  </Box>
                  )}
              </Box>
              {/* END OF FILTER MENU */}
  
              {/*Sort Button*/}
  
              <Box sx={{marginLeft : anchorEl? '800px':'770px'}}>
              <Button
                  id="basic-button"
                  aria-controls={Boolean(anchorE2) ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={Boolean(anchorE2) ? 'true' : undefined}
                  onClick={handleSortClick}
                  sx={{backgroundColor:"#ff4d4d" , color: "white",}}
              >
                  Sort By
              </Button>
              <Menu
                  id="basic-menu"
                  anchorEl={anchorE2}
                  open={Boolean(anchorE2)}
                  onClose={handleSortClose}
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
              </Box>
              {/*END OF SORT */}
              </Box>
              {/* Loading State */}
              {loading && <CircularProgress />}
  
              {/* Error Message */}
              {error && <Typography color="error">{error}</Typography>}
  
  
      <Box sx={{ 
        height: '100%',
        marginLeft: '100px',
        width: '100%',
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        overflowX: 'hidden',
        overflowY: 'auto', 
        '&::-webkit-scrollbar': {display: 'none',},
        }}> {/* Enable vertical scrolling only */}
  
        <ActivityList fetchedActivities={filteredActivities} />
  
        </Box>
    </Box>
    </div>
    
  );
  }

  
  