import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileHeader from './components/ProfileHeader';
import CompanyInfo from './components/CompanyInfo';
import CenteredTabs from './components/CenteredTabs';
import NavBar from './components/NavBar';
import './styles/AdvertiserProfile.css';
import coverImage from './assets/header.png'; 
import logoImage from './assets/profile.png'; 

const AdvertiserProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('Fetching profile for userId:', userId); // Debugging log

        // Retrieve the token from localStorage (or sessionStorage)
        const token = localStorage.getItem('jwt');  // or sessionStorage.getItem('jwt')

        // Check if the token exists
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        // Set the headers with the Authorization token
        const response = await axios.get(`http://localhost:4000/cariGo/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Profile data received:', response.data); // Debugging log
        setProfile(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

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
      {/* <NavBar /> */}
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
          email={profile.email || 'No email provided'} // Pass email
          role={profile.role || 'No role assigned'} // Pass role
          hotline={profile.hotline || 'No hotline provided'} // Pass hotline
          website={profile.website_link || '#'} // Pass website
          about={profile.about || 'No about information available.'} // Pass about
          description={profile.description || 'No description available.'} 
        />
        <CenteredTabs />
      </div>
    </div>
  );
};

export default AdvertiserProfile;
