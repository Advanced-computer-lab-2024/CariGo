// TopBar.jsx
import React, { useState } from 'react';
import { Layout } from 'antd';
import { UserOutlined, MessageOutlined } from '@ant-design/icons'; // Import the icons
import logo from '../assests/logo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
const TopBar = () => {
   const navigate  = useNavigate()
  const handleLogout = () =>{
    localStorage.clear();
    navigate("/")
    
  }
  const [username, setUsername] = useState(localStorage.getItem('username'))
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  //const navigate = useNavigate();

  

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleChangePass=()=>{
    handleCloseUserMenu();

    navigate('/change-password');
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //console.log(localStorage.getItem('username'))
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
        
      <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
              <MenuItem onClick={handleLogout}>
                <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
              </MenuItem>
              <MenuItem onClick={handleChangePass}>
                <Typography sx={{ textAlign: 'center' }}>Change Password</Typography>
              </MenuItem>
            </Menu>
          </Box>      </div>
    </div>
  );
};

export default TopBar;