import React, { useState, useEffect } from 'react';
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
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TouristNavBar from './components/TouristNavBar.js';
import GuestNavBar from "./components/GuestNavBar";
import TouristSideBar from './components/TouristSideBar.js';
import GuestSideBar from "./components/GuestSideBar";
import VintageList from "../../components/VintageListTourist";
import SelectTags from '../../components/SelectTags.js';
import { Tag } from '@mui/icons-material';
import { parseISO } from 'date-fns';

export default function TouristItineraries (){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const [vintages, setVintages] = useState([]);
    const [tourist, setTourist] = useState(true);
    const [filteredVintages, setFilteredVintages] = useState(vintages); // Store filtered results separately

  //to show user typed in values
    const [filterInputValues, setFilterInputValues] = useState({
        tag: [],
    });
    //for actual filtering
    const [filters, setFilters] = useState({
      tag: [],
    });
    
    
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
    //handleFilterClose();
  };

  const resetFilters = () => {
      setFilters({
          tag: [],
      });
      setFilterInputValues({
        tag: [],
    });
      setFilteredVintages(vintages); // Reset to all activities
  };
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
  

     // Combined useEffect for Fetching Itineraries with Filters and Sort
     useEffect(() => {
        const fetchVintages = async () => {
          setLoading(true);
            try {
              const queryParams = new URLSearchParams();
              if(filters.tag) {
                if (Array.isArray(filters.tag) && filters.tag.length > 0) {
                  filters.tag.forEach(tag => {
                    queryParams.append("tags", tag); // Append each tag individually
                  });
                }
              }
                const response = await fetch( `http://localhost:4000/Event/readAllVintage/?${queryParams.toString()}`);
                console.log( `http://localhost:4000/Event/readAllVintage/?${queryParams.toString()}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                console.log("Fetched Itineraries:", json);
                setVintages(json);
                setFilteredVintages(json); // Initialize filteredItineraries with all Itineraries
                const token = localStorage.getItem('jwt');
                if (!token) setTourist(false);
            } catch (error) {
                console.log('Error fetching Itineraries:', error);
                //setError('Failed to fetch Itineraries. Please try again later.');
            } finally {
                setLoading(false);
            }
            console.log("fetched vintages:",filteredVintages)
        };
  
        fetchVintages();
    }, [filters ]); // Re-fetch Itineraries when filters or sort option change
  
    //handlign searching
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleSearch = () => {
      console.log("search term "+searchTerm);
        if (!searchTerm.trim()) {
            // If searchTerm is empty, show all Itineraries
            setFilteredVintages(vintages);
        } else {
            const filtered = vintages.filter((vintage) => {
              return (
                (vintage.name && vintage.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (vintage.tags && vintage.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
              );
            });
            setFilteredVintages(filtered); // Update the filtered itineraries
        }
    };

    const [tagNames, setTagNames]=useState('');

    useEffect(() => {
      const fetchTags = async () => {
        try {
          const response = await fetch('http://localhost:4000/Admin/getTags');
          const data = await response.json();
          const tagNames = data.map(tag => tag.title);
          setTagNames(tagNames);
        } catch (error) {
          console.error('Error fetching tags:', error);
        }
      };
  
      fetchTags();
    }, []);

    // Method to handle tag selection changes
    const handleTagFilterChange = (event) => {
      const { value } = event.target;  // Get the new selected tags
      setFilterInputValues((prevState) => ({
        ...prevState,
        tag: value,  // Update the tags in filterInputValues
      }));
    };
  
    return(
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
              placeholder="Search historical places..."
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
         width:'40%', ml:'5%' , backgroundColor:'#ff6b35' ,padding:'10px', borderRadius:'5px', alignSelf:'center'}}>
           <FormControl sx={{ flex: 1, minWidth: "150px" }}>
              <InputLabel>Tags</InputLabel>
              <Select multiple value={filterInputValues.tags} onChange={handleTagFilterChange}
                renderValue={(selected) => selected.join(", ")} sx={{ backgroundColor: "white" }}
              >
              </Select>
            </FormControl>
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
          <VintageList fetchedVintages={filteredVintages} />
        )}
      </Box>
{/* 
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
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Tags</InputLabel>
              <Select
                multiple
                value={filterInputValues.tags}
                onChange={handleTagFilterChange}
                renderValue={(selected) => selected.join(", ")}
              >
                {/* {tagNames.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    <Checkbox
                      checked={filterInputValues.tags.indexOf(tag) > -1}
                    />
                    <ListItemText primary={tag} />
                  </MenuItem>
                ))} 
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetFilters}>Reset</Button>
          <Button onClick={handleFilter} variant="contained" sx={{ backgroundColor: "#00355a" }}>
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
        </Box>

  );
  }

  
  
