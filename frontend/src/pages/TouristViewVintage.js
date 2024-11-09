import React, { useState, useEffect } from "react";
import "../styles/index.css";
import ResponsiveAppBar from "./Tourist/components/TouristNavBar";
import { Box, Grid, TextField, Button, MenuItem } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import TouristVintagePost from "../components/TouristVintagePost";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import VintageListTourist from "../components/VintageListTourist";
//import TouristNB from "./Tourist/components/TouristNavBar";
//import vintage from "../../../backend/models/Vintage";
//import vintage from "../../../backend/models/Vintage";





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

const TouristViewVintage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [vintages, setVintages] = useState([]);


  //handles filter menu opening and closing
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  //to show user typed in values
  const [filterInputValues, setFilterInputValues] = useState({
    minPrice: "",
    category: "",
    rating: "",
    startDate: "",
});
//for actual filtering
const [filters, setFilters] = useState({
    tag: "" 
});

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
        tag: "",
      });
      setfilteredVintages(vintages); // Reset to all activities
  };


  const [filteredVintages, setfilteredVintages] = useState(vintages);
 
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
 
  const [searchTerm, setSearchTerm] = useState(""); // For search
 
  //const [selectedTag, setSelectedTag] = useState(""); // For search

     // Fetch vintages
     useEffect(() => {
      const fetchAndProcessVintages = async () => {
        setLoading(true);
        setErrorMessage("");
        try {
          const token = localStorage.getItem("jwt"); // Retrieve the token
          const queryParams = new URLSearchParams();
          if (filters.tags) queryParams.append("tag", filters.tags);
  
          const response = await fetch(
            `http://localhost:4000/Event/readAllVintage/?${queryParams.toString()}`,
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
          const vintagesArray = Array.isArray(json) ? json : [];
          setVintages(vintagesArray);
          setfilteredVintages(vintagesArray); // Initialize filteredVintages with all vintages
  
        } catch (error) {
          console.log("Error fetching vintages:", error);
          setErrorMessage("Failed to fetch vintages. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchAndProcessVintages();
    }, [filters]); // Run effect when filters change
  

const handleSearch = () => {
  if (!searchTerm.trim()) {
      // If searchTerm is empty, show all activities
      setfilteredVintages(vintages);
  } else {
      const filtered = vintages.filter((vintage) => {
          return (vintage.title && vintage.title.toLowerCase().includes(searchTerm.toLowerCase()))
              || (vintage.tag && vintage.tag.toLowerCase().includes(searchTerm.toLowerCase()))
              
      });
      setfilteredVintages(filtered); // Update the filtered activities
  }
};

// const filteredVin = vintages.filter(
//   (vintage) =>
//     (selectedTag
//       ? vintage.tags.some((tag) => tag.includes( selectedTag))
//       : true) &&
//     ((vintage.name &&
//       vintage.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      
//       vintage.tags.some((tag) =>
//         tag.toLowerCase().includes(searchTerm.toLowerCase())
//     ))
//   );


//   // Filter on search term change
//   useEffect(() => {
//     if (!searchTerm.trim()) {
//       setFilteredVintages(vintages); // If no search term, show all vintages
//     } else {
//       const filtered = vintages.filter((vintage) => {
//         return (
//           (vintage.name && vintage.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (vintage.tags && vintage.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
//         );
//       });
//       setFilteredVintages(filtered); // Update the filtered vintages based on the search term
//     }
//   }, [searchTerm, ]); // Run effect when searchTerm or vintages change
        
          


  return (
    <div>
      <ResponsiveAppBar/>
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
                label="tag"
                variant="outlined"
                name="tag"
                value={filters.category}
                onChange={handleFilterChange}
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

     <Box sx={{ 
        height: '100%',
        marginLeft: '100px',
        width: '100%',
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {display: 'none',},
        }}> {/* Enable vertical scrolling only */}

        <VintageListTourist fetchedVintages={filteredVintages} />
      </Box>
    </div>
  );
};

export default TouristViewVintage;

