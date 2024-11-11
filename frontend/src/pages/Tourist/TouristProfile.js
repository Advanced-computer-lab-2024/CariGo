import React, { useState, useEffect } from "react";
import axios from "axios";
import TouristHeader from "../../components/TouristHeader";

import "./styles/TouristProfile.css";

import { jwtDecode } from "jwt-decode";
//import profilePic from '../../../../backend/public/img/users/'

import {
  Button,
  Modal,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";

import TouristInfo from "../../components/TouristInfo";
import CenteredTabs from "../../components/CenteredTabs";
import "./styles/TouristProfile.css";
import headerImage from "../../assets/header.png";
import profileImage from "../../assets/profilePic.png";
import TouristInfoEdit from "../../components/TouristInfoEdit";
import TouristNB from "./components/TouristNavBar";
import MyPurchases from "./MyPurchases";

const TouristProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [userTags, setUserTags] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const id = jwtDecode(token).id;
        if (!token) throw new Error("No token found. Please log in.");

        const response = await axios.get(
          `http://localhost:4000/cariGo/users/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
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
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile found.</div>;

  const coverImage = headerImage;
  const logoImage = profile.photo
    ? `http://localhost:4000/public/img/users/` + profile.photo
    : profileImage;
  const conversionRate = localStorage.getItem("conversionRate")||1;
  const code = localStorage.getItem("currencyCode")||"EGP";

  return (
    <div className="tourist-profile">
      <TouristNB />
      <header className="tourist-header">
        <TouristHeader
          companyName={profile.companyName || "CariGo"}
          coverImage={coverImage}
          logo={logoImage}
        />
      </header>
      <div className="profile-content">
        <TouristInfo
          userName={profile.username || "No username provided"}
          email={profile.email || "No email provided"}
          role={profile.role || "No role assigned"}
          mobile={profile.mobile_number || "No mobile number provided"}
          nationality={profile.nationality || "Not available"}
          job={profile.job || "No job information available."}
          wallet={(profile.wallet*conversionRate).toFixed(2)+` ${code}` || "No balance available."}
        />
        <Button
          variant="contained"
          onClick={() => setIsModalOpen(true)}
          sx={{ mt: 2, mb: 2 }}
        >
          Edit Preferences
        </Button>

        <TouristInfoEdit
          profile={profile}
          setProfile={setProfile}
          setRefreshKey={setRefreshKey}
        />
        <MyPurchases />

        {/* Modal for Editing Preferences */}
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Box
            sx={{
              padding: 4,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 24,
              margin: "auto",
              width: "60%",
              marginTop: "5%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Edit Your Preferences
            </Typography>
            <Grid container spacing={2}>
              {tags.map((tag) => (
                <Grid item xs={6} md={4} key={tag._id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedTags?.includes(tag._id)}
                        onChange={() => handleTagChange(tag._id)}
                        sx={{
                          color: selectedTags.includes(tag._id)
                            ? "primary.main"
                            : "text.secondary",
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
                color="primary"
                onClick={handleSavePreferences}
                sx={{
                  backgroundColor: "primary.main",
                  ":hover": { backgroundColor: "primary.dark" },
                }}
              >
                Save Preferences
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default TouristProfile;
