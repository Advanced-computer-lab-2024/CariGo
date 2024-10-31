import ReactDOM from 'react-dom/client';
import '../../styles/index.css';
import App from '../../App';
import GuestNB from './components/GuestNB';
import ActivityList from '../../components/ActivityListUser';
import React, { useState,useEffect } from 'react';
import {Box , Button, Menu, MenuItem, styled, alpha,InputBase, TextField,Typography ,CircularProgress} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';


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


export default function UserViewActivities (){
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
 
  const [sortOption, setSortOption] = useState('');
 
  const [searchTerm, setSearchTerm] = useState('');
 
  
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
  }, [filters, sortOption ]); // Re-fetch activities when filters or sort option change


  return(
    <div>
    <GuestNB/>

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
                    value={filters.price}
                    onChange={handleFilterChange}
                    type="number"
                    sx={{ mb: 2, mr: 2 , marginLeft :'10px',}}
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
                    //label="Start Date"
                    variant="outlined"
                    name="startDate"
                    value={filters.startDate}
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
      '&::-webkit-scrollbar': {display: 'none',},
      }}> {/* Enable vertical scrolling only */}

      <ActivityList fetchedActivities={filteredActivities} />

  </Box>
  </Box>
  </div>
  
);
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

