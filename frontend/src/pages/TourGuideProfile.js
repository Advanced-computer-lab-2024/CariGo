import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileHeader from "../components/ProfileHeader";
// import CompanyInfo from '../components/CompanyInfo';
import TourGuideInfo from "../components/TourGuideInfo";
// import NavBar from '../components/NavBar';
// import SmallButton from '../components/smallButton'; // Import SmallButton here
import SmallButtonS from "../components/smallButtonTG";
import "../styles/AdvertiserProfile.css";
import coverImage from "../assets/cover.jpg";
import logoImage from "../assets/travel.jpg";
import NavBar from "../components/NavBarTourGuide";
import CT_TourGuide from "../components/CT_TourGuide";
import { jwtDecode } from "jwt-decode";

const TourGuideProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Add refreshKey state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const id = localStorage.getItem("id");
        console.log("Fetching profile for userId:", userId); // Debugging log


        const token = localStorage.getItem("jwt"); // or sessionStorage.getItem('jwt')
        const id = jwtDecode(token).id;
        console.log("Token:", id); // Add token logging to verify

        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await axios.get(
          `http://localhost:4000/cariGo/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Profile data received:", response.data); // Log received data
        setProfile(response.data);
        // console.log(profile)
      } catch (err) {
        console.error("Error fetching profile:", err); // Log any errors
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, refreshKey]); // Add refreshKey as a dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>No profile found.</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="advertiser-profile">
        <header className="profile-header">
          <ProfileHeader
            companyName={profile.username /*companyName || 'CariGo'*/}
            coverImage={coverImage}
            logo={logoImage}
          />
        </header>
        <div className="profile-content">
          <TourGuideInfo
            userName={profile.username || "No username provided"}
            email={profile.email || "No email provided"}
            yearsOfExperience={
              profile.years_of_experience ||
              "no years of experience was provided"
            }
            //   previousWork={profile.previousWork || 'no previous work was provided'}
            mobileNumber={
              profile.mobile_number || "no mobile mobileNumber was provided"
            }
            previous_work={profile.previous_work}
            //   role={profile.role || 'No role assigned'}
            //   hotline={profile.hotline || 'No hotline provided'}
            //   website={profile.website_link || '#'}
            //   about={profile.about || 'No about information available.'}
            //   description={profile.description || 'No description available.'}
            //   { userName, email, yearsOfExperience,previousWork,mobileNumber }
          />
          <SmallButtonS
            profile={profile}
            setProfile={setProfile}
            setRefreshKey={setRefreshKey}
          />{" "}
          {/* Pass setRefreshKey */}
          <CT_TourGuide experience={profile.previous_work} />
        </div>
      </div>
    </div>
  );
};

export default TourGuideProfile;
