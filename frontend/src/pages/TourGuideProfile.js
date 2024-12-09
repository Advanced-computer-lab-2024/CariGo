import React, { useState, useEffect } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { Box, Container, IconButton, Menu, MenuItem, Paper, ThemeProvider ,createTheme,
  Dialog,
  Modal,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from  "@mui/material";
import { Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom';


import ProfileHeader from "../components/ProfileHeader"
import TourGuideInfo from "../components/TourGuideInfo"
import NavBarTourGuide from "../components/NavBarTourGuide"
import PassModal from "./Tourist/components/PassModal"
import InfoEdit from "../components/TGInfoEdit"
import CenteredTabs from "../components/CenteredTabs";




const coverImage = "https://cdn.tourradar.com/s3/tour/1500x800/191916_6555c63a7c30e.jpg"
const profileImage = "/placeholder.svg?height=100&width=100"

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

export default function TourGuideProfile({ userId }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [isInfoEditModalOpen, setIsInfoEditModalOpen] = useState(false)
  const [isPassModalOpen, setIsPassModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("jwt")
        const id = jwtDecode(token).id
        if (!token) throw new Error("No token found. Please log in.")

        const response = await axios.get(`http://localhost:4000/cariGo/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setProfile(response.data)
      } catch (err) {
        console.error("Error fetching profile:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [userId, refreshKey])

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleSettingsClose = () => {
    setAnchorEl(null)
  }

  const handleEditInfo = () => {
    setIsInfoEditModalOpen(true)
    handleSettingsClose()
  }

  const handleChangePass = () => {
    setIsPassModalOpen(true)
    handleSettingsClose()
  }

  const handleChangePassClose = () => {
    setIsPassModalOpen(false)
  }

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("jwt")
    try {
      const response = await fetch(
        `http://localhost:4000/cariGo/delReq/createReq`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.ok) {
        alert("Account delete request sent")
        setIsDeleteDialogOpen(false)
      } else {
        console.error("Failed to send delete request:", response.statusText)
      }
      console.log(response.json)
    } catch (error) {
      console.error("Error deleting account:", error)
    }
  }

  const handleNavigateToDashboard = () => {
    navigate('/TourGuide/dashboard')
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!profile) return <div>No profile found.</div>

  const logoImage = profile.photo ? `http://localhost:4000/public/img/users/${profile.photo}` : profileImage

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
        <NavBarTourGuide/>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ mt: 4, mb: 4, overflow: "hidden", backgroundColor: "background.paper", position: "relative" }}>
            <ProfileHeader
              name={profile.username || "Tour Guide"}
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
              <Settings />
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
              <TourGuideInfo
                userName={profile.username || "No username provided"}
                email={profile.email || "No email provided"}
                yearsOfExperience={profile.years_of_experience || "No experience provided"}
                mobileNumber={profile.mobile_number || "No mobile number provided"}
                previous_work={profile.previous_work || []}
              />
              {/* <CenteredTabs /> */}
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
              <InfoEdit
                profile={profile}
                setProfile={setProfile}
                setRefreshKey={setRefreshKey}
                onClose={() => setIsInfoEditModalOpen(false)}
              />
            </Box>
          </Modal>

          {/* <InfoEdit
            open={isInfoEditModalOpen}
            onClose={() => setIsInfoEditModalOpen(false)}
            profile={profile}
            setProfile={setProfile}
            setRefreshKey={setRefreshKey}
          /> */}

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
  )
}

