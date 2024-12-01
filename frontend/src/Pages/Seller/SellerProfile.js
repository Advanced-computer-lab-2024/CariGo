import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import ProfileHeader from '../components/ProfileHeader';
import ProfileHeader from './Profile_Header';
// import CompanyInfo from '../components/CompanyInfo';
// import TourGuideInfo from '../components/TourGuideInfo';
import SellerInfo from './SellerInfo';
// import CenteredTabs from '../components/CenteredTabs';
// import TourismGovernerTabs from '../components/tourismGovernerTabs';
import NavBar from '../../components/NavBarSeller';
// import SmallButton from '../components/smallButton'; // Import SmallButton here
// import SmallButtonTG from '../components/smallButtonTG';
import SmallButtonS from './smallButtonS';
import '../../styles/AdvertiserProfile.css';
import profileImage from '../../assets/profilePic.png';
import coverImage from '../../assets/cover.jpg'; 
import { Button } from '@mui/base/Button';
import { useNavigate } from 'react-router-dom';
 

const SellerProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Add refreshKey state
  const navigate = useNavigate()

  const handleProducts = ()=>{
  
    console.log(2)
   navigate("/Seller/products")
    
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const id = localStorage.getItem('id')
        console.log('Fetching profile for userId:', id); // Debugging log
        
        const token = localStorage.getItem('jwt');  // or sessionStorage.getItem('jwt')
        console.log('Token:', token); // Add token logging to verify
        
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        
        const response = await axios.get(`http://localhost:4000/cariGo/users/${id}`, {
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
  const logoImage =  profile.photo?`http://localhost:4000/public/img/logos/`+profile.photo:profileImage ;
  return (
    <div>
      <NavBar/>
      <div className="advertiser-profile">
        <header className="profile-header">
          <ProfileHeader 
            companyName={logoImage  /*companyName || 'CariGo'*/} 
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
          <Button style={{marginTop:"10px"}} onClick={()=>handleProducts()}>View Products</Button>
          {/* <SellerTabs /> */}
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
