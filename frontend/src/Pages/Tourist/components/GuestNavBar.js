import React, { useState,useEffect } from "react";
import {
  Box,IconButton,Avatar,Tooltip,Typography,Divider,
  List,ListItem, ListItemButton,ListItemText,Drawer,
  AppBar,Toolbar,Menu,MenuItem,Container,Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UserBadge from "../../badge";
import logoImage from "../../../assets/cropped_image.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CurrencyConversion from "../../../components/CurrencyConversion";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
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

const pages = [
  "Suggested For You",
  "Activities",
  "Itinerary",
  "Historical Places",
  "Products",
  "File Complaint",
];
const settings = ["My Profile", "Logout", "Change Password"];

function TouristNB() {
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElBookings, setAnchorElBookings] = React.useState(null);
  const [openCurrencyDialog, setOpenCurrencyDialog] = React.useState(false); // State for dialog
  const [anchorElComplaints, setAnchorElComplaints] = React.useState(null); // Complaints menu state
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


  // Open and Close Dialog Functions
  const handleOpenCurrencyDialog = () => {
    setOpenCurrencyDialog(true);
  };

  const handleCloseCurrencyDialog = () => {
    setOpenCurrencyDialog(false);
  };

  const userId = localStorage.getItem("id");

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleOpenBookingsMenu = (event) =>
    setAnchorElBookings(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleCloseBookingsMenu = () => setAnchorElBookings(null);

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
  const handleWishlist=()=>{
    navigate("/wishlist")
  }

  // const getIcon = (type) => {
  //   switch (type) {
  //     case 'success': return <CheckCircleOutlined style={{ color: 'green' }} />;
  //     case 'warning': return <WarningOutlined style={{ color: 'orange' }} />;
  //     case 'info': return <MessageOutlined style={{ color: 'blue' }} />;
  //     default: return <BellOutlined />;
  //   }
  // };

  // Navigation functions
  const loadSuggestedForYou = () => {
    handleCloseNavMenu();
    navigate("/Tourist");
  };
  const loadActivities = () => {
    handleCloseNavMenu();
    navigate("/tourist-activities");
  };
  const loadItinerary = () => {
    handleCloseNavMenu();
    navigate("/Tourist-itineraries");
  };
  const loadHistoricalPlaces = () => {
    handleCloseNavMenu();
    navigate("/allVintages");
  };
  const loadProducts = () => {
    handleCloseNavMenu();
    navigate("/Tourist/Products");
  };
  const loadFileComplaint = () => {
    handleCloseNavMenu();
    navigate("/tourist/file-complaint");
  };
  const loadBookServices = () => {
    handleCloseBookingsMenu();
    navigate("/book-services");
    sessionStorage.clear();
  };
  const loadBookedActivities = () => {
    handleCloseBookingsMenu();
    navigate("/tourist/MyBookedActivities");
  };
  const loadBookedItineraries = () => {
    handleCloseBookingsMenu();
    navigate("/tourist/MyBookings");
  };
  const loadProfile = () => {
    handleCloseUserMenu();
    navigate("/tourist-profile");
  };
  const handleLogout = () => {
    handleCloseUserMenu();
    navigate("/login");
  };
  const handleChangePass = () => {
    handleCloseUserMenu();
    navigate("/change-password");
  };

  const loadBookedHotels = () => {
    handleCloseBookingsMenu();
    navigate("/tourist/MyBookedHotels");
  };
  const loadBookedFlights = () => {
    handleCloseBookingsMenu();
    navigate("/tourist/MyBookedFlights");
  };
  const loadBookedTransportation = () => {
    handleCloseBookingsMenu();
    navigate("/tourist/MyBookedTransportation");
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await fetch(
        `http://localhost:4000/cariGo/delReq/createReq`,
        {
          method: "POST", // Change this to "POST" if your backend expects it
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        }
      );
      if (response.ok) {
        alert("Account delete request sent");
      } else {
        console.error("Failed to send delete request:", response.statusText);
      }
      console.log(response.json);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  // const loadFileComplaint = () => { handleCloseComplaintsMenu(); navigate('/tourist/file-complaint'); }; // Route to file complaint
  const loadComplaintHistory = () => {
    handleCloseComplaintsMenu();
    navigate("/tourist/complaint-history");
  }; // Route to complaint history
  const handleOpenComplaintsMenu = (event) =>
    setAnchorElComplaints(event.currentTarget); // Open complaints menu
  const handleCloseComplaintsMenu = () => setAnchorElComplaints(null); // Close complaints menu

  // handling side bar
   const [drawerOpen, setDrawerOpen] = useState(false);

   // Function to toggle the drawer open/close
   const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
   };
  // const userOptions = [
  //   { label: "My Profile", onClick: loadProfile },
  //   { label: "Logout", onClick: handleLogout },
  //   { label: "Change Password", onClick: handleChangePass },
  //   { label: "Choose Currency", onClick: handleOpenCurrencyDialog },
  //   { label: "Delete Account", onClick: handleDeleteAccount, color: "#ff4d4d" },
  // ];


  return (
    <AppBar 
    position="sticky" 
    sx={{ 
      backgroundColor: "#004E89", 
      height: '60px', 
      minHeight: '60px',
      top: 0, // Explicitly set to top of the viewport
      justifyContent: 'center',
      position: 'fixed', // Try fixed instead of sticky
      padding:'0.5%' ,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1200, 
      
    }}
    
  >

      <Toolbar disableGutters variant="dense">

     
    <Container maxWidth="xl">

      <Toolbar sx={{ display: 'flex',  height: '55px', minHeight: '63px', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo and Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            alt="Logo"
            src={logoImage}
            sx={{ width: 40, height: 40 }}
          />
         <Typography
variant="h6"
noWrap
component={Link}
to="/"
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
CariGo
</Typography>
        </Box>

        {/* Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
{/* Favorite Icon */}
<IconButton
  size="medium"
  aria-label="show favorites"
  color="inherit"
  sx={{
    marginRight: 1,
    "&:hover": {
      color: "#D59D80", // Hover color for icon
      transform: "scale(1.1)", // Slight zoom effect
      transition: "all 0.3s ease",
    },
  }}
>
  <FavoriteIcon sx={{ fontSize: "33px", color: "white" }} />
</IconButton>

{/* Bookmark Icon */}
<IconButton
  size="medium"
  aria-label="show bookmarks"
  color="inherit"
  sx={{
    marginRight: 0.5,
    "&:hover": {
      color: "#D59D80",
      transform: "scale(1.1)",
      transition: "all 0.3s ease",
    },
  }}
>
  <BookmarkIcon sx={{ fontSize: "33px", color: "white" }} />
</IconButton>

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
    badgeContent={notifications.length}
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

{/* User Settings */}

<a
    href="/login"
    style={{
      color: '#fff',
      fontSize: '17px',
      //fontWeight: 'bold',
      textDecoration: 'none', // Remove default underline
      borderBottom: '2px solid #D59D80', // Underline effect
      paddingBottom: '2px', // Add space between text and underline
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={(e) => {
      e.target.style.color = '#f7e1c6'; // Change color on hover
      e.target.style.borderBottomColor = '#f7e1c6'; // Change underline color on hover
    }}
    onMouseLeave={(e) => {
      e.target.style.color = '#fff'; // Reset color on hover out
      e.target.style.borderBottomColor = '#D59D80'; // Reset underline color
    }}
  >
    Login
  </a>

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
      </Toolbar>
    </AppBar>
  );
}

export default TouristNB;
