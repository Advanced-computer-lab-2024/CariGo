import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  MenuItem,
  IconButton,
  Select,
  Checkbox,
  ListItemText,
  InputLabel,
  FormControl,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import NavBar from "./components/TouristNavBar.js";
import GuestNavBar from "../../components/NavBarTourist";
import ItineraryList from "../../components/UserItineraryList.js";

export default function TouristItineraries() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [tourist, setTourist] = useState(true);
  const [filteredItineraries, setFilteredItineraries] = useState([]);
  const [filterInputValues, setFilterInputValues] = useState({
    price: "",
    language: "",
    tags: [],
    startDate: "",
  });
  const [filters, setFilters] = useState({
    price: "",
    language: "",
    tags: [],
    startDate: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [tagNames, setTagNames] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchItineraries();
    fetchTags();
  }, [filters, sortOption]);

  const fetchItineraries = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.price) queryParams.append("price", filters.price);
      if (filters.language) queryParams.append("language", filters.language);
      if (filters.startDate)
        queryParams.append("start_date", new Date(filters.startDate));
      filters.tags.forEach((tag) => queryParams.append("tags", tag));
      if (sortOption) queryParams.append("sort", sortOption);

      const response = await fetch(
        `http://localhost:4000/Event/readAllItineraries/?${queryParams.toString()}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const json = await response.json();
      setItineraries(json);
      setFilteredItineraries(json);
      const token = localStorage.getItem("jwt");
      if (!token) setTourist(false);
    } catch (error) {
      console.log("Error fetching Itineraries:", error);
      setError("Failed to fetch Itineraries. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch("http://localhost:4000/Admin/getTags");
      const data = await response.json();
      setTagNames(data.map((tag) => tag.title));
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterInputValues((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    setFilters(filterInputValues);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      price: "",
      language: "",
      tags: [],
      startDate: "",
    });
    setFilterInputValues({
      price: "",
      language: "",
      tags: [],
      startDate: "",
    });
    setFilteredItineraries(itineraries);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredItineraries(itineraries);
    } else {
      const filtered = itineraries.filter((itinerary) => {
        return (
          (itinerary.title &&
            itinerary.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (itinerary.tag &&
            itinerary.tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (itinerary.Category &&
            itinerary.Category.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
      setFilteredItineraries(filtered);
    }
  };

  const handleTagFilterChange = (event) => {
    const { value } = event.target;
    setFilterInputValues((prevState) => ({
      ...prevState,
      tags: value,
    }));
  };

  return (
    <div>
      {!tourist ? <GuestNavBar /> : <NavBar />}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "left",
              gap: 2, // Adds spacing between elements
              padding: 2, // Adds some padding to the toolbar
              backgroundColor: "#f5f5f5", // Optional background color for aesthetics
              borderRadius: "8px", // Rounds the toolbar edges slightly
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search itineraries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
              sx={{
                width: "50%", // Make the search bar smaller
                maxWidth: "700px", // Limit the width to 300px
                borderRadius: "50px", // Rounded edges for the search bar
                backgroundColor: "#ffffff", // White background for contrast
              }}
            />
            <IconButton
              onClick={() => setIsFilterOpen(true)}
              sx={{
                backgroundColor: "#0D1D25", // Blue background for the button
                color: "#ffffff", // White icon color
                width: "40px", // Set width for circular shape
                height: "40px", // Set height for circular shape
                borderRadius: "50%", // Make it circular
                "&:hover": {
                  backgroundColor: "#115293", // Darker shade on hover
                },
              }}
            >
              <FilterAltIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ padding: "20px" }}>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        <ItineraryList fetched={filteredItineraries} />
      </Box>

      <Dialog
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Filters</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              mt: 2,
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="ratingsAverage">Review</MenuItem>
                <MenuItem value="-createdAt">Creation Date</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Max Price"
              variant="outlined"
              name="price"
              type="number"
              value={filterInputValues.price}
              onChange={handleFilterChange}
            />
            <TextField
              fullWidth
              label="Language"
              variant="outlined"
              name="language"
              value={filterInputValues.language}
              onChange={handleFilterChange}
            />
            <FormControl fullWidth>
              <InputLabel>Tags</InputLabel>
              <Select
                multiple
                value={filterInputValues.tags}
                onChange={handleTagFilterChange}
                renderValue={(selected) => selected.join(", ")}
              >
                {tagNames.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    <Checkbox
                      checked={filterInputValues.tags.indexOf(tag) > -1}
                    />
                    <ListItemText primary={tag} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Start Date"
              variant="outlined"
              name="startDate"
              type="date"
              value={filterInputValues.startDate}
              onChange={handleFilterChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetFilters}>Reset</Button>
          <Button onClick={handleFilter} variant="contained" color="primary">
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
