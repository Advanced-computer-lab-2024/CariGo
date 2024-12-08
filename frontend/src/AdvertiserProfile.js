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
import BarChartIcon from "@mui/icons-material/BarChart";
import { useNavigate } from 'react-router-dom';

import ProfileHeader from "./components/ProfileHeader";
import CompanyInfo from "./components/CompanyInfo";
import NavBarAdvertiser from "./components/NavBarAdvertiser";
import PassModal from "./Pages/Tourist/components/PassModal";
import AdvertiserInfoEdit from "./AdvertiserInfoEdit";
import CenteredTabs from "./components/CenteredTabs";


const coverImage = "https://imageio.forbes.com/specials-images/imageserve/61cc6c0bfa195592fa55465d/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds";

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


const AdvertiserProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
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
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, refreshKey]);

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchorEl(null);
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

  const handleNavigateToDashboard = () => {
    navigate('/Advertiser/dashboard');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile found.</div>;

  const logoImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBhwsrrfe4bL5uWFhxt354uZ1sGmytaWzedA&s";
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
        <NavBarAdvertiser />
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
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleSettingsClose}
            >
              <MenuItem onClick={handleEditInfo}>Edit Info</MenuItem>
              <MenuItem onClick={handleChangePass}>Change Password</MenuItem>
              <MenuItem onClick={() => setIsDeleteDialogOpen(true)} sx={{ color: 'error.main' }}>Delete Account</MenuItem>
            </Menu>
            <Box sx={{ p: 3 }}>
              <CompanyInfo
                companyName={profile.username || "No username provided"}
                email={profile.email || "No email provided"}
                role={profile.role || "No role assigned"}
                hotline={profile.hotline || "No hotline provided"}
                website={profile.website_link || "#"}
                about={profile.about || "No about information available."}
                description={profile.description || "No description available."}
              />
              <CenteredTabs />
            </Box>
          </Paper>

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
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
            >
              <AdvertiserInfoEdit
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
              <DialogContentText id="alert-dialog-description"
               sx={{ color: 'error.main' }} 
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
      </Box>
    </ThemeProvider>
  );
};

export default AdvertiserProfile;
