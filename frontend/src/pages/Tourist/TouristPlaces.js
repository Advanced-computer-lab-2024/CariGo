import React, { useState, useEffect } from 'react';
import { Box, Menu, TextField, Button, CircularProgress, Typography, MenuItem ,IconButton, Select, Checkbox, ListItemText, InputLabel, FormControl} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import NavBar from './components/TouristNavBar.js';
import GuestNavBar from "../../components/NavBarTourist";
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
      <div>
      {!tourist? <GuestNavBar/>: <NavBar/>}

      <Box sx={{
        width:'100%' ,
        overflow: 'hidden',
        margin: '3%', 
        marginLeft:'10%',
        //padding:'2%',
        height: '90vh', // Set a fixed height for the scrolling area
        display:'flex',
        gap:'3%',
        '&::-webkit-scrollbar': {
        display: 'none', // Hides the scrollbar for WebKit browsers (Chrome, Safari)
      },
        }}>


          {/* vintages list */}
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}
        <Box sx={{ 
          height: '90%',
          //marginLeft: '100px',
          width: '60%',
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          overflowX: 'hidden',
          overflowY: 'auto', 
          marginTop:'20px', 
          '&::-webkit-scrollbar': {
            width: '7px', 
            height: '90%', 
            },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ff4d4d', // Color of the scrollbar thumb
            borderRadius: '10px', // Rounded corners for the scrollbar thumb
            },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1', // Color of the scrollbar track
            borderRadius: '10px', // Rounded corners for the scrollbar track
          },
          }}> {/* Enable vertical scrolling only */}

          <VintageList fetchedVintages={filteredVintages} />
        </Box>

        <Box sx={{display:'flex', flexDirection:'column', gap:'20px', marginTop:'5%'}}>
        {/*Search bar*/}
        <Box sx={{}}>
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
              <SearchIcon  onClick={handleSearch} sx={{ }}/>
                </IconButton>
              </Box>
              {/*End of Search bar*/}
                {/* for filter and sort next to each other*/}
                {/* <Box sx={{display:'flex',
                 flexDirection: anchorEl ? 'column' : 'row' ,
                  marginTop: '30px',marginLeft :'120px',}}>  */}
                  
                {/*Filter menu*/}
                <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  }}
                >
                <FilterAltIcon
                onClick={handleFilterClick}
                sx={{
                  color : "gray",
                  cursor: 'pointer',
                }}
              >
              </FilterAltIcon>
              {Boolean(anchorEl) && ( // Conditional rendering based on anchorEl
                <Box
                  sx={{
                    //padding: '20px',
                    position: 'absolute', 
                    top: '50px', 
                    left: '0', 
                    //paddingTop:'10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap:'10px',
                    borderRadius: '20px',
                    backgroundColor: 'white', 
                    borderColor: '1px solid #ff4d4d', 
                    width: '150%',
                  }}
                >
                <Box sx={{display:'flex',width:'100%', flexWrap: 'wrap',marginLeft:'5px', gap:'5px'}}>
                  {/* <TextField
                      label="tags"
                      variant="outlined"
                      name="tags"
                      value={filterInputValues.tags}
                      onChange={handleFilterChange}
                      type="text"
                      sx={{ width:'45%', height:'20%'}}
                  /> */}
                  <Box sx={{ width: '45%', height: 'auto' ,position:'relative',color:'#126782'}}>
                    <FormControl fullWidth>
                      <InputLabel id="tags-select-label" 
                      sx={{"&.Mui-focused": {color: "#ff4d4d",},}}
                      >Tags</InputLabel>
                      <Select
                        label="tags"
                        //id="tags-select"
                        multiple
                        value={filterInputValues.tag || []}
                        onChange={handleTagFilterChange}
                        renderValue={(selected) => selected.join(', ')} // Displays selected tags as comma-separated values
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200, 
                              //width:'10%',
                            },
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ccc", // Default border color
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ff4d4d", // Border color on focus
                          },
                        }}
                      >
                        {tagNames.map((tag, index) => (
                          <MenuItem key={index} value={tag} sx={{ color: '#126782','&.Mui-selected': {backgroundColor: 'transparent',},}}>
                            <Checkbox  
                            //checked={filterInputValues.tags.includes(tag)} 
                            //onChange={() => handleTagToggle(tag)} // Toggle the tag selection
                            checked={filterInputValues.tag.includes(tag)}
                            sx={{marginLeft:'-5%',
                              '&.Mui-checked': {
                                color: '#ff4d4d', 
                                backgroundColor:'white', 
                              },
                              // "&:hover": {
                              //   color: "#ff7a7a", // Lighter shade of red on hover
                              // },
                            }} 
                            />
                            <ListItemText primary={tag} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  </Box>
                  <Box sx={{display:'flex', marginLeft:'-5px'}}>
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
  
              {/* </Box> */}
              </Box>
              
    </Box>
    </div>
    
  );
  }

  
  