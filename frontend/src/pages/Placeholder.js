import React, { useState, useEffect } from 'react';
import ActivityPost from "./ActivityPost.js";
import { Grid, Box, TextField, Button, CircularProgress, Typography, MenuItem } from '@mui/material';

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
            [name]: value // Update the corresponding filter in state
        }));
    };

    const handleFilterSubmit = (event) => {
        event.preventDefault();
    };

    const resetFilters = () => {
        setFilters({
            minPrice: "",
            category: "",
            rating: "",
            startDate: "",
           
        });
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

    useEffect(() => {
        const fetchActivities = async () => {
            setLoading(true);
            setError(null);
            try {
                const queryParams = new URLSearchParams();
                if (filters.minPrice) queryParams.append('price.min', filters.minPrice);
                if (filters.category) queryParams.append('Category', filters.category);
                if (filters.rating) queryParams.append('ratingsAverage', filters.rating);
                
                // Include start_date in the query params
                if (filters.startDate) {
                    queryParams.append('start_date', filters.startDate); // Only date
                }
                // Fetch activities from the updated URL
                const response = await fetch(`http://localhost:4000/Carigo/Activity/?${queryParams.toString()}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const json = await response.json();
                console.log("Fetched activities:", json);
                setActivities(json);
            } catch (error) {
                console.log('Error fetching activities:', error);
                setError('Failed to fetch activities. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, [filters]); // Re-fetch activities when filters change


    
    useEffect(() => {
        // Fetch activities from the backend API
        const fetchActivities = async () => {
            try {
                const response = await fetch(`/cariGo/activity?sort=${sortOption}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                console.log("Fetched activities:", json);
                setActivities(json); // Set activities if response is okay
            } catch (error) {
                console.log('Error fetching activities:', error);
            }
        };

        fetchActivities(); // Call the function to fetch activities
    }, [sortOption]);

    
    return (
        <Box sx={{ width: '100vw' }}>

            {/* Filter Form */}
            <form onSubmit={handleFilterSubmit}>
                <TextField
                    label="Min Price"
                    variant="outlined"
                    name="minPrice"
                    value={filters.minPrice}
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
              
                <Button variant="contained" type="submit">
                    Apply Filters
                </Button>
                <Button variant="outlined" onClick={resetFilters} sx={{ ml: 2 }}>
                    Reset Filters
                </Button>
            </form>


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

            {/* Loading State */}
            {loading && <CircularProgress />}

            {/* Error Message */}
            {error && <Typography color="error">{error}</Typography>}

            {/* Activity List */}
            <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                {activities.map((activity) => (
                    <Grid item key={activity._id} size={4}>
                        <ActivityPost
                            id={activity._id}
                            start_date={StringDate(activity.start_date)}
                            end_date={StringDate(activity.end_date)}
                            location={activity.location}
                            duration={calculateDuration(activity.start_date,activity.end_date)}
                            price={activity.price}
                            category={activity.category}
                            rating={activity.ratingsAverage}
                            discount={activity.discount}
                            isOpened={activity.isOpened ? "open" : "closed"}
                            title={activity.title}
                            tags={activity.tags}
                            description={activity.description}
                            img={activity.img}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
