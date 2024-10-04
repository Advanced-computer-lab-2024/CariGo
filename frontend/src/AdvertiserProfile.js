import React from 'react'; 
import ProfileHeader from './components/ProfileHeader.js';
import CompanyInfo from './components/CompanyInfo.js';
import CenteredTabs from './components/CenteredTabs'; // Import your CenteredTabs component

import NavBar from './components/NavBar';
import './styles/AdvertiserProfile.css'; // Custom styles
import coverImage from './assets/header.png'; // Update with your cover image
import logoImage from './assets/profile.png'; // Update with your logo image

const AdvertiserProfile = () => {
  const profile = {
    companyName: 'CariGo',
    userName: 'John Doe', // Add user name here
    website: 'https://carigo.com',
    description: 'We are a logistics company revolutionizing transportation in the region with innovative solutions and a commitment to excellence.',
    logo: logoImage, // Use the imported logo
    coverImage: coverImage, // Use the imported cover image
  };

  return (
    <div className="advertiser-profile">
      <NavBar />
      <header className="profile-header">
        <ProfileHeader 
          companyName={profile.companyName} 
          coverImage={profile.coverImage} 
          logo={profile.logo}
        />
      </header>
      <div className="profile-content">
        <CompanyInfo 
          userName={profile.userName} // Pass userName as a prop
          description={profile.description}
          website={profile.website}
          companyName={profile.companyName} // Pass companyName as a prop
          />
        
        <CenteredTabs /> {/* Add the CenteredTabs component here */}
      </div>
    </div>
  );
};

export default AdvertiserProfile;
