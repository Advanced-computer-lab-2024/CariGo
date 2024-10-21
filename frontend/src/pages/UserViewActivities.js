import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/index.css';
import App from '../App';
import NavBar from '../components/NavBarTourist';
import ActivityList from '../components/ActivityListUser';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import ActivityListSort from "../components/ActivityListSort";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';


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

  const [searchTerm, setSearchTerm] = useState('');
 
  
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
          [name]: value
      }));
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
  
  const handleSortChange = (sortValue) => {
    setSortOption(sortValue);  // Set the selected sort option
    handleClose();  // Close the menu
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


  // const filteredAct = activities.filter(
  //   (activity) =>
  //     (selectedTag
  //       ? activity.tags.some((tag) => tag.title.includes( selectedTag))
  //       : true) &&
  //     ((activity.name &&
  //       activity.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        
  //       activity.tags.some((tag) =>
  //         tag.toLowerCase().includes(searchTerm.toLowerCase())
  //     ))
  //   );



   // Combined useEffect for Fetching Activities with Filters and Sort
   useEffect(() => {
      const fetchActivities = async () => {
          setLoading(true);
          setError(null);
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
  }, [filters, sortOption]); // Re-fetch activities when filters or sort option change




  return(
    <div>
    <NavBar/>

    <Box sx={{
      width:'1150px' ,
      overflow: 'hidden',
      margin: '0 auto', 
      padding:'20px',
      height: '80vh', // Set a fixed height for the scrolling area
      overflow: 'auto', // Enable scrolling
      '&::-webkit-scrollbar': {
      display: 'none', // Hides the scrollbar for WebKit browsers (Chrome, Safari)
    },
      //backgroundColor : "aquamarine" ,
      }}>

        
            {/* Filter Form */}
            <form>
                <TextField
                    label="Price"
                    variant="outlined"
                    name="price"
                    value={filters.price}
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
                <Button variant="contained" onClick={resetFilters} sx={{ ml: 2 }}>
                    Reset Filters
                </Button>
            </form>


            {/* END OF FILTER FORM */}

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


    <Box sx={{ 
      height: '100%',
      marginLeft: '100px',
      width: '100%',
      '&::-webkit-scrollbar': {display: 'none',},
      }}> {/* Enable vertical scrolling only */}

     < ActivityList  filteredActivities/> 

  </Box>
  </Box>
  </div>
  
);
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

