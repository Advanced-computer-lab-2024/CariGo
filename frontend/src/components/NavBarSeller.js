import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { UserOutlined, BellOutlined, MessageOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons'; // Import the icons
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logoImage from "../assets/cropped_image.png"; // Correct relative path
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {useEffect, useState } from 'react';
import axios from "axios";
import Badge from '@mui/material/Badge';
const pages = [
  "Activities",
  "Itinerary",
  "Historical Places",
  "Products",
  "File Complaint",
];
const settings = ["Logout", "Change Password"]; // Updated settings

function TouristNB() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [role, setRole] = React.useState(null);
  const navigate = useNavigate();
  const [anchorElNotifications, setAnchorElNotifications] = useState(null); // Notification menu anchor
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get('http://localhost:4000/cariGo/notifications/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data.data.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);
  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('jwt');
      await axios.patch(
        `http://localhost:4000/cariGo/notifications/${id}/mark-read`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Update state to remove the marked notification
      setNotifications((prev) => prev.filter((notification) => notification._id !== id));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };


  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Navigation functions
  //   const loadActivities = () => {
  //     handleCloseNavMenu();
  //     navigate('/tourist-activities');
  //   };

  //   const loadItinerary = () => {
  //     handleCloseNavMenu();
  //     navigate('/Tourist-itineraries');
  //   };

  //   const loadHistoricalPlaces = () => {
  //     handleCloseNavMenu();

  //     navigate('/myVintages');

  //   };

  const loadProfile = () => {
    handleCloseUserMenu();
    switch (role.toLowerCase()) {
      case "advertiser":
        navigate("/advertiser");
        break;

      default:
        navigate("/Seller");
        break;
    }
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    // Add your logout logic here
    navigate("/SignIn-Up"); // Example navigation after logout
  };
  const handleChangePass = () => {
    handleCloseUserMenu();
    //naivgate to change password
    navigate("/change-password");
  };
  //   const loadProducts = () =>{
  //     handleCloseUserMenu();
  //     // Add your logout logic here
  //     navigate('/Tourist/Products')
  //   }

  //   const loadFileComplaint = () => {
  //     handleCloseNavMenu();
  //     navigate('/tourist/file-complaint');
  //   };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('jwt');
    try{
      const response = await fetch(`http://localhost:4000/cariGo/delReq/createReq`, {
        method: "POST", // Change this to "POST" if your backend expects it
        headers: {
            "Authorization": `Bearer ${token}`, // Send the token in the Authorization header 
        }
    });
    if (response.ok) {
      alert("Account delete request sent");
    } else {
        console.error("Failed to send delete request:", response.statusText);
    }
    console.log(response.json);
    }
    catch(error){
      console.error("Error deleting account:", error);
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircleOutlined style={{ color: 'green' }} />;
      case 'warning': return <WarningOutlined style={{ color: 'orange' }} />;
      case 'info': return <MessageOutlined style={{ color: 'blue' }} />;
      default: return <BellOutlined />;
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#004c74" }}>
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
            // to="/tgHome"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CariGO
          </Typography>

 


          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {/* <MenuItem onClick={loadActivities}>
                <Typography sx={{ textAlign: 'center' }}>{pages[0]}</Typography>
              </MenuItem>
              <MenuItem onClick={loadItinerary}>
                <Typography sx={{ textAlign: 'center' }}>{pages[1]}</Typography>
              </MenuItem> */}
              {/* <MenuItem onClick={loadHistoricalPlaces}>
                <Typography sx={{ textAlign: 'center' }}>{pages[2]}</Typography>
              </MenuItem> */}
              {/* <MenuItem onClick={loadFileComplaint}>
                <Typography sx={{ textAlign: 'center' }}>{pages[4]}</Typography>
              </MenuItem> */}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* <Button
              onClick={loadActivities}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {pages[0]}
            </Button>
            <Button
              onClick={loadItinerary}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {pages[1]}
            </Button> */}
            {/* <Button
              onClick={loadHistoricalPlaces}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {pages[2]}
            </Button> */}
            {/* <Button
              onClick={loadProducts}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {pages[3]}
            </Button>
              <Button onClick={loadFileComplaint} sx={{ my: 2, color: 'white', display: 'block' }}>
            {pages[4]}
            </Button> */}
          </Box>

{/* Notification Icon */}
<IconButton
  size="large"
  aria-label="show notifications"
  aria-controls="notification-menu"
  aria-haspopup="true"
  onClick={handleOpenNotifications}
  sx={{
    color: 'inherit',
    position: 'relative',
  }}
>
  <Badge
    badgeContent={notifications.length}
    color="error"
    sx={{
      '& .MuiBadge-badge': {
        right: 5.5,
        top: 5,
        fontSize: '0.75rem',
        minWidth: '16px',
        height: '16px',
        borderRadius: '50%',
        backgroundColor: '#f44336',
        color: 'white',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
      },
    }}
  >
    <BellOutlined style={{ fontSize: '33px', color: 'white' }} />
  </Badge>
</IconButton>

{/* Notification Menu */}
<Menu
  id="notification-menu"
  anchorEl={anchorElNotifications}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  keepMounted
  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  open={Boolean(anchorElNotifications)}
  onClose={handleCloseNotifications}
  // sx={{
  //   mt: 1,
  //   backgroundColor: '#ffffff',
  //   boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.15)',
  //   borderRadius: '24px', // More rounded corners for the menu
  //   minWidth: '280px', // Narrower width
  //   maxWidth: '300px',
  //   minHeight: '450px', // Increased height for a longer menu
  //   overflowY: 'auto',
  //   padding: '8px',
  // }}
>
  {notifications.length > 0 ? (
    notifications.map((notification) => (
      <MenuItem
        key={notification._id}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1.5,
          gap: 2,
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          marginBottom: '8px',
          ':hover': {
            backgroundColor: '#f9f9f9',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          {getIcon(notification.type)}
          <Box sx={{ ml: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
              {notification.message}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'gray', fontSize: '0.75rem', mt: 0.5 }}
            >
              {/* {new Date(notification.date).toLocaleTimeString()} */}
            </Typography>
          </Box>
        </Box>
        <Button
          size="small"
          variant="outlined"
          sx={{
            color: '#2196F3',
            borderColor: '#2196F3',
            textTransform: 'none',
            fontSize: '0.75rem',
            ':hover': {
              color: 'white',
              backgroundColor: '#2196F3',
              borderColor: '#2196F3',
            },
          }}
          onClick={() => markAsRead(notification._id)}
        >
          Mark as Read
        </Button>
      </MenuItem>
    ))
  ) : (
    <MenuItem
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
      }}
    >
      <Typography sx={{ color: '#999', textAlign: 'center', width: '100%' }}>
        No new notifications
      </Typography>
    </MenuItem>
  )}
</Menu>






          {/* User Settings Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={loadProfile}>
                <Typography sx={{ textAlign: "center" }}>My Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography sx={{ textAlign: "center" }}>Logout</Typography>
              </MenuItem>
              <MenuItem onClick={handleChangePass}>
                <Typography sx={{ textAlign: "center" }}>
                  Change Password
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleDeleteAccount}>
                <Typography sx={{ textAlign: "center", color:'#ff4d4d' }}>
                  delete account
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TouristNB;
