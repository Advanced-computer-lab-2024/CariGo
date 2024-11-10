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
import UserBadge from "../../badge";
import logoImage from "../../../assets/cropped_image.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import CurrencyConversion from "../../../components/CurrencyConversion";

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
  // const loadFileComplaint = () => { handleCloseComplaintsMenu(); navigate('/tourist/file-complaint'); }; // Route to file complaint
  const loadComplaintHistory = () => { handleCloseComplaintsMenu(); navigate('/tourist/complaint-history'); }; // Route to complaint history
  const handleOpenComplaintsMenu = (event) => setAnchorElComplaints(event.currentTarget); // Open complaints menu
const handleCloseComplaintsMenu = () => setAnchorElComplaints(null); // Close complaints menu

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
              <Menu
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
              </Menu>
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={loadSuggestedForYou}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {pages[0]}
            </Button>
            <Button
              onClick={loadActivities}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {pages[1]}
            </Button>
            <Button
              onClick={loadItinerary}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {pages[2]}
            </Button>
            <Button
              onClick={loadHistoricalPlaces}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {pages[3]}
            </Button>
            <Button
              onClick={loadProducts}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {pages[4]}
            </Button>
            {/* Complaints Dropdown in Desktop View */}
            <Box>
              <Button
                onClick={handleOpenComplaintsMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Complaints
              </Button>
              <Menu
                id="complaints-menu"
                anchorEl={anchorElComplaints}
                open={Boolean(anchorElComplaints)}
                onClose={handleCloseComplaintsMenu}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <MenuItem onClick={loadFileComplaint}>File Complaint</MenuItem>
                <MenuItem onClick={loadComplaintHistory}>
                  Complaint History
                </MenuItem>
              </Menu>
            </Box>

            {/* Bookings Dropdown in Desktop View */}
            <Box>
              <Button
                onClick={handleOpenBookingsMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Bookings
              </Button>
              <Menu
                id="bookings-menu"
                anchorEl={anchorElBookings}
                open={Boolean(anchorElBookings)}
                onClose={handleCloseBookingsMenu}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                sx={{marginTop:'30px'}}
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
                
              </Menu>
            </Box>
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
