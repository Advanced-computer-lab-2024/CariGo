import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar"; // Import Avatar for the round image
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logoImage from "../assets/cropped_image.png"; // Correct relative path
import { useNavigate } from "react-router-dom";

const pages = ["Activities", "Iteneraries", "Historical places"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null); // Nav menu anchor
  const [anchorElUser, setAnchorElUser] = React.useState(null); // User menu anchor

  const navigate = useNavigate();

  // Open navigation menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  // Open user menu
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // Close navigation menu
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Close user menu
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Handle navigation
  const loadActivities = () => {
    handleCloseNavMenu(); // Close menu on navigation
    navigate("/activities"); // Navigate to activities
  };

  // Handle navigation
  const loadItineraries = () => {
    handleCloseNavMenu(); // Close menu on navigation
    navigate("/tour_guide/itineraries"); // Navigate to activities
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#004c74" }}>
      {" "}
      {/* Custom color */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            alt="Logo"
            src={logoImage} // Set the source of your logo image here
            sx={{ width: 40, height: 40, mr: 2 }} // Adjust size as needed
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
              <MenuItem onClick={loadActivities}>
                <Typography sx={{ textAlign: "center" }}>{pages[0]}</Typography>
              </MenuItem>

              <MenuItem onClick={loadItineraries}>
                <Typography sx={{ textAlign: "center" }}>{pages[1]}</Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: "center" }}>{pages[2]}</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={loadActivities}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {pages[0]}
            </Button>

            <Button
              onClick={loadItineraries}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {pages[1]}
            </Button>

            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {pages[2]}
            </Button>
          </Box>

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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginLeft: 2 }}
            onClick={() => navigate("/login")} // Replace with your login logic
          >
            Login
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
