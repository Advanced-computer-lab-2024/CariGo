import React, { useState, useEffect } from "react";
import ActivityList from "../../components/ActivityListUser.js";
import { Box, TextField, Button, CircularProgress, Typography, IconButton, AppBar, Toolbar, Grid, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import NavBar from "./components/TouristNavBar.js";
import GuestNavBar from "../../components/NavBarTourist";

export default function TouristViewVintage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);
  const [tourist, setTourist] = useState(true);
  const [filterInputValues, setFilterInputValues] = useState({ price: "", category: "", rating: "", startDate: "" });
  const [filters, setFilters] = useState({ price: "", category: "", rating: "", startDate: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filteredActivities, setFilteredActivities] = useState(activities);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Fetch activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (filters.price) queryParams.append("price", filters.price);
        if (filters.category) queryParams.append("Category", filters.category);
        if (filters.rating) queryParams.append("ratingsAverage", filters.rating);
        if (filters.startDate) queryParams.append("start_date", new Date(filters.startDate).toISOString());
        if (sortOption) queryParams.append("sort", sortOption);
        
        const response = await fetch(`http://localhost:4000/Carigo/Activity/?${queryParams.toString()}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const json = await response.json();
        setActivities(json);
        setFilteredActivities(json);
        
        const token = localStorage.getItem("jwt");
        if (!token) setTourist(false);
      } catch (error) {
        setError("Failed to fetch activities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [filters, sortOption]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterInputValues((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleFilter = () => {
    setFilters(filterInputValues);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters({ price: "", category: "", rating: "", startDate: "" });
    setFilteredActivities(activities); 
  };

  const handleSearch = () => {
    const filtered = activities.filter((activity) => {
      return (
        (activity.title && activity.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (activity.tag && activity.tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (activity.Category && activity.Category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setFilteredActivities(filtered);
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {!tourist ? <GuestNavBar /> : <NavBar />}
      
      {/* AppBar with Search Bar and Filter Button */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent" elevation={0} sx={{ backgroundColor: "#ffffff", padding: "16px", borderRadius: "8px" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
              sx={{ width: "50%", borderRadius: "50px", backgroundColor: "#ffffff", "& .MuiOutlinedInput-root": { borderRadius: "50px" } }}
            />
            <IconButton onClick={() => setIsFilterOpen(true)} sx={{ backgroundColor: "#00355a", color: "#ffffff", "&:hover": { backgroundColor: "#1a4975" } }}>
              <FilterAltIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Content Area */}
      <Box sx={{ padding: "20px" }}>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        <ActivityList fetchedActivities={filteredActivities} />
      </Box>

      {/* Filter Dialog */}
      <Dialog open={isFilterOpen} onClose={() => setIsFilterOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Filters</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)} label="Sort By">
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="ratingsAverage">Review</MenuItem>
                <MenuItem value="-createdAt">Creation Date</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth label="Max Price" variant="outlined" name="price" type="number" value={filterInputValues.price} onChange={handleFilterChange} />
            <TextField fullWidth label="Category" variant="outlined" name="category" value={filterInputValues.category} onChange={handleFilterChange} />
            <TextField fullWidth label="Rating" variant="outlined" name="rating" value={filterInputValues.rating} onChange={handleFilterChange} type="number" />
            <TextField fullWidth label="Start Date" variant="outlined" name="startDate" value={filterInputValues.startDate} onChange={handleFilterChange} type="date" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleFilter} sx={{ backgroundColor: "#00355a", color: "#ffffff" }}>
            Apply Filters
          </Button>
          <Button variant="outlined" onClick={resetFilters} sx={{ color: "#00355a" }}>
            Reset Filters
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
