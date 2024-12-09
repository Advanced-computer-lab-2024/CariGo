import React, { useState, useEffect } from "react";
import ActivityList from "../../components/ActivityListUser.js";
import { Box, TextField, Button, CircularProgress, Typography, IconButton, AppBar, Toolbar, Grid, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TouristNavBar from "./components/TouristNavBar.js";
import GuestNavBar from "./components/GuestNavBar";
import GuestSideBar from "./components/GuestSideBar";
import TouristSideBar from "./components/TouristSideBar";

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
      setLoading(true);
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
        setError(null);
      } catch (error) {
        setError("no activities found");
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
    const emptyFilters = { price: "", category: "", rating: "", startDate: "" };
    setFilters(emptyFilters); // Reset applied filters
    setFilterInputValues(emptyFilters); // Reset input fields
    setFilteredActivities(activities); // Reset displayed activities to the original list
  };

  const handleSearch = () => {
    const filtered = activities.filter((activity) => {
      return (
        (activity.title && activity.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        // (activity?.tag && activity?.tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (activity.Category && activity.Category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setFilteredActivities(filtered);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
    {/* Sidebar */}
    <Box>
      {!tourist ? <GuestSideBar /> : <TouristSideBar />}
    </Box>

    {/* Main Content Area */}
    <Box
      sx={{
        flexGrow: 1,
        marginLeft: "80px", // Sidebar width
        marginTop: "64px", // AppBar height
        padding: "16px",
      }}
    >
      {/* Top Navbar */}
      {!tourist ? <GuestNavBar /> : <TouristNavBar />}
      
      {/* AppBar with Search Bar and Filter Button */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent" elevation={0} sx={{ backgroundColor: "white", padding: "16px", borderRadius: "8px" , paddingLeft:"4%"}}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 , width:'60%'}}>
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
            {/* <IconButton onClick={() => setIsFilterOpen(true)} sx={{ backgroundColor: "#00355a", color: "#ffffff", "&:hover": { backgroundColor: "#1a4975" } }}>
              <FilterAltIcon />
            </IconButton> */}
          </Toolbar>
        </AppBar>
      </Box>
      {/* filters */}
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent:"space-between",gap: "20px",
         width:'80%', ml:'5%' , backgroundColor:'#ff6b35' ,padding:'10px', borderRadius:'5px', alignSelf:'center'}}>
            <FormControl sx={{ flex: 1, minWidth: "150px" }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)} label="Sort By" sx={{ backgroundColor: "white" }}>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="ratingsAverage">Review</MenuItem>
                <MenuItem value="-createdAt">Creation Date</MenuItem>
              </Select>
            </FormControl>
            <TextField  label="Max Price" variant="outlined" name="price" type="number" value={filterInputValues.price} 
            onChange={handleFilterChange} sx={{ flex: 1, minWidth: "150px",backgroundColor: "white",borderRadius: "5px",width:'20%'}}/>
            <TextField  label="Category" variant="outlined" name="category" value={filterInputValues.category} 
            onChange={handleFilterChange} sx={{flex: 1, minWidth: "150px", backgroundColor: "white",borderRadius: "5px",}}/>
            <TextField  label="Rating" variant="outlined" name="rating" value={filterInputValues.rating} 
            onChange={handleFilterChange} sx={{ flex: 1, minWidth: "150px",backgroundColor: "white",borderRadius: "5px",}} type="number" />
            <TextField   variant="outlined" name="startDate" value={filterInputValues.startDate} 
            onChange={handleFilterChange} sx={{ flex: 1, minWidth: "150px",backgroundColor: "white",borderRadius: "5px",}} type="date" />
            <Button variant="contained" onClick={handleFilter} sx={{ backgroundColor: "#00355a", color: "#ffffff", }}>
            Apply Filters
          </Button>
          <Button variant="outlined" onClick={resetFilters} sx={{ color: "white", borderColor:'white',}}>
            Reset
          </Button>
          </Box>

      {/* Content Area */}
      <Box sx={{ padding: "20px",}}>
        {loading ? (
          <CircularProgress sx={{color:"#00355a", m:'2% 5%', fontSize:'20px'}}/>
        ) : error ? (
          <Typography sx={{color:"#00355a", m:'2% 5%', fontSize:'20px'}}>{error}</Typography>
        ) : (
          <ActivityList fetchedActivities={filteredActivities} />
        )}
      </Box>

      {/* Filter Dialog */}
      {/* <Dialog open={isFilterOpen} onClose={() => setIsFilterOpen(false)} fullWidth maxWidth="sm">
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
      </Dialog> */}
    </Box>
     </Box>
 );
}
