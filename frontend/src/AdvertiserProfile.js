import React from 'react';
import ProfileHeader from './components/ProfileHeader.js';
import CompanyInfo from './components/CompanyInfo.js';
import ProfileForm from './components/ProfileForm.js';
import SideDrawer from './components/SideDrawer';
import NavBar from './components/NavBar'
import './styles/AdvertiserProfile.css';


const AdvertiserProfile = () => {
  const profile = {
    companyName: 'CariGo',
    website: 'https://carigo.com',
    description: 'We are a logistics company revolutionizing transportation in the region.',
    logo: 'https://via.placeholder.com/150', // Placeholder image for logo
    coverImage: 'https://via.placeholder.com/800x200', // Placeholder image for cover photo
  };

  const handleFormSubmit = (updatedProfile) => {
    // Handle form submission logic here
    console.log('Profile updated:', updatedProfile);
  };

  return (
    <div className="advertiser-profile">
      <NavBar />
       <header>
        <h1>Advertiser Profile</h1>
        <SideDrawer /> {/* SideDrawer is included here */}
      </header>
      <ProfileHeader 
        companyName={profile.companyName} 
        coverImage={profile.coverImage} 
        logo={profile.logo}
      />
      <div className="profile-content">
        <CompanyInfo 
          description={profile.description}
          website={profile.website}
        />
        <ProfileForm profile={profile} onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default AdvertiserProfile;
