// TopBar.jsx
import React, { useState } from 'react';
import { Layout } from 'antd';
import { UserOutlined, MessageOutlined } from '@ant-design/icons'; // Import the icons
import logo from '../assests/logo.png';
import { Link } from 'react-router-dom';
 

const TopBar = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'))
  console.log(localStorage.getItem('username'))
  return (
    <div style={{ 
      backgroundColor: '#001529', 
      color: '#fff', 
      padding: '0 20px', 
      height: '64px', 
      display: 'flex', 
      justifyContent: 'space-between', // Space out the items
      alignItems: 'center' 
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <Link to="/admin"> <img 
          src={logo} 
          alt="CariGo Logo" 
          style={{ height: '50px', marginRight: '10px', marginTop: '20px'}} // Adjust the height as needed
        /></Link>
        <h2 style={{ color: '#fff', margin: '0' }}> <Link to="/">CariGo</Link></h2>
      </div>
      <p style={{marginLeft:"650px"}}>Hi  {username}</p>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        
        <UserOutlined 
          style={{ fontSize: '20px', color: '#fff', marginRight: '20px', cursor: 'pointer' }} 
          onClick={() => console.log('Profile clicked')} // Add your click handler
        />
        <MessageOutlined 
          style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }} 
          onClick={() => console.log('Message clicked')} // Add your click handler
        />
      </div>
    </div>
  );
};

export default TopBar;