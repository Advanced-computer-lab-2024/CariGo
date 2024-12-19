import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  ThemeProvider, 
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import ProfileHeader from './Profile_Header';
import SellerInfo from './SellerInfo';
import NavBar from '../../components/NavBarSeller';
import SmallButtonS from './smallButtonS';
import PassModal from '../Tourist/components/PassModal';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#004e89',
    },
    secondary: {
      main: '#ff6b35',
    },
    background: {
      default: '#F2F0EF',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#004e89',
      secondary: '#ff6b35',
    },
    error: {
      main: '#a70000',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#004e89',
    },
    h5: {
      fontWeight: 500,
      color: '#004e89',
    },
    h6: {
      fontWeight: 500,
      color: '#004e89',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#1a659e',
    },
  },
});

const SellerProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isInfoEditModalOpen, setIsInfoEditModalOpen] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('jwt');
        
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        
        const response = await axios.get(`http://localhost:4000/cariGo/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setProfile(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
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

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!profile) return <Typography>No profile found.</Typography>;

  const logoImage = profile.photo 
    ? `http://localhost:4000/public/img/logos/${profile.photo}`
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5XHerQwS3i6yJJZnKD8GYkN7whDq00fpD1Q&s';
  const coverImage = 'https://switchmed.eu/wp-content/uploads/2020/04/egypt-1.jpg';

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
        <NavBar />
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ mt: 4, mb: 4, overflow: "hidden", backgroundColor: "background.paper", position: "relative" }}>
            <ProfileHeader 
              companyName={profile.username || 'Seller'} 
              logo={logoImage}
              coverImage={coverImage}
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
              onClick={() => navigate("/Seller/products")}
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
              <ShoppingBasketIcon />
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
              <SellerInfo 
                userName={profile.username || 'No username provided'} 
                email={profile.email || 'No email provided'}
                description={profile.description || 'No description was provided'}
                mobileNumber={profile.mobile_number || 'No mobile was provided'}
              />
            </Box>
          </Paper>

          <SmallButtonS
            open={isInfoEditModalOpen}
            onClose={() => setIsInfoEditModalOpen(false)}
            profile={profile}
            setProfile={setProfile}
            setRefreshKey={setRefreshKey}
          />

          <PassModal open={isPassModalOpen} onClose={handleChangePassClose} />
          
          <Dialog
            open={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete Account"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" sx={{ color: 'error.main' }}>
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

export default SellerProfile;

