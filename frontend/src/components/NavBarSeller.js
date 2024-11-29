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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const { data } = await axios.get("http://localhost:4000/cariGo/notifications/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setNotifications(data.data.notifications || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError(error.message || 'Failed to fetch notifications');
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

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
    navigate("/login"); // Example navigation after logout
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

 {/* Notification Icon */}
 


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
<Box>
          <Tooltip title="View notifications">
            <IconButton onClick={handleOpenNotifications} style={{ color: 'white' }}>
              <BellOutlined />
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-notifications"
            anchorEl={anchorElNotifications}
            open={Boolean(anchorElNotifications)}
            onClose={handleCloseNotifications}
            sx={{ mt: '45px' }}
          >
            <Typography variant="h6" sx={{ padding: '10px 15px', backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
              Notifications
            </Typography>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <MenuItem key={notification._id}>
                  {getIcon(notification.type)}
                  <Box>
                    <Typography variant="body1">{notification.message}</Typography>
                    <Typography variant="body2" style={{ color: '#999' }}>
                      {new Date(notification.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                </MenuItem>
              ))
            ) : (
              <MenuItem>
                <Typography>No notifications</Typography>
              </MenuItem>
            )}
          </Menu>
        </Box>
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
