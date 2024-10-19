import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import ProfileHeader from '../components/ProfileHeader';
import Profile_Header from '../components/Profile_Header';
// import CompanyInfo from '../components/CompanyInfo';
// import TourGuideInfo from '../components/TourGuideInfo';
import SellerInfo from '../components/SellerInfo';
// import CenteredTabs from '../components/CenteredTabs';
// import TourismGovernerTabs from '../components/tourismGovernerTabs';
// import NavBar from '../components/NavBar';
// import SmallButton from '../components/smallButton'; // Import SmallButton here
// import SmallButtonTG from '../components/smallButtonTG';
import SmallButtonS from '../components/smallButtonS';
import '../styles/AdvertiserProfile.css';
import coverImage from '../assets/cover.jpg'; 
import logoImage from '../assets/travel.jpg'; 

const SellerProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Add refreshKey state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const id = localStorage.getItem('id')
        console.log('Fetching profile for userId:', userId); // Debugging log
        
        const token = localStorage.getItem('jwt');  // or sessionStorage.getItem('jwt')
        console.log('Token:', token); // Add token logging to verify
        
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        
        const response = await axios.get(`http://localhost:4000/cariGo/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log('Profile data received:', response.data); // Log received data
        setProfile(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err); // Log any errors
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
    <div className="advertiser-profile">
      <header className="profile-header">
        <Profile_Header 
          companyName={profile.username  /*companyName || 'CariGo'*/} 
          coverImage={coverImage} 
          logo={logoImage} 
        />
      </header>
      <div className="profile-content">
        <SellerInfo 
          userName={profile.username || 'No username provided'} 
          email={profile.email || 'No email provided'}
          description={profile.description || 'no description was provided'}
        //   previousWork={profile.previousWork || 'no previous work was provided'}
          mobileNumber={profile.mobile_number || 'no mobile was provided'}
        //   role={profile.role || 'No role assigned'}
        //   hotline={profile.hotline || 'No hotline provided'}
        //   website={profile.website_link || '#'}
        //   about={profile.about || 'No about information available.'}
        //   description={profile.description || 'No description available.'}
        //   { userName, email, yearsOfExperience,previousWork,mobileNumber }
        />
        
        <SmallButtonS profile={profile} setProfile={setProfile} setRefreshKey={setRefreshKey} /> {/* Pass setRefreshKey */}
        {/* <SellerTabs /> */}
      </div>
    </div>
  );
};

export default SellerProfile;
