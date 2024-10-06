import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileHeader from './components/ProfileHeader';
import CompanyInfo from './components/CompanyInfo';
import CenteredTabs from './components/CenteredTabs';
import NavBar from './components/NavBar';
import SmallButton from './components/smallButton'; // Import SmallButton here
import './styles/AdvertiserProfile.css';
import coverImage from './assets/header.png'; 
import logoImage from './assets/profile.png'; 

const AdvertiserProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Add refreshKey state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
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
        <ProfileHeader 
          companyName={profile.companyName || 'CariGo'} 
          coverImage={coverImage} 
          logo={logoImage} 
        />
      </header>
      <div className="profile-content">
        <CompanyInfo 
          userName={profile.username || 'No username provided'} 
          email={profile.email || 'No email provided'}
          role={profile.role || 'No role assigned'}
          hotline={profile.hotline || 'No hotline provided'}
          website={profile.website_link || '#'}
          about={profile.about || 'No about information available.'}
          description={profile.description || 'No description available.'}
        />
        
        <SmallButton profile={profile} setProfile={setProfile} setRefreshKey={setRefreshKey} /> {/* Pass setRefreshKey */}
        <CenteredTabs />
      </div>
    </div>
  );
};

export default AdvertiserProfile;
