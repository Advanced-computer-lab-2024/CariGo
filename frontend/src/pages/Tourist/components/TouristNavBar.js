import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import bronzeBadge from '../../../assets/bronze badge.png'
// import silverBadge from '../../../assets/silver badge.jpeg'
// import goldBadge from '../../../assets/gold badge.jpeg'
import UserBadge from '../../badge';
import logoImage from '../../../assets/cropped_image.png'; // Correct relative path
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const pages = ['Suggested For You','Activities', 'Itinerary', 'Historical Places','Products','File Complaint','Book Services'];
const settings = ['My Profile', 'Logout','change password']; // Updated settings


function TouristNB() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userId = localStorage.getItem("id"); // Assumes user ID is stored in localStorage

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Navigation functions

  const loadSuggestedForYou = () => {
    handleCloseNavMenu();
    navigate('/Tourist');
  };
  const loadActivities = () => {
    handleCloseNavMenu();
    navigate('/tourist-activities');
  };

  const loadItinerary = () => {
    handleCloseNavMenu();
    navigate('/Tourist-itineraries');
  };

  const loadHistoricalPlaces = () => {
    handleCloseNavMenu();

    navigate('/allVintages');

  };

  const loadProfile = () => {
    handleCloseUserMenu();
    navigate('/tourist-profile');
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    // Add your logout logic here
    navigate('/login'); // Example navigation after logout
  };
  const handleChangePass=()=>{
    handleCloseUserMenu();

    navigate('/change-password');
  }
  const loadProducts = () =>{
    handleCloseUserMenu();
    // Add your logout logic here
    navigate('/Tourist/Products')
  }
  const loadFileComplaint = () => {
    handleCloseNavMenu();
    navigate('/tourist/file-complaint'); 
  };
  const loadBookServices = () => {
    handleCloseNavMenu();
    navigate('/book-services');
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: '#004c74' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar 
            alt="Logo"
            src={logoImage} 
            sx={{ width: 40, height: 40, mr: 2 }} 
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/tgHome" 
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CariGO
          </Typography>
          
          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem onClick={loadActivities}>
                <Typography sx={{ textAlign: 'center' }}>{pages[0]}</Typography>
              </MenuItem>
              <MenuItem onClick={loadItinerary}>
                <Typography sx={{ textAlign: 'center' }}>{pages[1]}</Typography>
              </MenuItem>
              <MenuItem onClick={loadHistoricalPlaces}>
                <Typography sx={{ textAlign: 'center' }}>{pages[2]}</Typography>
              </MenuItem>
              <MenuItem onClick={loadFileComplaint}>
                <Typography sx={{ textAlign: 'center' }}>{pages[4]}</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={loadSuggestedForYou}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {pages[0]}
            </Button>
            {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}> */}
            <Button
              onClick={loadActivities}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {pages[1]}
            </Button>
            <Button
              onClick={loadItinerary}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {pages[2]}
            </Button>
            <Button
              onClick={loadHistoricalPlaces}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {pages[3]}
            </Button>
            <Button
              onClick={loadProducts}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {pages[4]}
            </Button>
              <Button onClick={loadFileComplaint} sx={{ my: 2, color: 'white', display: 'block' }}>
            {pages[5]}
            </Button>
            <Button onClick={loadBookServices} sx={{ my: 2, color: 'white', display: 'block' }}>
            {pages[6]}
            </Button>
          </Box>

          {/* User Badge */}
          <UserBadge userId={userId} />

          {/* User Settings Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={loadProfile}>
                <Typography sx={{ textAlign: 'center' }}>My Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
              </MenuItem>
              <MenuItem onClick={handleChangePass}>
                <Typography sx={{ textAlign: 'center' }}>Change Password</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TouristNB;
