import React, { useState, useEffect } from "react";
import "../styles/index.css";
import NavBar from "../components/NavBarTourist";
import { Box, Grid, TextField, Button, MenuItem } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import TouristVintagePost from "../components/TouristVintagePost";
import TouristNB from "./Tourist/components/TouristNavBar";
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
  const [vintages, setVintages] = useState([]);
  const [filteredVintages, setFilteredVintages] = useState([]); // For filtered vintages
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
  const [filters, setFilters] = useState({ tag: "" }); // Filter by tag
  const [searchTerm, setSearchTerm] = useState(""); // For search
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedTag, setSelectedTag] = useState(""); // For search


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
        ...prevFilters,
        [name]: value
    }));
};

const resetFilters = () => {
  setFilters({
      
      tag: "",
      
  });
  setFilteredVintages(vintages); // Reset to all activities
};


const handleSearch = () => {
  if (!searchTerm.trim()) {
      // If searchTerm is empty, show all activities
      setFilteredVintages(vintages);
  } else {
      const filtered = vintages.filter((vintage) => {
          return (vintage.title && vintage.title.toLowerCase().includes(searchTerm.toLowerCase()))
              || (vintage.tag && vintage.tag.toLowerCase().includes(searchTerm.toLowerCase()))
              
      });
      setFilteredVintages(filtered); // Update the filtered activities
  }
};

const filteredVin = vintages.filter(
  (vintage) =>
    (selectedTag
      ? vintage.tags.some((tag) => tag.includes( selectedTag))
      : true) &&
    ((vintage.name &&
      vintage.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      
      vintage.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

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
        setFilteredVintages(vintagesArray); // Initialize filteredVintages with all vintages

      } catch (error) {
        console.log("Error fetching vintages:", error);
        setErrorMessage("Failed to fetch vintages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessVintages();
  }, [filters]); // Run effect when filters change

  // Filter on search term change
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredVintages(vintages); // If no search term, show all vintages
    } else {
      const filtered = vintages.filter((vintage) => {
        return (
          (vintage.name && vintage.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (vintage.tags && vintage.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
        );
      });
      setFilteredVintages(filtered); // Update the filtered vintages based on the search term
    }
  }, [searchTerm, ]); // Run effect when searchTerm or vintages change
        
          


      


  return (
    <div>
      <TouristNB/>


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


          {/* Filter by Tag */}
          <TextField
                    label="tags"
                    variant="outlined"
                    name="tags"
                    value={filters.tags}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    //onChange={handleFilterChange}
                    sx={{ mb: 2, mr: 2 }}
                />

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
          <>
            {errorMessage ? (
                <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p> // Display error message if any
            ) : (
                <Grid container spacing={0} sx={{ display: 'flex', flexDirection: 'column', width: '100vw' }}>
                    {filteredVin.length > 0 ? (
                        filteredVin.map((vintage, index) => (
                            <Grid item key={index} sx={{ display: 'flex', justifyContent: 'left' }}>
                                <TouristVintagePost
                                    id={vintage._id || 'N/A'} // Safely handle missing _id
                                    name={vintage.name || 'No name provided'} // Handle missing name
                                    description={vintage.description || 'No description available'} // Handle missing description
                                    pictures={vintage.pictures || []} // Handle missing pictures with an empty array
                                    location={vintage.location ? {
                                        longitude: vintage.location.longitude || 0, // Default longitude
                                        latitude: vintage.location.latitude || 0,   // Default latitude
                                        nation: {
                                            country: vintage.location.country || 'Unknown country',
                                            city: vintage.location.city || 'Unknown city',
                                        }
                                    } : null} // Handle missing location by setting it to null
                                    ticket_price={vintage.ticket_price ? {
                                        foreigner: vintage.ticket_price.foreigner || 'Not specified',
                                        native: vintage.ticket_price.native || 'Not specified',
                                        student: vintage.ticket_price.student || 'Not specified',
                                    } : {
                                        foreigner: 'Not specified',
                                        native: 'Not specified',
                                        student: 'Not specified',
                                    }} // Handle missing ticket_price safely
                                    tags={vintage.tags || []} // Default tags to an empty array if missing
                                    opening_hours={vintage.opening_hours ? {
                                        opening: vintage.opening_hours.opening || 'Not specified',
                                        closing: vintage.opening_hours.closing || 'Not specified',
                                    } : {
                                        opening: 'Not specified',
                                        closing: 'Not specified',
                                    }} // Handle missing opening_hours safely
                                />
                            </Grid>
                        ))
                    ) : (
                        <p>No vintage posts available.</p> // Display a message if no vintages are found
                    )}
                </Grid>
            )}
        </>
        </Box>
      </Box>
    </div>
  );
};

export default TouristViewVintage;

