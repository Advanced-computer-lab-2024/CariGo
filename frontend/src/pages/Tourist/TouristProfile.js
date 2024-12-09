import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  Button,
  Modal,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
  ThemeProvider,
  createTheme,
  Paper,
  Container,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import ProfileHeader from "../../components/TouristHeader";
import TouristInfo from "../../components/TouristInfo";
import TouristInfoEdit from "../../components/TouristInfoEdit";
import TouristNavBar from "./components/TouristNavBar";
import TouristSideBar from "./components/TouristSideBar";
import PassModal from "./components/PassModal";

// Create a custom theme with the new color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: "#004e89",
    },
    secondary: {
      main: "#ff6b35",
    },
    background: {
      default: "#F2F0EF",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#004e89",
      secondary: "#ff6b35",
    },
    error: {
      main: "#a70000",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: "#004e89",
    },
    h5: {
      fontWeight: 500,
      color: "#004e89",
    },
    h6: {
      fontWeight: 500,
      color: "#004e89",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
      color: "#1a659e",
    },
  },
});

const TouristProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [isInfoEditModalOpen, setIsInfoEditModalOpen] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const id = jwtDecode(token).id;
        if (!token) throw new Error("No token found. Please log in.");

        const response = await axios.get(`http://localhost:4000/cariGo/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
        setSelectedTags(response.data.selectedTags);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, refreshKey]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Admin/getTags");
        if (response.data && Array.isArray(response.data)) {
          setTags(response.data);
        } else {
          console.error("Unexpected response data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleTagChange = (tagId) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tagId)
        ? prevSelectedTags.filter((id) => id !== tagId)
        : [...prevSelectedTags, tagId]
    );
  };

  const handleSavePreferences = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const id = jwtDecode(token).id;
      await axios.patch(
        `http://localhost:4000/cariGo/users/update/${id}`,
        { selectedTags },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRefreshKey((prevKey) => prevKey + 1);
      setIsPreferencesModalOpen(false);
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchorEl(null);
  };

  const handleEditPreferences = () => {
    setIsPreferencesModalOpen(true);
    handleSettingsClose();
  };

  const handleEditInfo = () => {
    setIsInfoEditModalOpen(true);
    handleSettingsClose();
  };

  const handleChangePass = () => {
    setIsPassModalOpen(true);
    handleSettingsClose();
  };

  const handleChangePassClose = () => {
    setIsPassModalOpen(false);
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await fetch(
        `http://localhost:4000/cariGo/delReq/createReq`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        alert("Account delete request sent");
        setIsDeleteDialogOpen(false);
      } else {
        console.error("Failed to send delete request:", response.statusText);
      }
      console.log(response.json);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleNavigateToOrders = () => {
    navigate('/Tourist/orders');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile found.</div>;

  const coverImage = "https://media.cntraveler.com/photos/6090755e0a033bd816c44937/16:9/w_1920,c_limit/Zurich_GettyImages-451614321.jpg";
 
  const logoImage = profile.photo
    ? `http://localhost:4000/public/img/users/${profile.photo}`
    : "/placeholder.svg?height=100&width=100"

  const conversionRate = localStorage.getItem("conversionRate") || 1;
  const code = localStorage.getItem("currencyCode") || "EGP";

  return (
   <Box sx={{ display: "flex", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
    {/* Sidebar */}
    <Box>
      <TouristSideBar />
    </Box>

    {/* Main Content Area */}
    <Box
      sx={{
        flexGrow: 1,
        marginLeft: "80px", // Sidebar width
        marginTop: "50px", // AppBar height
        padding: "16px",
      }}
    >
      {/* Top Navbar */}
      <TouristNavBar />
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ mt: 4, mb: 4, overflow: "hidden", backgroundColor: "background.paper", position: "relative" }}>
            <ProfileHeader
              companyName={profile.companyName || "CariGo"}
              coverImage={coverImage}
              logo={logoImage}
            />
            <IconButton
              onClick={handleSettingsClick}
              sx={{
                position: "absolute",
                top: "16px",
                right: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              <SettingsIcon />
            </IconButton>
            <IconButton
              onClick={handleNavigateToOrders}
              sx={{
                position: "absolute",
                top: "16px",
                right: "64px",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              <ShoppingBagIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleSettingsClose}
            >
              <MenuItem onClick={handleEditPreferences}>Edit Preferences</MenuItem>
              <MenuItem onClick={handleEditInfo}>Edit Info</MenuItem>
              <MenuItem onClick={handleChangePass}>Change Password</MenuItem>
              <MenuItem onClick={() => setIsDeleteDialogOpen(true)} sx={{ color: 'error.main' }}>Delete Account</MenuItem>
            </Menu>
            <Box sx={{ p: 3 }}>
              <TouristInfo
                userName={profile.username || "No username provided"}
                email={profile.email || "No email provided"}
                role={profile.role || "No role assigned"}
                mobile={profile.mobile_number || "No mobile number provided"}
                nationality={profile.nationality || "Not available"}
                job={profile.job || "No job information available."}
                wallet={`${(profile.wallet * conversionRate).toFixed(2)} ${code}` || "No balance available."}
              />
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Preferences
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {selectedTags.map((tagId) => {
                    const tag = tags.find((t) => t._id === tagId);
                    return tag ? (
                      <Chip
                        key={tag._id}
                        label={tag.title}
                        sx={{
                          backgroundColor: "secondary.main",
                          color: "background.paper",
                        }}
                      />
                    ) : null;
                  })}
                </Box>
              </Box>
            </Box>
          </Paper>

          <Modal open={isPreferencesModalOpen} onClose={() => setIsPreferencesModalOpen(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom>
                Edit Your Preferences
              </Typography>
              <Grid container spacing={2}>
                {tags.map((tag) => (
                  <Grid item xs={6} key={tag._id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedTags?.includes(tag._id)}
                          onChange={() => handleTagChange(tag._id)}
                          sx={{
                            color: selectedTags.includes(tag._id) ? "primary.main" : "text.secondary",
                            '&.Mui-checked': {
                              color: "primary.main",
                            },
                          }}
                        />
                      }
                      label={tag.title}
                    />
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                <Button
                  variant="contained"
                  onClick={handleSavePreferences}
                  sx={{
                    backgroundColor: "primary.dark",
                    color: "background.paper",
                    "&:hover": { backgroundColor: "secondary.main" },
                  }}
                >
                  Save Preferences
                </Button>
              </Box>
            </Box>
          </Modal>

          <Modal open={isInfoEditModalOpen} onClose={() => setIsInfoEditModalOpen(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <TouristInfoEdit
                profile={profile}
                setProfile={setProfile}
                setRefreshKey={setRefreshKey}
                onClose={() => setIsInfoEditModalOpen(false)}
              />
            </Box>
          </Modal>

          <PassModal open={isPassModalOpen} onClose={handleChangePassClose} />
          <Dialog
            open={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete Account"}</DialogTitle>
            <DialogContent>
              <DialogContentText
              id="alert-dialog-description"
              sx={{ color: 'error.main' }} // Replace 'red' with your desired color
            >

                Are you sure you want to delete your account? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDeleteDialogOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDeleteAccount} color="error" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
    </ThemeProvider>
      </Box>
      </Box>
  );
};

export default TouristProfile;

