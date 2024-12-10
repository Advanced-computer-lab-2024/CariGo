import { useState,useEffect } from "react";
import {
  Divider,List,ListItem, ListItemButton,ListItemText,Drawer
} from "@mui/material";

import axios from "axios";
import Badge from '@mui/material/Badge';
import { UserOutlined, BellOutlined, MessageOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons'; // Import the icons
import { 
  Notifications as NotificationIcon, 
  Favorite as FavoriteIcon, 
  Bookmark as BookmarkIcon, 
  // Edit as EditIcon, 
  // ArrowBack as ArrowBackIcon,
  // Delete as DeleteIcon
} from '@mui/icons-material';
import { ListItemIcon } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import {
  Flag as FlagIcon,
  EventAvailable as EventAvailableIcon,
  Event as EventIcon,
  Inventory as InventoryIcon,
  LocalOffer as LocalOfferIcon,
} from '@mui/icons-material';


import * as React from "react";
import AppBar from "@mui/material/AppBar";
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
import logoImage from "../assets/cropped_image.png";
import { useNavigate } from "react-router-dom";
import Table from "./Report/Table";
// Updated pages without "Activities"
const pages = ["Itineraries", "Inactive Itineraries","View Report"];
const settings = ["Profile", "Logout",'Change Password'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [anchorElNotifications, setAnchorElNotifications] = useState(null); // Notification menu anchor
  const [notifications, setNotifications] = useState([]);
  const [unReadNotifications, setUnReadNotifications] = useState([]);
  const [sortedNotifications, setSortedNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchUnReadNotifications = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get('http://localhost:4000/cariGo/notifications/unread', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUnReadNotifications(response.data.data.notifications); // Update state
        return response.data.data.notifications; // Return unread notifications
      } catch (error) {
        console.error('Error fetching unread notifications:', error);
      }
    }
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const unReadNotifications = await fetchUnReadNotifications();
        const response = await axios.get('http://localhost:4000/cariGo/notifications/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Fetch all notifications
        const allNotifications = response.data.data.notifications;

        // Filter to get only the read notifications
        const readNotifications = allNotifications.filter(
          (notification) =>
            !unReadNotifications.some((unread) => unread._id === notification._id) // Adjust "id" to your unique key
        );

        setNotifications(readNotifications);

        // Combine unread and read notifications (unread first)
        const sortedArray = [...unReadNotifications, ...readNotifications];

        // Set the sorted notifications
        setSortedNotifications(sortedArray);
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
      // Update state to remove the marked notification from unread notifications
      setUnReadNotifications((prev) => prev.filter((notification) => notification._id !== id));

      // Move the notification to the readNotifications list (you can find it in the sortedNotifications)
      const updatedSortedNotifications = sortedNotifications.map((notification) =>
        notification._id === id
          ? { ...notification, isRead: true } // Mark as read by setting `isRead` to true
          : notification
      );

      setSortedNotifications(updatedSortedNotifications);

      // Optionally, if you want to update only `readNotifications` (in case you separate them out)
      const updatedReadNotifications = updatedSortedNotifications.filter(
        (notification) => notification.isRead
      );

      setNotifications(updatedReadNotifications);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'flagged_content':
        return <FlagIcon style={{ color: 'red' }} />;
      case 'booking_opened':
        return <EventAvailableIcon style={{ color: 'green' }} />;
      case 'upcoming_event':
        return <EventIcon style={{ color: 'blue' }} />;
      case 'out_of_stock':
        return <InventoryIcon style={{ color: 'orange' }} />;
      case 'promo_code':
        return <LocalOfferIcon style={{ color: 'ff683c' }} />;
      default:
        return <NotificationIcon style={{ color: 'gray' }} />;
    }
  };

    const userId = localStorage.getItem("id");
    
    const handleOpenNotifications = (event) => {
      setAnchorElNotifications(event.currentTarget);
    };
  
    const handleCloseNotifications = () => {
      setAnchorElNotifications(null);
    };
    
    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };


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

  // Handle navigation
  const loadItineraries = () => {
    handleCloseNavMenu();
    navigate("/tour_guide/itineraries");
  };

  const loadInactiveItineraries = () => {
    handleCloseNavMenu();
    navigate("/tour_guide/inactive_itineraries");
  };
  const loadReport = () => {
    handleCloseNavMenu();
    navigate("/Tour-Guide/Report");
  };
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

  return (
    <AppBar position="static" sx={{ backgroundColor: "#004E89" }}>
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
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "1.5rem",
              letterSpacing: ".2rem",
              background: "linear-gradient(90deg, #C0754D, #D59D80)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textDecoration: "none",
              "&:hover": {
                color: "#C6C6D0",
              },
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
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem onClick={loadItineraries}>
                <Typography sx={{ textAlign: "center" }}>{pages[0]}</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: "center" }}>{pages[1]}</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={loadItineraries}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {pages[0]}
            </Button>
            <Button
              onClick={loadInactiveItineraries}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {pages[1]}
            </Button>
            <Button
              onClick={loadReport}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {pages[2]}
            </Button>
          </Box>
          {/* Notification Icon */}
          <IconButton
  size="medium"
  aria-label="show notifications"
  aria-controls="notification-menu"
  aria-haspopup="true"
  onClick={handleOpenNotifications}
  color="inherit"
  sx={{
    "&:hover": {
      color: "#D59D80",
      transform: "scale(1.1)",
      transition: "all 0.3s ease",
    },
  }}
>
  <Badge
    badgeContent={unReadNotifications.length}
    color="error"
    sx={{
      "& .MuiBadge-badge": {
        right: 1.5,
        top: 10,
        fontSize: "0.75rem",
        minWidth: "16px",
        height: "16px",
        borderRadius: "50%",
        backgroundColor: "#C0754D", // Custom badge color
        color: "white",
      },
    }}
  >
    <NotificationIcon
      style={{ fontSize: "33px", color: "white", marginRight: "10px" }}
    />
  </Badge>
</IconButton>
          {/* User Settings Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting === "Profile") {
                      navigate("/tour_guide/profile");
                    }
                    else if(setting==="Change Password") {
                      navigate("/change-password");
                    }else if (setting === "Logout") {
                      localStorage.removeItem("id");
                      localStorage.removeItem("token");
                      localStorage.removeItem("role");
                      navigate("/SignIn-Up"); // Example navigation after logout
                    }
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
               <MenuItem onClick={handleDeleteAccount}>
                <Typography sx={{ textAlign: "center", color:'#ff4d4d' }}>
                  delete account
                </Typography>
              </MenuItem>
            </Menu>
            <Menu
  id="notification-menu"
  anchorEl={anchorElNotifications}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  keepMounted
  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  open={Boolean(anchorElNotifications)}
  onClose={handleCloseNotifications}
  PaperProps={{
    elevation: 0,
    sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: 'background.paper',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      },
    },
  }}
>
  {sortedNotifications.length > 0 ? (
    sortedNotifications.map((notification) => (
      <MenuItem
        key={notification._id}
        sx={{
          py: 1,
                px: 2,
                borderBottom: '1px solid #e0e0e0',
                backgroundColor: notification.isRead ? 'white' : '#f0f8ff',
                '&:hover': {
                  backgroundColor: notification.isRead ? '#f5f5f5' : '#e6f3ff',
                },
              }}
      >
        <ListItemIcon>
                {getIcon(notification.type)}
              </ListItemIcon>
              <ListItemText
                primary={notification.message}
                secondary={new Date(notification.createdAt).toLocaleString()}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: notification.isRead ? 'normal' : 'bold',
                }}
                secondaryTypographyProps={{
                  variant: 'caption',
                }}
              />
        {!notification.isRead &&(
          <Button
          size="small"
                  variant="outlined"
                  sx={{
                    ml: 2,
                    minWidth: 'auto',
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    },
                  }}
          onClick={() => markAsRead(notification._id)}
        >
          Mark as Read
        </Button>
        )}
      </MenuItem>
    ))
  ) : (
    <MenuItem>
      <Typography>No new notifications</Typography>
    </MenuItem>
  )}
</Menu>
          </Box>
        </Toolbar>
        
      </Container>
      
    </AppBar>
  );
}

export default ResponsiveAppBar;
