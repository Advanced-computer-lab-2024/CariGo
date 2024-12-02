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
import axios from "axios";
import Badge from '@mui/material/Badge';
import { UserOutlined, BellOutlined, MessageOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons'; // Import the icons
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
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
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElBookings, setAnchorElBookings] = React.useState(null);
  const [openCurrencyDialog, setOpenCurrencyDialog] = React.useState(false); // State for dialog
  const [anchorElComplaints, setAnchorElComplaints] = React.useState(null); // Complaints menu state
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

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircleOutlined style={{ color: 'green' }} />;
      case 'warning': return <WarningOutlined style={{ color: 'orange' }} />;
      case 'info': return <MessageOutlined style={{ color: 'blue' }} />;
      default: return <BellOutlined />;
    }
  };

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
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const userOptions = [
    { label: "My Profile", onClick: loadProfile },
    { label: "Logout", onClick: handleLogout },
    { label: "Change Password", onClick: handleChangePass },
    { label: "Choose Currency", onClick: handleOpenCurrencyDialog },
    { label: "Bookmarks", onClick: handleOpenCurrencyDialog },
    { label: "Delete Account", onClick: handleDeleteAccount, color: "#ff4d4d" },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#004c74" , padding:'0.5%' ,}}>
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
              <MenuIcon />
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
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
              {/* Bookings Dropdown in Mobile View */}
              <MenuItem onClick={handleOpenBookingsMenu}>
                <Typography sx={{ textAlign: "center" }}>Bookings</Typography>
              </MenuItem>
              {/* <Menu
                id="bookings-menu-mobile"
                anchorEl={anchorElBookings}
                open={Boolean(anchorElBookings)}
                onClose={handleCloseBookingsMenu}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <MenuItem onClick={loadBookServices}>
                  <Typography>Book Services</Typography>
                </MenuItem>
                <MenuItem onClick={loadBookedActivities}>
                  <Typography>Booked Activities</Typography>
                </MenuItem>
                <MenuItem onClick={loadBookedItineraries}>
                  <Typography>Booked Itineraries</Typography>
                </MenuItem>
              </Menu> */}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display:'flex',}}>
            {/* main options box */}
            <Box sx={{display:'flex', marginBottom:'-2.5%', marginTop:'0%',width:'80%' }}>
            <Button
              onClick={loadSuggestedForYou}
              sx={{ 
                my: 2, color: "white", display: "block" ,
                transition: "all 0.3s ease",
                fontSize:'15px',
                "&:hover": {
                  fontSize: "16px",
                  paddingLeft: "1%", 
                  paddingRight:'1%',
                },
              }}
            >
              {pages[0]}
            </Button>
            <Button
              onClick={loadActivities}
              sx={{ 
                my: 2, color: "white", display: "block" ,
                transition: "all 0.3s ease", 
                fontSize:'15px',
                "&:hover": {
                  fontSize: "16px",
                  //paddingLeft: "1%", 
                  paddingRight:'1%',
                },
              }}
            >
              {pages[1]}
            </Button>
            <Button
              onClick={loadItinerary}
              sx={{ 
                my: 2, color: "white", display: "block" ,
                transition: "all 0.3s ease",
                fontSize:'15px',
                "&:hover": {
                  fontSize: "16px",
                  paddingLeft: "1%", 
                  paddingRight:'1%',
                },
              }}
            >
              {pages[2]}
            </Button>
            <Button
              onClick={loadHistoricalPlaces}
              sx={{ 
                my: 2, color: "white", display: "block" ,
                transition: "all 0.3s ease",
                fontSize:'15px',
                "&:hover": {
                  fontSize: "16px",
                  paddingLeft: "1%", 
                  paddingRight:'1%',
                },
              }}
            >
              {pages[3]}
            </Button>
            <Button
              onClick={loadProducts}
              sx={{ 
                my: 2, color: "white", display: "block" ,
                transition: "all 0.3s ease", 
                fontSize:'15px',
                "&:hover": {
                  fontSize: "16px",
                  paddingLeft: "1%", 
                  paddingRight:'1%',
                },
              }}
            >
              {pages[4]}
            </Button>
            {/* Complaints Dropdown in Desktop View */}
            {/* <Box> */}
              <Button
                onClick={handleOpenComplaintsMenu}
                className={Boolean(anchorElComplaints) ? "menu-open" : ""} // Add a class if menu is open
                sx={{ 
                  my: 2, color: "white", display: "block" ,
                  transition: "all 0.3s ease", 
                  fontSize:'15px',
                  "&:hover ": {
                    fontSize: "16px",
                    paddingLeft: "1%", 
                    paddingRight:'2.4%',
                    "& .arrow-icon": {
                      opacity: 1,
                      transform: "translateX(0)", 
                    },
                  },
                  "&.menu-open": {
                    fontSize: "16px",
                    paddingLeft: "1%", 
                    paddingRight:'2.4%',
                    "& .arrow-icon": {
                      opacity: 1,
                      transform: "translateX(0)", 
                    },
                  },
                }}
              >
                Complaints
                {/* kol da 3la 7tet arrow */}
                {Boolean(anchorElComplaints) ? (
                  <KeyboardArrowDownIcon
                    className="arrow-icon"
                    sx={{
                      fontSize: "26px",
                      marginLeft: "0.2%",
                      opacity: 1,
                      transition: "all 0.3s ease", 
                      position: "absolute",
                      top: "20%",
                    }}
                  />
                ) : (
                  <ArrowForwardIosIcon
                  className="arrow-icon"
                  sx={{
                    fontSize: "18px",
                    marginLeft: "0.2%", // Space between text and icon
                    opacity: Boolean(anchorElComplaints) ? 1 : 0, // Show if menu is open
                    transition: "all 0.3s ease", 
                    position: "absolute",
                    top: "25%",
                  }}
                />
              )}
               {/*aaaaaaaaaaaaaaaaaaaaaaa*/}
              </Button>
              <Menu
                id="complaints-menu"
                anchorEl={anchorElComplaints}
                open={Boolean(anchorElComplaints)}
                onClose={handleCloseComplaintsMenu}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                sx={{ marginTop: "2%" }}
              >
                <MenuItem onClick={loadFileComplaint}>File Complaint</MenuItem>
                <MenuItem onClick={loadComplaintHistory}>
                  Complaint History
                </MenuItem>
              </Menu>
            {/* </Box> */}

            {/* Bookings Dropdown in Desktop View */}
            {/* <Box> */}
              <Button
                onClick={handleOpenBookingsMenu}
                className={Boolean(anchorElBookings) ? "menu-open" : ""} // Add a class if menu is open
                sx={{ 
                  my: 2, color: "white", display: "block" ,
                  transition: "all 0.3s ease", 
                  fontSize:'15px',
                  "&:hover ": {
                    fontSize: "16px",
                    paddingLeft: "1%", 
                    paddingRight:'1%',
                    "& .arrow-icon": {
                      opacity: 1,
                      transform: "translateX(0)", 
                    },
                  },
                  "&.menu-open": {
                    fontSize: "16px",
                    paddingLeft: "1%", 
                    paddingRight:'1%',
                    "& .arrow-icon": {
                      opacity: 1,
                      transform: "translateX(0)", 
                    },
                  },
                }}
              >
                Bookings
                 {/* kol da 3la 7tet arrow */}
                 {Boolean(anchorElBookings) ? (
                  <KeyboardArrowDownIcon
                    className="arrow-icon"
                    sx={{
                      fontSize: "26px",
                      marginLeft: "0.2%",
                      opacity: 1,
                      transition: "all 0.3s ease", 
                      position: "absolute",
                      top: "20%",
                    }}
                  />
                ) : (
                  <ArrowForwardIosIcon
                  className="arrow-icon"
                  sx={{
                    fontSize: "18px",
                    marginLeft: "0.2%", // Space between text and icon
                    opacity: Boolean(anchorElBookings) ? 1 : 0, // Show if menu is open
                    transition: "all 0.3s ease", 
                    position: "absolute",
                    top: "25%",
                  }}
                />
              )}
               {/*aaaaaaaaaaaaaaaaaaaaaaa*/}
              </Button>
              <Menu
                id="bookings-menu"
                anchorEl={anchorElBookings}
                open={Boolean(anchorElBookings)}
                onClose={handleCloseBookingsMenu}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                sx={{ marginTop: "2%" }}
              >
                <MenuItem onClick={loadBookServices}>
                  <Typography>Book Services</Typography>
                </MenuItem>
                <MenuItem onClick={loadBookedActivities}>
                  <Typography>Booked Activities</Typography>
                </MenuItem>
                <MenuItem onClick={loadBookedItineraries}>
                  <Typography>Booked Itineraries</Typography>
                </MenuItem>
                <MenuItem onClick={loadBookedHotels}>
                  <Typography>Booked Hotels</Typography>
                </MenuItem>
                <MenuItem onClick={loadBookedFlights}>
                  <Typography>Booked Flights</Typography>
                </MenuItem>
                <MenuItem onClick={loadBookedTransportation}>
                  <Typography>Booked Transportation</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* </Box> */}
          {/* end of main options box */}

            {/* Notification Icon */}
          {/* Icons Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
          {/* Favorite Icon */}
          <IconButton
            size="large"
            aria-label="show favorites"
            color="inherit"
            sx={{ marginRight: 1 }}
          >
            <FavoriteBorderOutlinedIcon sx={{ fontSize: '33px', color: 'white' }} />
          </IconButton>

          {/* Bookmark Icon */}
          <IconButton
            size="large"
            aria-label="show bookmarks"
            color="inherit"
            sx={{ marginRight: 1 }}
          >
            <BookmarkBorderOutlinedIcon sx={{ fontSize: '33px', color: 'white' }} />
          </IconButton>

          {/* Notification Icon */}
          <IconButton
            size="large"
            aria-label="show notifications"
            aria-controls="notification-menu"
            aria-haspopup="true"
            onClick={handleOpenNotifications}
            color="inherit"
          >
            <Badge
              badgeContent={notifications.length}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  right: 1.5,
                  top: 10,
                  fontSize: '0.75rem',
                  minWidth: '16px',
                  height: '16px',
                  borderRadius: '50%',
                },
              }}
            >
              <BellOutlined style={{ fontSize: '33px', color: 'white', marginRight: '1px' }} />
            </Badge>
          </IconButton>
        </Box>


<Menu
  id="notification-menu"
  anchorEl={anchorElNotifications}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  keepMounted
  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  open={Boolean(anchorElNotifications)}
  onClose={handleCloseNotifications}
  sx={{
    mt: 1,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Soft shadow
    borderRadius: '8px', // Rounded corners
    overflow: 'hidden',
    minWidth: '300px', // Ensure a consistent width
  }}
>
  {notifications.length > 0 ? (
    notifications.map((notification) => (
      <MenuItem
        key={notification._id}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1, // Padding for better spacing
          gap: 2, // Space between the icon and message
          borderBottom: '1px solid #e0e0e0', // Divider between notifications
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          {getIcon(notification.type)}
          <Box sx={{ ml: 1 }}>
            <Typography variant="body1">
              {notification.message}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'gray', fontSize: '0.75rem' }}
            >
              {/* {new Date(notification.date).toLocaleTimeString()} Time */}
            </Typography>
          </Box>
        </Box>
        <Button
          size="small"
          variant="text"
          sx={{
            color: notifications.length > 0 ? '#2196F3' : 'gray',
            textTransform: 'none',
            fontSize: '0.75rem',
            ':hover': {
              color: 'black',
            },
          }}
          onClick={() => markAsRead(notification._id)}
        >
          Mark as Read
        </Button>
      </MenuItem>
    ))
  ) : (
    <MenuItem>
      <Typography>No new notifications</Typography>
    </MenuItem>
  )}
</Menu>
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
              <MenuItem onClick={handleOpenCurrencyDialog}>
                <Typography sx={{ textAlign: "center" }}>
                  Choose Currency
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography sx={{ textAlign: "center" }}>
                  Bookmarks
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleDeleteAccount}>
                <Typography sx={{ textAlign: "center", color: "#ff4d4d" }}>
                  delete account
                </Typography>
              </MenuItem>
              {/* Button to Open Currency Dialog */}

              {/* Currency Conversion Dialog */}
              <CurrencyConversion
                open={openCurrencyDialog}
                onClose={handleCloseCurrencyDialog}
              />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TouristNB;
