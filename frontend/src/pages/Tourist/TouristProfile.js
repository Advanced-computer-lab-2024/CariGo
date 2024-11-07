import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import TouristHeader from '../../components/TouristHeader';
import TouristInfo from '../../components/TouristInfo'; 
import CenteredTabs from '../../components/CenteredTabs';
import './styles/TouristProfile.css'; 
import headerImage from '../../assets/header.png'; 
import profileImage from '../../assets/profile.png';
import TouristInfoEdit from '../../components/TouristInfoEdit';
import TouristNB from './components/TouristNavBar';
import {jwtDecode} from "jwt-decode";
//import profilePic from '../../../../backend/public/img/users/'
const TouristProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); 

  useEffect(() => {
    const fetchProfile = async () => {

      try {
        console.log('Fetching profile for userId:', userId); 
        
        const token = localStorage.getItem("jwt"); // or sessionStorage.getItem('jwt')
        const id = jwtDecode(token).id;
        console.log("Token:", id); // Add token logging to verify
        
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
  
        const response = await axios.get(`http://localhost:4000/cariGo/users/${id}`, {
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
  console.log(process.env.REACT_APP_BACKEND_URL +"sd")
  const logoImage =  `http://localhost:4000/public/img/users/`+profile.photo || profileImage;

  return (
    <div className="tourist-profile">
      <TouristNB /> {/* Include the Navbar component */}
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
          mobile={profile.mobile_number || 'No mobile number provided'}
          nationality={profile.nationality || 'Not available'}
          job={profile.job || 'No job information available.'}
          wallet={profile.wallet || 'No balance available.'}
        />
        
        <TouristInfoEdit profile={profile} setProfile={setProfile} setRefreshKey={setRefreshKey} /> 
        
      </div>
    </div>
  );
};


export default TouristProfile;
