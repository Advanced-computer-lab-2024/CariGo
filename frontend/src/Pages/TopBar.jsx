// TopBar.jsx
import React, { useState } from 'react';
import { Layout } from 'antd';
import { UserOutlined, BellOutlined, MessageOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons'; // Import the icons
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
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const TopBar = () => {
   const navigate  = useNavigate()
  const handleLogout = () =>{
    localStorage.clear();
    navigate("/")
    
  }
  const [username, setUsername] = useState(localStorage.getItem('username'))
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null); // Notification menu anchor
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New user registered', time: '2 mins ago', type: 'success', read: false },
    { id: 2, text: 'System update available', time: '1 hour ago', type: 'warning', read: true },
    { id: 3, text: 'New message received', time: '3 hours ago', type: 'info', read: false },
  ]);

  //const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleOpenNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };


  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };


  const handleChangePass=()=>{
    handleCloseUserMenu();

    navigate('/change-password');
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //console.log(localStorage.getItem('username'))

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircleOutlined style={{ color: 'green' }} />;
      case 'warning': return <WarningOutlined style={{ color: 'orange' }} />;
      case 'info': return <MessageOutlined style={{ color: 'blue' }} />;
      default: return <BellOutlined />;
    }
  };

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
  {/* Notification Icon */}
        <Box sx={{ flexGrow: 0, marginRight: 2 }}>
          <Tooltip title="View notifications">
            <IconButton onClick={handleOpenNotifications} sx={{ color: 'white' }}>
              <BellOutlined />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{
              mt: '45px',
              width: '300px',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
            id="menu-notifications"
            anchorEl={anchorElNotifications}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorElNotifications)}
            onClose={handleCloseNotifications}
          >
            <Typography variant="h6" sx={{ padding: '10px 15px', backgroundColor: '#f5f5f5', fontWeight: 'bold', color: '#333' }}>
              Notifications
            </Typography>
            <Divider />
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <MenuItem 
                  key={notification.id} 
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px',
                    borderBottom: '1px solid #f0f0f0',
                  }}
                >
                  {getIcon(notification.type)}
                  <Box>
                    <Typography 
                      variant="body1" 
                      sx={{ fontWeight: 'bold', color: '#333' }}
                    >
                      {notification.text}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ color: '#999' }}
                    >
                      {notification.time}
                    </Typography>
                  </Box>
                </MenuItem>
              ))
            ) : (
              <MenuItem>
                <Typography sx={{ textAlign: 'center' }}>No notifications</Typography>
              </MenuItem>
            )}
          </Menu>
        </Box>



        {/* User Menu */}
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
