import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import TouristHeader from '../components/TouristHeader';
import TouristInfo from '../components/TouristInfo'; 
import CenteredTabs from '../components/CenteredTabs';
import './styles/TouristProfile.css'; 
import headerImage from '../assets/header.png'; 
import profileImage from '../assets/profile.png';
import TouristInfoEdit from '../components/TouristInfoEdit';

const TouristProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('Fetching profile for userId:', userId); 
        
        const token = localStorage.getItem('jwt');
        console.log('Token:', token); 
        
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
  
        const response = await axios.get(`http://localhost:4000/cariGo/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        console.log('Profile data received:', response.data); 
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>No profile found.</div>;
  }

  const coverImage = headerImage; 
  const logoImage = profileImage;

  return (
    <div className="tourist-profile">
      <header className="tourist-header">
        <TouristHeader 
          companyName={profile.companyName || 'CariGo'} 
          coverImage={coverImage} 
          logo={logoImage} 
        />
      </header>
      <div className="profile-content">
        <TouristInfo 
          userName={profile.username || 'No username provided'} 
          email={profile.email || 'No email provided'}
          role={profile.role || 'No role assigned'}
          mobile={profile.mobile_number|| 'No mobile number provided'}
          nationality={profile.nationality|| 'Not available'}
          job={profile.job || 'No job information available.'}
          wallet={profile.wallet || 'No balance available.'}
        />
        
        <TouristInfoEdit profile={profile} setProfile={setProfile} setRefreshKey={setRefreshKey} /> 
        <CenteredTabs />
      </div>
    </div>
  );
};

export default TouristProfile;
